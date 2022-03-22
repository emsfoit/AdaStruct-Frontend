<template>
  <tr>
    <td scope="row">
      <nuxt-link :to="{ path: `/user/logs/${log.id}` }">{{ log.id }}</nuxt-link>
    </td>
    <td>{{ log.name }}</td>
    <td>{{ log.type }}</td>
    <td>{{ log.status }}</td>
    <td>{{ log.created_at }}</td>
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
    log: {
      type: Object,
      required: true,
    },
  },
  methods: {
    prompt_delete() {
      if (confirm("Are you sure you want to remove this log?")) {
        this.$store
          .dispatch(`logs/${DESTROY}`, {
            id: this.log.id,
          })
          .then(() => {
            alert("Log has been removed");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
