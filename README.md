<div align="center">
  <a href="https://www.recodehive.com">
  <img src=".github/assets/banner.jpg" alt="recode hive: Learn. Collaborate. Build. Earn. Grow." width="100%" />
  </a>
</div>

<br>

<div align="center">

[![Stars Badge](https://img.shields.io/github/stars/recodehive/recode-website)](https://github.com/recodehive/recode-website/stargazers)
[![Forks Badge](https://img.shields.io/github/forks/recodehive/recode-website)](https://github.com/recodehive/recode-website/network/members)
[![Pull Requests Badge](https://img.shields.io/github/issues-pr-closed/recodehive/recode-website?label=pull%20requests%20closed&color=2b9348)](https://github.com/recodehive/recode-website/pulls?q=is%3Apr+is%3Aclosed)
[![Issues Badge](https://img.shields.io/github/issues/recodehive/recode-website)](https://github.com/recodehive/recode-website/issues)
[![Contributors](https://img.shields.io/github/contributors/recodehive/recode-website?color=2b9348)](https://github.com/recodehive/recode-website/graphs/contributors)
![GitHub commit activity (monthly)](https://img.shields.io/github/commit-activity/m/RecodeHive/recode-website)


<h2 align="center">Collaboration 1st , code 2nd.</h2>

recode hive is an open-source project where developers learn by collaborating, get paid for technical writing, and gain access to real-world projects and sponsorship opportunities.

[Website](https://recodehive.com/) • [Documentation](https://recodehive.com/docs) • [Contributing](community/contributing-guidelines.md) • [Discord](https://discord.gg/Yxv9RA3r)

</div>

---


> [!IMPORTANT]
> Get the recode hive source from [recodehive/recode-website](https://github.com/recodehive/recode-website) or the live site at [recodehive.com](https://www.recodehive.com).<br>
> A similar repository name or copied README does not establish that a download is official.

> Prerequisites

> [Node.js](https://nodejs.org/) 20.9 – 22 (see `.nvmrc`)<br>
> [Docker](https://docs.docker.com/engine/install/) (optional, for containerized development)
> Docker Compose (optional)


### Contribution Workflow

We welcome contributions from developers of all skill levels! Here's how you can get started:

```mermaid
flowchart LR
    Fork[Fork the project]-->branch[Create a New Branch]
    branch-->Edit[Edit file]
    Edit-->commit[Commit the changes]
    commit -->|Finally|creatpr((Create a Pull Request))
```

### Step-by-Step Guide

**Fork and clone the repository**, then get it running by following [Installation](#installation).

**Create a new branch:**

```bash
git checkout -b feature/your-feature-name
```

**Make your changes** and test thoroughly.

**Commit your changes:**

```bash
git commit -m "Add: brief description of your changes"
```

**Push to your fork:**

```bash
git push origin feature/your-feature-name
```

**Submit a Pull Request** with a detailed description of your changes

**Fork the repository** on GitHub, then clone your fork:

```bash
git clone https://github.com/<your-username>/recode-website.git
cd recode-website
```

**Set up environment variables** (optional, avoids GitHub API rate limits and enables live data):

```bash
cp .env.example .env
# then add your GITHUB_TOKEN and DOCUSAURUS_GIT_TOKEN
```

**Using Docker (Recommended):**

```bash
# Build the image (first time only)
docker build -t recodehive-app .

# Run the container
docker run -p 3000:3000 recodehive-app
```

**Using Docker Compose (with hot-reload):**

```bash
docker-compose up
```

Your application will be available at "http://localhost:3000"

**Traditional Setup:**

```bash
npm install
npm run start
```

### Production Build

> [!NOTE]
> The build first fetches releases, sponsors and community PRs from GitHub, so it needs network access. Set the tokens from `.env` to avoid rate limits.

```bash
npm run build
npm run serve
```


> [!NOTE]
> Tech Stack
>- **Framework:** Docusaurus 3 (React + TypeScript)
>- **Language:** TypeScript (Node.js ≥ 18)
>- **Styling:** Tailwind CSS 4
>- **UI Components:** Radix UI, Framer Motion

> [!WARNING]
>- **Linting & Formatting:** ESLint, Prettier
>- **Type Checking:** TypeScript (`tsc`)

## 📁 Project Structure

| | Folder | What lives here |
| :-: | :-- | :-- |
| ⚙️ | [`.github/`](.github) | Issue & PR templates, workflows, README assets |
| ✍️ | [`blog/`](blog) | Blog posts |
| 🤝 | [`community/`](community) | Contributing guidelines and community docs |
| 📚 | [`docs/`](docs) | Main documentation (GitHub, Google Student Ambassador, …) |
| 🎓 | [`learn/`](learn) | Learning content |
| 🔌 | [`plugins/`](plugins) | Custom Docusaurus plugins |
| 🧰 | [`scripts/`](scripts) | Maintenance and build scripts |
| 🧩 | [`src/`](src) | Source code: components, pages, theme, styles, utils |
| 🗄️ | [`supabase/`](supabase) | Supabase configuration |
| 🖼️ | [`static/`](static) | Static assets: icons, images |
| 📖 | [`wiki/`](wiki) | Project wiki |

<details>
<summary><b>🔍 Expand the <code>src/</code> folder</b></summary>

| Folder | Purpose |
| :-- | :-- |
| `components/` | React components |
| `css/`, `styles/` | Global and custom styles |
| `data/`, `database/` | Static data and database helpers |
| `pages/` | Site pages |
| `plugins/`, `theme/` | Docusaurus plugins and theme overrides |
| `services/`, `lib/`, `utils/` | Services, shared libraries and helpers |

</details>


### Video Tutorial

<div align="center">

> [!TIP]
> New here? Watch this walkthrough of how to set up the project and make your first contribution.

<a href="https://www.loom.com/share/c8d8d5f0c2534a1f86fc510dcef52ee0">
  <img src="https://cdn.loom.com/sessions/thumbnails/c8d8d5f0c2534a1f86fc510dcef52ee0-30cac2eeec09a266-full-play.gif" width="700" alt="How to contribute to recode hive and set up the project: video walkthrough">
</a>

<br><br>

[![Watch the video](https://img.shields.io/badge/▶_Watch_the_Video-625DF5?style=for-the-badge&logo=loom&logoColor=white)](https://www.loom.com/share/c8d8d5f0c2534a1f86fc510dcef52ee0)
[![First-time setup](https://img.shields.io/badge/📘_First--time_Setup-2e8555?style=for-the-badge)](https://www.recodehive.com/docs/first-time-setup)
[![Contributing Guidelines](https://img.shields.io/badge/🤝_Contributing_Guidelines-0A66C2?style=for-the-badge)](community/contributing-guidelines.md)

</div>

## 📚 Documentation

- [Contributing Guidelines](community/contributing-guidelines.md)
- [Code of Conduct](https://www.recodehive.com/code-of-conduct)
- [Understanding Lint Checks](community/understand-lint-checks.md)
- [Our Documentation Standards](community/our-documentation.md)

## 📊 Project Statistics

![GitHub commit activity (yearly)](https://img.shields.io/github/commit-activity/y/recodehive/recode-website)
![GitHub stars](https://img.shields.io/github/stars/RecodeHive/recode-website)
![GitHub forks](https://img.shields.io/github/forks/RecodeHive/recode-website)
![GitHub open issues](https://img.shields.io/github/issues/RecodeHive/recode-website)
![GitHub repo size](https://img.shields.io/github/repo-size/RecodeHive/recode-website)
![Last commit](https://img.shields.io/github/last-commit/RecodeHive/recode-website)
[![License Badge](https://img.shields.io/github/license/recodehive/recode-website?color=2b9348)](https://github.com/recodehive/recode-website/LICENSE)


![Alt](https://repobeats.axiom.co/api/embed/bf32a19d28f753f9ab7a2162495fdc0c6150ee0f.svg "Repobeats analytics image")

## 👥 Contributors

We appreciate all contributions to recode hive! Thank you to everyone who has helped make this project better.

<!-- contributors:start -->

<a href="https://github.com/sanjay-kv"><img src="https://avatars.githubusercontent.com/u/30715153?v=4&s=48" width="48" height="48" alt="sanjay-kv"></a> <a href="https://github.com/Adez017"><img src="https://avatars.githubusercontent.com/u/142787780?v=4&s=48" width="48" height="48" alt="Adez017"></a> <a href="https://github.com/steam-bell-92"><img src="https://avatars.githubusercontent.com/u/192874339?v=4&s=48" width="48" height="48" alt="steam-bell-92"></a> <a href="https://github.com/sheikhlimon"><img src="https://avatars.githubusercontent.com/u/76746201?v=4&s=48" width="48" height="48" alt="sheikhlimon"></a> <a href="https://github.com/Richajaishwal0"><img src="https://avatars.githubusercontent.com/u/156594333?v=4&s=48" width="48" height="48" alt="Richajaishwal0"></a> <a href="https://github.com/hrx01-dev"><img src="https://avatars.githubusercontent.com/u/234469520?v=4&s=48" width="48" height="48" alt="hrx01-dev"></a> <a href="https://github.com/kanishka-commits"><img src="https://avatars.githubusercontent.com/u/172115852?v=4&s=48" width="48" height="48" alt="kanishka-commits"></a> <a href="https://github.com/sohumvenkatadri7"><img src="https://avatars.githubusercontent.com/u/90464001?v=4&s=48" width="48" height="48" alt="sohumvenkatadri7"></a> <a href="https://github.com/Abhash-Chakraborty"><img src="https://avatars.githubusercontent.com/u/80592559?v=4&s=48" width="48" height="48" alt="Abhash-Chakraborty"></a> <a href="https://github.com/codewithdhruba01"><img src="https://avatars.githubusercontent.com/u/146111647?v=4&s=48" width="48" height="48" alt="codewithdhruba01"></a>
<a href="https://github.com/smirk-dev"><img src="https://avatars.githubusercontent.com/u/180032733?v=4&s=48" width="48" height="48" alt="smirk-dev"></a> <a href="https://github.com/singh-odyssey"><img src="https://avatars.githubusercontent.com/u/148507838?v=4&s=48" width="48" height="48" alt="singh-odyssey"></a> <a href="https://github.com/Shitanshukumar607"><img src="https://avatars.githubusercontent.com/u/147914822?v=4&s=48" width="48" height="48" alt="Shitanshukumar607"></a> <a href="https://github.com/Condition00"><img src="https://avatars.githubusercontent.com/u/172305133?v=4&s=48" width="48" height="48" alt="Condition00"></a> <a href="https://github.com/ShivanshPlays"><img src="https://avatars.githubusercontent.com/u/112249407?v=4&s=48" width="48" height="48" alt="ShivanshPlays"></a> <a href="https://github.com/vansh-codes"><img src="https://avatars.githubusercontent.com/u/114163734?v=4&s=48" width="48" height="48" alt="vansh-codes"></a> <a href="https://github.com/Samridha0305"><img src="https://avatars.githubusercontent.com/u/184013203?v=4&s=48" width="48" height="48" alt="Samridha0305"></a> <a href="https://github.com/yashksaini-coder"><img src="https://avatars.githubusercontent.com/u/115717039?v=4&s=48" width="48" height="48" alt="yashksaini-coder"></a> <a href="https://github.com/abhishekkalme"><img src="https://avatars.githubusercontent.com/u/206072260?v=4&s=48" width="48" height="48" alt="abhishekkalme"></a> <a href="https://github.com/aaniya22"><img src="https://avatars.githubusercontent.com/u/230661478?v=4&s=48" width="48" height="48" alt="aaniya22"></a>
<a href="https://github.com/dinesh-2047"><img src="https://avatars.githubusercontent.com/u/163452870?v=4&s=48" width="48" height="48" alt="dinesh-2047"></a> <a href="https://github.com/srushti-panara"><img src="https://avatars.githubusercontent.com/u/220186330?v=4&s=48" width="48" height="48" alt="srushti-panara"></a> <a href="https://github.com/Ayushgupta2408"><img src="https://avatars.githubusercontent.com/u/140377075?v=4&s=48" width="48" height="48" alt="Ayushgupta2408"></a> <a href="https://github.com/sachinggsingh"><img src="https://avatars.githubusercontent.com/u/152975718?v=4&s=48" width="48" height="48" alt="sachinggsingh"></a> <a href="https://github.com/Shayan-Bhowmik"><img src="https://avatars.githubusercontent.com/u/179100815?v=4&s=48" width="48" height="48" alt="Shayan-Bhowmik"></a> <a href="https://github.com/SamXop123"><img src="https://avatars.githubusercontent.com/u/169450602?v=4&s=48" width="48" height="48" alt="SamXop123"></a> <a href="https://github.com/Codeboy20"><img src="https://avatars.githubusercontent.com/u/138564007?v=4&s=48" width="48" height="48" alt="Codeboy20"></a> <a href="https://github.com/gmarav05"><img src="https://avatars.githubusercontent.com/u/205315110?v=4&s=48" width="48" height="48" alt="gmarav05"></a> <a href="https://github.com/NssGourav"><img src="https://avatars.githubusercontent.com/u/183859026?v=4&s=48" width="48" height="48" alt="NssGourav"></a> <a href="https://github.com/meetoza30"><img src="https://avatars.githubusercontent.com/u/171713001?v=4&s=48" width="48" height="48" alt="meetoza30"></a>
<a href="https://github.com/Gupta-02"><img src="https://avatars.githubusercontent.com/u/182321898?v=4&s=48" width="48" height="48" alt="Gupta-02"></a> <a href="https://github.com/mdazfar2"><img src="https://avatars.githubusercontent.com/u/100375390?v=4&s=48" width="48" height="48" alt="mdazfar2"></a> <a href="https://github.com/tsvlgd"><img src="https://avatars.githubusercontent.com/u/162735469?v=4&s=48" width="48" height="48" alt="tsvlgd"></a> <a href="https://github.com/Bushra-gh"><img src="https://avatars.githubusercontent.com/u/181255225?v=4&s=48" width="48" height="48" alt="Bushra-gh"></a> <a href="https://github.com/Astha-coder-web"><img src="https://avatars.githubusercontent.com/u/192999644?v=4&s=48" width="48" height="48" alt="Astha-coder-web"></a> <a href="https://github.com/iitzIrFan"><img src="https://avatars.githubusercontent.com/u/138690953?v=4&s=48" width="48" height="48" alt="iitzIrFan"></a> <a href="https://github.com/diya-india"><img src="https://avatars.githubusercontent.com/u/179146864?v=4&s=48" width="48" height="48" alt="diya-india"></a> <a href="https://github.com/anjany06"><img src="https://avatars.githubusercontent.com/u/158723491?v=4&s=48" width="48" height="48" alt="anjany06"></a> <a href="https://github.com/prinshu756"><img src="https://avatars.githubusercontent.com/u/194589426?v=4&s=48" width="48" height="48" alt="prinshu756"></a> <a href="https://github.com/saurabhhhcodes"><img src="https://avatars.githubusercontent.com/u/157192462?v=4&s=48" width="48" height="48" alt="saurabhhhcodes"></a>
<a href="https://github.com/santhosh-005"><img src="https://avatars.githubusercontent.com/u/138782397?v=4&s=48" width="48" height="48" alt="santhosh-005"></a> <a href="https://github.com/Papia-tech"><img src="https://avatars.githubusercontent.com/u/186332684?v=4&s=48" width="48" height="48" alt="Papia-tech"></a> <a href="https://github.com/nancy-verma780"><img src="https://avatars.githubusercontent.com/u/217958980?v=4&s=48" width="48" height="48" alt="nancy-verma780"></a> <a href="https://github.com/MiniduOshan"><img src="https://avatars.githubusercontent.com/u/126508461?v=4&s=48" width="48" height="48" alt="MiniduOshan"></a> <a href="https://github.com/medss19"><img src="https://avatars.githubusercontent.com/u/90996890?v=4&s=48" width="48" height="48" alt="medss19"></a> <a href="https://github.com/Abhi0049k"><img src="https://avatars.githubusercontent.com/u/112062354?v=4&s=48" width="48" height="48" alt="Abhi0049k"></a> <a href="https://github.com/mukeshdhadhariya"><img src="https://avatars.githubusercontent.com/u/163722787?v=4&s=48" width="48" height="48" alt="mukeshdhadhariya"></a> <a href="https://github.com/Ronaldo-001"><img src="https://avatars.githubusercontent.com/u/149929782?v=4&s=48" width="48" height="48" alt="Ronaldo-001"></a> <a href="https://github.com/101xVishal"><img src="https://avatars.githubusercontent.com/u/198640511?v=4&s=48" width="48" height="48" alt="101xVishal"></a> <a href="https://github.com/Tannuu18"><img src="https://avatars.githubusercontent.com/u/180815561?v=4&s=48" width="48" height="48" alt="Tannuu18"></a>
<a href="https://github.com/harish599"><img src="https://avatars.githubusercontent.com/u/192065040?v=4&s=48" width="48" height="48" alt="harish599"></a> <a href="https://github.com/buzztouniverse"><img src="https://avatars.githubusercontent.com/u/328399412?v=4&s=48" width="48" height="48" alt="buzztouniverse"></a> <a href="https://github.com/Vijayaa21"><img src="https://avatars.githubusercontent.com/u/134155725?v=4&s=48" width="48" height="48" alt="Vijayaa21"></a> <a href="https://github.com/Shivamagrawal20"><img src="https://avatars.githubusercontent.com/u/155519424?v=4&s=48" width="48" height="48" alt="Shivamagrawal20"></a> <a href="https://github.com/AyushKatre05"><img src="https://avatars.githubusercontent.com/u/151609866?v=4&s=48" width="48" height="48" alt="AyushKatre05"></a> <a href="https://github.com/diksha78dev"><img src="https://avatars.githubusercontent.com/u/184750994?v=4&s=48" width="48" height="48" alt="diksha78dev"></a> <a href="https://github.com/Khushalsarode"><img src="https://avatars.githubusercontent.com/u/105520366?v=4&s=48" width="48" height="48" alt="Khushalsarode"></a> <a href="https://github.com/CopperFlame14"><img src="https://avatars.githubusercontent.com/u/178065271?v=4&s=48" width="48" height="48" alt="CopperFlame14"></a> <a href="https://github.com/ManikaAgarwal02"><img src="https://avatars.githubusercontent.com/u/225312523?v=4&s=48" width="48" height="48" alt="ManikaAgarwal02"></a> <a href="https://github.com/KAYO-ult"><img src="https://avatars.githubusercontent.com/u/65500692?v=4&s=48" width="48" height="48" alt="KAYO-ult"></a>
<a href="https://github.com/Sricharan106"><img src="https://avatars.githubusercontent.com/u/174267706?v=4&s=48" width="48" height="48" alt="Sricharan106"></a> <a href="https://github.com/rutujdhawale"><img src="https://avatars.githubusercontent.com/u/148652804?v=4&s=48" width="48" height="48" alt="rutujdhawale"></a> <a href="https://github.com/areebniyas"><img src="https://avatars.githubusercontent.com/u/78898148?v=4&s=48" width="48" height="48" alt="areebniyas"></a> <a href="https://github.com/VinothanaBalakrishnan05"><img src="https://avatars.githubusercontent.com/u/183259073?v=4&s=48" width="48" height="48" alt="VinothanaBalakrishnan05"></a> <a href="https://github.com/utkarshpathak14"><img src="https://avatars.githubusercontent.com/u/148760143?v=4&s=48" width="48" height="48" alt="utkarshpathak14"></a> <a href="https://github.com/SoumyaEXE"><img src="https://avatars.githubusercontent.com/u/95275364?v=4&s=48" width="48" height="48" alt="SoumyaEXE"></a> <a href="https://github.com/ItsAbhinavM"><img src="https://avatars.githubusercontent.com/u/141326344?v=4&s=48" width="48" height="48" alt="ItsAbhinavM"></a> <a href="https://github.com/mrdeyroy"><img src="https://avatars.githubusercontent.com/u/169705535?v=4&s=48" width="48" height="48" alt="mrdeyroy"></a> <a href="https://github.com/nishtha-agarwal-211"><img src="https://avatars.githubusercontent.com/u/242000265?v=4&s=48" width="48" height="48" alt="nishtha-agarwal-211"></a> <a href="https://github.com/prkr-28"><img src="https://avatars.githubusercontent.com/u/148961152?v=4&s=48" width="48" height="48" alt="prkr-28"></a>
<a href="https://github.com/iaadillatif"><img src="https://avatars.githubusercontent.com/u/145087959?v=4&s=48" width="48" height="48" alt="iaadillatif"></a> <a href="https://github.com/vaemaski"><img src="https://avatars.githubusercontent.com/u/143320411?v=4&s=48" width="48" height="48" alt="vaemaski"></a> <a href="https://github.com/vishalm342"><img src="https://avatars.githubusercontent.com/u/179121802?v=4&s=48" width="48" height="48" alt="vishalm342"></a> <a href="https://github.com/Yash456k"><img src="https://avatars.githubusercontent.com/u/63530295?v=4&s=48" width="48" height="48" alt="Yash456k"></a> <a href="https://github.com/AK1007-2007"><img src="https://avatars.githubusercontent.com/u/149460642?v=4&s=48" width="48" height="48" alt="AK1007-2007"></a> <a href="https://github.com/adiprem73"><img src="https://avatars.githubusercontent.com/u/149347127?v=4&s=48" width="48" height="48" alt="adiprem73"></a> <a href="https://github.com/anujos"><img src="https://avatars.githubusercontent.com/u/56553091?v=4&s=48" width="48" height="48" alt="anujos"></a> <a href="https://github.com/akofficial10"><img src="https://avatars.githubusercontent.com/u/178557367?v=4&s=48" width="48" height="48" alt="akofficial10"></a> <a href="https://github.com/bh462007"><img src="https://avatars.githubusercontent.com/u/173093839?v=4&s=48" width="48" height="48" alt="bh462007"></a> <a href="https://github.com/Julliet-Mohanta"><img src="https://avatars.githubusercontent.com/u/228280628?v=4&s=48" width="48" height="48" alt="Julliet-Mohanta"></a>
<a href="https://github.com/khushi-joshi-05"><img src="https://avatars.githubusercontent.com/u/146544714?v=4&s=48" width="48" height="48" alt="khushi-joshi-05"></a> <a href="https://github.com/mitalikapil"><img src="https://avatars.githubusercontent.com/u/115822766?v=4&s=48" width="48" height="48" alt="mitalikapil"></a> <a href="https://github.com/developer-mohitsoni"><img src="https://avatars.githubusercontent.com/u/120788753?v=4&s=48" width="48" height="48" alt="developer-mohitsoni"></a> <a href="https://github.com/divysaxena24"><img src="https://avatars.githubusercontent.com/u/175482863?v=4&s=48" width="48" height="48" alt="divysaxena24"></a> <a href="https://github.com/nikunj-kohli"><img src="https://avatars.githubusercontent.com/u/180377755?v=4&s=48" width="48" height="48" alt="nikunj-kohli"></a> <a href="https://github.com/OmanshiRaj"><img src="https://avatars.githubusercontent.com/u/218279823?v=4&s=48" width="48" height="48" alt="OmanshiRaj"></a> <a href="https://github.com/pericharlabindhumadhavi-data"><img src="https://avatars.githubusercontent.com/u/247799904?v=4&s=48" width="48" height="48" alt="pericharlabindhumadhavi-data"></a> <a href="https://github.com/PIYUSH-NEXTGEN"><img src="https://avatars.githubusercontent.com/u/219785617?v=4&s=48" width="48" height="48" alt="PIYUSH-NEXTGEN"></a> <a href="https://github.com/PranshuPujara"><img src="https://avatars.githubusercontent.com/u/219736209?v=4&s=48" width="48" height="48" alt="PranshuPujara"></a> <a href="https://github.com/RAJVEER42"><img src="https://avatars.githubusercontent.com/u/180613669?v=4&s=48" width="48" height="48" alt="RAJVEER42"></a>
<a href="https://github.com/ruchspatil"><img src="https://avatars.githubusercontent.com/u/71245429?v=4&s=48" width="48" height="48" alt="ruchspatil"></a> <a href="https://github.com/SOMNATH0904"><img src="https://avatars.githubusercontent.com/u/130086832?v=4&s=48" width="48" height="48" alt="SOMNATH0904"></a>

<!-- contributors:end -->


## 📬 Stay Connected

Stay up to date with the latest from recode hive:

<p align="center">
  <a href="https://recodehive.com/"><img src=".github/assets/social/website.svg" width="56" height="56" alt="Website" title="Website"></a>
  <a href="https://www.instagram.com/nomadbrains.dev/"><img src=".github/assets/social/instagram.svg" width="56" height="56" alt="Instagram" title="Instagram"></a>
  <a href="https://www.linkedin.com/in/sanjay-k-v/"><img src=".github/assets/social/linkedin.svg" width="56" height="56" alt="LinkedIn" title="LinkedIn"></a>
  <a href="https://x.com/nomadbrainsdev"><img src=".github/assets/social/twitter.svg" width="56" height="56" alt="Twitter" title="Twitter"></a>
  <a href="https://www.youtube.com/@RecodeHive"><img src=".github/assets/social/youtube.svg" width="56" height="56" alt="YouTube" title="YouTube"></a>
  <a href="https://recodehive.substack.com/"><img src=".github/assets/social/newsletter.svg" width="56" height="56" alt="Newsletter" title="Newsletter"></a>
</p>

---

<div align="center">

**Happy open-source contributions, collaboration 1st and code 2nd! 🎉** <br>
Made with ❤️ by the recode hive community


<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="600">
</p>


<a href="#top">
  <img src="https://img.shields.io/badge/⬆️-Back%20to%20Top-red?style=for-the-badge" alt="Back to Top"/>
</a>

</div>