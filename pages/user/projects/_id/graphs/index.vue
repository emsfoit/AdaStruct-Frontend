<template>
  <section class="container mt-4 mb-4">
    <b-button
      class="mb-2"
      variant="success"
      size="sm"
      v-b-modal="'graph-form-modal'"
    >
      New Graph
    </b-button>
    <graphs-new-modal />
    <lazy-graphs-list />
  </section>
</template>

<script>
import { FETCH_ALL } from "../../../../../store/types/actions.type";
export default {
  layout: "user",
  name: "Graphs",
  methods: {
    fetch_graphs() {
      this.$store
        .dispatch(`graphs/${FETCH_ALL}`, {
          project_id: this.$route.params.id,
        })
        .then(() => {})
        .catch((error) => {
          alert(error);
        });
    },
  },
  created() {
    this.fetch_graphs();
  },
};
</script>
