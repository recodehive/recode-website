import { useRef, useState, type ComponentType, type FC, type FormEvent } from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import emailjs from "@emailjs/browser";
import {
  BookOpen,
  ChevronDown,
  CircleHelp,
  CreditCard,
  ExternalLink,
  FileText,
  MessageCircle,
  Search,
  Send,
} from "lucide-react";
import "./index.css";

type FormStatus = "idle" | "sending" | "success" | "error";
type Category = "All" | "Account & learning plan" | "Billing & premium" | "Courses & progress" | "Coding & DataLab" | "Projects & proof";

type Question = {
  question: string;
  answer: string;
  category: Exclude<Category, "All">;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
};

const categories: Category[] = [
  "All",
  "Account & learning plan",
  "Billing & premium",
  "Courses & progress",
  "Coding & DataLab",
  "Projects & proof",
];

const questions: Question[] = [
  {
    question: "What is the recode hive?",
    answer: "recode hive is a platform that provides learning resources, data engineering tutorials, blogs, and opportunities for open-source contribution.",
    category: "Account & learning plan",
    icon: CircleHelp,
  },
  {
    question: "What features do the recode hive provides?",
    answer: "We provide tutorials, documentation, hands-on projects, open-source contribution opportunities, earning opportunities, and community support.",
    category: "Courses & progress",
    icon: BookOpen,
  },
  {
    question: "How can I contribute tutorials?",
    answer: "Fork the recode hive repository, review the contribution guidelines, create your tutorial content, and submit a pull request.",
    category: "Projects & proof",
    icon: ExternalLink,
  },
  {
    question: "What all resources are available here?",
    answer: "Available resources include SQL, GitHub, Postman API testing, and Next.js development guides, with more technologies coming soon.",
    category: "Courses & progress",
    icon: FileText,
  },
  {
    question: "How can I contribute as a beginner?",
    answer: "Start with the GitHub Basics guide, join the Discord community, look for good first issues, and follow the contribution guide.",
    category: "Account & learning plan",
    icon: CircleHelp,
  },
  {
    question: "How can I earn from this recode hive organisation?",
    answer: "You can earn through the GitHub sponsorship program by making meaningful contributions and following the contribution guidelines.",
    category: "Billing & premium",
    icon: CreditCard,
  },
  {
    question: "How will I stay up to date with the latest news from this organisation?",
    answer: "Subscribe to the newsletter and follow recode hive on Instagram, Twitter, LinkedIn, YouTube, and Discord for updates.",
    category: "Account & learning plan",
    icon: MessageCircle,
  },
];

const ContactUs: FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const visibleQuestions = questions.filter(({ question, answer, category }) => {
    const matchesCategory = activeCategory === "All" || category === activeCategory;
    const query = search.trim().toLowerCase();
    return (
      matchesCategory &&
      (!query || `${question} ${answer} ${category}`.toLowerCase().includes(query))
    );
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const publicKey = siteConfig.customFields?.EMAILJS_PUBLIC_KEY as string;
    const serviceId = siteConfig.customFields?.EMAILJS_SERVICE_ID as string;
    const templateId = siteConfig.customFields?.EMAILJS_TEMPLATE_ID as string;

    if (!publicKey || !serviceId || !templateId) {
      setErrorMessage(
        "Email service is not configured. Please contact us directly at sanjay@recodehive.com.",
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey,
      });
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS send error:", err);
      const detail =
        err && typeof err === "object" && "text" in err
          ? ` (${(err as { status?: number; text?: string }).status ?? ""}: ${(err as { text?: string }).text ?? ""})`
          : "";
      setErrorMessage(
        `Something went wrong${detail}. Please try again or email us directly at sanjay@recodehive.com.`,
      );
      setStatus("error");
    }
  };

  return (
    <Layout
      title="Contact Us"
      description="Get in touch with the recode hive team. We're here to help with your questions, feedback, and collaboration opportunities."
    >
      <div className="help-center">
        <main className="help-center__content">
          <header className="help-center__header">
            <p className="help-center__eyebrow">Help center</p>
            <h1>Find an answer or reach the team.</h1>
            <p className="help-center__intro">
              Search account, learning, coding, project and billing guidance. If the answer is not here, send the details below.
            </p>
          </header>

          <div className="help-center__search">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search for progress, billing, coding, projects..."
              aria-label="Search help center"
            />
          </div>

          <div className="help-center__categories" aria-label="FAQ categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
className={activeCategory === category ? "is-active" : ""}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <section className="faq-grid" aria-label="Frequently asked questions">
            {visibleQuestions.map(({ question, answer, icon: Icon }) => {
              const isOpen = openQuestion === question;
              return (
                <article className={`faq-item ${isOpen ? "is-open" : ""}`} key={question}>
                  <button
                    type="button"
                    className="faq-item__trigger"
                    aria-expanded={isOpen}
                    onClick={() => setOpenQuestion(isOpen ? null : question)}
                  >
                    <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                    <span>{question}</span>
                    <ChevronDown size={16} aria-hidden="true" />
                  </button>
                  {isOpen && <p className="faq-item__answer">{answer}</p>}
                </article>
              );
            })}
            {visibleQuestions.length === 0 && (
              <p className="faq-empty">No matching questions yet. Send the team a message below.</p>
            )}
          </section>

          <section className="support-panel">
            <div className="support-form">
              <h2>Still need help?</h2>
              <p>Include the page URL and what you expected to happen. That helps the team resolve it faster.</p>

              {status === "success" ? (
                <div className="form-success-message">
                  <Send size={22} aria-hidden="true" />
                  <h3>Message sent</h3>
                  <p>Thanks for reaching out. We&apos;ll get back to you within 24-48 hours.</p>
                  <button type="button" className="submit-button" onClick={() => setStatus("idle")}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                  <input type="hidden" name="lastName" value="" readOnly />
                  <input type="hidden" name="subject" value="support" readOnly />
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName" className="form-label">Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-input"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">What is this about?</label>
                    <select
                      id="subject"
                      name="subject"
                      className="form-select"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">How can we help?</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="form-textarea"
                      placeholder="Tell us what happened and what you expected..."
                      required
                    ></textarea>
                  </div>

                  {status === "error" && (
                    <div className="form-error-message">{errorMessage}</div>
                  )}

                  <button
                    type="submit"
                    className="submit-button"
                    disabled={status === "sending"}
                    aria-busy={status === "sending"}
                    aria-label={
                      status === "sending" ? "Sending message…" : "Send message"
                    }
                  >
                    {status === "sending" ? "Sending…" : "Send to support"}
                  </button>
                </form>
              )}
            </div>
            <aside className="support-direct">
              <p className="support-direct__eyebrow">Faster for quick questions</p>
              <h2>Chat on WhatsApp</h2>
              <p>For account access or a quick clarification, message the team directly.</p>
              <a href="https://chat.whatsapp.com/D1CZ7BrLMVw4OzwsdVNdos?mode=gi_t" target="_blank" rel="noreferrer">
                <MessageCircle size={17} aria-hidden="true" /> Open WhatsApp
              </a>
              <p className="support-direct__note">Never share passwords, OTPs or payment card details with support.</p>
            </aside>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default ContactUs;
