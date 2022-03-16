<template>
  <div></div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "representation",
  props: {
    orig_graph: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      graph: {},
    };
  },
  methods: {},
  computed: {
    ...mapGetters({
      datasets: "datasets/list",
    }),
    files() {
      return this.datasets.map((data) => data.filename);
    },
    get_col_options() {
      return (filename, features = undefined) => {
        let data = this.datasets.find((d) => d.filename == filename);
        if (data) {
          let selected = [];
          if (features) {
            selected = features.map((f) => f.column_name);
          }
          let options = data.header.map((x) => {
            let disabled = selected.indexOf(x) > -1 ? true : false;
            return { text: x, value: x, disabled: disabled };
          });
          return options;
        }
        return [];
      };
    },
    get_nodes_options() {
      let data = this.graph.nodes.map((f) => f.name);
      return data;
    },
  },
  created() {
    this.graph = JSON.parse(JSON.stringify(this.orig_graph));
  },
};
</script>

<style scoped>
.header {
  margin: 10px 0px;
}
</style>
