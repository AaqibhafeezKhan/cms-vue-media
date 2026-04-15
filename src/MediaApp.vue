<template>
  <div class="animate-in">
    <header style="margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
      <div>
        <h2 class="vibrant-text" style="font-size: 2rem;">Media Library</h2>
        <p style="color: var(--text-muted); margin-top: 0.25rem;">Manage your digital assets · Vue 2 + TypeScript</p>
      </div>
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="['glass-btn', activeTab === tab.key ? 'active' : '']"
          @click="activeTab = tab.key"
        >{{ tab.label }}</button>
        <button class="glass-btn" style="margin-left: auto; background: var(--primary); border-color: var(--primary);">
          ⬆ Upload New
        </button>
      </div>
    </header>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
      <div v-for="stat in stats" :key="stat.label" class="card" style="text-align: center;">
        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">{{ stat.icon }}</div>
        <div style="font-size: 1.75rem; font-weight: 700;">{{ stat.value }}</div>
        <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.25rem;">{{ stat.label }}</div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1.25rem;">
      <div
        v-for="item in filteredMedia"
        :key="item.id"
        class="card media-card"
        style="padding: 0; overflow: hidden; cursor: pointer;"
        @mouseover="hovered = item.id"
        @mouseleave="hovered = null"
      >
        <div style="aspect-ratio: 1; background: var(--bg-dark); position: relative; overflow: hidden;">
          <img
            :src="`https://picsum.photos/seed/${item.seed}/400/400`"
            style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;"
            :style="{ transform: hovered === item.id ? 'scale(1.08)' : 'scale(1)' }"
            :alt="item.name"
          >
          <div
            v-if="hovered === item.id"
            style="position: absolute; inset: 0; background: rgba(0,0,0,0.55); display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
          >
            <button class="glass-btn" style="padding: 0.5rem 0.75rem; font-size: 0.75rem;">👁 View</button>
            <button class="glass-btn" style="padding: 0.5rem 0.75rem; font-size: 0.75rem;">🔗 Copy</button>
          </div>
          <div style="position: absolute; top: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.6); border-radius: 0.3rem; padding: 0.15rem 0.4rem; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; color: #94a3b8;">{{ item.type }}</div>
        </div>
        <div style="padding: 0.75rem;">
          <p style="font-size: 0.8rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ item.name }}</p>
          <p style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem;">{{ item.size }} · {{ item.dims }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface MediaItem {
  id: number;
  name: string;
  seed: number;
  size: string;
  dims: string;
  type: 'image' | 'video' | 'doc';
}

interface Tab { key: string; label: string; }

const ALL_MEDIA: MediaItem[] = [
  { id: 1, name: 'hero_banner_v3.jpg', seed: 21, size: '2.4 MB', dims: '1920×1080', type: 'image' },
  { id: 2, name: 'product_shoot_01.jpg', seed: 22, size: '1.8 MB', dims: '1200×800', type: 'image' },
  { id: 3, name: 'team_photo_2026.jpg', seed: 23, size: '3.1 MB', dims: '2400×1600', type: 'image' },
  { id: 4, name: 'promo_video.mp4', seed: 24, size: '48 MB', dims: '1920×1080', type: 'video' },
  { id: 5, name: 'icon_set_v2.png', seed: 25, size: '0.9 MB', dims: '512×512', type: 'image' },
  { id: 6, name: 'brand_guidelines.png', seed: 26, size: '1.2 MB', dims: '800×600', type: 'doc' },
  { id: 7, name: 'campaign_bg.jpg', seed: 27, size: '4.2 MB', dims: '3840×2160', type: 'image' },
  { id: 8, name: 'avatar_placeholder.png', seed: 28, size: '0.3 MB', dims: '256×256', type: 'image' },
  { id: 9, name: 'tutorial_clip.mp4', seed: 29, size: '22 MB', dims: '1280×720', type: 'video' },
];

export default Vue.extend({
  name: 'MediaApp',
  data() {
    return {
      hovered: null as number | null,
      activeTab: 'all',
      tabs: [
        { key: 'all', label: '🗂 All Media' },
        { key: 'image', label: '🖼 Images' },
        { key: 'video', label: '🎬 Videos' },
        { key: 'doc', label: '📄 Docs' },
      ] as Tab[],
      media: ALL_MEDIA,
    };
  },
  computed: {
    filteredMedia(): MediaItem[] {
      if (this.activeTab === 'all') return this.media;
      return this.media.filter((m: MediaItem) => m.type === this.activeTab);
    },
    stats() {
      return [
        { label: 'Total Assets', value: this.media.length, icon: '📦' },
        { label: 'Images', value: this.media.filter((m: MediaItem) => m.type === 'image').length, icon: '🖼️' },
        { label: 'Videos', value: this.media.filter((m: MediaItem) => m.type === 'video').length, icon: '🎬' },
      ];
    },
  },
});
</script>

<style scoped>
.media-card {
  transition: transform 0.25s ease, border-color 0.25s ease;
}
.media-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
}
</style>
