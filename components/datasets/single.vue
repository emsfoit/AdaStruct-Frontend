<template>
  <tr>
    <td scope="row">{{ dataset.id }}</td>
    <td>{{ dataset.filename }}</td>
    <td>{{ dataset.created_at }}</td>
    <td>
      <!-- <b-button
        :to="{ path: `/user/datasets/${this.dataset.id}/show` }"
        variant="outline-info"
      >
        <b-icon icon="eye-fill"></b-icon
      ></b-button>
      <b-button
        v-b-modal="'datasets_modal_' + dataset.id"
        variant="outline-primary"
        :to="{ path: `/user/datasets/${this.dataset.id}/edit` }"
        ><b-icon icon="pencil-fill"></b-icon
      ></b-button> -->
      <b-button variant="outline-danger" @click="prompt_delete()">
        <b-icon icon="x-circle"></b-icon
      ></b-button>
    </td>
  </tr>
</template>
<script>
import { DESTROY } from "../../store/types/actions.type";

export default {
  props: {
    dataset: {
      type: Object,
      required: true,
    },
  },
  methods: {
    prompt_delete() {
      if (confirm("Are you sure you want to remove this dataset?")) {
        this.$store
          .dispatch(`datasets/${DESTROY}`, {
            id: this.dataset.id,
          })
          .then(() => {
            alert("dataset has been removed");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
