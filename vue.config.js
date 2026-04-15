module.exports = {
  outputDir: 'dist',
  filenameHashing: false,
  chainWebpack: (config) => {
    config.devServer
      .port(8082)
      .headers({ 'Access-Control-Allow-Origin': '*' });

    config.output
      .filename('main.js')
      .libraryTarget('amd');

    config.optimization.delete('splitChunks');

    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    config.externals(['vue', 'single-spa-vue']);
  },
  css: { extract: false },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/cms-vue-media/'
    : '/',
};
