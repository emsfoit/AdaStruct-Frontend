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
      <graphs-single
        v-for="graph in graphs"
        v-bind:graph="graph"
        v-bind:key="graph.id"
      ></graphs-single>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "graphs_list",
  computed: {
    ...mapGetters({
      graphs: "graphs/list",
    }),
  },
};
</script>
