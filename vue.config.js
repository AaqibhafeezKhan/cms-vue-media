module.exports = {
  chainWebpack: (config) => {
    config.devServer.set('port', 8082);
    config.externals(['vue', 'vue-router']);
    config.output.libraryTarget('system');
  },
  filenameHashing: false,
};
