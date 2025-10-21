# Snake Contribution Animation 🐍

The Snake Contribution Animation is a visually unique and engaging way to represent your yearly activity. This feature adds a looping GIF or SVG of a "snake" chasing and consuming your contribution blocks, creating a dynamic element on your profile.

### How the Snake Animation Works

Unlike the static stat cards, the snake animation is a generated file (usually an SVG or GIF). This file must be **generated and committed** back to your profile repository regularly to stay up-to-date with your latest activity. This entire process is fully automated using a **GitHub Action** that runs on a schedule (e.g., once a day).

### Setup Steps (High-Level):

The easiest and most common method for setup is by utilizing the powerful `lowlighter/metrics` action, which includes a dedicated snake plugin to handle the generation and commit process for you.

1.  **Repository Structure:** Ensure your profile repository (the one named after your username) is ready. You may want to create a folder (e.g., `assets/` or `output/`) in your repository to store the generated animation file.
2.  **Workflow File:** Create a YAML file in the `.github/workflows/` directory (e.g., `snake.yml`). This file contains the instructions for the action.
3.  **Action Configuration:** Configure the workflow to use the `lowlighter/metrics` action with the `plugins.activity.snake` parameter enabled. You must grant the action write permissions so it can commit the new image file back to your repository.

### Final Embedding Example

Once your GitHub Action is running and successfully generating the output file (often named `github-snake.svg`), you can embed the image path in your Readme using the direct URL to the file in your repository:

```markdown
## My GitHub Activity

![Snake Animation](https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_USERNAME/output/github-snake.svg)

```
name: Generate Snake Animation

on:
  schedule:
    # Runs at 1 AM UTC every day
    - cron: "0 1 * * *"
  workflow_dispatch:
    # Allows manual trigger via the GitHub Actions tab

jobs:
  generate:
    runs-on: ubuntu-latest
    permissions:
      contents: write # Required to commit the generated file back to the repo

    steps:
      - uses: actions/checkout@v4
      - uses: lowlighter/metrics@latest # Use the metrics action

        with:
          # Your GitHub token (required for stats gathering and file commit)
          token: ${{ secrets.GITHUB_TOKEN }} 
          
          # The file name and path where the output will be saved
          output_fmt: svg
          output_name: output/github-snake.svg 
          
          # Base configuration
          user: ${{ github.repository_owner }} # Automatically detects your username
          template: snake
          base: "" # Base is disabled to focus only on the snake plugin
          
          # Plugin configuration for the snake
          plugin_activity_limit: 5 # Limit the amount of activity data used
          plugin_activity_days: 365 # Include the last 365 days of activity
          plugin_activity_timestamps: false
          plugin_activity_details: false 
          
          # Snake-specific settings
          plugin_isocalendar: yes
          plugin_isocalendar_duration: full-year
          plugin_traffic: yes
```