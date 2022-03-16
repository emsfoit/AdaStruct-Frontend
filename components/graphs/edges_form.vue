<template>
  <div>
    <h3>Edges</h3>
    <b-button variant="outline-success mt-4" @click="add_edge()">
      <b-icon icon="plus"></b-icon>
      Add Edge
    </b-button>
    <form ref="form" @submit.stop.prevent="$emit('submit', graph, 'emb')">
      <div
        class="border mt-4"
        style="padding: 20px"
        :key="edge_idx"
        v-for="(edge, edge_idx) in graph.edges"
      >
        <div class="row">
          <b-form-group label="Name" label-for="name" class="col-md-4">
            <b-form-input id="name" v-model="edge.name" />
          </b-form-group>
          <b-form-group label="Dataframe" label-for="df" class="col-md-4">
            <b-form-select v-model="edge.df" :options="files" required />
          </b-form-group>
          <b-form-group
            label="Extra feature for edge"
            label-for="edge_type_feature"
            class="col-md-4"
          >
            <b-form-select
              v-model="edge.edge_type_feature"
              :options="get_col_options(edge.df)"
            />
          </b-form-group>
        </div>
        <div class="row">
          <b-form-group label="Source" label-for="source" class="col-md-4">
            <b-form-select
              id="source"
              v-model="edge.source"
              :options="get_nodes_options()"
              required
            />
          </b-form-group>

          <b-form-group label="Target" label-for="target" class="col-md-4">
            <b-form-select
              id="target"
              v-model="edge.target"
              :options="get_nodes_options()"
              required
            />
          </b-form-group>

          <b-form-group
            label="Self Edge"
            label-for="selg-edge"
            class="col-md-4"
          >
            <b-form-select
              id="self-edge"
              v-model="edge.self_edge"
              :options="bool_options"
            />
          </b-form-group>
        </div>
        <b-button
          style="color: red"
          variant="link"
          @click="delete_edge(edge_idx)"
          v-if="graph.edges.length > 1"
        >
          remove edge
        </b-button>
      </div>
      <b-button
        variant="outline-primary mt-4"
        @click="$emit('submit', graph, 'nodes')"
      >
        Back
      </b-button>
      <b-button type="submit" variant="outline-primary mt-4"> Next </b-button>
    </form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "edges-form",
  props: {
    orig_graph: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      graph: {},
      bool_options: [
        { text: "No", value: "false" },
        { text: "Yes", value: "true" },
      ],
    };
  },
  methods: {
    get_col_options(filename) {
      let data = this.datasets.find((d) => d.filename == filename);
      if (data) {
        let options = [{ text: "None", value: "" }];
        return options.concat(
          data.header.map((elm) => {
            return { text: elm, value: elm };
          })
        );
      }
      return [];
    },
    get_nodes_options() {
      return this.graph.nodes.map((f) => f.name);
    },
    add_edge() {
      this.graph.edges.push({
        name: "MS",
        df: this.files[0],
        source: "",
        target: "",
        edge_type_feature: "",
        self_edge: "false",
      });
    },
    delete_edge(edge_idx) {
      this.graph.edges.splice(edge_idx, 1);
    },
  },
  computed: {
    ...mapGetters({
      datasets: "datasets/list",
    }),
    files() {
      return this.datasets.map((data) => data.filename);
    },
  },
  created() {
    this.graph = JSON.parse(JSON.stringify(this.orig_graph));
  },
};
</script>
