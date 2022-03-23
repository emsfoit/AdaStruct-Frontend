<template>
  <section class="container mt-4 mb-4">
    <lazy-graphs-config-form
      v-if="loaded"
      :graph="graph"
      @submit_graph_config_form="submit_graph_config_form"
    />
  </section>
</template>

<script>
import {
  PATCH,
  FETCH_ALL,
} from "../../../../../../../store/types/actions.type";
import { NEW_GRAPH_SETTING, OAG } from "../../../../../../../static/graphs";
import { mapGetters } from "vuex";
export default {
  layout: "graph",
  name: "GraphConfig",
  data() {
    return {
      graph: OAG,
      loaded: false,
    };
  },
  methods: {
    fetch_datasets() {
      return this.$store
        .dispatch(`datasets/${FETCH_ALL}`, {
          graph_id: this.$route.params.graphId,
        })
        .then(() => {})
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          this.loaded = true;
        });
    },
    submit_graph_config_form(graph) {
      let self = this;
      this.$store
        .dispatch(`graphs/${PATCH}`, {
          id: this.$route.params.graphId,
          settings: graph,
        })
        .then(() => {
          alert("Updated!");
          self.$router.push(
            `/user/projects/${this.$route.params.id}/graphs/${this.$route.params.graphId}/logs`
          );
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
  created() {
    this.fetch_datasets();
  },
};
</script>

<style>
.bb {
  margin: 0;
  font-family: "Lato", sans-serif;
}

.sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}

.sidebar a.active {
  background-color: #04aa6d;
  color: white;
}

.sidebar a:hover:not(.active) {
  background-color: #555;
  color: white;
}

div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
}

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {
    float: left;
  }
  div.content {
    margin-left: 0;
  }
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
</style>
