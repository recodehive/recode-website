# FloatingContributors Component

The `FloatingContributors` component is a dynamic React component that displays live GitHub activity and a list of contributors for the `recodehive/recode-website` repository. It fetches data from GitHub APIs, processes it, and renders it in an interactive and animated UI.

---

## Features

### 1. **Live GitHub Activity**
- Displays recent events such as pushes, pull requests, comments, and more.
- Cycles through activities every 4 seconds.

### 2. **Contributors Grid**
- Shows the top contributors with their avatars, GitHub profiles, and contribution counts.
- Displays tooltips with additional contributor details.

### 3. **Animations**
- Smooth animations for floating effects, hover interactions, and transitions using `framer-motion`.

### 4. **Fallback Mechanism**
- Uses hardcoded fallback data when GitHub API calls fail.

### 5. **Caching**
- Caches API responses in `localStorage` for 2 minutes to reduce API calls.

---

## API Integration

### GitHub Events API
- **Endpoint**: `https://api.github.com/repos/recodehive/recode-website/events?per_page=30`
- **Purpose**: Fetches live activity data (e.g., pushes, pull requests, comments).

### GitHub Contributors API
- **Endpoint**: `https://api.github.com/repos/recodehive/recode-website/contributors?per_page=100`
- **Purpose**: Fetches contributor data (e.g., avatars, contribution counts).

---

## Key Functions

### `formatTimeAgo`
- Formats timestamps into relative time strings (e.g., "2 hours ago").

### `getGitHubEventUrl`
- Generates URLs for GitHub events based on the action type.

### `getActionIcon` and `getActionText`
- Maps action types to icons and descriptive text.

---

## Potential Enhancements

### API Integration
- Add support for more event types (e.g., `IssuesEvent` for issue creation).
- Use authentication tokens to increase API rate limits.

### UI/UX Features
- Add user controls to pause or skip activities.
- Allow users to view all contributors in a modal or separate page.

### Styling
- Convert CSS to a CSS-in-JS solution (e.g., styled-components).
- Add theme support for light and dark modes.

### Error Handling
- Display error messages in the UI.
- Retry failed API calls with exponential backoff.

---

## Usage

1. Import the component:
   ```tsx
   import FloatingContributors from './FloatingContributors';
   ```

2. Use it in your application:
   ```tsx
   <FloatingContributors headerEmbedded={false} />
   ```

---

## Dependencies
- `react`
- `framer-motion`

---

## Notes
- The component auto-refreshes data every 60 seconds.
- It uses `localStorage` for caching API responses.

---