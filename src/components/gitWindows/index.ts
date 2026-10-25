export { InstallerArt, ApproachCards } from './HeaderArt';
export { default as InstallerPicker } from './InstallerPicker';
export { default as BranchNamePreview } from './BranchNamePreview';
export { default as InstallerWalkthrough } from './InstallerWalkthrough';
export { default as AppTiles } from './AppTiles';
export { WALKTHROUGH_WORDS } from './walkthroughData';
import styles from './GitWindows.module.css';

/** The root class of this page. Pass it to <SetupLesson className={...}> so the page's styles stay under it. */
export const rootClass = styles.gitWindows;
