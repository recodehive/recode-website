import React, { useEffect, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { FaEnvelope, FaLink, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import "./SocialShare.css";

const COPY_RESET_DELAY_MS = 2000;

type SocialShareProps = {
  permalink?: string;
  title?: string;
};

export default function SocialShare({
  permalink,
  title,
}: SocialShareProps): JSX.Element | null {
  const { siteConfig } = useDocusaurusContext();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setCopied(false), COPY_RESET_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [copied]);

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
      return;
    }

    await navigator.clipboard.writeText(blogUrl);
    setCopied(true);
  };

  return (
    <section className="blog-post-share-section" aria-label="Share this post">
      <p className="share-title">Share this post</p>
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
          className={`share-btn-circle copy${copied ? " copied" : ""}`}
          onClick={() => {
            void handleCopyLink();
          }}
          title={copied ? "Link copied" : "Copy link"}
          aria-label={copied ? "Link copied" : "Copy link"}
        >
          <FaLink aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
