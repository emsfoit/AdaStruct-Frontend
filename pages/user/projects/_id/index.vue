<template>
  <div>
    <div class="sidebar">
      <a @click="show_tab('graphs')" class="active" href="#graphs">Graphs</a>
      <a @click="show_tab('inferences')" href="#inferences">Inferences</a>
      <a @click="show_tab('models')" href="#models">Models</a>
    </div>
    <div class="content">
      {{ current_path }}
      <div id="graph_tab">
        <!-- Top Graphs -->
        <lazy-graphs-list
          v-if="current_tab == 'graphs'"
          @show_graph_details="show_graph_details"
        />
        <!-- Graph Details -->
        <div v-if="current_tab == 'graph-details'">
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Dataset" active>
                <b-card-text
                  ><lazy-datasets-list @submitFiles="submitFiles"
                /></b-card-text>
              </b-tab>
              <b-tab title="Config" :disabled="disable_tabs">
                <b-card-text>
                  <lazy-graphs-config-form
                    :graph="graph"
                    @submit_graph_config_form="submit_graph_config_form"
                  />
                </b-card-text>
              </b-tab>
              <b-tab
                @click="fetch_logs"
                title="Build Logs"
                :disabled="disable_tabs"
              >
                <b-card-text>
                  <lazy-logs-list />
                  <!-- <lazy-logs-list /> -->
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
        <div @click="fetch_logs" v-if="current_tab == 'inferences'">
          <lazy-inferences-list @fetch_log="fetch_log" />
        </div>
      </div>
    </div>
    <!-- <lazy-graphs-form /> -->
  </div>
</template>

<script>
import {
  FETCH_ALL,
  CREATE,
  PATCH,
  FETCH_ONE,
} from "../../../../store/types/actions.type";
import { NEW_GRAPH_SETTING, OAG } from "../../../../static/graphs";
import { mapGetters } from "vuex";
export default {
  layout: "user",
  name: "Graph",
  data() {
    return {
      current_tab: "graphs",
      show_run: false,
      current_path: "ms",
      selected_graph: "",
      graph: OAG,
      log_id: 1,
    };
  },
  methods: {
    show_tab(tab) {
      this.current_tab = tab;
    },
    show_graph_details(id) {
      this.selected_graph = id;
      this.fetch_datasets();
      this.current_tab = "graph-details";
    },
    // Files Form
    submitFiles(files, sep) {
      this.$store
        .dispatch(`datasets/${CREATE}`, {
          files: files,
          sep: sep,
          graph_id: this.selected_graph,
        })
        .then(() => {})
        .catch(() => {
          alert("Error");
        });
    },
    // Config Form
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
    fetch_datasets() {
      return this.$store
        .dispatch(`datasets/${FETCH_ALL}`, {
          graph_id: this.selected_graph,
        })
        .then(() => {})
        .catch((error) => {
          alert(error);
        });
    },
    fetch_logs() {
      let x = this.selected_graph;
      debugger;
      this.$store
        .dispatch(`logs/${FETCH_ALL}`, {
          graph_id: this.selected_graph,
        })
        .then(() => {})
        .catch((error) => {
          alert(error);
        });
    },
    fetch_log(id) {
      this.$store
        .dispatch(`logs/${FETCH_ONE}`, {
          id: id,
        })
        .then(() => {})
        .catch((error) => {
          alert(error);
        });
    },
    fetch_inferences() {
      this.$store
        .dispatch(`inferences/${FETCH_ALL}`, {})
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
    disable_tabs() {
      return this.datasets.length == 0;
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
