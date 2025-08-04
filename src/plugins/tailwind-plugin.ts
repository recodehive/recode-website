// src/plugins/tailwind-plugin.js
module.exports = function tailwindPlugin(context, options) {
  return {
    name: 'tailwind-plugin',
    configurePostCss(postcssOptions) {
      postcssOptions.plugins = [
        require('@tailwindcss/postcss'),
        // optionally: require("autoprefixer")
      ];
      return postcssOptions;
    },
  };
};
