// src/plugins/tailwind-plugin.js
// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = function tailwindPlugin(context, options) {
  return {
    name: "tailwind-plugin",
    configurePostCss(postcssOptions) {
      postcssOptions.plugins = [
        require("@tailwindcss/postcss"),
        // optionally: require("autoprefixer")
      ];
      return postcssOptions;
    },
  };
};
