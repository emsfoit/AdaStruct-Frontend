<template>
  <div class="container">
    <div ref="logContainer" v-html="log_text" class="log-container" />
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
    log_text: {
      get: function () {
        if (this.log && this.log.log) {
          return this.log.log;
        }
        return "";
      },
    },
    log_extra_info: {
      get: function () {
        let sorted = {};
        if (this.log && this.log.extra_info && this.log.extra_info.lengt > 0) {
          let extra_info = this.log.extra_info;
          for (elm in extra_info) {
            sorted[elm.epoch][elm];
          }
          return this.log.log;
        }
        return "";
      },
    },
  },
  updated() {
    let elm = this.$refs.logContainer;
    elm.scrollTop = elm.scrollHeight;
    elm.scrollIntoView({ behavior: "smooth" });
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
  overflow-y: scroll;
  border-collapse: collapse;
  height: 800px;
  max-height: 800px;
}
</style>
