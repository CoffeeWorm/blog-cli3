<template>
  <div class="m-echarts-line" ref="j-container"></div>
</template>

<script>
import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/axis';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/theme/light';

export default {
  props: {
    xAxis: {
      type: Object,
      default: () => ({
        name: '',
        data: [],
        type: 'category'
      })
    },
    yAxis: {
      type: Object,
      default: () => ({
        name: '',
        type: 'value'
      })
    },
    title: {
      type: Object,
      default: () => ({
        text: '',
        left: 'left'
      })
    },
    tooltip: {
      type: Object,
      default: () => ({
        axisPointer: {
          axios: 'auto'
        },
        trigger: 'axis'
      })
    },
    series: {
      type: Object,
      default: () => ({
        name: '',
        type: 'line',
        smooth: true,
        data: []
      })
    },
    theme: {
      type: String,
      default: 'light'
    }
  },
  watch: {
    options(to, from) {
      this.echarts.setOption(to);
    }
  },
  mounted() {
    this.options = Object.assign(
      {},
      {
        title: this.title,
        xAxis: this.xAxis,
        yAxis: this.yAxis,
        tooltip: this.tooltip,
        series: this.series
      }
    );
    this.echarts = this.echarts.init(this.$refs['j-container'], this.theme);
  },
  data() {
    return {
      echarts: echarts,
      options: {}
    };
  }
};
</script>
<style scoped>
.m-echarts-line {
  min-height: 200px;
}
</style>
