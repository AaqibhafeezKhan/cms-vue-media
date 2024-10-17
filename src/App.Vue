<template>
  <div>
    <h2>Media Library</h2>
    <input type="file" @change="uploadFile" />
  </div>
</template>

<script>
export default {
  methods: {
    uploadFile(event) {
      const file = event.target.files[0];
      console.log("Uploading file: ", file);
    },
  },
};
</script>
