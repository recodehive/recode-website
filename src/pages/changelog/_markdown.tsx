import React, { type ReactNode } from "react";

const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
const boldPattern = /\*\*([^*]+)\*\*/g;
const bareUrlPattern = /(https?:\/\/[^\s)]+)/g;

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  const combined = new RegExp(
    `${linkPattern.source}|${boldPattern.source}|${bareUrlPattern.source}`,
    "g",
  );

  let match: RegExpExecArray | null;
  while ((match = combined.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined && match[2] !== undefined) {
      nodes.push(
        <a key={key++} href={match[2]} target="_blank" rel="noopener noreferrer">
          {match[1]}
        </a>,
      );
    } else if (match[3] !== undefined) {
      nodes.push(<strong key={key++}>{match[3]}</strong>);
    } else if (match[4] !== undefined) {
      nodes.push(
        <a key={key++} href={match[4]} target="_blank" rel="noopener noreferrer">
          {match[4]}
        </a>,
      );
    }
    lastIndex = combined.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

export function ReleaseBody({ body }: { body: string }): JSX.Element {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];
  let blockKey = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={`list-${blockKey++}`} className="changelog__body-list">
        {listItems.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line === "") {
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      blocks.push(
        <h4 key={`h-${blockKey++}`} className="changelog__body-heading">
          {line.slice(3)}
        </h4>,
      );
    } else if (line.startsWith("* ") || line.startsWith("- ")) {
      listItems.push(line.slice(2));
    } else {
      flushList();
      blocks.push(
        <p key={`p-${blockKey++}`} className="changelog__body-text">
          {renderInline(line)}
        </p>,
      );
    }
  }
  flushList();

  return <div className="changelog__body">{blocks}</div>;
}
