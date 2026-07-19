import React, { useState } from "react";
import Layout from "@theme/Layout";
import releases from "@site/src/data/releases.json";
import { ReleaseBody } from "./markdown";
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

function ReleaseCard({ release }: { release: Release }): JSX.Element {
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
      <p className="changelog__author">
        Published by{" "}
        <a href={release.author.htmlUrl} target="_blank" rel="noopener noreferrer">
          <strong>{release.author.login}</strong>
        </a>{" "}
        - recode hive
      </p>
    </div>
  );
}

export default function ChangelogPage(): JSX.Element {
  const items = releases as Release[];

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

        <div className="changelog__timeline">
          {items.length === 0 ? (
            <p className="changelog__empty">No updates yet. Check back soon!</p>
          ) : (
            items.map((release) => (
              <div className="changelog__entry" key={release.id}>
                <span className="changelog__dot" aria-hidden="true" />
                <ReleaseCard release={release} />
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
