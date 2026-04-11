import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import MediaApp from './MediaApp.vue';

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(MediaApp);
    },
  },
});

export const { bootstrap, mount, unmount } = vueLifecycles;
