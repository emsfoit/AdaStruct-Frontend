<template>
  <div>
    <b-button class="mb-2" variant="success" size="sm" @click="openSelection">
      Upload Files
    </b-button>
    <form enctype="multipart/form-data" class="d-none">
      <label ref="files_selection" id="files_selection" for="logo-file"></label>
      <b-form-file
        v-model="files"
        @input="submitFiles"
        accept=".csv, .tsv"
        id="logo-file"
        multiple
      />
    </form>
  </div>
</template>
<script>
export default {
  name: "UploadButton",
  data() {
    return {
      files: [],
    };
  },
  methods: {
    submitFiles(val) {
      this.$emit("submitFiles", val);
      this.files = [];
    },
    openSelection() {
      this.$refs.files_selection.click();
    },
  },
};
</script>
