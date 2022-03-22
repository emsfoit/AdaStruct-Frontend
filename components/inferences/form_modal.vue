<template>
  <b-modal
    class="width"
    size="lg"
    :id="`inference-form-modal${mutable.id}`"
    ref="modal"
    title="Inference"
  >
    <div class="b-modal" style="max-height: 500px">
      <div class="container">
        <form ref="form" @submit.stop.prevent="submit">
          <b-form-group label="Name" label-for="name">
            <b-form-input
              id="name"
              v-model="mutable.name"
              class="input_box"
              :class="{ 'is-invalid': errors.hasOwnProperty('name') }"
            />
            <b-form-invalid-feedback v-if="errors.hasOwnProperty('name')">{{
              errors.name.join(", ")
            }}</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Settings" label-for="settings">
            <b-form-textarea
              id="settings"
              placeholder="Settings in json format"
              v-model="mutable.settings"
              class="input_box"
              :class="{ 'is-invalid': errors.hasOwnProperty('settings') }"
              rows="10"
            />
            <b-form-invalid-feedback v-if="errors.hasOwnProperty('settings')">{{
              errors.settings.join(", ")
            }}</b-form-invalid-feedback>
          </b-form-group>
        </form>
      </div>
    </div>
    <template #modal-footer>
      <b-button size="sm" @click="toggleModal" variant="secondary">
        Cancel
      </b-button>
      <b-button variant="primary" size="sm" @click="submit"> Submit </b-button>
    </template>
  </b-modal>
</template>
<script>
import { CREATE, PATCH } from "../../store/types/actions.type";
let x = {
  graph_dir: "storage/OAG_grap_reddit_10000.pk",
  model_dir: "storage",
  main_node: "post",
  predicted_node_name: "subreddit",
  edge_name: "post_subreddit",
  exract_attention: false,
  show_tensor_board: false,
  multi_lable_task: true,
  conv_name: "hgt",
  n_hid: 400,
  n_heads: 8,
  n_layers: 4,
  dropout: 0.2,
  sample_depth: 6,
  sample_width: 128,
  optimizer: "adamw",
  data_percentage: 1.0,
  n_epoch: 30,
  n_pool: 4,
  n_batch: 32,
  repeat: 2,
  batch_size: 256,
  clip: 0.25,
  include_fake_edges: false,
  remove_edges: false,
  restructure_at_epoch: 10,
};
export default {
  name: "form-modal",
  props: {
    inference: {
      type: Object,
      default: () => {
        return {
          id: "",
          name: "",
          graph_id: "",
          settings: JSON.stringify(x, undefined, 4),
        };
      },
    },
  },
  data() {
    return {
      show: true,
      errors: {},
      mutable: {},
    };
  },
  methods: {
    submit() {
      this.$store
        .dispatch(`inferences/${this.getAction()}`, {
          id: this.mutable.id,
          graph_id: this.$route.params.graphId,
          name: this.mutable.name,
          settings: this.mutable.settings,
        })
        .then((data) => {
          this.toggleModal();
        })
        .catch((errors) => {
          this.errors = errors.response.data;
        });
    },
    getAction() {
      if (this.mutable.id) {
        return PATCH;
      } else return CREATE;
    },
    toggleModal() {
      this.$refs["modal"].toggle("#toggle-btn");
    },
  },
  created() {
    this.mutable = JSON.parse(JSON.stringify(this.inference));
  },
};
</script>

<style scoped>
.b-modal {
  color: #0f2244;
}
</style>
