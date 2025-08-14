import React from "react";
import {
  Book,
  Eye,
  LayoutDashboard,
  DollarSign,
  User,
  Newspaper,
  MoreHorizontal,
  Github,
  BadgeCheck,
  FileText,
  Users,
  Tv,
  Mic,
  Lightbulb,
  Puzzle,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Docs: <Book size={18} style={{ verticalAlign: "middle" }} />,
  Showcase: <Eye size={18} style={{ verticalAlign: "middle" }} />,
  Dashboard: <LayoutDashboard size={18} style={{ verticalAlign: "middle" }} />,
  Donate: <DollarSign size={18} style={{ verticalAlign: "middle" }} />,
  Devfolio: <User size={18} style={{ verticalAlign: "middle" }} />,
  Blogs: <Newspaper size={18} style={{ verticalAlign: "middle" }} />,
  More: <MoreHorizontal size={18} style={{ verticalAlign: "middle" }} />,
  GitHub: <Github size={18} style={{ verticalAlign: "middle" }} />,
  Badges: <BadgeCheck size={18} style={{ verticalAlign: "middle" }} />,
  Ebooks: <FileText size={18} style={{ verticalAlign: "middle" }} />,
  Roadmap: <LayoutDashboard size={18} style={{ verticalAlign: "middle" }} />,
  Community: <Users size={18} style={{ verticalAlign: "middle" }} />,
  Broadcast: <Tv size={18} style={{ verticalAlign: "middle" }} />,
  Podcast: <Mic size={18} style={{ verticalAlign: "middle" }} />,
  Behavioral: <Lightbulb size={18} style={{ verticalAlign: "middle" }} />,
  Technical: <Puzzle size={18} style={{ verticalAlign: "middle" }} />,
};

export default function NavbarIcon({ name }: { name: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        marginRight: 2,
      }}
    >
      {iconMap[name] || null}
    </span>
  );
}
