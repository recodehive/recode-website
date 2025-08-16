import {
  Book, Eye, LayoutDashboard, DollarSign, User, Newspaper,
  MoreHorizontal, Github, BadgeCheck, FileText, Users,
  Tv, Mic, Lightbulb, Puzzle, Map
} from "lucide-react";

export const NAVBAR_CONFIG = {
  Docs: Book,
  Showcase: Eye,
  Dashboard: LayoutDashboard,
  Donate: DollarSign,
  Devfolio: User,
  Blogs: Newspaper,
  More: MoreHorizontal,
  GitHub: Github,
  Badges: BadgeCheck,
  Ebooks: FileText,
  Roadmap: Map,
  Community: Users,
  Broadcast: Tv,
  Podcast: Mic,
  Technical: Puzzle,
  Behavioral: Lightbulb
} as const;

export const NAVBAR_ICONS = Object.keys(NAVBAR_CONFIG) as (keyof typeof NAVBAR_CONFIG)[];
export type NavbarIconName = keyof typeof NAVBAR_CONFIG;