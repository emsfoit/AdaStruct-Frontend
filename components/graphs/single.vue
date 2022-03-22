<template>
  <tr>
    <td scope="row">
      <b-button variant="link" @click="show_graph_details">
        {{ graph.id }}
      </b-button>
    </td>

    <td>{{ graph.name }}</td>

    <td>{{ graph.created_at }}</td>
    <td>
      <b-button
        variant="outline-info"
        v-if="graph.path"
        @click="download_graph"
      >
        Download
      </b-button>
      <!--
      <b-button
        v-b-modal="'graphs_modal_' + graph.id"
        variant="outline-primary"
        :to="{ path: `/user/graphs/${this.graph.id}/graph` }"
      >
        Graph Setting
      </b-button> -->
      <b-button variant="outline-danger" @click="prompt_delete">
        Remove
      </b-button>
    </td>
  </tr>
</template>
<script>
import { DESTROY, DOWNLOAD } from "../../store/types/actions.type";

export default {
  props: {
    graph: {
      type: Object,
      required: true,
    },
  },
  methods: {
    show_graph_details() {
      let project_id = this.$route.params.id;
      this.$router.push(
        `/user/projects/${project_id}/graphs/${this.graph.id}/logs`
      );
    },
    prompt_delete() {
      if (confirm("Are you sure you want to remove this graph?")) {
        this.$store
          .dispatch(`graphs/${DESTROY}`, {
            id: this.graph.id,
          })
          .then(() => {
            alert("Project has been removed");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    download_graph() {
      this.$store
        .dispatch(`graphs/${DOWNLOAD}`, {
          id: this.graph.id,
        })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
