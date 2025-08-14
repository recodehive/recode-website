console.log('✅ gtag-init.js loaded');

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-W02Z2VJYCR', {
  debug_mode: location.hostname === 'localhost' ? 'true' : 'false'
});
