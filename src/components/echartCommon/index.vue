/**
 * @description: echarts动画统一封装
 * @param {echarts 选项options}
 * @return:
 */
<template>
  <div
    ref="echartCommon"
    class="chart"
  >
  </div>
</template>

<script>
import { defineComponent, ref,
  toRefs, onMounted, onUnmounted, watch, reactive, nextTick } from 'vue'
import * as echarts from 'echarts'
import doAnimation from 'utils/doAnimation.js'

export default defineComponent({
  name: 'EchartCommon',
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    // const { proxy } = getCurrentInstance()//获取App全局变量
    let chart = null
    const animate = ref(null)
    const echartCommon = ref(null)//注册ref获取dom
    watch(() => props.options, () => {
      updateChartView()
    }, { deep: true })
    onMounted(() => {
      updateChartView()
      window.addEventListener('resize', handleWindowResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleWindowResize)
      if (animate.value) {
        animate.value.destory()
      }
    })
    //监听窗口改变
    function handleWindowResize() {
      // console.log('handleWindowResize', chart)
      if (chart) {
        setTimeout(() => {
          chart.resize()
        }, 100)

      }
    }
    //渲染函数
    const updateChartView = () => {
      nextTick(() => {
        chart = echarts.init(echartCommon.value)//获取渲染dom初始化
        if (!chart || Object.keys(props.options).length === 0) {
          return
        }
        chart.clear()
        // eslint-disable-next-line no-unused-vars
        new Promise((resolve, reject) => {
          props.options && chart.setOption(props.options)
          resolve(true)
        }).then(() => {
          if (animate.vlaue) {
            animate.vlaue.destory()
            animate.vlaue = null
          }
          animate.vlaue = new doAnimation(chart)
          animate.vlaue.animate()
        })
      })
    }
    return { animate, updateChartView, echartCommon }
  },
})
// ?
</script>

<style lang="scss" scoped>
.chart,
.chart-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>