<template>
  <tr>
    <inferences-form-modal :inference="inference" />
    <td scope="row">
      <a href="#" @click="show_inference_details">
        {{ inference.id }}
      </a>
    </td>
    <td>{{ inference.name }}</td>
    <td>{{ inference.created_at }}</td>
    <td>
      <!-- <b-button
        variant="outline-info"
        v-if="inference.model_path"
        @click="download_inference"
      >
        Download
        v-if="last_prcess_log.status"
      </b-button> -->
      <b-button variant="outline-info" @click="start_traininig">
        Train
      </b-button>
      <b-button
        variant="outline-info"
        @click="kill_traininig(last_prcess_log.id)"
      >
        Kill
      </b-button>
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
  },
  methods: {
    show_inference_details() {
      this.$parent.$emit("show_inference_details", this.inference.id);
    },
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
          alert("Trainign will start soon");
          this.$router.push(`/user/logs/${data.log_id}`);
          // this.$router.push(
          //   `/user/projects/${this.$route.params.id}/graphs/${this.$route.params.graphId}/logs`
          // );
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
          //  TODO redirect to log
          alert("Trainign will start soon");
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
  computed: {
    sorted_process_logs: function () {
      let process_logs = this.inference.process_logs;
      if (process_logs && process_logs.length > 0) {
        return process_logs.sort((a, b) =>
          new Date(a.created_at) > new Date(b.last_nom) ? 1 : -1
        );
      } else return [];
    },
    last_prcess_log: function () {
      return this.sorted_process_logs.length > 0
        ? this.sorted_process_logs[0]
        : {};
    },
    // show_shit: function () {
    //   let x = this.last_prcess_log;
    //   if (x.status && x.status.includes("training")) {
    //     return true;
    //   }
    //   return false;
    //   debugger;
    //   return false;
    //   if (this.last_prcess_log.status)
    //     return this.last_prcess_log.status.includes("training");
    //   return false;
    // },
  },
};
</script>
