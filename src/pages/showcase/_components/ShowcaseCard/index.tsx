import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';
import FavoriteIcon from '../../../../components/svgIcons/FavoriteIcon';
import Tooltip from '../ShowcaseTooltip';
import { Tag, TagList, Tags, TagType, User } from '@site/src/data/users';
import { sortBy } from '@site/src/utils/jsUtils';
import IdealImage from '@theme/IdealImage';

const TagComp = React.forwardRef<
  HTMLLIElement,
  Tag & {label: string}
>(({label, color, description}, ref) => (
  <li 
    ref={ref} 
    className={styles.enhancedTag}
    style={{
      '--tag-color': color,
      backgroundColor: `${color}20`,
      borderColor: `${color}40`
    } as React.CSSProperties}
  >
    <span className={styles.tagDot} style={{backgroundColor: color}}></span>
    {label.toLowerCase()}
  </li>
));

function ShowcaseCardTag({tags}: {tags: TagType[]}) {
  const tagObjects = tags.map((tag) => ({tag, ...Tags[tag]}));
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag),
  );

  return (
    <ul className={styles.enhancedTagsList}>
      {tagObjectsSorted.map((tagObject, index) => {
        const id = `showcase_card_tag_${tagObject.tag}`;
        return (
          <Tooltip
            key={index}
            text={tagObject.description}
            anchorEl={`#${id}`}
            id={id}
          >
            <TagComp key={index} {...tagObject} />
          </Tooltip>
        );
      })}
    </ul>
  );
}

function ShowcaseCard({user}: {user: User}) {
  const handleCardClick = () => {
    window.open(user.website, '_blank');
  };

  const handleSourceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  console.log(user.preview)

  return (
    <div className={styles.enhancedShowcaseCard}>
      {/* Image Section */}
      <div className={styles.showcaseCardImage}>
        <IdealImage img={user.preview} alt={user.title} />
        {user.tags.includes('favorite') && (
          <div className={styles.favoriteIcon}>
            <FavoriteIcon svgClass={styles.svgIconFavorite} size="small" />
          </div>
        )}
        {user.source && (
          <a
            href={user.source}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sourceButton}
            onClick={handleSourceClick}
            title="View Source Code"
          >
            <span className={styles.sourceIcon}>💻</span>
            <span className={styles.sourceText}>source</span>
          </a>
        )}
      </div>

      {/* Content Section */}
      <div className={styles.showcaseCardContent}>
        <div className={styles.showcaseCardHeader}>
          <h3 className={styles.showcaseCardTitle}>{user.title}</h3>
        </div>
        
        <p className={styles.showcaseCardDescription}>{user.description}</p>
        
        {/* Tags */}
        <ShowcaseCardTag tags={user.tags} />
        
        {/* Footer */}
        <div className={styles.showcaseCardFooter}>
          <button className={styles.viewButton} onClick={handleCardClick}>
           
            <span className={styles.viewIcon}>👁️</span>
            View Project
          </button>
        </div>
      </div>

      {/* Card Effects */}
      <div className={styles.cardGlow}></div>
    </div>
  );
}

export default React.memo(ShowcaseCard);
