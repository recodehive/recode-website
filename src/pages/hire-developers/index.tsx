import { useMemo, useState, type ReactNode } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import {
  ArrowUpRight,
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  ChevronDown,
  ChevronRight,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import styles from "./styles.module.css";
import { sortedUsers, type User } from "@site/src/data/users";

const HIRE_URL = "/contact-us";
const filters = ["All work", "Web", "Data & AI", "Open source"] as const;
type Filter = (typeof filters)[number];

const filterTags: Record<Exclude<Filter, "All work">, string[]> = {
  Web: [
    "html",
    "css",
    "javascript",
    "react",
    "nextjs",
    "typescript",
    "tailwind",
    "design",
  ],
  "Data & AI": ["ai", "ml"],
  "Open source": ["opensource"],
};

const talentExamples = [
  { name: "Aditya Singh Rathore", initials: "AR", role: "Data Engineer at CloudThat", skills: ["Python", "PySpark", "Azure"], image: "https://avatars.githubusercontent.com/u/142787780?v=4", profileUrl: "/blog/authors/Aditya-Singh-Rathore", githubUrl: "https://github.com/Adez017" },
  { name: "Sanjay K V", initials: "SK", role: "Founder at recode hive", skills: ["Data Engineering", "ML", "Open Source"], image: "https://avatars.githubusercontent.com/u/30715153?v=4", profileUrl: "/blog/authors/sanjay-kv", githubUrl: "https://github.com/sanjay-kv" },
];

const faqs = [
  ["Who are recode hive developers?", "Members of the recode hive open-source community who have contributed to community projects and chosen to be listed for paid work."],
  ["How are developers reviewed?", "Profiles link to public projects, articles, and contributions so you can review real work before starting a conversation."],
  ["Can I hire for a short project?", "Yes. Share your scope and timeline with us and we will help find a suitable match for a short engagement or a longer build."],
  ["How do I get listed as a developer?", "Join the talent list with your GitHub, skills, and shipped projects. Profiles are reviewed before they go live."],
];

function previewSrc(user: User): string | undefined {
  const preview = user.preview as unknown as
    { default?: string; src?: string } | string | undefined;
  if (!preview) return undefined;
  if (typeof preview === "string") return preview;
  return preview.default ?? preview.src;
}

function matchesFilter(user: User, filter: Filter): boolean {
  if (filter === "All work") return true;
  return user.tags.some((tag) => filterTags[filter].includes(tag));
}

function WorkCard({ user }: { user: User }): ReactNode {
  const image = previewSrc(user);
  return (
    <article className={styles.workCard}>
      {image ? (
        <img
          className={styles.workImage}
          src={image}
          alt={`Preview of ${user.title}`}
          loading="lazy"
        />
      ) : (
        <div className={styles.workImageFallback} aria-hidden="true" />
      )}
      <div className={styles.workBody}>
        <div className={styles.workMeta}>
          <span>{user.stack ?? "Web development"}</span>
          <span>Open work</span>
        </div>
        <h3>{user.title}</h3>
        <p>{user.description}</p>
        <div className={styles.workLinks}>
          {user.website && (
            <a href={user.website} target="_blank" rel="noopener noreferrer">
              View work <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
          {user.source && (
            <a
              className={styles.mutedLink}
              href={user.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function HireDevelopers(): ReactNode {
  const [filter, setFilter] = useState<Filter>("All work");
  const [query, setQuery] = useState("");
  const work = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return (sortedUsers as User[]).filter((user) => {
      const searchable =
        `${user.title} ${user.description} ${user.stack ?? ""} ${user.tags.join(" ")}`.toLowerCase();
      return (
        matchesFilter(user, filter) &&
        (!normalizedQuery || searchable.includes(normalizedQuery))
      );
    });
  }, [filter, query]);

  return (
    <Layout
      title="Hire developers"
      description="Hire developers from the recode hive community whose public work you can review before you start."
    >
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="hire-heading">
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={`${styles.container} ${styles.heroLayout}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}><Sparkles size={15} aria-hidden="true" /> ~/hire-developers</p>
            <h1 id="hire-heading">
              Hire developers who <span>ship in the open.</span>
            </h1>
            <p className={styles.lead}>
              Work with recode hive community developers whose code you can read before you hire. Tell us what you are building and we match you with people who have already done it.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} to={HIRE_URL}>Hire a developer <ArrowRight size={17} aria-hidden="true" /></Link>
              <a className={styles.secondaryButton} href="#builders">Browse developers</a>
            </div>
            </div>
            <aside className={styles.openToWork} aria-label="Open to work roles">
              <div className={styles.openHeader}><span>OPEN TO WORK</span><b>● Available</b></div>
              {talentExamples.map((talent) => <div className={styles.roleRow} key={talent.role}><img className={styles.roleAvatar} src={talent.image} alt="" /><div><strong>{talent.role}</strong><small>{talent.skills.join(", ")}</small></div></div>)}
              <small className={styles.openNote}>Roles shown are examples of the skills in the community.</small>
            </aside>
          </div>
        </section>

        <section id="builders" className={`${styles.container} ${styles.builders}`} aria-labelledby="builders-heading">
          <div className={styles.centerHeading}><p className={styles.eyebrow}>Available now</p><h2 id="builders-heading">Meet the builders behind recode hive</h2><p>Every profile links to real, public work: projects, contributions, and write-ups. You see what someone has built, not just what they claim.</p></div>
          <div className={styles.talentGrid}>
            {talentExamples.map((talent, index) => {
              return <article className={styles.talentCard} key={talent.role}>
                <div className={styles.talentTop}><img className={`${styles.roleAvatar} ${styles[`avatar${index}`]}`} src={talent.image} alt={`${talent.name} profile`} /><b>● Available</b></div>
                <h3>{talent.name}</h3><p className={styles.location}><MapPin size={13} aria-hidden="true" /> Open to remote work</p><p className={styles.role}>{talent.role}</p>
                <div className={styles.skillList}>{talent.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                <p className={styles.talentSummary}>Public work in the community, with a track record of building and explaining technical projects.</p>
                <div className={styles.talentActions}><a href={talent.profileUrl}>See profile <ChevronRight size={15} aria-hidden="true" /></a><a className={styles.iconButton} href={talent.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${talent.name} on GitHub`}><Code2 size={15} aria-hidden="true" /></a></div>
              </article>;
            })}
          </div>
          <a className={styles.browseAll} href="#work">Browse all developers <ArrowRight size={15} aria-hidden="true" /></a>
        </section>

        <section className={`${styles.container} ${styles.howItWorks}`} aria-labelledby="how-heading">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>How it works</p><h2 id="how-heading">How to hire a developer through recode hive</h2></div>
          <div className={styles.timeline}>{["Place a free request", "Talk about your needs", "Review real work", "Start building"].map((step, index) => <div className={styles.timelineStep} key={step}><span>{index + 1}</span><strong>{step}</strong><small>{index === 0 ? "A short brief" : index === 1 ? "Scope and budget" : index === 2 ? "Code you can check" : "On your terms"}</small></div>)}</div>
          <Link className={styles.primaryButton} to={HIRE_URL}>Hire a developer <ArrowRight size={17} aria-hidden="true" /></Link>
        </section>

        <section className={`${styles.container} ${styles.planner}`} aria-labelledby="planner-heading">
          <div className={styles.plannerCopy}><p className={styles.eyebrow}>Plan ahead</p><h2 id="planner-heading">Estimate your budget</h2><p>Pick the experience level and how long you need help. This guide is based on public freelance rate data, not a quote.</p><div className={styles.plannerFields}><label>Role<select defaultValue="Mid-level"><option>Junior</option><option>Mid-level</option><option>Senior</option></select></label><label>Duration<select defaultValue="2-4 weeks"><option>&lt; 1 week</option><option>1-2 weeks</option><option>2-4 weeks</option><option>1-2 months</option><option>3+ months</option></select></label></div></div>
          <div className={styles.estimate}><span>Estimated range</span><strong>USD<br />$2,400 - $8,000</strong><p>Range for a mid-level developer over 2-4 weeks</p><Link to={HIRE_URL}>Post this project <ArrowRight size={15} aria-hidden="true" /></Link></div>
        </section>

        <section className={`${styles.container} ${styles.why}`} aria-labelledby="why-heading"><div className={styles.sectionHeading}><p className={styles.eyebrow}>Why recode hive</p><h2 id="why-heading">Proof of work, not just a profile.</h2></div><div className={styles.whyGrid}><div><Code2 size={20} aria-hidden="true" /><h3>Code you can read first</h3><p>Community developers contribute to open-source projects in public, so you can check commits and pull requests before a call.</p></div><div><Sparkles size={20} aria-hidden="true" /><h3>Reviewed by peers</h3><p>Contributions go through code review by maintainers. Developers are used to feedback, standards, and shipping in small steps.</p></div><div><BriefcaseBusiness size={20} aria-hidden="true" /><h3>They write it down</h3><p>Many members publish tutorials and case studies, so you also see how they explain decisions to a team.</p></div></div></section>

        <section id="work" className={`${styles.container} ${styles.workSection}`} aria-labelledby="work-heading">
          <div className={styles.workHeader}><div className={styles.sectionHeading}><p className={styles.eyebrow}>Public work</p><h2 id="work-heading">Explore community projects</h2></div><label className={styles.search}><Search size={17} aria-hidden="true" /><span className={styles.srOnly}>Search work</span><input type="search" placeholder="Search projects or skills" value={query} onChange={(event) => setQuery(event.target.value)} /></label></div>
          <div className={styles.filters} role="group" aria-label="Filter work">{filters.map((item) => <button key={item} type="button" className={filter === item ? styles.filterActive : ""} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
          {work.length > 0 ? <div className={styles.workGrid}>{work.map((user) => <WorkCard key={user.title} user={user} />)}</div> : <p className={styles.empty}>No work matches that search yet. Try a broader term.</p>}
        </section>

        <section className={`${styles.container} ${styles.faq}`} aria-labelledby="faq-heading"><div className={styles.sectionHeading}><p className={styles.eyebrow}>Frequently asked questions</p><h2 id="faq-heading">Common questions, answered.</h2></div><div className={styles.faqList}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={17} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></section>

        <section className={`${styles.container} ${styles.cta}`} aria-labelledby="cta-heading">
          <div><p className={styles.eyebrow}>Ready to hire?</p><h2 id="cta-heading">Post a project and get a shortlist.</h2><p>Share your brief and we will help connect you with community developers whose work you can check.</p></div>
          <Link className={styles.primaryButton} to={HIRE_URL}>Post a project <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </section>
        <section className={`${styles.container} ${styles.joinCta}`}><div><p className={styles.eyebrow}>For community members</p><h2>Want to be listed here?</h2><p>Link your GitHub, add your skills, and show us the projects you have shipped with recode hive.</p></div><Link className={styles.secondaryButton} to={HIRE_URL}>Join the talent list <ArrowRight size={17} aria-hidden="true" /></Link></section>
      </main>
    </Layout>
  );
}
