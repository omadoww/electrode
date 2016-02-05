const mergeWebpackConfig = require("webpack-partial").default;
const SourceMapDevToolPlugin = require("webpack").SourceMapDevToolPlugin;

module.exports = () => (config) => {
  // TODO: Generate real URLs using SOURCE_MAP_URL.
  const url = () => "[url]";

  return mergeWebpackConfig(config, {
    plugins: [
      new SourceMapDevToolPlugin({
        test: /\.(css|js)($|\?)/,
        filename: "[file].map",
        append: `\n//# sourceMappingURL=${url()}`,
        module: true,
        columns: true
      })
    ]
  });
};
