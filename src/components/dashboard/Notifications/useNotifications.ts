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

/** Notifications from src/data/notifications.txt, plus which ones this browser has read. */
export function useNotifications() {
  const data = usePluginData("notifications") as
    { items?: Notification[] } | undefined;
  const items = data?.items ?? [];
  const [readIds, setReadIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(
        window.localStorage.getItem(READ_STORAGE_KEY) ?? "[]",
      );
      if (Array.isArray(stored)) setReadIds(stored);
    } catch {
      // A broken value just means everything shows as unread again.
    }
  }, []);

  const save = (ids: string[]) => {
    // Only keep ids that still exist, so the stored list never grows forever
    const next = ids.filter((id) => items.some((n) => n.id === id));
    setReadIds(next);
    window.localStorage.setItem(READ_STORAGE_KEY, JSON.stringify(next));
  };

  const isUnread = (id: string) => !readIds.includes(id);

  return {
    items,
    isUnread,
    unreadCount: items.filter((n) => isUnread(n.id)).length,
    markRead: (id: string) => {
      if (isUnread(id)) save([...readIds, id]);
    },
    markAllRead: () => save(items.map((n) => n.id)),
  };
}
