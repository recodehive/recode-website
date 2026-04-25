import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Socials from '@theme/BlogPostAuthor/Socials';
import styles from './styles.module.css';

export default function BlogPostAuthor({author, className}) {
  const {name, title, url, imageURL, socials} = author;
  return (
    <div className={clsx('avatar margin-bottom--sm', className)}>
      {imageURL && (
        <Link className="avatar__photo-link" href={url || imageURL}>
          <img className={clsx('avatar__photo', styles.authorPhoto)} src={imageURL} alt={name} />
        </Link>
      )}
      <div className="avatar__intro">
        <div className="avatar__name">
          <Link href={url} itemProp="name">
            {name}
          </Link>
        </div>
        {title && (
          <small className="avatar__subtitle" itemProp="description">
            {title}
          </small>
        )}
        <Socials author={author} />
      </div>
    </div>
  );
}
