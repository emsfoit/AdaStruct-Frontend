<template>
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
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "projects_list",
  computed: {
    ...mapGetters({
      projects: "projects/list",
      meta: "projects/meta",
      loading: "projects/loading",
      queries: "projects/queries",
    }),
  },
};
</script>
