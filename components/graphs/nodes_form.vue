<template>
  <div>
    <b-button variant="outline-success mt-4" @click="add_node()">
      <b-icon icon="plus"></b-icon>
      Add Node
    </b-button>
    <h2 class="header">Nodes</h2>

    <form ref="form" @submit.stop.prevent="$emit('submit', graph)">
      <!-- Nodes -->
      <div
        class="border mt-4"
        style="padding: 20px"
        :key="node_idx"
        v-for="(node, node_idx) in graph.nodes"
      >
        <div class="row">
          <b-form-group label="Node name" label-for="name" class="col-md-6">
            <b-form-input id="name" v-model="node.name" required />
          </b-form-group>
          <b-form-group label="Dataframe" label-for="df" class="col-md-6">
            <b-form-select v-model="node.df" :options="files" required />
          </b-form-group>
        </div>
        <div
          class="row"
          :key="featur_idx"
          v-for="(feature, featur_idx) in node.features"
        >
          <b-form-group label="Name" label-for="name" class="col-md-6">
            <b-form-select
              v-model="feature.column_name"
              :options="get_col_options(node.df, node.features)"
              @change="column_name_changed($event, node_idx, featur_idx)"
              required
            />
          </b-form-group>
          <b-form-group
            label="Feature Name"
            label-for="feature_name"
            class="col-md-6"
          >
            <b-input-group>
              <b-form-input
                :disabled="featur_idx == 0"
                v-model="feature.feature_name"
                required
              />
              <b-input-group-append>
                <b-button
                  variant="outline-danger"
                  @click="delete_feature(node_idx, featur_idx)"
                  :disabled="featur_idx == 0"
                  ><b-icon icon="x-circle"> </b-icon
                ></b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </div>
        <b-button
          style="color: green; padding-left: 0px"
          variant="link"
          @click="add_feature(node_idx)"
        >
          Add Feature
        </b-button>
        <b-button
          style="color: red"
          variant="link"
          @click="delete_node(node_idx)"
          v-if="graph.nodes.length > 1"
        >
          remove node
        </b-button>
      </div>
      <!-- Node To Calc Repetion -->
      <h2 class="header">Extra</h2>
      <div class="border mt-4" style="padding: 20px">
        <div class="row">
          <b-form-group
            label="main_node"
            label-for="main_node"
            class="col-md-6"
          >
            <b-form-select
              v-model="graph.main_node"
              :options="get_nodes_options"
            />
          </b-form-group>
          <b-form-group
            label="node_to_calculate_repitition"
            label-for="node_to_calculate_repitition"
            class="col-md-6"
          >
            <b-form-select
              v-model="graph.node_to_calculate_repitition"
              :options="get_nodes_options"
            />
          </b-form-group>
        </div>
      </div>
      <!-- Weight -->
      <h2 class="header">Weight</h2>
      <div class="border mt-4" style="padding: 20px">
        <div class="row">
          <b-form-group label="Dataframe" label-for="gd" class="col-md-6">
            <b-form-select
              v-model="graph.weight.df"
              :options="files"
              required
            />
          </b-form-group>
          <b-form-group label="column_name" label-for="df" class="col-md-6">
            <!-- TODO: Find better way to save the weight -->
            <b-form-select
              v-model="graph.weight.feature"
              :options="get_col_options(graph.weight.df)"
              required
            />
          </b-form-group>
        </div>
      </div>
      <h2 class="header">Data split</h2>
      <!-- Data split -->
      <div class="border mt-4" style="padding: 20px">
        <div class="row">
          <b-form-group
            label="Train range from"
            label-for="name"
            class="col-md-6"
          >
            <b-form-input
              v-model="graph.weight_split_range.train_range.start"
            />
          </b-form-group>
          <b-form-group
            label="Train range to"
            label-for="name"
            class="col-md-6"
          >
            <b-form-input v-model="graph.weight_split_range.train_range.end" />
          </b-form-group>
        </div>
        <div class="row">
          <b-form-group
            label="Valid range from"
            label-for="name"
            class="col-md-6"
          >
            <b-form-input
              v-model="graph.weight_split_range.valid_range.start"
            />
          </b-form-group>
          <b-form-group
            label="Valid range to"
            label-for="name"
            class="col-md-6"
          >
            <b-form-input v-model="graph.weight_split_range.valid_range.end" />
          </b-form-group>
        </div>
        <div class="row">
          <b-form-group
            label="Test range from"
            label-for="name"
            class="col-md-6"
          >
            <b-form-input v-model="graph.weight_split_range.test_range.start" />
          </b-form-group>
          <b-form-group label="Test range to" label-for="name" class="col-md-6">
            <b-form-input v-model="graph.weight_split_range.test_range.end" />
          </b-form-group>
        </div>
      </div>

      <b-button type="submit" variant="outline-primary mt-4"> Next </b-button>
    </form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { CREATE, FETCH_ALL } from "../../store/types/actions.type";
export default {
  name: "nodes-form",
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
  methods: {
    add_node() {
      this.graph.nodes.push({
        name: "",
        df: this.files[0],
        features: [
          {
            feature_name: "id",
            column_name: "",
          },
        ],
      });
    },
    delete_node(node_idx) {
      if (confirm("Are you sure?")) {
        this.graph.nodes.splice(node_idx, 1);
      }
    },
    add_feature(node_idx) {
      let obj = {
        feature_name: "",
        column_name: "",
      };
      if (this.graph.nodes[node_idx].length == 0) {
        obj.feature_name = "id";
      }
      this.graph.nodes[node_idx].features.push(obj);
    },
    delete_feature(node_idx, featur_idx) {
      this.graph.nodes[node_idx].features.splice(featur_idx, 1);
    },
    column_name_changed(val, node_idx, featur_idx) {
      if (!this.graph.nodes[node_idx].features[featur_idx].feature_name)
        this.graph.nodes[node_idx].features[featur_idx].feature_name = val;
    },
  },
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
