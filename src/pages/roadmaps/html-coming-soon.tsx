import Layout from "@theme-original/Layout";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";

export default function HTMLRoadmapComingSoon(): JSX.Element {
  return (
    <Layout
      title="HTML Topic Coming Soon"
      description="Temporary page for HTML roadmap items that are not published yet."
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main
        style={{
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 1.5rem",
          background:
            "radial-gradient(circle at top, rgba(59, 130, 246, 0.16), transparent 32%), linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)",
        }}
      >
        <section
          style={{
            width: "100%",
            maxWidth: "760px",
            borderRadius: "28px",
            padding: "3rem",
            background: "rgba(255, 255, 255, 0.88)",
            border: "1px solid rgba(148, 163, 184, 0.25)",
            boxShadow: "0 30px 80px rgba(15, 23, 42, 0.12)",
            backdropFilter: "blur(14px)",
          }}
        >
          <p
            style={{
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "#2563eb",
            }}
          >
            HTML Roadmap
          </p>
          <h1
            style={{
              margin: "0.75rem 0 1rem",
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              lineHeight: 1.05,
              color: "#0f172a",
            }}
          >
            Coming soon
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: "56ch",
              fontSize: "1.1rem",
              lineHeight: 1.75,
              color: "#475569",
            }}
          >
            This HTML topic has not been published yet. We&apos;re replacing placeholder roadmap links with this page so every item has a real destination while the documentation is being completed.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.85rem",
              marginTop: "2rem",
            }}
          >
            <Link
              to="/roadmaps/html"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.9rem 1.25rem",
                borderRadius: "999px",
                background: "#2563eb",
                color: "#fff",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 10px 24px rgba(37, 99, 235, 0.24)",
              }}
            >
              Back to HTML roadmap
            </Link>
            <Link
              to="/docs/html/intro-html/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.9rem 1.25rem",
                borderRadius: "999px",
                border: "1px solid rgba(37, 99, 235, 0.2)",
                background: "#fff",
                color: "#1d4ed8",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Start with Introduction to HTML
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
