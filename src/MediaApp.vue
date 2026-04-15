<template>
  <div class="animate-in">
    <header style="margin-bottom: 3rem; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h2 style="font-size: 2rem; font-weight: 900; color: var(--primary); letter-spacing: -0.03em;">Media Library</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem; font-weight: 500;">Digital asset repository and delivery network</p>
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
          style="background: var(--primary-gradient); color: white; border: none; padding: 0.75rem 1.75rem; border-radius: var(--radius); cursor: pointer; font-weight: 700; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2); transition: transform 0.2s;"
          onmouseover="this.style.transform='translateY(-2px)'"
          onmouseout="this.style.transform='translateY(0)'"
        >
          Upload Asset
        </button>
      </div>
    </header>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 2rem;">
      <div 
        v-for="asset in assets" 
        :key="asset.id" 
        class="module-card" 
        style="padding: 0; overflow: hidden; border: 1px solid var(--border); box-shadow: var(--shadow-sm); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); border-radius: var(--radius);"
        onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='var(--shadow-lg)'"
        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-sm)'"
      >
        <div style="aspect-ratio: 1; background: #f8fafc; overflow: hidden; border-bottom: 1px solid var(--border);">
          <img 
            :src="asset.url" 
            style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s;" 
            :alt="asset.name"
            class="asset-image"
          >
        </div>
        <div style="padding: 1.25rem;">
          <p style="font-size: 0.9rem; font-weight: 800; color: var(--primary); margin-bottom: 0.4rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            {{ asset.name }}
          </p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <p style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">{{ asset.size }} · {{ asset.type.split('/')[1].toUpperCase() }}</p>
            <button @click="deleteAsset(asset.id)" style="padding: 0.4rem 0.75rem; color: #e11d48; border: 1px solid #fecdd3; background: #fff1f2; font-size: 0.7rem; font-weight: 700; border-radius: 6px; cursor: pointer;">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="assets.length === 0" style="text-align: center; padding: 6rem 2rem; border: 2px dashed var(--border); border-radius: var(--radius); background: #fafafa;">
      <div style="font-size: 3rem; margin-bottom: 1rem;">📁</div>
      <h3 style="color: var(--primary); font-weight: 800; margin-bottom: 0.5rem;">Library is Empty</h3>
      <p style="color: var(--text-muted);">Start by uploading your first digital asset.</p>
    </div>
  </div>

</template>

<script lang="ts">
// @ts-nocheck
interface Asset {
  id: number;
  name: string;
  url: string;
  size: string;
  type: string;
}

const STORAGE_KEY = 'cms_assets';

export default {
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
}
</script>
