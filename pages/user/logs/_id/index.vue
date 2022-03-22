<template>
  <section class="container mt-4 mb-4">
    <lazy-logs-show />
  </section>
</template>

<script>
import { FETCH_ONE } from "../../../../store/types/actions.type";
export default {
  layout: "user",
  name: "Log-Show",

  methods: {
    fetch_log() {
      this.$store
        .dispatch(`logs/${FETCH_ONE}`, {
          id: this.$route.params.id,
        })
        .then(() => {})
        .catch((error) => {
          alert(error);
        });
    },
  },
  created() {
    this.fetch_log();
  },
};
</script>
