<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Type</th>
        <th scope="col">Status</th>
        <th scope="col">Created At</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <logs-single
        v-for="log in logs"
        v-bind:log="log"
        v-bind:key="log.id"
      ></logs-single>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "logs_list",
  computed: {
    ...mapGetters({
      logs: "logs/list",
      loading: "logs/loading",
    }),
  },
};
</script>
