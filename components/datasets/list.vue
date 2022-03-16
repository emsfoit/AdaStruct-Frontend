<template>
  <div>
    <!-- <div class="row">
      <search-panel v-if="is_company != true">
        <span slot="title">{{ $t("helper.panel.search.dataset") }}</span>
      </search-panel>
    </div> -->
    <datasets-upload @submitFiles="submitFiles" />

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Created At</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <datasets-single
          v-for="dataset in datasets"
          v-bind:dataset="dataset"
          v-bind:key="dataset.id"
        ></datasets-single>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import Search from "./search.vue";
import { CREATE, FETCH_ALL } from "../../store/types/actions.type";
import { SET_QUERIES, SET_LOADING } from "../../store/types/mutations.type";

export default {
  name: "datasets_list",
  methods: {
    get_data() {
      this.$store
        .dispatch(`datasets/${FETCH_ALL}`, {
          project_id: this.$route.params.id,
        })
        .then(() => {})
        .catch((error) => {
          alert(error);
        });
    },
    submitFiles(files) {
      debugger;
      this.$store
        .dispatch(`datasets/${CREATE}`, {
          files: files,
          project_id: this.$route.params.id,
        })
        .then(() => {})
        .catch(() => {
          alert("Error");
        });
    },
  },
  computed: {
    ...mapGetters({
      datasets: "datasets/list",
    }),
  },
  created() {
    this.get_data();
  },
};
</script>
