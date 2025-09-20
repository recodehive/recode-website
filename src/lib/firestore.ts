import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  increment,
  writeBatch,
} from "firebase/firestore";
import { app } from "./firebase";
import type {
  DevfolioProfile,
  ProfileSubmission,
  GitHubProfile,
} from "../types/devfolio";
import {
  mockGetApprovedProfiles,
  mockGetFeaturedProfiles,
  mockGetPendingSubmissions,
  mockApproveSubmission,
  mockRejectSubmission,
  mockToggleLike,
  mockGetUserLikes,
} from "./mockFirestore";

const db = getFirestore(app);

// Collections
const PROFILES_COLLECTION = "devfolio_profiles";
const SUBMISSIONS_COLLECTION = "devfolio_submissions";
const LIKES_COLLECTION = "devfolio_likes";

// Flag to determine if we should use mock data
const USE_MOCK_DATA =
  process.env.NODE_ENV === "development" ||
  process.env.REACT_APP_USE_MOCK === "true";

// Helper function to detect if Firebase is available
const isFirebaseAvailable = async (): Promise<boolean> => {
  try {
    // Try a simple read operation to test connectivity
    await getDocs(query(collection(db, PROFILES_COLLECTION), limit(1)));
    return true;
  } catch (error) {
    console.warn("Firebase connection failed, using mock data:", error);
    return false;
  }
};

// Profile operations
export const getApprovedProfiles = async (): Promise<DevfolioProfile[]> => {
  if (USE_MOCK_DATA || !(await isFirebaseAvailable())) {
    return mockGetApprovedProfiles();
  }

  try {
    const q = query(
      collection(db, PROFILES_COLLECTION),
      where("status", "==", "approved"),
      orderBy("approvedAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as DevfolioProfile)
    );
  } catch (error) {
    console.error("Error fetching approved profiles:", error);
    return mockGetApprovedProfiles();
  }
};

export const getFeaturedProfiles = async (): Promise<DevfolioProfile[]> => {
  if (USE_MOCK_DATA || !(await isFirebaseAvailable())) {
    return mockGetFeaturedProfiles();
  }

  try {
    const q = query(
      collection(db, PROFILES_COLLECTION),
      where("status", "==", "approved"),
      where("featured", "==", true),
      orderBy("approvedAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as DevfolioProfile)
    );
  } catch (error) {
    console.error("Error fetching featured profiles:", error);
    return mockGetFeaturedProfiles();
  }
};

export const getPendingProfiles = async (): Promise<DevfolioProfile[]> => {
  try {
    const q = query(
      collection(db, PROFILES_COLLECTION),
      where("status", "==", "pending"),
      orderBy("submittedAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as DevfolioProfile)
    );
  } catch (error) {
    console.error("Error fetching pending profiles:", error);
    return [];
  }
};

export const createProfile = async (
  githubData: GitHubProfile,
  submittedBy?: string
): Promise<string> => {
  try {
    const profileData: Omit<DevfolioProfile, "id"> = {
      githubData,
      status: "pending",
      likes: 0,
      submittedAt: new Date().toISOString(),
      submittedBy,
      featured: false,
    };

    const docRef = await addDoc(
      collection(db, PROFILES_COLLECTION),
      profileData
    );
    return docRef.id;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
};

export const submitProfile = async (
  submission: Omit<ProfileSubmission, "id">
): Promise<string> => {
  if (USE_MOCK_DATA || !(await isFirebaseAvailable())) {
    const { mockSubmitProfile } = await import("./mockFirestore");
    return mockSubmitProfile(submission);
  }

  try {
    // Check if profile already exists
    const exists = await checkProfileExists(submission.githubData.username);
    if (exists) {
      throw new Error("Profile with this username already exists");
    }

    const docRef = await addDoc(collection(db, SUBMISSIONS_COLLECTION), {
      ...submission,
      submittedAt: serverTimestamp(),
      status: "pending",
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting profile:", error);
    console.log("🔄 Falling back to mock submission due to error");
    // Fallback to mock system
    const { mockSubmitProfile } = await import("./mockFirestore");
    return mockSubmitProfile(submission);
  }
};

export const approveProfile = async (
  profileId: string,
  adminNotes?: string
): Promise<void> => {
  try {
    const profileRef = doc(db, PROFILES_COLLECTION, profileId);
    await updateDoc(profileRef, {
      status: "approved",
      approvedAt: serverTimestamp(),
      adminNotes,
    });
  } catch (error) {
    console.error("Error approving profile:", error);
    throw error;
  }
};

export const rejectProfile = async (
  profileId: string,
  adminNotes?: string
): Promise<void> => {
  try {
    const profileRef = doc(db, PROFILES_COLLECTION, profileId);
    await updateDoc(profileRef, {
      status: "rejected",
      adminNotes,
    });
  } catch (error) {
    console.error("Error rejecting profile:", error);
    throw error;
  }
};

// Enhanced like system with real-time updates
export const toggleLike = async (
  profileId: string,
  userId: string
): Promise<boolean> => {
  if (USE_MOCK_DATA || !(await isFirebaseAvailable())) {
    return mockToggleLike(profileId, userId);
  }

  try {
    const batch = writeBatch(db);
    const likeId = `${profileId}_${userId}`;
    const likeRef = doc(db, LIKES_COLLECTION, likeId);
    const profileRef = doc(db, PROFILES_COLLECTION, profileId);

    const likeDoc = await getDoc(likeRef);

    if (likeDoc.exists()) {
      // Unlike - remove like and decrement count
      batch.delete(likeRef);
      batch.update(profileRef, { likes: increment(-1) });
      await batch.commit();
      return false;
    } else {
      // Like - add like and increment count
      batch.set(likeRef, {
        profileId,
        userId,
        createdAt: serverTimestamp(),
      });
      batch.update(profileRef, { likes: increment(1) });
      await batch.commit();
      return true;
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return mockToggleLike(profileId, userId);
  }
};

export const getUserLikes = async (userId: string): Promise<string[]> => {
  if (USE_MOCK_DATA || !(await isFirebaseAvailable())) {
    return mockGetUserLikes(userId);
  }

  try {
    const q = query(
      collection(db, LIKES_COLLECTION),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data().profileId);
  } catch (error) {
    console.error("Error fetching user likes:", error);
    return mockGetUserLikes(userId);
  }
};

export const getProfileLikes = async (profileId: string): Promise<number> => {
  try {
    const q = query(
      collection(db, LIKES_COLLECTION),
      where("profileId", "==", profileId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Error fetching profile likes:", error);
    return 0;
  }
};

// Check if profile already exists
export const checkProfileExists = async (
  username: string
): Promise<boolean> => {
  try {
    const q = query(
      collection(db, PROFILES_COLLECTION),
      where("githubData.username", "==", username)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking profile existence:", error);
    return false;
  }
};

// Submission management
export const getPendingSubmissions = async (): Promise<ProfileSubmission[]> => {
  if (USE_MOCK_DATA || !(await isFirebaseAvailable())) {
    return mockGetPendingSubmissions();
  }

  try {
    const q = query(
      collection(db, SUBMISSIONS_COLLECTION),
      where("status", "==", "pending"),
      orderBy("submittedAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as ProfileSubmission)
    );
  } catch (error) {
    console.error("Error fetching pending submissions:", error);
    return mockGetPendingSubmissions();
  }
};

export const approveSubmission = async (
  submissionId: string
): Promise<void> => {
  if (USE_MOCK_DATA || !(await isFirebaseAvailable())) {
    return mockApproveSubmission(submissionId);
  }

  try {
    const batch = writeBatch(db);

    // Get submission data
    const submissionRef = doc(db, SUBMISSIONS_COLLECTION, submissionId);
    const submissionDoc = await getDoc(submissionRef);

    if (!submissionDoc.exists()) {
      throw new Error("Submission not found");
    }

    const submissionData = submissionDoc.data() as ProfileSubmission;

    // Create approved profile
    const profileData: Omit<DevfolioProfile, "id"> = {
      githubData: submissionData.githubData,
      status: "approved",
      likes: 0,
      submittedAt: submissionData.submittedAt,
      approvedAt: new Date().toISOString(),
      featured: false,
      tags: submissionData.tags || [],
    };

    // Add to profiles collection
    const profileRef = doc(collection(db, PROFILES_COLLECTION));
    batch.set(profileRef, profileData);

    // Update submission status
    batch.update(submissionRef, {
      status: "approved",
      approvedAt: serverTimestamp(),
    });

    await batch.commit();
  } catch (error) {
    console.error("Error approving submission:", error);
    // Fallback to mock if Firebase fails
    return mockApproveSubmission(submissionId);
  }
};

export const rejectSubmission = async (
  submissionId: string,
  reason?: string
): Promise<void> => {
  if (USE_MOCK_DATA || !(await isFirebaseAvailable())) {
    return mockRejectSubmission(submissionId, reason);
  }

  try {
    const submissionRef = doc(db, SUBMISSIONS_COLLECTION, submissionId);
    await updateDoc(submissionRef, {
      status: "rejected",
      rejectedAt: serverTimestamp(),
      rejectionReason: reason,
    });
  } catch (error) {
    console.error("Error rejecting submission:", error);
    return mockRejectSubmission(submissionId, reason);
  }
};

// Get profile statistics
export const getProfileStats = async () => {
  try {
    const [approvedQuery, featuredQuery, totalLikesQuery] = await Promise.all([
      getDocs(
        query(
          collection(db, PROFILES_COLLECTION),
          where("status", "==", "approved")
        )
      ),
      getDocs(
        query(
          collection(db, PROFILES_COLLECTION),
          where("status", "==", "approved"),
          where("featured", "==", true)
        )
      ),
      getDocs(collection(db, LIKES_COLLECTION)),
    ]);

    return {
      totalProfiles: approvedQuery.size,
      featuredProfiles: featuredQuery.size,
      totalLikes: totalLikesQuery.size,
    };
  } catch (error) {
    console.error("Error fetching profile stats:", error);
    return {
      totalProfiles: 0,
      featuredProfiles: 0,
      totalLikes: 0,
    };
  }
};
