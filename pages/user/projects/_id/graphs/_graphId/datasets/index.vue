<template>
  <section class="container mt-4 mb-4">
    <b-button
      class="mb-2"
      variant="success"
      size="sm"
      v-b-modal="'dataset-form-modal'"
    >
      Upload Datasets
    </b-button>
    <datasets-form @submitFiles="submitFiles" />
    <lazy-datasets-list />
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
  name: "GraphDataset",

  methods: {
    submitFiles(files, sep) {
      this.$store
        .dispatch(`datasets/${CREATE}`, {
          files: files,
          sep: sep,
          graph_id: this.$route.params.graphId,
        })
        .then(() => {})
        .catch(() => {
          alert("Error");
        });
    },
    fetch_datasets() {
      return this.$store
        .dispatch(`datasets/${FETCH_ALL}`, {
          graph_id: this.$route.params.graphId,
        })
        .then(() => {})
        .catch((error) => {
          alert(error);
        });
    },
  },
  computed: {
    ...mapGetters({
      datasets: "datasets/list",
    }),
  },
  created() {
    this.fetch_datasets();
  },
};
</script>
