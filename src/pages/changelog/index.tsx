import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "@theme/Layout";
import releases from "@site/src/data/releases.json";
import { ReleaseBody } from "./_markdown";
import ContributorCloud from "../../components/changelog/ContributorCloud";
import CardContributors from "../../components/changelog/CardContributors";
import {
  getBotCount,
  getContributors,
  type Contributor,
} from "../../utils/releaseContributors";
import "./index.css";

type Release = {
  id: number;
  name: string;
  tagName: string;
  publishedAt: string;
  htmlUrl: string;
  body: string;
  prerelease: boolean;
  author: { login: string; htmlUrl: string };
};

const BODY_PREVIEW_LINES = 6;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// "V1.0.9-recode" becomes "V1.0.9", "1.0.8" becomes "V1.0.8"
function formatVersion(tagName: string): string {
  const base = tagName.replace(/-recode$/i, "").toUpperCase();
  return base.startsWith("V") ? base : `V${base}`;
}

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function ReleaseCard({
  release,
  contributors,
}: {
  release: Release;
  contributors: Contributor[];
}): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const lineCount = release.body.split("\n").filter((l) => l.trim() !== "").length;
  const canCollapse = lineCount > BODY_PREVIEW_LINES;

  return (
    <div className="changelog__card">
      <div className="changelog__card-header">
        <span className="changelog__badge">
          <span aria-hidden="true">&gt;_</span> CHANGELOG
        </span>
        <span className="changelog__date">{formatDate(release.publishedAt)}</span>
      </div>
      <h3 className="changelog__title">
        <a href={release.htmlUrl} target="_blank" rel="noopener noreferrer">
          {release.name}
        </a>
      </h3>
      <div className={`changelog__body-wrap ${!expanded && canCollapse ? "changelog__body-wrap--clamped" : ""}`}>
        <ReleaseBody body={release.body} />
      </div>
      {canCollapse && (
        <button
          type="button"
          className="changelog__toggle"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Show less" : "Show full changelog"}
        </button>
      )}
      <hr className="changelog__divider" />
      <div className="changelog__footer">
        <p className="changelog__author">
          Published by{" "}
          <a href={release.author.htmlUrl} target="_blank" rel="noopener noreferrer">
            <strong>{release.author.login}</strong>
          </a>{" "}
          - recode hive
        </p>
        <CardContributors
          contributors={contributors}
          version={formatVersion(release.tagName)}
        />
      </div>
    </div>
  );
}

export default function ChangelogPage(): JSX.Element {
  const items = releases as Release[];
  const [activeIndex, setActiveIndex] = useState(0);
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);

  const data = useMemo(
    () =>
      items.map((r) => ({
        contributors: getContributors(r.body),
        botCount: getBotCount(r.body),
      })),
    [items],
  );

  // The release card crossing the middle band of the viewport becomes active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(index)) setActiveIndex(index);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    entryRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [items.length]);

  const active = items[activeIndex];

  return (
    <Layout
      title="Changelog"
      description="Stay up-to-date with what's new at recode hive."
    >
      <div className="changelog__page">
        <div className="changelog__header">
          <h1>
            <span className="changelog__header-brand">&lt;Changelog/&gt;</span>
          </h1>
          <p>Stay up-to-date with what&apos;s new in recode hive.</p>
        </div>

        <div className="changelog__layout">
          <div className="changelog__timeline">
            {items.length === 0 ? (
              <p className="changelog__empty">No updates yet. Check back soon!</p>
            ) : (
              items.map((release, index) => (
                <div
                  className={`changelog__entry${index === activeIndex ? " changelog__entry--active" : ""}`}
                  key={release.id}
                  data-index={index}
                  ref={(el) => {
                    entryRefs.current[index] = el;
                  }}
                >
                  <span className="changelog__dot" aria-hidden="true" />
                  <ReleaseCard
                    release={release}
                    contributors={data[index].contributors}
                  />
                </div>
              ))
            )}
          </div>
          {active && (
            <ContributorCloud
              version={formatVersion(active.tagName)}
              date={formatShortDate(active.publishedAt)}
              htmlUrl={active.htmlUrl}
              contributors={data[activeIndex].contributors}
              botCount={data[activeIndex].botCount}
              releaseCount={items.length}
              activeIndex={activeIndex}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
