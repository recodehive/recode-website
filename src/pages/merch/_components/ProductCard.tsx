import React from 'react';
import { ShoppingBag } from 'lucide-react';
import ProductImage from './ProductImage';
import styles from '../styles.module.css';
import { store, type Product } from '../../../data/merch';

const money = (n: number) => `$${n.toFixed(2)}`;

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article id={`product-${p.id}`} className={`${styles.card} ${styles.product}`}>
      <div className={`${styles.media} ${p.imageBack ? styles.hasBack : ''}`}>
        <ProductImage src={p.image} alt={p.alt} name={p.name} width={800} height={1000} className={styles.imgFront} />
        {p.imageBack && (
          <>
            <ProductImage src={p.imageBack} alt={`Back print of the ${p.name}`} name={`${p.name} back`} width={800} height={1000} className={styles.imgBack} />
            <span className={styles.backHint} aria-hidden="true">hover: back print</span>
          </>
        )}
        <span className={styles.catPill}>{p.category}</span>
      </div>
      <div className={styles.productBody}>
        <h3 className={styles.productName}>{p.name}</h3>
        <p className={styles.productDesc}>{p.description}</p>
        {p.sizes && p.sizes.length > 0 && (
          <p className={styles.sizes}>
            <span className={styles.sizesLabel}>SIZES</span> {p.sizes.join(' · ')}
          </p>
        )}
        <div className={styles.productFoot}>
          <span className={styles.price}>{money(p.price)}</span>
          <a
            className={styles.notifyBtn}
            href={store.notifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Get notified when the ${p.name} is available`}
          >
            <ShoppingBag size={16} aria-hidden="true" />
            Notify me
          </a>
        </div>
      </div>
    </article>
  );
}
