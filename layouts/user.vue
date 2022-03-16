<template>
  <div class="page-wrapper" v-show="isLoaded">
    <layout-navbar :user="user" />
    <Nuxt />
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
