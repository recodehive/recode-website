// src/plugins/tailwind-plugin.js
module.exports = function tailwindPlugin() {
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
