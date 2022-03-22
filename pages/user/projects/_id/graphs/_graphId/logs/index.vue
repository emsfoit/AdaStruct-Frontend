<template>
  <section class="container mt-4 mb-4">
    <lazy-logs-list />
  </section>
</template>

<script>
import {
  FETCH_ALL,
  CREATE,
} from "../../../../../../../store/types/actions.type";
import { mapGetters } from "vuex";
export default {
  layout: "graph",
  name: "GraphLogs",

  methods: {
    fetch_logs() {
      this.$store
        .dispatch(`logs/${FETCH_ALL}`, {
          graph_id: this.$route.params.graphId,
        })
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
