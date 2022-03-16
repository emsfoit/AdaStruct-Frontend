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
      @submit="submit"
      v-if="show == 'emb'"
    />
    <!-- Edges -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { PATCH, FETCH_ALL } from "../../store/types/actions.type";
import { REDDIT_GRAPH, OAG } from "../../static/graphs";
export default {
  name: "new-modal",
  data() {
    return {
      graph: OAG,
      show: "nodes",
    };
  },
  methods: {
    get_data() {
      this.$store
        .dispatch(`datasets/${FETCH_ALL}`, {
          project_id: this.$route.params.id,
        })
        .then(() => {})
        .catch((error) => {
          alert(error);
        });
    },
    go_to(graph, to = "edges") {
      this.graph = graph;
      this.show = to;
    },
    submit(graph) {
      this.$store
        .dispatch(`projects/${PATCH}`, {
          id: this.$route.params.id,
          graph_setting: graph,
        })
        .then(() => {
          this.$router.push({
            path: "/user/projects",
          });
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
  created() {
    this.get_data();
  },
};
</script>
