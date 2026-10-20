/** Opens the site search. The search itself is the Algolia SiteSearch widget mounted in the navbar. */
export function openSearch(): void {
  const btn = document.querySelector<HTMLElement>('.algolia-sitesearch-navbar button, #algolia-sitesearch-navbar button');
  if (btn) {
    btn.click();
    return;
  }
  // Fall back to the keyboard shortcut the widget listens for.
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
}
