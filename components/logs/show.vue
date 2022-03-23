<template>
  <div class="container">
    <div class="row" v-if="log_extra_info.length > 0">
      <charts-training
        :series="lossSeries"
        :categories="lossCategories"
        class="col-md-6 col-12"
        title="Training Loss"
      />
      <charts-training
        :series="metricsSeries"
        :categories="metricsCategories"
        class="col-md-6 col-12"
        title="Training Metrics"
      />
    </div>
    <div ref="logContainer" v-html="log_text" class="log-container" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  layout: "user",
  name: "LogsShow",
  data() {
    return {
      lossSeries: [],
      metricsSeries: [],
      lossCategories: [],
      metricsCategories: [],
    };
  },
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
        if (this.log && this.log.extra_info && this.log.extra_info.length > 0) {
          let extra_info = this.log.extra_info.map((item) =>
            JSON.parse(item.data)
          );
          return extra_info;
        }
        return [];
      },
    },
    lossChartInfo() {
      let log_extra_info = this.log_extra_info;
      let items = log_extra_info.filter((item) => item.type == "training_loss");
      let sorted_items = items.sort((a, b) => (a.epoch > b.epoch ? 1 : -1));
      let data = sorted_items.map((item) => item.value.toFixed(3));
      let categories = sorted_items.map((item) => item.epoch);
      return {
        series: [
          {
            name: "loss",
            data: data,
          },
        ],
        categories: categories,
      };
    },
    metricChartInfo() {
      let log_extra_info = this.log_extra_info;
      let ndcg = [];
      let mrr = [];
      for (let elm of log_extra_info) {
        if (elm.type == "NDCG") {
          ndcg.push(elm);
        } else if (elm.type == "MRR") {
          mrr.push(elm);
        }
      }
      // MRR
      let sorted_mrr = mrr.sort((a, b) => (a.epoch > b.epoch ? 1 : -1));
      let mrr_data = sorted_mrr.map((item) => item.value.toFixed(3));
      // NDCG
      let sorted_ndcg = ndcg.sort((a, b) => (a.epoch > b.epoch ? 1 : -1));
      let ndcg_data = sorted_ndcg.map((item) => item.value.toFixed(3));
      // SAME Categories
      let categories = sorted_ndcg.map((item) => item.epoch);
      return {
        series: [
          {
            name: "NDCG",
            data: ndcg_data,
          },
          {
            name: "MRR",
            data: mrr_data,
          },
        ],
        categories: categories,
      };
    },
  },
  updated() {
    let elm = this.$refs.logContainer;
    elm.scrollTop = elm.scrollHeight;
    elm.scrollIntoView({ behavior: "smooth" });
    if (this.log_extra_info.length > 0) {
      // SET Loss Chart
      let data = this.lossChartInfo;
      this.lossSeries = data.series;
      this.lossCategories = data.categories;
      // SET Metric Chart
      let metrics_data = this.metricChartInfo;
      this.metricsSeries = metrics_data.series;
      this.metricsCategories = metrics_data.categories;
    }
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
