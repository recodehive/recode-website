import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Lock } from 'lucide-react';
import { EBOOKS, type Ebook } from '../../data/ebooks';
import styles from './ebooks.module.css';

const SUGGEST_URL = 'https://github.com/recodehive/recode-website/issues/new';
const GUIDE_URL = 'https://www.recodehive.com/docs/Getting-Started';

function External({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className={styles.srOnly}> (opens in a new tab)</span>
    </a>
  );
}

function Book({ book }: { book: Ebook }) {
  const cover = useBaseUrl(book.cover);
  return (
    <section id="book" className={styles.bookCard} aria-labelledby="book-title">
      <div className={styles.coverCol}>
        <span className={styles.glow} aria-hidden="true" />
        <div className={styles.coverBackdrop}>
          <img
            className={styles.cover}
            src={cover}
            alt={`${book.title} by ${book.author}, ebook cover`}
            width={506}
            height={600}
          />
        </div>
      </div>
      <div className={styles.bookText}>
        <p className={styles.eyebrow}>{'✦'} EBOOK BY {book.author.toUpperCase()}</p>
        <h2 id="book-title" className={styles.h2}>{book.title}</h2>
        <p className={styles.summary}>{book.summary}</p>
        <ul className={styles.topics} aria-label="Topics covered">
          {book.topics.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <div className={styles.buyRow}>
          <div className={styles.price}>
            <strong>${book.priceUsd}</strong>
            <span>USD, one-time</span>
          </div>
          <External href={book.buyUrl} className={styles.btnBuy}>Buy on Gumroad {'→'}</External>
        </div>
        <p className={styles.secure}><Lock size={14} aria-hidden="true" /> Secure checkout and instant download on Gumroad.</p>
      </div>
    </section>
  );
}

export default function Ebooks(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const book = EBOOKS[0];
  const banner = useBaseUrl(book?.banner ?? '');
  const coverAbs = `${siteConfig.url}${useBaseUrl(book?.cover ?? '')}`;
  if (!book) return <Layout title="Ebooks"><main className={styles.root} /></Layout>;

  const title = `${book.title} | recode hive Ebooks`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: book.title,
    description: book.summary,
    image: coverAbs,
    author: { '@type': 'Person', name: book.author },
    brand: { '@type': 'Brand', name: 'recode hive' },
    offers: {
      '@type': 'Offer',
      price: String(book.priceUsd),
      priceCurrency: 'USD',
      url: book.buyUrl,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <Layout title={title} description={book.summary}>
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      <main className={styles.root}>
        <header className={styles.hero}>
          <div className={styles.heroBg} aria-hidden="true" />
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>{'✦'} EBOOKS</p>
            <h1 className={styles.h1}>Ebooks for <span className={styles.accent}>builders</span></h1>
            <p className={styles.lede}>
              Practical guides written by the recode hive team. Start with the all in one cheatsheet and interview guide for aspiring data scientists.
            </p>
            <div className={styles.heroBtns}>
              <a className={styles.btnGreen} href="#book">See the ebook {'→'}</a>
              <External href={book.buyUrl} className={styles.btnOutline}>Buy on Gumroad</External>
            </div>
            <p className={styles.facts}>
              <span><b>Python</b> {'·'} SQL {'·'} Statistics</span>
              <span><b>Interview</b> questions included</span>
              <span><b>Instant</b> download</span>
            </p>
          </div>
        </header>

        <div className={styles.wrap}>
          <Book book={book} />

          {book.banner && (
            <div className={styles.bannerFrame}>
              <img
                src={banner}
                alt="All in one guide for data science enthusiasts: the Data Scientist Interview Tips and Cheatsheet ebook with Python, pandas and NumPy"
                width={1200}
                height={675}
                loading="lazy"
              />
            </div>
          )}

          <section className={styles.contribute} aria-labelledby="contribute-title">
            <div>
              <p className={styles.eyebrow}>{'✦'} CONTRIBUTE</p>
              <h2 id="contribute-title" className={styles.h2Sm}>Want a guide on another topic?</h2>
              <p className={styles.contributeText}>
                Tell us which guide you want next, or write one with the community. Every addition is reviewed before it goes live.
              </p>
            </div>
            <div className={styles.heroBtns}>
              <External href={SUGGEST_URL} className={styles.btnGreenSm}>Suggest a topic</External>
              <External href={GUIDE_URL} className={styles.btnOutlineSm}>Contribution guide</External>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
