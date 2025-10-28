import React, { type ReactNode } from "react";
import NotFound from "@theme-original/NotFound";
import type NotFoundType from "@theme/NotFound";
import type { WrapperProps } from "@docusaurus/types";

type Props = WrapperProps<typeof NotFoundType>;

export default function NotFoundWrapper(props: Props): ReactNode {
  return (
    <>
      <NotFound {...props} />
    </>
  );
}
