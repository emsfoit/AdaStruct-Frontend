<template>
  <div>
    <b-button variant="outline-success mt-4" @click="add_emb()">
      <b-icon icon="plus"></b-icon>
      Add Embeddings config
    </b-button>

    <form ref="form" @submit.stop.prevent="$emit('submit', graph)">
      <!-- Nodes -->
      <div
        class="border mt-4"
        style="padding: 20px"
        :key="emb_idx"
        v-for="(emb, emb_idx) in graph.emb"
      >
        <div class="row">
          <b-form-group label="Node name" label-for="name" class="col-md-4">
            <b-form-select
              v-model="emb.node"
              :options="get_nodes_options()"
              required
            />
          </b-form-group>
          <b-form-group label="Feature" label-for="feature" class="col-md-4">
            <b-form-select
              v-model="emb.feature"
              :options="feature_options(emb.node)"
              required
            />
          </b-form-group>
          <b-form-group label="Model" label-for="model" class="col-md-4">
            <b-form-select
              v-model="emb.model"
              :options="models_options"
              required
            />
          </b-form-group>
        </div>
        <b-button
          style="color: red"
          variant="link"
          @click="delete_emb(emb_idx)"
        >
          remove emb
        </b-button>
      </div>
      <b-button
        variant="outline-primary mt-4"
        @click="$emit('go_to', (graph, 'edges'))"
      >
        Back
      </b-button>
      <b-button type="submit" variant="outline-primary mt-4"> Next </b-button>
    </form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { CREATE, FETCH_ALL } from "../../store/types/actions.type";
export default {
  name: "emb-form",
  props: {
    orig_graph: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      graph: {},
      models_options: ["XLNetTokenizer"],
    };
  },
  methods: {
    add_emb() {
      this.graph.emb.push({
        name: "",
        df: this.files[0],
        features: [
          {
            node: "",
            feature: "",
            model: "XLNetTokenizer",
            min_number_of_words: 4,
          },
        ],
      });
    },
    delete_emb(emb_idx) {
      if (confirm("Are you sure?")) {
        this.graph.emb.splice(emb_idx, 1);
      }
    },
    get_nodes_options() {
      let data = this.graph.nodes.map((f) => f.name);
      return data;
    },
  },
  computed: {
    ...mapGetters({
      datasets: "datasets/list",
    }),
    files() {
      return this.datasets.map((data) => data.filename);
    },
    feature_options() {
      return (node_name) => {
        if (!node_name) return [];
        let data = this.graph.nodes.find((node) => node.name == node_name);
        let selected = this.graph.emb.map((emb) => {
          return emb["feature"];
        });
        let options = data.features.map((feature) => {
          let disabled =
            selected.indexOf(feature["feature_name"]) > -1 ? true : false;
          return {
            text: feature["feature_name"],
            value: feature["feature_name"],
            disabled: disabled,
          };
        });
        return options;
      };
    },
    get_embs_options() {
      let data = this.graph.emb.map((f) => f.name);
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
