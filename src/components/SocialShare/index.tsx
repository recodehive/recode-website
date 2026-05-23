import React, { useEffect, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { FaEnvelope, FaLink, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import "./SocialShare.css";

const COPY_RESET_DELAY_MS = 2000;
const COPY_DEFAULT_LABEL = "Copy link";
const COPY_SUCCESS_LABEL = "Link copied";
const COPY_ERROR_LABEL = "Unable to copy link";

type SocialShareProps = {
  permalink?: string;
  title?: string;
};

export default function SocialShare({
  permalink,
  title,
}: SocialShareProps): JSX.Element | null {
  const { siteConfig } = useDocusaurusContext();
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (copyState === "idle") {
      return undefined;
    }

    const timeout = window.setTimeout(() => setCopyState("idle"), COPY_RESET_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [copyState]);

  if (!permalink || !title) {
    return null;
  }

  const blogUrl = new URL(permalink, siteConfig.url).toString();
  const shareText = `Check out this article: ${title}`;
  const encodedBlogUrl = encodeURIComponent(blogUrl);
  const encodedShareText = encodeURIComponent(shareText);

  const shareLinks = [
    {
      className: "x",
      href: `https://twitter.com/intent/tweet?text=${encodedShareText}&url=${encodedBlogUrl}`,
      icon: <FaXTwitter aria-hidden="true" />,
      label: "Share on X",
    },
    {
      className: "linkedin",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedBlogUrl}`,
      icon: <FaLinkedinIn aria-hidden="true" />,
      label: "Share on LinkedIn",
    },
    {
      className: "email",
      href: `mailto:?subject=${encodedShareText}&body=${encodeURIComponent(`${shareText}\n\n${blogUrl}`)}`,
      icon: <FaEnvelope aria-hidden="true" />,
      label: "Share by email",
    },
  ];

  const handleCopyLink = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setCopyState("error");
      return;
    }

    try {
      await navigator.clipboard.writeText(blogUrl);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  };

  const copyLabel =
    copyState === "copied"
      ? COPY_SUCCESS_LABEL
      : copyState === "error"
        ? COPY_ERROR_LABEL
        : COPY_DEFAULT_LABEL;

  return (
    <section className="blog-post-share-section" aria-label="Share this article">
      <p className="share-title">Share this article</p>
      <div className="share-buttons-row">
        {shareLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`share-btn-circle ${link.className}`}
            title={link.label}
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
        <button
          type="button"
          className={`share-btn-circle copy${copyState === "copied" ? " copied" : ""}${copyState === "error" ? " copy-error" : ""}`}
          onClick={() => {
            void handleCopyLink();
          }}
          title={copyLabel}
          aria-label={copyLabel}
        >
          <FaLink aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
