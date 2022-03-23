<template>
  <b-modal
    class="width"
    size="lg"
    :id="'dataset-form-modal'"
    ref="dataset-modal"
    title="Graph"
  >
    <div class="b-modal" style="max-height: 500px">
      <form ref="form" @submit.stop.prevent="submit">
        <b-form-group label="Datasets" label-for="dataset">
          <b-form-file
            v-model="form.files"
            accept=".csv, .tsv"
            id="dataset"
            multiple
            required
          />
        </b-form-group>
        <b-form-group label="Separator" label-for="sep">
          <b-form-input
            id="sep"
            v-model="form.sep"
            placeholder="csv/tsv files separator"
            required
          />
        </b-form-group>
      </form>
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
export default {
  name: "UploadButton",
  data() {
    return {
      form: {
        files: [],
        sep: "",
      },
    };
  },
  methods: {
    submit() {
      if (this.form.sep && this.form.files.length > 0) {
        this.$emit("submitFiles", this.form.files, this.form.sep);
        this.form.files = [];
      }
      return;
    },
    toggleModal() {
      this.$refs["dataset-modal"].toggle("#toggle-btn");
    },
  },
};
</script>
