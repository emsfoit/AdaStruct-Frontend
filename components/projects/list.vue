<template>
  <div>
    <!-- <div class="row">
      <search-panel v-if="is_company != true">
        <span slot="title">{{ $t("helper.panel.search.project") }}</span>
      </search-panel>
    </div> -->
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
        <projects-single
          v-for="project in projects"
          v-bind:project="project"
          v-bind:key="project.id"
        ></projects-single>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import Search from "./search.vue";
import { FETCH_ALL } from "../../store/types/actions.type";
import { SET_QUERIES, SET_LOADING } from "../../store/types/mutations.type";

export default {
  name: "projects_list",
  methods: {
    get_data() {
      this.$store
        .dispatch(`projects/${FETCH_ALL}`)
        .then(() => {})
        .catch((error) => {
          alert(error);
        });
    },
  },
  computed: {
    ...mapGetters({
      projects: "projects/list",
      meta: "projects/meta",
      loading: "projects/loading",
      queries: "projects/queries",
    }),
  },
  created() {
    this.get_data();
  },
};
</script>
