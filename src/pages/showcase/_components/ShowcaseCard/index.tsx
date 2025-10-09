import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import styles from "./styles.module.css";
import FavoriteIcon from "../../../../components/svgIcons/FavoriteIcon";
import Tooltip from "../ShowcaseTooltip";
import { Tag, TagList, Tags, TagType, User } from "@site/src/data/users";
import { sortBy } from "@site/src/utils/jsUtils";
import IdealImage from "@theme/IdealImage";

const TagComp = React.forwardRef<HTMLLIElement, Tag>(
  ({ label, color, description }, ref) => (
    <li ref={ref} className={styles.tag} title={description}>
      <span className={styles.textLabel}>{label.toLowerCase()}</span>
      <span className={styles.colorLabel} style={{ backgroundColor: color }} />
    </li>
  ),
);

function ShowcaseCardTag({ tags }: { tags: TagType[] }) {
  const tagObjects = tags.map((tag) => ({ tag, ...Tags[tag] }));

  // Keep same order for all tags
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag),
  );

  return (
    <>
      {tagObjectsSorted.map((tagObject, index) => {
        const id = `showcase_card_tag_${tagObject.tag}`;

        return (
          <Tooltip
            key={index}
            text={tagObject.description}
            anchorEl="#__docusaurus"
            id={id}
          >
            <TagComp key={index} {...tagObject} />
          </Tooltip>
        );
      })}
    </>
  );
}

function ShowcaseCard({ user }: { user: User }) {
  const handleCardClick = () => {
    window.open(user.website, "_blank");
  };

  const handleSourceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // The link will handle the navigation
  };

  return (
    <li key={user.title} className={clsx("card shadow--md", styles.card)}>
      <div className={styles.cardLink} onClick={handleCardClick} />
      <div className={clsx("card__image", styles.showcaseCardImage)}>
        <IdealImage img={user.preview} alt={user.title} />
      </div>
      <div className="card__body">
        <div className={styles.showcaseCardHeader}>
          <h4 className={styles.showcaseCardTitle}>
            <Link
              href={user.website}
              className={styles.showcaseCardLink}
              target="_blank"
            >
              {user.title}
            </Link>
          </h4>
          {user.tags.includes("favorite") && (
            <FavoriteIcon svgClass={styles.svgIconFavorite} size="small" />
          )}
          {user.source && (
            <Link
              href={user.source}
              className={clsx(
                "button button--secondary button--sm",
                styles.showcaseCardSrcBtn,
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSourceClick}
            >
              <Translate id="showcase.card.sourceLink">source</Translate>
            </Link>
          )}
        </div>
        <p className={styles.showcaseCardBody}>{user.description}</p>
      </div>
      <ul className={clsx("card__footer", styles.cardFooter)}>
        <ShowcaseCardTag tags={user.tags} />
      </ul>
    </li>
  );
}

export default React.memo(ShowcaseCard);
