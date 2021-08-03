<template>
  <div
    ref="barTest"
    class="test-box"
  >
    <echart-common :options="options"></echart-common>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from 'vue'
import * as echarts from 'echarts'
export default {
  setup() {
    const barTest = ref(null)
    const state = reactive({
      count: 0,
      options: {
        title: {
          text: 'ECharts 入门示例',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫 ', '裤 子', '高 跟鞋', '袜子'],
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        }],
      },
    })
    onMounted(() => {
      renderChange()
    })
    const renderChange = () => {
      // const myChart = echarts.init(barTest.value)
      // // 绘制图表
      // myChart.setOption({

      // })
    }
    return {
      ...toRefs(state), barTest,
    }
  },
}
</script>

<style lang="scss" scoped>
.test-box {
  width: 100%;
  height: 300px;
}
</style>