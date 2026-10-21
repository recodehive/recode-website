import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { useHistory } from "@docusaurus/router";
import { ArrowRight, Sparkles } from "lucide-react";
import DashboardSidebar, {
  type DashboardTab,
} from "../../components/dashboard/Sidebar/DashboardSidebar";
import { UPDATES, type SiteUpdate } from "../../data/updates";
import "./index.css";

const HASH: Record<DashboardTab, string> = {
  home: "/dashboard",
  discuss: "/dashboard#discuss",
  contributors: "/dashboard#leaderboard",
  giveaway: "/dashboard#giveaway",
};

// "2026-10-21" becomes "October 21, 2026", written the same for every visitor
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function UpdateRow({ u }: { u: SiteUpdate }): React.JSX.Element {
  return (
    <article className="updates__row">
      <div className="updates__when">
        <time dateTime={u.date}>{formatDate(u.date)}</time>
        {u.isNew && <span className="updates__new">New</span>}
      </div>
      <div className="updates__card">
        <h2>{u.title}</h2>
        <p className="updates__desc">{u.description}</p>
        {u.video ? (
          <div className="updates__media updates__media--video">
            <iframe
              src={u.video}
              title={u.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : u.image ? (
          <div className="updates__media">
            <img src={u.image} alt={u.imageAlt ?? ""} loading="lazy" />
          </div>
        ) : null}
        {u.bullets && u.bullets.length > 0 && (
          <ul className="updates__bullets">
            {u.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
        {u.link && (
          <Link to={u.link.url} className="updates__link">
            {u.link.label} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}

export default function UpdatesPage(): React.JSX.Element {
  const history = useHistory();
  return (
    <Layout
      title="Updates"
      description="Important updates and improvements from the recode hive team."
    >
      <div className="updates__shell">
        <DashboardSidebar
          activeTab={null}
          onTabChange={(tab) => history.push(HASH[tab])}
        />
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
            {UPDATES.map((u) => (
              <UpdateRow key={`${u.date}-${u.title}`} u={u} />
            ))}
          </section>

          <footer className="updates__footer">
            <p>Have an idea or spotted something we should improve?</p>
            <Link to="/contact-us">
              Talk to the team <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </footer>
        </main>
      </div>
    </Layout>
  );
}
