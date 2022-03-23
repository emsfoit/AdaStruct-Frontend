<template>
  <tr>
    <inferences-form-modal :inference="inference" />
    <td scope="row">
      <a href="#">
        {{ inference.id }}
      </a>
    </td>
    <td>{{ inference.name }}</td>
    <td>{{ inference.created_at }}</td>
    <td>
      <b-button
        variant="outline-info"
        v-if="inference.modal_path"
        @click="download_inference"
      >
        Download
      </b-button>
      <b-button
        :disabled="allow_trainig"
        variant="outline-info"
        @click="start_traininig"
      >
        Train
      </b-button>
      <!-- <b-button
        variant="outline-info"
        @click="kill_traininig(last_prcess_log.id)"
      >
        Kill
      </b-button> -->
      <b-button
        variant="outline-info"
        v-b-modal="'inference-form-modal' + inference.id"
      >
        Edit
      </b-button>
      <b-button variant="outline-danger" @click="prompt_delete">
        Remove
      </b-button>
    </td>
  </tr>
</template>
<script>
import { DESTROY, DOWNLOAD, TRAIN, KILL } from "../../store/types/actions.type";

export default {
  props: {
    inference: {
      type: Object,
      required: true,
    },
    process_logs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      allow_trainig: true,
    };
  },
  methods: {
    prompt_delete() {
      if (confirm("Are you sure you want to remove this inference?")) {
        this.$store
          .dispatch(`inferences/${DESTROY}`, {
            id: this.inference.id,
          })
          .then(() => {
            alert("Project has been removed");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    start_traininig() {
      this.$store
        .dispatch(`inferences/${TRAIN}`, {
          id: this.inference.id,
        })
        .then((data) => {
          this.$router.push(`/user/logs/${data.log_id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    kill_traininig(process_id) {
      this.$store
        .dispatch(`inferences/${KILL}`, {
          id: this.inference.id,
          process_id: process_id,
        })
        .then((data) => {
          alert("Trainign will Stop");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    download_inference() {
      this.$store
        .dispatch(`inferences/${DOWNLOAD}`, {
          id: this.inference.id,
        })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    let items = [...this.process_logs];
    if (items && items.length > 0) {
      items = items.sort((a, b) =>
        new Date(a.created_at) < new Date(b.created_at) ? 1 : -1
      );
      this.sorted_process_logs = items;
      console.log(items[0]);
      this.allow_trainig = items[0].status.includes("running");
    }
  },
};
</script>
