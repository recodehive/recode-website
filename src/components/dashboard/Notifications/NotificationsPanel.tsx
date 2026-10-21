import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "@docusaurus/Link";
import { Bell, CheckCheck, X } from "lucide-react";
import type { Notification } from "./useNotifications";
import styles from "./notifications.module.css";

interface NotificationsPanelProps {
  items: Notification[];
  unreadCount: number;
  isUnread: (id: string) => boolean;
  onRead: (id: string) => void;
  onReadAll: () => void;
  onClose: () => void;
  /** Sidebar is collapsed, so the panel opens closer to the left edge */
  collapsed: boolean;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const DAY = 24 * 60 * 60 * 1000;
const UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ["year", 365],
  ["month", 30],
  ["week", 7],
  ["day", 1],
];
const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const toLocalDate = (date: string) => {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d);
};

// "2026-10-20" becomes "yesterday", "last week", "2 months ago" and so on
function timeAgo(date: string): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round(
    (toLocalDate(date).getTime() - today.getTime()) / DAY,
  );
  for (const [unit, size] of UNITS) {
    if (Math.abs(days) >= size)
      return relative.format(Math.round(days / size), unit);
  }
  return "today";
}

export default function NotificationsPanel({
  items,
  unreadCount,
  isUnread,
  onRead,
  onReadAll,
  onClose,
  collapsed,
}: NotificationsPanelProps): React.JSX.Element {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus the close button, close on Escape, keep Tab inside the panel
  // and send focus back to the Notifications button when it closes.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [onClose]);

  const panel = (
    <div
      className={styles.backdrop}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={`${styles.panel} ${collapsed ? styles.panelCollapsed : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="notifications-title"
      >
        <div className={styles.head}>
          <h2 id="notifications-title" className={styles.title}>
            Notifications
          </h2>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close notifications"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.bar}>
          <span>
            {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up"}
          </span>
          <button
            type="button"
            className={styles.markAll}
            onClick={() => {
              onReadAll();
              // the button disables itself, so keep focus inside the panel
              closeRef.current?.focus();
            }}
            disabled={unreadCount === 0}
          >
            <CheckCheck size={16} aria-hidden="true" />
            Mark all read
          </button>
        </div>

        {items.length > 0 ? (
          <ul className={styles.list}>
            {items.map((n) => {
              const unread = isUnread(n.id);
              return (
                <li
                  key={n.id}
                  className={`${styles.item} ${unread ? styles.unread : ""}`}
                >
                  <span className={styles.icon} aria-hidden="true">
                    <Bell size={18} />
                  </span>
                  <div className={styles.body}>
                    <p className={styles.itemTitle}>
                      {n.title}
                      {unread && (
                        <span className={styles.srOnly}> (unread)</span>
                      )}
                    </p>
                    <p className={styles.message}>{n.message}</p>
                    {n.link && (
                      <Link
                        to={n.link}
                        className={styles.link}
                        onClick={() => onRead(n.id)}
                      >
                        Click here
                        <span className={styles.srOnly}>: {n.title}</span>
                      </Link>
                    )}
                    <time
                      className={styles.time}
                      dateTime={n.date}
                      title={toLocalDate(n.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    >
                      {timeAgo(n.date)}
                    </time>
                  </div>
                  {unread && <span className={styles.dot} aria-hidden="true" />}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={styles.empty}>No notifications yet.</p>
        )}

        <div className={styles.foot}>
          <Link to="/updates" className={styles.footLink} onClick={onClose}>
            See all updates <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );

  return createPortal(panel, document.body);
}
