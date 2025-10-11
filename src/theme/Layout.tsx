import React from "react";
import Layout from "@theme-original/Layout";
import NavbarFirebaseAuthGithub from "@site/src/components/ui/NavbarFirebaseAuthGithub";
import NewsletterPopup from "../components/NewsLetterPopup";

export default function CustomLayout({ children, ...props }) {
  return (
    <>
      <Layout {...props}>
        <NavbarFirebaseAuthGithub />
        {children}
      </Layout>
      <NewsletterPopup />
    </>
  );
}
