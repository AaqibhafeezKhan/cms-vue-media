<template>
  <div class="animate-in">
    <header style="margin-bottom: 2rem;">
      <h2 class="vibrant-text" style="font-size: 2rem;">Media Library</h2>
      <p style="color: var(--text-muted);">Manage your digital assets (Vue + TS)</p>
    </header>

    <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
      <button class="glass-btn active">All Media</button>
      <button class="glass-btn">Images</button>
      <button class="glass-btn">Videos</button>
      <button class="glass-btn" style="margin-left: auto; background: var(--primary); border-color: var(--primary);">
        <span>+</span> Upload New
      </button>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem;">
      <div v-for="i in 8" :key="i" class="card" style="padding: 0.5rem; cursor: pointer; transition: transform 0.3s ease;" @mouseover="hover = i" @mouseleave="hover = null">
        <div style="aspect-ratio: 1; background: #1e293b; border-radius: 0.75rem; overflow: hidden; position: relative;">
          <img :src="`https://picsum.photos/seed/${i+20}/400/400`" style="width: 100%; height: 100%; object-fit: cover;" alt="Gallery image">
          <div v-if="hover === i" style="position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <button class="glass-btn" style="padding: 0.4rem;">👁️</button>
            <button class="glass-btn" style="padding: 0.4rem;">🔗</button>
          </div>
        </div>
        <div style="padding: 0.75rem 0.25rem;">
          <p style="font-size: 0.875rem; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">asset_production_0{{i}}.jpg</p>
          <p style="font-size: 0.75rem; color: var(--text-muted);">1.2 MB • 1200x800</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MediaApp',
  data() {
    return {
      hover: null as number | null
    }
  }
});
</script>

<style scoped>
.card:hover {
  transform: translateY(-5px);
  border-color: var(--primary);
}
</style>
