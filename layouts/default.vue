<template>
  <div>
    <div v-show="isLoaded">
      <layout-navbar />
      <Nuxt />
      <layout-footer />
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth_checker"],
  data() {
    return {
      isLoaded: false,
    };
  },
  mounted() {
    this.isLoaded = true;
  },
};
</script>
