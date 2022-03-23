<template>
  <div class="container">
    <!-- Nodes -->
    <graphs-nodes-form
      :orig_graph="mutabel_graph"
      @submit="go_to"
      v-if="show == 'nodes'"
    />
    <graphs-edges-form
      :orig_graph="mutabel_graph"
      @submit="go_to"
      v-if="show == 'edges'"
    />
    <graphs-emb-form
      :orig_graph="mutabel_graph"
      @go_to="go_to"
      @submit="$emit('submit_graph_config_form', mutabel_graph)"
      v-if="show == 'emb'"
    />
    <!-- Edges -->
  </div>
</template>
<script>
export default {
  name: "GraphConfigForm",
  props: {
    graph: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      show: "nodes",
      mutabel_graph: {},
    };
  },
  methods: {
    go_to(mutabel_graph, to = "edges") {
      this.mutabel_graph = mutabel_graph;
      this.show = to;
    },
  },
  created() {
    this.mutabel_graph = JSON.parse(JSON.stringify(this.graph));
  },
};
</script>
