<template>
  <section class="container mt-4 mb-4">
    <lazy-logs-show />
  </section>
</template>

<script>
import { FETCH_ONE } from "../../../../store/types/actions.type";
export default {
  layout: "user",
  name: "LogShow",
  data() {
    return {
      fetch_interval: "",
    };
  },
  methods: {
    fetcher() {
      this.fetch_log();
      this.fetch_interval = setInterval(this.fetch_log, 3000);
    },
    fetch_log() {
      return this.$store
        .dispatch(`logs/${FETCH_ONE}`, {
          id: this.$route.params.id,
        })
        .then((data) => {
          if (!data.status.includes("running")) {
            clearInterval(this.fetch_interval);
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
  created() {
    this.fetcher();
  },
};
</script>
