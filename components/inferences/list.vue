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
      <inferences-single
        v-for="inference in inferences"
        v-bind:inference="inference"
        :process_logs="inference.process_logs"
        v-bind:key="inference.id"
      ></inferences-single>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "inferences_list",
  computed: {
    ...mapGetters({
      inferences: "inferences/list",
    }),
  },
};
</script>
