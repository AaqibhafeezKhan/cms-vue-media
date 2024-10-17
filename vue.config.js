module.exports = {
  configureWebpack: {
    devServer: {
      port: 9002,
    },
    output: {
      publicPath: "http://localhost:9002/",
    },
    plugins: [
      new (require("webpack").container.ModuleFederationPlugin)({
        name: "cmsVueMedia",
        filename: "remoteEntry.js",
        exposes: {
          "./MediaLibrary": "./src/App.vue",
        },
      }),
    ],
  },
};
