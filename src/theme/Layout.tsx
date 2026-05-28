import React from "react";
import Layout from "@theme-original/Layout";
import NavbarClerkAuth from "@site/src/components/ui/NavbarClerkAuth";
import NewsletterPopup from "../components/NewsLetterPopup";

export default function CustomLayout({ children, ...props }) {
  return (
    <>
      <Layout {...props}>
        <NavbarClerkAuth />
        {children}
      </Layout>
      <NewsletterPopup />
    </>
  );
}
