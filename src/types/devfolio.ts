export interface GitHubProfile {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  company?: string;
  location?: string;
  blog?: string;
  twitter_username?: string;
  created_at: string;
}

export interface DevfolioProfile {
  id: string;
  githubData: GitHubProfile;
  status: "pending" | "approved" | "rejected";
  likes: number;
  submittedAt: string;
  approvedAt?: string;
  submittedBy?: string;
  adminNotes?: string;
  featured?: boolean;
  tags?: string[];
}

export interface ProfileSubmission {
  id?: string;
  githubData: GitHubProfile;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  submittedBy?: string;
  message?: string;
  tags?: string[];
}

export interface AdminUser {
  uid: string;
  email: string;
  role: "admin" | "moderator";
  displayName?: string;
}
