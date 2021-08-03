<template>
  <div class="section-3">
    <div class="title">预算目标完成率</div>
    <div class="content-main">
      <div class="tab-right">
        <div class="date">最新数据：2020年03月</div>
        <tab-toggle
          :change="tabChange"
          :tab="['母公司预算目标完成率', '集团预算目标完成率']"
        ></tab-toggle>
      </div>
      <div class="rate-box">
        <div class="rate-line">
          <div class="left">
            <echart-common :options="options1"></echart-common>
          </div>
          <div class="right">
            <p class="name">营业收入(万元)</p>
            <p class="text">累计完成 / 年度目标</p>
            <p class="value">
              <span>467500</span>
              <span>/1000000</span>
            </p>
          </div>
        </div>
        <div class="rate-line">
          <div class="left">
            <echart-common :options="options2"></echart-common>
          </div>
          <div class="right">
            <p class="name">利润总额(万元)</p>
            <p class="text">累计完成 / 年度目标</p>
            <p class="value">
              <span>467500</span>
              <span>/1000000</span>
            </p>
          </div>
        </div>
        <div class="rate-line">
          <div class="left">
            <echart-common :options="options3"></echart-common>
          </div>
          <div class="right">
            <p class="name">净利润（万元）</p>
            <p class="text">累计完成 / 年度目标</p>
            <p class="value">
              <span>467500</span>
              <span>/1000000</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  setup() {
    const state = reactive({
      current: 0,
      options1: {
        series: [{
          type: 'gauge',
          radius: '60%',
          axisLine: {
            show: true,
            // 两端是否设置为圆角；在5.0之后的版本有效
            roundCap: false,
            lineStyle: {
              width: 20,
              color: [
                [0.4665, {
                  x: 0,
                  y: 0,
                  x1: 1,
                  y1: 0,
                  colorStops: [{
                    offset: 0,
                    color: '#FFD99F',
                  }, {
                    offset: 1,
                    color: '#FFBE4C',
                  }],
                }],
                [1, '#E6EBF8'],
              ],
            },
          },
          axisTick: {
            distance: -30,
            splitNumber: 5,
            lineStyle: {
              width: 1,
              color: '#E2E2E2',
            },
          },
          splitLine: {
            distance: -35,
            length: 14,
            lineStyle: {
              width: 2,
              color: '#E2E2E2',
            },
          },
          axisLabel: {
            distance: -15,
            color: '#CFCFCF',
            fontSize: 13,
          },
          'itemStyle': {
            'normal': {
              'color': '#FF7373', //指针颜色
            },
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            fontSize: 20,
            color: '#FFC867',
            offsetCenter: [0, '80%'],
            formatter: '{value}%',
          },
          data: [{
            value: 46.65,
          }],
        }],
      },
      options2: {
        series: [{
          type: 'gauge',
          radius: '60%',
          axisLine: {
            show: true,
            // 两端是否设置为圆角；在5.0之后的版本有效
            roundCap: false,
            lineStyle: {
              width: 20,
              color: [
                [0.4665, {
                  x: 0,
                  y: 0,
                  x1: 1,
                  y1: 0,
                  colorStops: [{
                    offset: 0,
                    color: '#7796FF',
                  }, {
                    offset: 1,
                    color: '#1D3FFF',
                  }],
                }],
                [1, '#E6EBF8'],
              ],
            },
          },
          axisTick: {
            distance: -30,
            splitNumber: 5,
            lineStyle: {
              width: 1,
              color: '#E2E2E2',
            },
          },
          splitLine: {
            distance: -35,
            length: 14,
            lineStyle: {
              width: 2,
              color: '#E2E2E2',
            },
          },
          axisLabel: {
            distance: -15,
            color: '#CFCFCF',
            fontSize: 13,
          },
          'itemStyle': {
            'normal': {
              'color': '#FF7373', //指针颜色
            },
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            fontSize: 20,
            color: '#1D3FFF',
            offsetCenter: [0, '80%'],
            formatter: '{value}%',
          },
          data: [{
            value: 46.65,
          }],
        }],
      },
      options3: {
        series: [{
          type: 'gauge',
          radius: '60%',
          axisLine: {
            show: true,
            // 两端是否设置为圆角；在5.0之后的版本有效
            roundCap: false,
            lineStyle: {
              width: 20,
              color: [
                [0.4665, {
                  x: 0,
                  y: 0,
                  x1: 1,
                  y1: 0,
                  colorStops: [{
                    offset: 0,
                    color: '#43D7DC',
                  }, {
                    offset: 1,
                    color: '#10C2DC',
                  }],
                }],
                [1, '#E6EBF8'],
              ],
            },
          },
          axisTick: {
            distance: -30,
            splitNumber: 5,
            lineStyle: {
              width: 1,
              color: '#E2E2E2',
            },
          },
          splitLine: {
            distance: -35,
            length: 14,
            lineStyle: {
              width: 2,
              color: '#E2E2E2',
            },
          },
          axisLabel: {
            distance: -15,
            color: '#CFCFCF',
            fontSize: 13,
          },
          'itemStyle': {
            'normal': {
              'color': '#FF7373', //指针颜色
            },
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            fontSize: 20,
            color: '#10C2DC',
            offsetCenter: [0, '80%'],
            formatter: '{value}%',
          },
          data: [{
            value: 46.65,
          }],
        }],
      },
    })
    const tabChange = (index) => {
      state.current = index
    }
    return {
      ...toRefs(state), tabChange,
    }
  },
}
</script>

<style lang="scss" scoped>
.section-3 {
  position: relative;
  margin-top: 20px;
  .title {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bolder;
    color: #2f2f2f;
    margin-left: 10px;
  }
  .content-main {
    width: 100%;
    margin-top: 15px;
    height: 421px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px 10px;
    .tab-right {
      .date {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #969696;
        position: absolute;
        top: 60px;
        right: 20px;
      }
      display: flex;
      justify-content: center;
    }
    .rate-box {
      margin-top: 30px;
      width: 100%;
      height: 330px;
      display: flex;
      .rate-line {
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        .left {
          width: 300px;
          height: 100%;
        }
        .right {
          padding-left: 20px;
          box-sizing: border-box;
          flex: 1;
          p {
            &.name {
              font-size: 20px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bolder;
              color: #2f2f2f;
            }
            &.text {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #969696;
            }
            &.value {
              font-size: 20px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 300;
              color: #2f2f2f;
              span {
                &:first-of-type {
                  font-weight: 500;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>