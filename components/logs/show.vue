<template>
  <div class="container">
    <div v-html="log_text" class="log-container" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  layout: "user",
  name: "LogsShow",
  computed: {
    ...mapGetters({
      log: "logs/one",
    }),
    log_text() {
      if (this.log && this.log.log) {
        return this.log.log;
      }
      return "";
    },
  },
};
</script>
<style scoped>
.log-container {
  white-space: pre;
  background-color: #16191f;
  color: white;
  padding: 2rem;
  overflow-wrap: break-word;
  contain: layout;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 0.6rem;
  line-height: 1.7rem;
  border-collapse: collapse;
  font-family: Monaco, Menlo, Consolas, "Courier Prime", Courier, "Courier New",
    monospace;
  color: #fff;
  background: #232f3e;
  white-space: pre-wrap;
  word-break: break-word;
  border-collapse: collapse;
}
</style>
