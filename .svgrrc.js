module.exports = {
  jsxRuntime: 'automatic',
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
            removeDimensions: false,
          },
        },
      },
    ],
  },
  plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
}
