<template>
  <apexcharts
    ref="demoChart"
    type="area"
    :options="chartOptions"
    :series="series"
    height="300"
  />
</template>
<script>
export default {
  layout: "user",
  name: "ChartsTraining",
  props: {
    series: {
      type: Array,
      default: () => [],
    },
    categories: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: () => "Chart",
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: this.title,
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: this.categories,
        },
      },
    };
  },
};
</script>
