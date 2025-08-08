import React from "react";
import Layout from "@theme-original/Layout";
import NewsletterPopup from '../components/NewsLetterPopup';



export default function CustomLayout({ children, ...props }) {

  return (
  <>
    <Layout {...props}>
      {children}
    </Layout>
    <NewsletterPopup />
  </>
);
}