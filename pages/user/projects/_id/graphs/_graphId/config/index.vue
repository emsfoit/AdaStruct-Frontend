<template>
  <section class="container mt-4 mb-4">
    <lazy-graphs-config-form
      :graph="graph"
      @submit_graph_config_form="submit_graph_config_form"
    />
  </section>
</template>

<script>
import { PATCH } from "../../../../../../../store/types/actions.type";
import { NEW_GRAPH_SETTING, OAG } from "../../../../../../../static/graphs";
import { mapGetters } from "vuex";
export default {
  layout: "graph",
  name: "GraphConfig",
  data() {
    return {
      graph: OAG,
    };
  },
  methods: {
    submit_graph_config_form(graph) {
      this.$store
        .dispatch(`graphs/${PATCH}`, {
          id: this.selected_graph,
          settings: graph,
        })
        .then(() => {
          alert("Updated!");
          // this.$router.push({
          //   path: "/user/projects",
          // });
        })
        .catch((error) => {
          alert(error);
        });
    },
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
