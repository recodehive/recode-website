import Layout from "@theme/Layout";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Sparkles,
} from "lucide-react";
import "./index.css";

type UpdateStatus = "Now shipping" | "In progress" | "Coming next";

type Update = {
  title: string;
  description: string;
  status: UpdateStatus;
  date: string;
  icon: typeof CheckCircle2;
};

// Keep this list manually curated so it highlights meaningful product updates,
// rather than every dependency or maintenance change in the repository.
const updates: Update[] = [
  {
    title: "A clearer dashboard experience",
    description:
      "The dashboard brings discussions, giveaways, contributor stats, and community resources together in one focused workspace.",
    status: "Now shipping",
    date: "October 2026",
    icon: CheckCircle2,
  },
  {
    title: "Better ways to discover the community",
    description:
      "We are improving the community feed and contributor experience so it is easier to find conversations, events, and ways to get involved.",
    status: "In progress",
    date: "Coming soon",
    icon: Clock3,
  },
  {
    title: "More practical learning resources",
    description:
      "New tutorials, projects, and data engineering resources are on the way, with a continued focus on learning by building.",
    status: "Coming next",
    date: "Up next",
    icon: Sparkles,
  },
];

const statusClasses: Record<UpdateStatus, string> = {
  "Now shipping": "updates__status--shipping",
  "In progress": "updates__status--progress",
  "Coming next": "updates__status--next",
};

export default function UpdatesPage(): JSX.Element {
  return (
    <Layout
      title="Updates"
      description="Important updates and improvements from the recode hive team."
    >
      <main className="updates">
        <header className="updates__hero">
          <span className="updates__eyebrow">
            <Sparkles size={15} aria-hidden="true" />
            What&apos;s new
          </span>
          <h1>Building in public, one update at a time.</h1>
          <p>
            Follow the important changes and improvements we&apos;re making to
            recode hive. This page is updated manually with progress that
            matters to the community.
          </p>
        </header>

        <section className="updates__list" aria-label="Website updates">
          {updates.map(({ title, description, status, date, icon: Icon }) => (
            <article className="updates__card" key={title}>
              <div className="updates__card-icon" aria-hidden="true">
                <Icon size={20} />
              </div>
              <div className="updates__card-content">
                <div className="updates__meta">
                  <span className={`updates__status ${statusClasses[status]}`}>
                    {status}
                  </span>
                  <span>{date}</span>
                </div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
              <ArrowUpRight
                className="updates__card-arrow"
                size={20}
                aria-hidden="true"
              />
            </article>
          ))}
        </section>

        <footer className="updates__footer">
          <p>Have an idea or spotted something we should improve?</p>
          <a href="/contact-us">
            Talk to the team <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </footer>
      </main>
    </Layout>
  );
}
