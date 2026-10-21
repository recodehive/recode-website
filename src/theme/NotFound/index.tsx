import React, { type ReactNode } from "react";
import NotFound from "@theme-original/NotFound";
import type NotFoundType from "@theme/NotFound";
import type { WrapperProps } from "@docusaurus/types";
import { useLocation } from "@docusaurus/router";
import ProfilePage from "../../components/profile/ProfilePage";

type Props = WrapperProps<typeof NotFoundType>;

export default function NotFoundWrapper(props: Props): ReactNode {
  const { pathname } = useLocation();
  // /u/<handle> for a handle without a pre-built page: the host rewrites it to a static page, the router finds no
  // route and lands here. Show the GitHub-only profile (or a friendly not-found) instead of the generic 404.
  if (/^\/u\/[A-Za-z0-9-]+\/?$/.test(pathname)) return <ProfilePage />;
  return (
    <>
      <NotFound {...props} />
    </>
  );
}
