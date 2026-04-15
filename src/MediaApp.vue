<template>
  <div class="animate-in">
    <header style="margin-bottom: 2.5rem; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--primary);">Media Library</h2>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Digital asset repository and management</p>
      </div>
      <div style="display: flex; gap: 1rem;">
        <input 
          type="file" 
          ref="fileInput" 
          @change="handleUpload" 
          style="display: none"
          accept="image/*"
        >
        <button 
          @click="$refs.fileInput.click()" 
          class="glass-btn active" 
          style="background: var(--primary-accent); color: white; border: none; padding: 0.6rem 1.2rem; border-radius: var(--radius); cursor: pointer; font-weight: 600;"
        >
          Upload Asset
        </button>
      </div>
    </header>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem;">
      <div 
        v-for="asset in assets" 
        :key="asset.id" 
        class="module-card" 
        style="padding: 0; overflow: hidden; position: relative;"
      >
        <div style="aspect-ratio: 16/10; background: var(--bg-soft); overflow: hidden;">
          <img 
            :src="asset.url" 
            style="width: 100%; height: 100%; object-fit: cover;" 
            :alt="asset.name"
          >
        </div>
        <div style="padding: 1rem;">
          <p style="font-size: 0.8rem; font-weight: 700; margin-bottom: 0.25rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            {{ asset.name }}
          </p>
          <p style="font-size: 0.7rem; color: var(--text-muted);">{{ asset.size }} · {{ asset.type }}</p>
          <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
            <button @click="deleteAsset(asset.id)" class="nav-item" style="padding: 0.25rem 0.5rem; color: #ef4444; border: none; background: none; font-size: 0.75rem;">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="assets.length === 0" style="text-align: center; padding: 4rem; color: var(--text-muted);">
      <p>No assets in the library. Start by uploading an image.</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface Asset {
  id: number;
  name: string;
  url: string;
  size: string;
  type: string;
}

const STORAGE_KEY = 'cms_assets';

export default Vue.extend({
  name: 'MediaApp',
  data() {
    return {
      assets: [] as Asset[]
    };
  },
  mounted() {
    this.loadAssets();
  },
  methods: {
    loadAssets() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        this.assets = JSON.parse(saved);
      } else {
        const initial: Asset[] = [
          { id: 1, name: 'architecture_diagram.jpg', url: 'https://picsum.photos/seed/cms1/800/600', size: '1.2MB', type: 'image/jpeg' },
          { id: 2, name: 'team_retreat_2026.jpg', url: 'https://picsum.photos/seed/cms2/800/600', size: '2.4MB', type: 'image/jpeg' },
          { id: 3, name: 'product_shot_01.png', url: 'https://picsum.photos/seed/cms3/800/600', size: '800KB', type: 'image/png' }
        ];
        this.assets = initial;
        this.saveAssets();
      }
    },
    saveAssets() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.assets));
    },
    handleUpload(event: any) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const newAsset: Asset = {
          id: Date.now(),
          name: file.name,
          url: e.target.result,
          size: (file.size / 1024 / 1024).toFixed(1) + 'MB',
          type: file.type
        };
        this.assets.unshift(newAsset);
        this.saveAssets();
      };
      reader.readAsDataURL(file);
    },
    deleteAsset(id: number) {
      this.assets = this.assets.filter(a => a.id !== id);
      this.saveAssets();
    }
  }
});
</script>
