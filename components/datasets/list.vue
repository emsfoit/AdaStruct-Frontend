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
      <datasets-single
        v-for="dataset in datasets"
        v-bind:dataset="dataset"
        v-bind:key="dataset.id"
      ></datasets-single>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "datasets_list",
  computed: {
    ...mapGetters({
      datasets: "datasets/list",
    }),
  },
};
</script>
