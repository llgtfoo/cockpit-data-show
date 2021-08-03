<template>
  <div class="section-2">
    <div class="title">集团资产情况</div>
    <div class="content-main">
      <div class="tab-right">
        <tab-toggle
          :change="tabChange"
          :tab="['年度', '季度']"
        ></tab-toggle>
      </div>
      <div
        class="section"
        v-if="current===0"
      >
        <div class="left">
          <ul>
            <li class="title">
              <span>指标</span>
              <span>数值(2020年)</span>
              <span>排名</span>
            </li>
            <li
              class="line"
              v-for="(item,index) in leftList"
              :key="index"
            >
              <span>{{item.name}}</span>
              <span>{{item.value}}</span>
              <span>{{item.ranking}}</span>
            </li>
          </ul>
        </div>
        <div class="right">
          <div class="tab-line">
            <ul>
              <li
                :class="{active:currentTab===index}"
                v-for="(item,index) in tab"
                :key="index"
                @click="listChange(index)"
              >
                {{item}}
              </li>
              <img
                src="@/assets/imgs/overallOperation/biaodan.png"
                alt=""
              >
            </ul>
          </div>
          <div class="assets">
            <echart-common :options="yearOptions"></echart-common>
          </div>
        </div>
      </div>
      <div
        class="section"
        v-else
      >
        <div class="left">
          <ul>
            <li class="title">
              <span>指标</span>
              <span>数值(2020年6月)</span>
            </li>
            <li
              class="line"
              v-for="(item,index) in leftList"
              :key="index"
            >
              <span>{{item.name}}</span>
              <span>{{item.value}}</span>
            </li>
          </ul>
        </div>
        <div class="right">
          <div class="tab-line">
            <ul>
              <li
                :class="{active:currentTab===index}"
                v-for="(item,index) in tab"
                :key="index"
                @click="listChange(index)"
              >
                {{item}}
              </li>
              <img
                src="@/assets/imgs/overallOperation/biaodan.png"
                alt=""
              >
            </ul>
          </div>
          <div class="assets">
            <echart-common :options="quarterOptions"></echart-common>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import * as echarts from 'echarts'

export default {
  setup() {
    const state = reactive({
      current: 0,
      currentTab: 0,
      tab: ['总资产(万元)', '净资产(万元)', '营业收入(万元) ', '净利润(万元)'],
      leftList: [
        {
          name: '总资产(万元)',
          value: '14324325.23',
          ranking: '21/198',
        },
        {
          name: '净资产(万元)',
          value: '14324325.23',
          ranking: '21/198',
        },
        {
          name: '营业收入(万元)',
          value: '14324325.23',
          ranking: '21/198',
        },
        {
          name: '净利润(万元)',
          value: '14324325.23',
          ranking: '21/198',
        },
      ],
      yearList: [
        {
          name: '2020年',
          value: '9000',
          ranking: '11',
        },
        {
          name: '2020年',
          value: '4000',
          ranking: '31',
        },
        {
          name: '2020年',
          value: '11000',
          ranking: '21',
        },
        {
          name: '2020年',
          value: '8000',
          ranking: '31',
        },
        {
          name: '2020年',
          value: '6500',
          ranking: '11',
        },
      ],
      quarterList: [
        {
          name: '2020年6月',
          value: '900',
        },
        {
          name: '2020年7月',
          value: '400',
        },
        {
          name: '2020年8月',
          value: '1100',
        },
        {
          name: '2020年9月',
          value: '800',
        },
        {
          name: '2020年10月',
          value: '650',
        },
      ],
      yearOptions: {
        'backgroundColor': '#F8F9FA',
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: 'rgba(31,31,31,.4)',
          borderColor: '#ddd',
          textStyle: {
            color: '#fff',
          },
          // formatter: (params) => {
          //   return `<div style='color:#fff'>
          //      <p>${params[0].name}</p>
          //      <p>${params[0].seriesName}：${params[0].value}</p>
          //      <p style='margin:0px'>${params[1].seriesName}：${params[1].value}/189</p>
          //    </div>`
          // },
        },
        grid: {
          top: '18%',
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: '#E2E2E2',
              },
            },
            axisLabel: {
              textStyle: {
                color: '#929292', //坐标值得具体的颜色
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            // name: '总资产',
            // interval: 300,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(243,244,245,1)',
              },
            },
          },
          {
            type: 'value',
            // name: '排名',
            // interval: 5,
            inverse: true,
            min: 1,
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: '总资产（万元）',
            type: 'pictorialBar',
            label: {
              normal: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 1,
                      color: '#7E9DFF', // 0% 处的颜色
                    },
                    {
                      offset: 0,
                      color: '#193BFF', // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                }, //渐变颜色
              },
            },
            symbol: 'path://M150 50 L130 130 L170 130  Z',
            barWidth: '40%',
            data: [],
          },
          {
            name: '排名',
            type: 'line',
            yAxisIndex: 1,
            showSymbol: true,
            symbolSize: 20,
            symbol: `image://${require('@/assets/imgs/overallOperation/symbal.png')}`,
            lineStyle: {
              color: '#FD7C50',
            },
            data: [],
          },
        ],
      },
      quarterOptions: {
        'backgroundColor': '#F8F9FA',
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: 'rgba(31,31,31,.4)',
          borderColor: '#ddd',
          textStyle: {
            color: '#fff',
          },
          // formatter: (params) => {
          //   return `<div style='color:#fff'>
          //      <p>${params[0].name}</p>
          //      <p>${params[0].seriesName}：${params[0].value}</p>
          //    </div>`
          // },
        },
        grid: {
          top: '18%',
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: '#E2E2E2',
              },
            },
            axisLabel: {
              textStyle: {
                color: '#929292', //坐标值得具体的颜色
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            // name: '总资产',
            // interval: 300,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(243,244,245,1)',
              },
            },
          },
        ],
        series: [
          {
            name: '总资产（万元）',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 1, color: '#FFB388' },
                  { offset: 0, color: '#FD7C50' },
                ],
              ),
              barBorderRadius: 15,
            },
            type: 'bar',
            barWidth: '20%',
            data: [],
          },
        ],
      },
    })
    onMounted(() => {
      state.yearOptions.xAxis[0].data = state.yearList.map(item => item.name)
      state.yearOptions.series[0].data = state.yearList.map(item => item.value)
      state.yearOptions.series[1].data = state.yearList.map(item => item.ranking)

      state.quarterOptions.xAxis[0].data = state.quarterList.map(item => item.name)
      state.quarterOptions.series[0].data = state.quarterList.map(item => item.value)
    })
    const tabChange = (index) => {
      state.current = index
    }
    const listChange = (index) => {
      state.currentTab = index
    }
    return {
      ...toRefs(state), tabChange, listChange,
    }
  },
}
</script>

<style lang="scss" scoped>
.section-2 {
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
    box-sizing: border-box;
    .tab-right {
      display: flex;
      justify-content: flex-end;
      position: absolute;
      right: 10px;
      top: 60px;
    }
    .section {
      height: 432px;
      display: flex;
    }
    .left {
      padding: 20px 10px;
      border-radius: 10px;
      background: #fff;
      height: 100%;
      width: 600px;
      margin-right: 10px;
      box-sizing: border-box;
      ul {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        li {
          display: flex;
          align-content: center;
          span {
            flex: 1;
            text-align: center;
          }
          &.line {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            color: #2f2f2f;
            height: 63px;
            background: url("~@/assets/imgs/overallOperation/list-bg.png")
              no-repeat;
            background-size: 100% 100%;
            line-height: 63px;
            span {
              &:first-of-type {
                font-weight: 400;
              }
              &:nth-of-type(2) {
                font-weight: bold;
              }
            }
          }
          &.title {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #929292;
          }
        }
      }
    }
    .right {
      padding: 10px;
      border-radius: 10px;
      background: #fff;
      height: 100%;
      flex: 1;
      .tab-line {
        margin-top: 15px;
        margin-top: 60px;
        ul {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          cursor: pointer;
          > img {
            margin: 0 20px;
            width: 24px;
            height: 24px;
          }
          li {
            padding: 5px 10px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #979797;
            margin-left: 10px;
            &.active {
              font-size: 16px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              color: #3653ff;
              background: url("~@/assets/imgs/overallOperation/tab-bg.png")
                no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
      .assets {
        width: 100%;
        height: 300px;
      }
    }
  }
}
</style>