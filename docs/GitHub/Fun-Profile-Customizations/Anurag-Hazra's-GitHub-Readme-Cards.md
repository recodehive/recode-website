# Anurag Hazra's GitHub Readme Cards

This is the foundational tool for dynamic profile statistics. It uses a serverless function to generate SVGs (Scalable Vector Graphics) displaying **real-time data** pulled directly from your GitHub profile. These cards are the quickest and most popular way to upgrade your Readme.

| Feature | Description |
| :--- | :--- |
| **Stats Card** | Shows core metrics: total stars, commits (in the last year), pull requests, and contribution count. |
| **Language Card** | Displays your usage breakdown of **top languages** across your repositories (excluding forks). |

### Setup Example (Stats & Language Cards)

To use these cards, you simply embed them as images in your `README.md`. **Replace `YOUR_USERNAME` with your actual GitHub username.** The code below uses the popular `buefy` theme.

```markdown
## My GitHub Stats

[![GitHub Stats](https://github-readme-stats.vercel.app/api?username=YOUR_USERNAME&show_icons=true&theme=buefy&hide_rank=true)](https://github.com/anuraghazra/github-readme-stats)

## Top Languages

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=YOUR_USERNAME&layout=compact&theme=buefy&exclude_repo=recode-hive-docs,test-repo)](https://github.com/anuraghazra/github-readme-stats)

### Customization: Themes and Layouts

You can drastically change the appearance and content of your cards by adding parameters to the URL string (e.g., `&param=value`).

#### 🎨 Popular Themes (`&theme`)

The &theme= parameter allows you to apply a full color scheme. Try one of these popular options by adding it to the API URL:

- dark: Standard dark mode, high contrast.
- buefy: Bright blue and purple scheme (used in the example above).
- synthwave: Retro 80s neon look.
- onedark: A popular editor theme, often used by developers.
- solarized_light: A classic light theme option.


#### 📐 Layout Options (`&layout`)

This parameter is most commonly used for the Top Languages card to optimize space:

- default: (Used on the Stats Card) A larger vertical layout with distinct borders.
- compact: (Recommended for Language Card) Displays language bars horizontally, resulting in a much shorter, more compact card.

#### Other Key Parameters

| Parameter | Example Value | Description |
| :--- | :--- | :--- |
| `&show_icons=` | `show_icons=true` | Displays icons next to each stat label (highly recommended). |
| `&hide=` | `hide=issues,prs` | Hides specific statistics, like issues or pull requests, if you prefer a cleaner look. |
| `&title_color=` | `title_color=007bff` | Sets a custom hexadecimal color for the card title. |
| `&exclude_repo=` | `exclude_repo=test-repo,docs` | Hides specific repositories from the language calculations.|

⚠️ **Important Note on Language Calculations:** The Top Languages card calculates language usage from all public repos you own. To ensure the card accurately reflects your coding focus (and not just boilerplate files), it is strongly recommended to use the &exclude_repo= parameter to ignore repositories containing auto-generated documentation or simple configuration.

🔗 Relevant Repo: ![Anurag Hazra's GitHub Readme Stats](https://github.com/anuraghazra/github-readme-stats)