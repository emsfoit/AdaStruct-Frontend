<template>
  <section class="container mt-4 mb-4">
    <b-button
      class="mb-2"
      variant="success"
      size="sm"
      v-b-modal="'inference-form-modal'"
    >
      New Inference
    </b-button>
    <inferences-form-modal />
    <lazy-inferences-list />
  </section>
</template>

<script>
import {
  FETCH_ALL,
  CREATE,
} from "../../../../../../../store/types/actions.type";
export default {
  layout: "graph",
  name: "GraphInferences",

  methods: {
    fetch_inferences() {
      this.$store
        .dispatch(`inferences/${FETCH_ALL}`, {
          graph_id: this.$route.params.graphId,
        })
        .then(() => {})
        .catch((error) => {
          alert(error);
        });
    },
  },
  created() {
    this.fetch_inferences();
  },
};
</script>
