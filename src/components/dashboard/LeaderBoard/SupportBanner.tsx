// src/components/dashboard/LeaderBoard/SupportBanner.tsx
import React from "react";

const SPONSOR_URL = "https://github.com/sponsors/sanjay-kv";

export default function SupportBanner(): React.JSX.Element {
  return (
    <div className="support-banner">
      <div className="support-banner-content">
        <div className="support-banner-eyebrow">— Support the mission</div>
        <h3 className="support-banner-title">
          recode hive is free because of builders like you.
        </h3>
        <p className="support-banner-subtitle">
          Every donation funds swag for top contributors and keeps recode
          hive free forever.
        </p>
      </div>
      <a
        href={SPONSOR_URL}
        target="_blank"
        rel="noreferrer"
        className="support-banner-cta"
      >
        Donate to recode hive
      </a>
    </div>
  );
}
