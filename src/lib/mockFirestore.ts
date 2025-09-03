import type {
  DevfolioProfile,
  ProfileSubmission,
  GitHubProfile,
} from "../types/devfolio";

// Mock data storage using localStorage for testing
const STORAGE_KEYS = {
  PROFILES: "devfolio_profiles",
  SUBMISSIONS: "devfolio_submissions",
  LIKES: "devfolio_likes",
};

// Mock GitHub profiles for testing
const mockGitHubProfiles: GitHubProfile[] = [
  {
    id: "mock-1",
    username: "octocat",
    name: "The Octocat",
    bio: "GitHub mascot and developer advocate",
    avatar_url: "https://github.com/octocat.png",
    html_url: "https://github.com/octocat",
    public_repos: 42,
    followers: 1000,
    following: 100,
    location: "San Francisco",
    company: "GitHub",
    created_at: "2008-01-01T00:00:00Z",
  },
  {
    id: "mock-2",
    username: "torvalds",
    name: "Linus Torvalds",
    bio: "Creator of Linux and Git",
    avatar_url: "https://github.com/torvalds.png",
    html_url: "https://github.com/torvalds",
    public_repos: 6,
    followers: 170000,
    following: 0,
    location: "Portland, OR",
    company: "Linux Foundation",
    created_at: "2009-01-01T00:00:00Z",
  },
  {
    id: "mock-3",
    username: "gaearon",
    name: "Dan Abramov",
    bio: "React Core Team at Meta",
    avatar_url: "https://github.com/gaearon.png",
    html_url: "https://github.com/gaearon",
    public_repos: 118,
    followers: 95000,
    following: 171,
    location: "London, UK",
    company: "Meta",
    created_at: "2011-01-01T00:00:00Z",
  },
];

// Utility functions for localStorage operations
const getFromStorage = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
};

// Initialize mock data if not exists
const initializeMockData = (): void => {
  const existingSubmissions = getFromStorage<ProfileSubmission>(
    STORAGE_KEYS.SUBMISSIONS
  );

  if (existingSubmissions.length === 0) {
    const mockSubmissions: ProfileSubmission[] = mockGitHubProfiles.map(
      (githubData, index) => ({
        id: `submission-${index + 1}`,
        githubData,
        status: "pending",
        submittedAt: new Date(
          Date.now() - index * 24 * 60 * 60 * 1000
        ).toISOString(),
        message: `Test submission for ${githubData.name}`,
        tags:
          index === 0
            ? ["react", "typescript", "github"]
            : index === 1
            ? ["linux", "kernel", "c"]
            : ["react", "javascript", "redux"],
      })
    );

    saveToStorage(STORAGE_KEYS.SUBMISSIONS, mockSubmissions);
  }

  const existingProfiles = getFromStorage<DevfolioProfile>(
    STORAGE_KEYS.PROFILES
  );
  if (existingProfiles.length === 0) {
    // Start with empty profiles - they'll be created when submissions are approved
    saveToStorage(STORAGE_KEYS.PROFILES, []);
  }
};

// Mock Firestore functions
export const mockGetApprovedProfiles = async (): Promise<DevfolioProfile[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
  return getFromStorage<DevfolioProfile>(STORAGE_KEYS.PROFILES).filter(
    (profile) => profile.status === "approved"
  );
};

export const mockGetFeaturedProfiles = async (): Promise<DevfolioProfile[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return getFromStorage<DevfolioProfile>(STORAGE_KEYS.PROFILES).filter(
    (profile) => profile.status === "approved" && profile.featured
  );
};

export const mockGetPendingSubmissions = async (): Promise<
  ProfileSubmission[]
> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  initializeMockData();
  return getFromStorage<ProfileSubmission>(STORAGE_KEYS.SUBMISSIONS).filter(
    (submission) => submission.status === "pending"
  );
};

export const mockSubmitProfile = async (
  submission: Omit<ProfileSubmission, "id">
): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 200)); // Simulate network delay

  const submissions = getFromStorage<ProfileSubmission>(
    STORAGE_KEYS.SUBMISSIONS
  );

  // Check if profile already exists
  const existingSubmission = submissions.find(
    (s) =>
      s.githubData.username.toLowerCase() ===
      submission.githubData.username.toLowerCase()
  );

  if (existingSubmission) {
    throw new Error("Profile with this username already exists");
  }

  // Generate new submission ID
  const newId = `submission-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  const newSubmission: ProfileSubmission = {
    ...submission,
    id: newId,
    status: "pending",
    submittedAt: new Date().toISOString(),
  };

  // Add to submissions
  submissions.push(newSubmission);
  saveToStorage(STORAGE_KEYS.SUBMISSIONS, submissions);

  console.log("🎭 Mock: Profile submitted successfully with ID:", newId);
  return newId;
};

export const mockApproveSubmission = async (
  submissionId: string
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const submissions = getFromStorage<ProfileSubmission>(
    STORAGE_KEYS.SUBMISSIONS
  );
  const profiles = getFromStorage<DevfolioProfile>(STORAGE_KEYS.PROFILES);

  const submissionIndex = submissions.findIndex((s) => s.id === submissionId);

  if (submissionIndex === -1) {
    throw new Error("Submission not found");
  }

  const submission = submissions[submissionIndex];

  // Update submission status
  submissions[submissionIndex] = {
    ...submission,
    status: "approved",
  };

  // Create approved profile
  const newProfile: DevfolioProfile = {
    id: `profile-${Date.now()}`,
    githubData: submission.githubData,
    status: "approved",
    likes: 0,
    submittedAt: submission.submittedAt,
    approvedAt: new Date().toISOString(),
    featured: false,
    tags: submission.tags || [],
  };

  profiles.push(newProfile);

  saveToStorage(STORAGE_KEYS.SUBMISSIONS, submissions);
  saveToStorage(STORAGE_KEYS.PROFILES, profiles);
};

export const mockRejectSubmission = async (
  submissionId: string,
  reason?: string
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const submissions = getFromStorage<ProfileSubmission>(
    STORAGE_KEYS.SUBMISSIONS
  );
  const submissionIndex = submissions.findIndex((s) => s.id === submissionId);

  if (submissionIndex === -1) {
    throw new Error("Submission not found");
  }

  // Update submission status
  submissions[submissionIndex] = {
    ...submissions[submissionIndex],
    status: "rejected",
  };

  saveToStorage(STORAGE_KEYS.SUBMISSIONS, submissions);
};

export const mockToggleLike = async (
  profileId: string,
  userId: string
): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const likes = getFromStorage<{ profileId: string; userId: string }>(
    STORAGE_KEYS.LIKES
  );
  const profiles = getFromStorage<DevfolioProfile>(STORAGE_KEYS.PROFILES);

  const existingLike = likes.find(
    (like) => like.profileId === profileId && like.userId === userId
  );

  if (existingLike) {
    // Remove like
    const updatedLikes = likes.filter(
      (like) => !(like.profileId === profileId && like.userId === userId)
    );
    saveToStorage(STORAGE_KEYS.LIKES, updatedLikes);

    // Update profile likes count
    const profileIndex = profiles.findIndex((p) => p.id === profileId);
    if (profileIndex !== -1) {
      profiles[profileIndex].likes = Math.max(
        0,
        profiles[profileIndex].likes - 1
      );
      saveToStorage(STORAGE_KEYS.PROFILES, profiles);
    }

    return false;
  } else {
    // Add like
    likes.push({ profileId, userId });
    saveToStorage(STORAGE_KEYS.LIKES, likes);

    // Update profile likes count
    const profileIndex = profiles.findIndex((p) => p.id === profileId);
    if (profileIndex !== -1) {
      profiles[profileIndex].likes += 1;
      saveToStorage(STORAGE_KEYS.PROFILES, profiles);
    }

    return true;
  }
};

export const mockGetUserLikes = async (userId: string): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50));

  const likes = getFromStorage<{ profileId: string; userId: string }>(
    STORAGE_KEYS.LIKES
  );
  return likes
    .filter((like) => like.userId === userId)
    .map((like) => like.profileId);
};

// Initialize mock data on module load
if (typeof window !== "undefined") {
  initializeMockData();
}
