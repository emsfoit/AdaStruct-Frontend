<template>
  <div class="page-wrapper" v-show="isLoaded">
    <!-- <navigation /> -->
    <Nuxt />
    <!-- <error v-else />
    <app-footer /> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "users_layout",
  middleware: ["user"],
  data() {
    return {
      isLoaded: false,
      error: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  mounted() {
    this.isLoaded = true;
  },
};
</script>
