import { User } from './users';

export const Users: User[] = [
  // ML Repository

  {
    title: 'ML Repository',
    description:
      'Curated collection of machine learning projects, tutorials, and resources for enthusiasts and developers.',
    preview: require('./showcase/machine-learning-project.png'),
    website: 'https://machine-learning-repos.vercel.app/',
    source: 'https://github.com/recodehive/machine-learning-repos',
    tags: ['opensource', 'ml', 'favorite', 'react'],
  },

  //  Opesource project

  {
    title: 'Opesource project',
    description:
      'OpenSource Project is a platform that provides templates and resources for developers to create and contribute to open-source projects.',
    preview: require('./showcase/opesource-project.png'),
    website: 'https://github.com/recodehive/Opensource-practice',
    source: 'https://github.com/recodehive/Opensource-practice',
    tags: ['opensource', 'clone', 'templates'],
  },

  // Scrape ML

  {
    title: 'Scrape ML',
    description:
      'Scrape ML is a Streamlit app that allows users to scrape and analyze data from various websites, providing insights and visualizations for machine learning enthusiasts.',
    preview: require('./showcase/Scrape-ml-project.png'),
    website: 'https://scrape-ml.streamlit.app/',
    source: 'https://github.com/recodehive/Scrape-ML',
    tags: ['opensource', 'templates', 'clone'],
  },

  // StackOverflow Analysis

  {
    title: 'StackOverflow Analysis',
    description:
      'StackOverflow Analysis is a comprehensive data analysis project that explores the vast repository of questions and answers on StackOverflow. ',
    preview: require('./showcase/Stackoverflow-analysis.png'),
    website: 'https://github.com/recodehive/Stackoverflow-Analysis',
    source: null,
    tags: ['opensource', 'product', 'nextjs', 'javascript'],
  },

  // Awesome GitHub Profiles"

  {
    title: 'GitHub Profiles',
    description:
      'Curated list of awesome GitHub profiles showcasing creativity, design, and coding skills.',
    preview: require('./showcase/awesome-project.png'),
    website: 'https://dev.recodehive.com/devfolio',
    source: 'https://github.com/recodehive/awesome-github-profiles',
    tags: ['opensource', 'nextjs', 'typescript', 'ai', 'favorite'],
  },
];
