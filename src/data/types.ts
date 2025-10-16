/**
 * Type definitions for the Projects data structure
 * Used for dynamic project rendering in the OurProjects component
 */

export interface ProjectItem {
  /** Unique identifier for the project */
  id: number;
  /** Display title of the project */
  title: string;
  /** Detailed description of the project */
  description: string;
  /** Path to the project's preview image */
  image: string;
  /** Live project URL (website/demo) */
  projectUrl: string;
  /** GitHub repository URL */
  githubUrl: string;
  /** Array of technology/category tags */
  tags: string[];
}

export interface ProjectsData {
  /** Section tag/badge text */
  tag: string;
  /** Main section title */
  title: string;
  /** Section description */
  description: string;
  /** Array of project items */
  items: ProjectItem[];
}
