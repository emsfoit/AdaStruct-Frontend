<template>
  <section class="container mt-4 mb-4">
    <lazy-logs-list />
  </section>
</template>

<script>
import { FETCH_ALL } from "../../../store/types/actions.type";
export default {
  layout: "user",
  name: "Logs",

  methods: {
    fetch_logs() {
      this.$store
        .dispatch(`logs/${FETCH_ALL}`, {})
        .then(() => {})
        .catch((error) => {
          alert(error);
        });
    },
  },
  created() {
    this.fetch_logs();
  },
};
</script>
