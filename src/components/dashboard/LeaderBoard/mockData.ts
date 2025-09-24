// Temporary mock data for testing the PR list modal functionality
export const mockContributors = [
  {
    username: "testuser1",
    avatar: "https://github.com/testuser1.png",
    profile: "https://github.com/testuser1",
    points: 50,
    prs: 5,
    prDetails: [
      {
        title: "Add new feature: user authentication system",
        url: "https://github.com/recodehive/repo1/pull/123",
        mergedAt: "2024-01-15T10:30:00Z",
        repoName: "auth-service",
        number: 123
      },
      {
        title: "Fix: resolve security vulnerability in login flow",
        url: "https://github.com/recodehive/repo1/pull/124",
        mergedAt: "2024-01-14T14:22:00Z",
        repoName: "auth-service",
        number: 124
      },
      {
        title: "Update documentation for API endpoints",
        url: "https://github.com/recodehive/repo2/pull/45",
        mergedAt: "2024-01-13T09:15:00Z",
        repoName: "api-docs",
        number: 45
      },
      {
        title: "Implement dark mode toggle component",
        url: "https://github.com/recodehive/repo3/pull/67",
        mergedAt: "2024-01-12T16:45:00Z",
        repoName: "ui-components",
        number: 67
      },
      {
        title: "Optimize database queries for better performance",
        url: "https://github.com/recodehive/repo1/pull/125",
        mergedAt: "2024-01-11T11:30:00Z",
        repoName: "backend-core",
        number: 125
      }
    ]
  },
  {
    username: "testuser2",
    avatar: "https://github.com/testuser2.png",
    profile: "https://github.com/testuser2",
    points: 30,
    prs: 3,
    prDetails: [
      {
        title: "Add responsive design to landing page",
        url: "https://github.com/recodehive/repo4/pull/89",
        mergedAt: "2024-01-10T13:20:00Z",
        repoName: "frontend-website",
        number: 89
      },
      {
        title: "Fix mobile navigation menu issue",
        url: "https://github.com/recodehive/repo4/pull/90",
        mergedAt: "2024-01-09T08:45:00Z",
        repoName: "frontend-website",
        number: 90
      },
      {
        title: "Add unit tests for utility functions",
        url: "https://github.com/recodehive/repo5/pull/12",
        mergedAt: "2024-01-08T15:30:00Z",
        repoName: "utils-library",
        number: 12
      }
    ]
  },
  {
    username: "testuser3",
    avatar: "https://github.com/testuser3.png",
    profile: "https://github.com/testuser3",
    points: 20,
    prs: 2,
    prDetails: [
      {
        title: "Update README with installation instructions",
        url: "https://github.com/recodehive/repo6/pull/23",
        mergedAt: "2024-01-07T12:15:00Z",
        repoName: "documentation",
        number: 23
      },
      {
        title: "Add error handling for API failures",
        url: "https://github.com/recodehive/repo7/pull/34",
        mergedAt: "2024-01-06T10:00:00Z",
        repoName: "error-handling",
        number: 34
      }
    ]
  }
];