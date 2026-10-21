import { useEffect, useState } from "react";
import { usePluginData } from "@docusaurus/useGlobalData";

export type Notification = {
  id: string;
  title: string;
  message: string;
  /** YYYY-MM-DD */
  date: string;
  link?: string;
};

const READ_STORAGE_KEY = "recodehive:notifications-read";
const DISMISSED_STORAGE_KEY = "recodehive:notifications-dismissed";

function readIds(key: string): string[] {
  try {
    const stored = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    // A broken value just resets the list.
    return [];
  }
}

/** Notifications from src/data/notifications.txt, plus which ones this browser has read. */
export function useNotifications() {
  const data = usePluginData("notifications") as
    { items?: Notification[] } | undefined;
  const allItems = data?.items ?? [];
  const [readList, setReadList] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const items = allItems.filter((n) => !dismissed.includes(n.id));

  useEffect(() => {
    setReadList(readIds(READ_STORAGE_KEY));
    setDismissed(readIds(DISMISSED_STORAGE_KEY));
  }, []);

  // Only keep ids that still exist, so the stored lists never grow forever
  const keep = (ids: string[]) => ids.filter((id) => allItems.some((n) => n.id === id));
  const saveRead = (ids: string[]) => {
    const next = keep(ids);
    setReadList(next);
    window.localStorage.setItem(READ_STORAGE_KEY, JSON.stringify(next));
  };
  const saveDismissed = (ids: string[]) => {
    const next = keep(ids);
    setDismissed(next);
    window.localStorage.setItem(DISMISSED_STORAGE_KEY, JSON.stringify(next));
  };

  const isUnread = (id: string) => !readList.includes(id);

  return {
    items,
    isUnread,
    unreadCount: items.filter((n) => isUnread(n.id)).length,
    markRead: (id: string) => {
      if (isUnread(id)) saveRead([...readList, id]);
    },
    markUnread: (id: string) => saveRead(readList.filter((r) => r !== id)),
    dismiss: (id: string) => {
      saveDismissed([...dismissed, id]);
      saveRead(readList.filter((r) => r !== id));
    },
    markAllRead: () => saveRead([...readList, ...items.map((n) => n.id)]),
  };
}
