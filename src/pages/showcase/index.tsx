import React, { useState, useMemo, useEffect, JSX } from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import Head from "@docusaurus/Head";
import ShowcaseTagSelect, {
  readSearchTags,
} from './_components/ShowcaseTagSelect';
import ShowcaseFilterToggle, {
  type Operator,
  readOperator,
} from './_components/ShowcaseFilterToggle';
import ShowcaseCard from './_components/ShowcaseCard';
import ShowcaseTooltip from './_components/ShowcaseTooltip';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Translate, { translate } from '@docusaurus/Translate';
import { useHistory, useLocation } from '@docusaurus/router';
import { usePluralForm } from '@docusaurus/theme-common';
import { motion } from "framer-motion";
import './styles.css';
import { sortedUsers,
  Tags,
  TagList,
  type User,
  type TagType,} from '@site/src/data/users';
import FavoriteIcon from '@site/src/components/svgIcons/FavoriteIcon';
import { useColorMode } from '@docusaurus/theme-common';

const TITLE =
  'Recode Hive: Framing all the opensource projects built by our community members';
const DESCRIPTION =
  'All the opensource projects listed below are available for you to explore, learn, and contribute.';
const EDIT_URL =
  'https://github.com/recodehive';

type UserState = {
  scrollTopPosition: number;
  focusedElementId: string | undefined;
};

function restoreUserState(userState: UserState | null) {
  const { scrollTopPosition, focusedElementId } = userState ?? {
    scrollTopPosition: 0,
    focusedElementId: undefined,
  };
  document.getElementById(focusedElementId)?.focus();
  window.scrollTo({ top: scrollTopPosition });
}

export function prepareUserState(): UserState | undefined {
  if (ExecutionEnvironment.canUseDOM) {
    return {
      scrollTopPosition: window.scrollY,
      focusedElementId: document.activeElement?.id,
    };
  }
  return undefined;
}

const SearchNameQueryKey = 'name';

function readSearchName(search: string) {
  return new URLSearchParams(search).get(SearchNameQueryKey);
}

function filterUsers(
  users: User[],
  selectedTags: TagType[],
  operator: Operator,
  searchName: string | null,
) {
  if (searchName) {
    // eslint-disable-next-line no-param-reassign
    users = users.filter((user) =>
      user.title.toLowerCase().includes(searchName.toLowerCase()),
    );
  }
  if (selectedTags.length === 0) {
    return users;
  }
  return users.filter((user) => {
    if (user.tags.length === 0) {
      return false;
    }
    if (operator === 'AND') {
      return selectedTags.every((tag) => user.tags.includes(tag));
    }
    return selectedTags.some((tag) => user.tags.includes(tag));
  });
}

function useFilteredUsers() {
  const location = useLocation();
  const [operator, setOperator] = useState<Operator>('OR');
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [searchName, setSearchName] = useState<string | null>(null);

  useEffect(() => {
    setSelectedTags(readSearchTags(location.search));
    setOperator(readOperator(location.search));
    setSearchName(readSearchName(location.search));
    // restoreUserState(location?.state);
  }, [location]);

  return useMemo(
    () => filterUsers(sortedUsers, selectedTags, operator, searchName),
    [selectedTags, operator, searchName],
  );
}

function ShowcaseHeader() {
  return (
    <div className="enhanced-showcase-hero">
      <div className="showcase-hero-content">
        <div className="hero-badge">
          <span className="badge-icon">🚀</span>
          <span className="badge-text">Community Showcase</span>
        </div>
        <h1 className="showcase-hero-title">
          Open Source Projects Hub
        </h1>
        <p className="showcase-hero-description">
          {DESCRIPTION}
        </p>
        
        {/* Stats */}
        <div className="showcase-stats">
          <div className="stat-item">
            <div className="stat-number">{sortedUsers.length}+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1050+</div>
            <div className="stat-label">Forks</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">950+</div>
            <div className="stat-label">Stars</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="showcase-cta">
          <a 
            href="https://github.com/recodehive" 
            target="_blank" 
            rel="noopener noreferrer"
            className="primary-cta-button"
          >
            <span className="cta-icon">⭐</span>
            Join the Hive Community
          </a>
        </div>
      </div>
    </div>
  );
}

function useSiteCountPlural() {
  const { selectMessage } = usePluralForm();
  return (sitesCount: number) =>
    selectMessage(
      sitesCount,
      translate(
        {
          id: 'showcase.filters.resultCount',
          description:
            'Pluralized label for the number of sites found on the showcase. Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: '1 project|{sitesCount} projects',
        },
        {sitesCount},
      ),
    );
}

function ShowcaseFilters() {
  const filteredUsers = useFilteredUsers();
  const siteCountPlural = useSiteCountPlural();

  return (
    <div className="enhanced-showcase-filters">
      <div className="filters-header">
        <h2 className="filters-title">
          <span className="title-icon">🔍</span>
          Explore Projects
        </h2>
        <div className="results-count">
          {siteCountPlural(filteredUsers.length)}
        </div>
      </div>
      
      <div className="filters-content">
        <div className="filter-toggle-section">
          <ShowcaseFilterToggle />
        </div>
        
        <div className="tags-grid">
          {TagList.map((tag, i) => {
            const {label, description, color} = Tags[tag];
            const id = `showcase_checkbox_id_${tag}`;

            return (
              <ShowcaseTooltip
                key={tag}
                text={description}
                anchorEl={`#${id}`}
                id={id}
              >
                <ShowcaseTagSelect
                  tag={tag}
                  id={id}
                  label={label}
                  icon={
                    <span
                      style={{
                        backgroundColor: color,
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        marginLeft: 6,
                      }}
                    />
                  }
                />
              </ShowcaseTooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SearchBar() {
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(readSearchName(location.search));
  }, [location]);

  return (
    <div className="enhanced-search-section">
      <div className="search-wrapper">
        <div className="search-icon">🔍</div>
        <input
          id="searchbar"
          placeholder="Search projects..."
          value={value ?? ''}
          className="search-input"
          onInput={(e) => {
            setValue(e.currentTarget.value);
            const newSearch = new URLSearchParams(location.search);
            newSearch.delete(SearchNameQueryKey);
            if (e.currentTarget.value) {
              newSearch.set(SearchNameQueryKey, e.currentTarget.value);
            }
            history.push({
              ...location,
              search: newSearch.toString(),
              state: prepareUserState(),
            });
            setTimeout(() => {
              document.getElementById('searchbar')?.focus();
            }, 0);
          }}
        />
      </div>
    </div>
  );
}

const favoriteUsers = sortedUsers.filter((user) =>
  user.tags.includes('favorite'),
);
const otherUsers = sortedUsers.filter(
  (user) => !user.tags.includes('favorite'),
);

function ShowcaseCards() {
  const filteredUsers = useFilteredUsers();

  if (filteredUsers.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">🔍</div>
        <h3>No projects found</h3>
        <p>Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="showcase-content-section">
      {filteredUsers.length === sortedUsers.length ? (
        <>
          {favoriteUsers.length > 0 && (
            <div className="featured-projects-section">
              <h2 className="section-title">
                <span className="title-icon">⭐</span>
                Best of the Hive
                <span className="section-count">({favoriteUsers.length})</span>
              </h2>
              <div className="projects-grid featured-grid">
                {favoriteUsers.map((user, index) => (
                  <motion.div
                    key={user.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="project-wrapper"
                  >
                    <ShowcaseCard key={user.title} user={user} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {otherUsers.length > 0 && (
            <div className="all-projects-section">
              <h2 className="section-title">
                <span className="title-icon">🌟</span>
                All Projects
                <span className="section-count">({otherUsers.length})</span>
              </h2>
              <div className="projects-grid">
                {otherUsers.map((user, index) => (
                  <motion.div
                    key={user.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="project-wrapper"
                  >
                    <ShowcaseCard key={user.title} user={user} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="filtered-projects-section">
          <h2 className="section-title">
            <span className="title-icon">🔍</span>
            Search Results
            <span className="section-count">({filteredUsers.length})</span>
          </h2>
          <div className="projects-grid">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="project-wrapper"
              >
                <ShowcaseCard key={user.title} user={user} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ShowcaseContent() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <div className="enhanced-showcase-container">
      <ShowcaseHeader />
      <SearchBar />
      <ShowcaseFilters />
      <ShowcaseCards />
    </div>
  );
}

export default function Showcase(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <Head>
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
      </Head>
      <ShowcaseContent />
    </Layout>
  );
}
