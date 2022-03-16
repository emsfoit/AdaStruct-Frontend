<template>
  <b-modal
    class="width"
    size="lg"
    :id="'project-form-model'"
    ref="modal"
    title="Project"
  >
    <div class="b-modal" style="max-height: 500px">
      <div class="container">
        <form ref="form" @submit.stop.prevent="submit">
          <b-form-group label="Name" label-for="name">
            <b-form-input
              id="name"
              v-model="project.name"
              class="input_box"
              :class="{ 'is-invalid': errors.hasOwnProperty('name') }"
            />
            <b-form-invalid-feedback v-if="errors.hasOwnProperty('name')">{{
              errors.name.join(", ")
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
import { CREATE } from "../../store/types/actions.type";
export default {
  name: "new-modal",
  data() {
    return {
      show: true,
      project: {
        name: "",
      },
      errors: {},
    };
  },
  methods: {
    submit() {
      let project = this.project;
      let self = this;

      this.$store
        .dispatch(`projects/${CREATE}`, {
          ...project,
        })
        .then((data) => {
          self.toggleModal();
        })
        .catch((errors) => {
          self.errors = errors.response.data;
        });
    },
    toggleModal() {
      this.$refs["modal"].toggle("#toggle-btn");
    },
  },
};
</script>

<style scoped>
.b-modal {
  color: #0f2244;
}
</style>
