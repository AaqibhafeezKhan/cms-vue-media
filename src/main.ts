import VueModule from 'vue';
import singleSpaVueModule from 'single-spa-vue';
import MediaApp from './MediaApp.vue';

const Vue = (VueModule as any).default || VueModule;
const singleSpaVue = (singleSpaVueModule as any).default || singleSpaVueModule;

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h: any) {
      return h(MediaApp);
    },
  },
});

export const { bootstrap, mount, unmount } = vueLifecycles;
