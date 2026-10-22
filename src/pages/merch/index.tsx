import React, { useMemo, useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { Hexagon, Printer, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import ProductImage from './_components/ProductImage';
import ProductCard from './_components/ProductCard';
import {
  products, bundle, store, faqs, heroImage, wideImage,
  type Category, type Product,
} from '../../data/merch';
import styles from './styles.module.css';

type Sort = 'featured' | 'low' | 'high';
const SORT_LABEL: Record<Sort, string> = {
  featured: 'Featured',
  low: 'Price: low to high',
  high: 'Price: high to low',
};
const MANIFESTO = ['Learn.', 'Collaborate.', 'Build.', 'Earn.', 'Grow.'];
const CONTACT_URL = '/contact-us';
const money = (n: number) => `$${n.toFixed(2)}`;

const byId = (id: string): Product | undefined => products.find((p) => p.id === id);

function scrollToId(id: string) {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

function ManifestoStack({ size }: { size: 'md' | 'lg' }) {
  return (
    <div className={size === 'lg' ? styles.wordsLg : styles.wordsMd} aria-label={MANIFESTO.join(' ')}>
      {MANIFESTO.map((w, i) => (
        <span key={w} aria-hidden="true" className={i === MANIFESTO.length - 1 ? styles.accent : undefined}>{w}</span>
      ))}
    </div>
  );
}

export default function Merch(): ReactNode {
  const [category, setCategory] = useState<'all' | Category>('all');
  const [sort, setSort] = useState<Sort>('featured');
  const [openFaq, setOpenFaq] = useState(0);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return cats.map((c) => ({ key: c, count: products.filter((p) => p.category === c).length }));
  }, []);

  const shown = useMemo(() => {
    const list = products.filter((p) => category === 'all' || p.category === category);
    if (sort === 'low') return [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, sort]);

  const goShop = (cat: 'all' | Category) => {
    setCategory(cat);
    scrollToId('shop');
  };
  const goProduct = (p: Product) => {
    setCategory(p.category);
    // wait for the filter to render, then jump to the card
    window.setTimeout(() => scrollToId(`product-${p.id}`), 50);
  };

  // Trust strip: built only from filled store fields
  const trust = [
    (store.shipsTo || store.shippingDays) && {
      key: 'ship', Icon: Truck,
      title: store.shipsTo ? `Ships to ${store.shipsTo}` : 'Shipping',
      sub: store.shippingDays ? `Delivery in ${store.shippingDays}` : '',
    },
    store.returnDays && {
      key: 'returns', Icon: RotateCcw,
      title: `${store.returnDays}-day returns`,
      sub: '',
    },
    store.printPartner && {
      key: 'print', Icon: Printer,
      title: `Printed by ${store.printPartner}`,
      sub: '',
    },
    store.checkoutProvider && {
      key: 'checkout', Icon: ShieldCheck,
      title: 'Secure checkout',
      sub: `Powered by ${store.checkoutProvider}`,
    },
  ].filter(Boolean) as { key: string; Icon: typeof Truck; title: string; sub: string }[];

  const heroHoodie = byId('hoodie');
  const heroTee = byId('tee');

  const bundleItems = bundle.items.map(byId).filter((p): p is Product => Boolean(p));
  const separateTotal = bundleItems.reduce((sum, p) => sum + p.price, 0);
  const savedPct = Math.max(0, Math.round((1 - bundle.price / separateTotal) * 100));

  const answered = faqs.filter((f) => f.a.trim() !== '');
  const links = [
    store.policyLinks.shipping && { label: 'Shipping policy', href: store.policyLinks.shipping },
    store.policyLinks.returns && { label: 'Returns policy', href: store.policyLinks.returns },
    store.policyLinks.terms && { label: 'Terms', href: store.policyLinks.terms },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <Layout
      title="Merch"
      description="Official recode hive merch: oversized tees, manifesto hoodie, hex logo cap, mug, bottle, notebook and tote for developers in the community."
    >
      <main className={styles.page}>
        {/* Hero */}
        <section className={styles.hero} aria-labelledby="merch-heading">
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={`${styles.container} ${styles.heroInner}`}>
            <div className={styles.heroText}>
              <p className={styles.eyebrow}>✦ OFFICIAL RECODE HIVE MERCH</p>
              <h1 id="merch-heading" className={styles.h1}>Wear the <span className={styles.accent}>hive.</span></h1>
              <p className={styles.lead}>
                Tees, hoodies and desk gear with the hex logo and the five words the community runs on.
              </p>
              <div className={styles.actions}>
                <button type="button" className={styles.btnPrimary} onClick={() => goShop('all')}>Shop the collection</button>
                <button type="button" className={styles.btnOutline} onClick={() => goShop('Apparel')}>Shop apparel</button>
              </div>
              <div className={styles.manifestoRow}>
                <ManifestoStack size="md" />
                <span className={styles.vRule} aria-hidden="true" />
                <p className={styles.manifestoCaption}>The manifesto print, on the hoodie, the mug and the tote.</p>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <ProductImage src={heroImage.src} alt={heroImage.alt} name="Manifesto Hoodie" width={1300} height={1040} className={styles.heroMain} eager />
              {heroTee && (
                <ProductImage src={heroTee.image} alt={heroTee.alt} name={heroTee.name} width={210} height={262} className={styles.heroTee} eager />
              )}
              <span className={`${styles.floatTag} ${styles.tagTop}`}>
                <span className={styles.tagIcon}><Hexagon size={18} aria-hidden="true" /></span>
                <span>
                  <span className={styles.tagName}>{products.length} items</span>
                  <span className={styles.tagSub}>Apparel, drinkware, desk</span>
                </span>
              </span>
              {heroHoodie && (
                <span className={`${styles.floatTag} ${styles.tagBottom}`}>
                  <ProductImage src={heroHoodie.image} alt="" name="" width={44} height={44} className={styles.tagThumb} />
                  <span>
                    <span className={styles.tagName}>{heroHoodie.name}</span>
                    <span className={styles.tagPrice}>{money(heroHoodie.price)}</span>
                  </span>
                </span>
              )}
            </div>
          </div>
        </section>

        {trust.length > 0 && (
          <section className={styles.container} aria-label="Store information">
            <ul className={styles.trust}>
              {trust.map(({ key, Icon, title, sub }) => (
                <li key={key} className={styles.trustItem}>
                  <span className={styles.trustIcon}><Icon size={18} aria-hidden="true" /></span>
                  <span className={styles.trustText}>
                    <span className={styles.trustTitle}>{title}</span>
                    {sub && <span className={styles.trustSub}>{sub}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Shop */}
        <section id="shop" className={`${styles.container} ${styles.section}`} aria-labelledby="shop-heading">
          <div className={styles.headRow}>
            <div className={styles.head}>
              <p className={styles.eyebrow}>✦ SHOP</p>
              <h2 id="shop-heading" className={styles.h2}>The collection</h2>
            </div>
            <label className={styles.sort}>
              <span className={styles.srOnly}>Sort products</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                aria-label="Sort products"
                className={styles.sortSelect}
              >
                {(Object.keys(SORT_LABEL) as Sort[]).map((k) => (
                  <option key={k} value={k} className={styles.sortOption}>
                    {SORT_LABEL[k]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div role="group" aria-label="Category" className={styles.chips}>
            <button type="button" aria-pressed={category === 'all'} className={`${styles.chip} ${category === 'all' ? styles.chipOn : ''}`} onClick={() => setCategory('all')}>
              All <span className={styles.count}>{products.length}</span>
            </button>
            {categories.map((c) => (
              <button key={c.key} type="button" aria-pressed={category === c.key} className={`${styles.chip} ${category === c.key ? styles.chipOn : ''}`} onClick={() => setCategory(c.key)}>
                {c.key} <span className={styles.count}>{c.count}</span>
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {shown.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>

        {/* Manifesto band */}
        <section className={`${styles.container} ${styles.section}`} aria-labelledby="manifesto-heading">
          <div className={styles.band}>
            <div className={styles.bandMedia}>
              <ProductImage src={wideImage.src} alt={wideImage.alt} name="Hive Oversized Tee" width={1300} height={1040} className={styles.bandImg} />
            </div>
            <div className={styles.bandText}>
              <p className={`${styles.eyebrow} ${styles.eyebrowLight}`}>✦ THE MANIFESTO COLLECTION</p>
              <h2 id="manifesto-heading" className={styles.srOnly}>The manifesto collection</h2>
              <ManifestoStack size="lg" />
              {store.manifestoNote && <p className={styles.bandNote}>{store.manifestoNote}</p>}
              <div className={styles.bandChips}>
                {['hoodie', 'mug', 'tote'].map(byId).filter((p): p is Product => Boolean(p)).map((p) => (
                  <button key={p.id} type="button" className={styles.bandChip} onClick={() => goProduct(p)}>
                    <ProductImage src={p.image} alt="" name="" width={40} height={50} className={styles.bandThumb} />
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bundle */}
        <section className={`${styles.container} ${styles.section}`} aria-labelledby="bundle-heading">
          <div className={`${styles.card} ${styles.bundle}`}>
            <div className={styles.bundleMedia}>
              {bundleItems.map((p, i) => (
                <ProductImage key={p.id} src={p.image} alt={p.alt} name={p.name} width={400} height={500} className={i === 0 ? styles.bundleTall : styles.bundleSmall} />
              ))}
            </div>
            <div className={styles.bundleBody}>
              <p className={styles.eyebrow}>✦ BUNDLE</p>
              <h2 id="bundle-heading" className={styles.h2Sm}>{bundle.name}</h2>
              <p className={styles.sub}>Notebook, mug and bottle, packed together. Built for the desk you code at.</p>
              <ul className={styles.checklist}>
                {bundleItems.map((p) => (
                  <li key={p.id}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                    <span>{p.name}</span>
                    <span className={styles.itemPrice}>{money(p.price)}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.bundlePrice}>
                <span className={styles.bundleNow}>{money(bundle.price)}</span>
                <s className={styles.bundleWas}>{money(separateTotal)}</s>
                {savedPct > 0 && <span className={styles.saveChip}>save {savedPct}% vs separately</span>}
              </div>
              <a className={styles.btnPrimary} href={store.notifyUrl} target="_blank" rel="noopener noreferrer" aria-label={`Get notified when ${bundle.name} is available`}>
                Notify me
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {answered.length > 0 && (
          <section className={`${styles.container} ${styles.section}`} aria-labelledby="faq-heading">
            <div className={styles.faqWrap}>
              <div className={styles.faqIntro}>
                <p className={styles.eyebrow}>✦ BEFORE YOU ORDER</p>
                <h2 id="faq-heading" className={styles.h2}>Shipping, sizing and returns</h2>
                <p className={styles.sub}>
                  Still unsure? <Link to={CONTACT_URL}>Contact us</Link> and a human from the hive will reply.
                </p>
              </div>
              <div className={styles.faqList}>
                {answered.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <div key={f.q} className={styles.faqItem}>
                      <h3 className={styles.faqQ}>
                        <button type="button" aria-expanded={open} aria-controls={`faq-panel-${i}`} id={`faq-btn-${i}`} className={styles.faqBtn} onClick={() => setOpenFaq(open ? -1 : i)}>
                          <span>{f.q}</span>
                          <span className={`${styles.plus} ${open ? styles.plusOpen : ''}`} aria-hidden="true">+</span>
                        </button>
                      </h3>
                      <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} hidden={!open} className={styles.faqA}>
                        <p>{f.a}</p>
                      </div>
                    </div>
                  );
                })}
                {links.length > 0 && (
                  <div className={styles.policyLinks}>
                    {links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
