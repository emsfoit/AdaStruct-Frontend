<template>
  <tr>
    <td scope="row">
      <nuxt-link :to="{ path: `/user/projects/${project.id}/graphs` }">{{
        project.id
      }}</nuxt-link>
    </td>
    <td>{{ project.name }}</td>
    <td>{{ project.created_at }}</td>
    <td>
      <b-button variant="outline-danger" @click="prompt_delete()">
        Remove
      </b-button>
    </td>
  </tr>
</template>
<script>
import { DESTROY } from "../../store/types/actions.type";

export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  methods: {
    prompt_delete() {
      if (confirm("Are you sure you want to remove this project?")) {
        this.$store
          .dispatch(`projects/${DESTROY}`, {
            id: this.project.id,
          })
          .then(() => {
            alert("Project has been removed");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
