<template>
  <div class="container">
    <!-- Nodes -->
    <graphs-nodes-form
      :orig_graph="graph"
      @submit="go_to"
      v-if="show == 'nodes'"
    />
    <graphs-edges-form
      :orig_graph="graph"
      @submit="go_to"
      v-if="show == 'edges'"
    />
    <graphs-emb-form
      :orig_graph="graph"
      @go_to="go_to"
      @submit="$emit('submit_graph_config_form', graph)"
      v-if="show == 'emb'"
    />
    <!-- Edges -->
  </div>
</template>
<script>
export default {
  name: "InferenceConfigForm",
  props: {
    graph: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      show: "nodes",
    };
  },
  methods: {
    go_to(graph, to = "edges") {
      this.graph = graph;
      this.show = to;
    },
  },
};
</script>
