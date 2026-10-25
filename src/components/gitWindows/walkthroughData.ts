// The seven installer screens after the PATH screen. `text` is the page copy. The rest draws the simplified installer window.

export type Screen = {
  text: string;
  title: string;
  /** The recommended options are the ones the text tells the reader to choose. */
  options: { label: string; selected?: boolean }[];
  kind: 'radio' | 'checkbox';
  /** Label of the main button. The last screen installs. */
  button?: string;
};

export const SCREENS: Screen[] = [
  {
    text: 'On the next screen, choose the SSH executable. Use the default one, Use bundled OpenSSH, which is the default option.',
    title: 'Choosing the SSH executable',
    options: [{ label: 'Use bundled OpenSSH', selected: true }, { label: 'Use external OpenSSH' }],
    kind: 'radio',
  },
  {
    text: 'Next, you will be asked to configure the line ending conversions. Keep the default, which is option 1.',
    title: 'Configuring the line ending conversions',
    options: [
      { label: 'Checkout Windows-style, commit Unix-style line endings', selected: true },
      { label: 'Checkout as-is, commit Unix-style line endings' },
      { label: 'Checkout as-is, commit as-is' },
    ],
    kind: 'radio',
  },
  {
    text: 'The next step configures the terminal emulator to use with Git Bash. Keep the default, which is option 1.',
    title: 'Configuring the terminal emulator to use with Git Bash',
    options: [{ label: 'Use MinTTY (the default terminal of MSYS2)', selected: true }, { label: "Use Windows' default console window" }],
    kind: 'radio',
  },
  {
    text: 'Next, choose the default behaviour of git pull. Use the default one, Fast-forward or merge, which is option 1.',
    title: 'Choose the default behavior of git pull',
    options: [{ label: 'Fast-forward or merge', selected: true }, { label: 'Rebase' }, { label: 'Only ever fast-forward' }],
    kind: 'radio',
  },
  {
    text: 'On the Credential helper screen, choose Git Credential Manager and click Next.',
    title: 'Choose a credential helper',
    options: [{ label: 'Git Credential Manager', selected: true }, { label: 'None' }],
    kind: 'radio',
  },
  {
    text: 'Enable the extra option: check Enable file system caching and click Next.',
    title: 'Configuring extra options',
    options: [{ label: 'Enable file system caching', selected: true }, { label: 'Enable symbolic links' }],
    kind: 'checkbox',
  },
  {
    text: 'The next screen asks about experimental support. Click Install, then choose Launch Git Bash on the final screen.',
    title: 'Configuring experimental options',
    options: [{ label: 'Enable experimental support for pseudo consoles' }, { label: 'Enable experimental built-in file system monitor' }],
    kind: 'checkbox',
    button: 'Install',
  },
];

/** Words in this data, so the header's reading time counts what the walkthrough teaches. */
export const WALKTHROUGH_WORDS = SCREENS.reduce((n, s) => n + s.text.split(/\s+/).length, 0);
