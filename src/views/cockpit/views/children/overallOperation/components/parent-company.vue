<template>
  <div class="section-1">
    <div class="title">母公司资产情况</div>
    <div class="content-main">
      <div class="tab-right">
        <div class="date">最新数据：2020年03月</div>
        <tab-toggle
          :change="tabChange"
          :tab="['季度', '月度']"
        ></tab-toggle>
      </div>
      <div
        class="card"
        v-if="current===0"
      >
        <ul>
          <li
            v-for="(item,index) in cardList"
            :key="index"
            :style="{'background-image':'url('+cardImages[index]['bg']+')'}"
            :class="{[`active${currentCardQuarter}`]:true&&currentCardQuarter-1===index}"
            @click="tabClickQuarter(index)"
          >
            <div class="line">
              <div class="name">
                <img
                  :src="cardImages[index]['icon']"
                  alt=""
                > {{item.name}}(万元)
              </div>
              <div class="name-value">{{item.value}}</div>
            </div>
            <div class="line">
              <p>
                <span>排名</span>
                <span>{{item.ranking}}</span>
              </p>
            </div>
            <div class="line">
              <p>
                <span>市场份额</span>
                <span>{{item.rate}}</span>
              </p>
            </div>
          </li>
        </ul>
        <div
          class="line-chart"
          ref="quarterRef"
        >
          <div class="model-show">
            <img
              src="@/assets/imgs/overallOperation/biaodan.png"
              alt=""
            >
          </div>
          <echart-common :options="quarterOptions"></echart-common>
        </div>
      </div>
      <div
        class="card"
        v-else
      >
        <ul>
          <li
            v-for="(item,index) in cardList"
            :key="index"
            :style="{'background-image':'url('+cardImages[index]['bg']+')'}"
            :class="{[`active${currentCardMonth}`]:true&&currentCardMonth-1===index}"
            @click="tabClickMonth(index)"
          >
            <div class="line">
              <div class="name">
                <img
                  :src="cardImages[index]['icon']"
                  alt=""
                > {{item.name}}(万元)
              </div>
              <div class="name-value">{{item.value}}</div>
            </div>
            <div class="rate line">
              <p>
                <span>环比：</span>
                <span>{{item.sequential}}%</span>
                <img
                  v-if="item.sequential.includes('-')"
                  src="@/assets/imgs/overallOperation/down.png"
                  alt=""
                >
                <img
                  v-else
                  src="@/assets/imgs/overallOperation/ind.png"
                  alt=""
                >
              </p>
            </div>
          </li>
        </ul>
        <div class="line-chart">
          <div class="model-show">
            <img
              src="@/assets/imgs/overallOperation/biaodan.png"
              alt=""
            >
          </div>
          <echart-common :options="monthOptions"></echart-common>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from 'vue'
import * as echarts from 'echarts'
export default {
  setup() {
    const quarterRef = ref(null)
    const state = reactive({
      current: 0,
      currentCardQuarter: '',
      currentCardMonth: '',
      cardImages: [
        {
          icon: require('@/assets/imgs/overallOperation/n-1.png'),
          bg: require('@/assets/imgs/overallOperation/1-1.png'),
        },
        {
          icon: require('@/assets/imgs/overallOperation/n-2.png'),
          bg: require('@/assets/imgs/overallOperation/1-2.png'),
        },
        {
          icon: require('@/assets/imgs/overallOperation/n-3.png'),
          bg: require('@/assets/imgs/overallOperation/1-3.png'),
        },
        {
          icon: require('@/assets/imgs/overallOperation/n-4.png'),
          bg: require('@/assets/imgs/overallOperation/1-4.png'),
        },
      ],
      cardList: [
        {
          name: '总资产',
          value: '2800278.08',
          ranking: '15/189',
          rate: '47.69%',
          sequential: '+10.00',
        },
        {
          name: '净资产',
          value: '2800278.08',
          ranking: '15/189',
          rate: '47.69%',
          sequential: '+19.00',
        },
        {
          name: '营业收入',
          value: '2800278.08',
          ranking: '15/189',
          rate: '47.69%',
          sequential: '-10.00',
        },
        {
          name: '净利润',
          value: '2800278.08',
          ranking: '15/189',
          rate: '47.69%',
          sequential: ' -11.05',
        },
      ],
      quarterList: [
        {
          name: '2020年5月',
          value: '9000',
          ranking: '11',
        },
        {
          name: '2020年6月',
          value: '1000',
          ranking: '31',
        },
        {
          name: '2020年7月',
          value: '11000',
          ranking: '21',
        },
        {
          name: '2020年8月',
          value: '8000',
          ranking: '31',
        },
        {
          name: '2020年9月',
          value: '1500',
          ranking: '11',
        },
      ],
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
          //      <p style='margin:0px'>${params[0].name}</p>
          //      <p style='margin:0px'>${params[0].seriesName}：${params[0].value}</p>
          //      <p style='margin:0px'>${params[1].seriesName}：${params[1].value}/189</p>
          //    </div>`
          // },
        },
        legend: {
          right: '100',
          icon: 'rect',
          top: '20',
          height: '10',
          // selectedMode: false,
          data: [
            {
              name: '总资产（万元）',
            },
            {
              name: '排名',

            },
          ],
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
            // inverse: true,
            // min: 1,
            splitLine: {
              show: false,
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
                  { offset: 1, color: '#8F9FFF' },
                  { offset: 0, color: '#363FC8' },
                ],
              ),
            },
            type: 'bar',
            barWidth: '20%',
            data: [],
          },
          {
            name: '排名',
            type: 'line',
            yAxisIndex: 1,
            showSymbol: false,
            lineStyle: {
              color: '#363FC8',
            },
            data: [],
            areaStyle: {
              opacity: 0.2,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 1,
                color: '#D1D8FB',
              }, {
                offset: 0,
                color: '#8F9FFF',
              }]),
            },
          },
        ],
      },
      monthOptions: {
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
          //      <p style='margin:0px'>${params[0].seriesName}：${params[0].value}</p>
          //    </div>`
          // },
        },
        grid: {
          top: '15%',
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
            type: 'line',
            showSymbol: false,
            lineStyle: {
              color: '#363FC8',
            },
            data: [],
            areaStyle: {
              opacity: 0.5,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 1,
                color: '#D1D8FB',
              }, {
                offset: 0,
                color: '#8F9FFF',
              }]),
            },
          },
        ],
      },
    })
    onMounted(() => {
      state.quarterOptions.xAxis[0].data = state.quarterList.map(item => item.name)
      state.quarterOptions.series[0].data = state.quarterList.map(item => item.value)
      state.quarterOptions.series[1].data = state.quarterList.map(item => item.ranking)

      state.monthOptions.xAxis[0].data = state.quarterList.map(item => item.name)
      state.monthOptions.series[0].data = state.quarterList.map(item => item.value)
    })
    const tabChange = (index) => {
      state.current = index
    }
    const tabClickQuarter = (index) => {
      state.currentCardQuarter = index + 1
    }
    const tabClickMonth = (index) => {
      state.currentCardMonth = index + 1
    }
    return {
      ...toRefs(state), tabChange, quarterRef, tabClickQuarter, tabClickMonth,
    }
  },
}
</script>

<style lang="scss" scoped>
.section-1 {
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
    height: 708px;
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
      }
      display: flex;
      justify-content: space-between;
    }
    .card {
      width: 100%;
      margin-top: 10px;
      .line-chart {
        position: relative;
        width: 100%;
        height: 455px;
        .model-show {
          position: absolute;
          top: 20px;
          z-index: 99999999999;
          cursor: pointer;
          right: 50px;
        }
      }
      ul {
        width: 100%;
        display: flex;
        justify-content: space-between;
        li {
          width: 374px;
          height: 160px;
          cursor: pointer;

          // background-image: url("../../../../../assets/imgs/overallOperation/1-1.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          box-sizing: border-box;
          padding: 15px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          &.active1 {
            box-shadow: 0px 8px 16px 0px rgba(255, 45, 45, 0.25);
          }
          &.active2 {
            box-shadow: 0px 8px 16px 0px rgba(107, 146, 255, 0.25);
          }
          &.active3 {
            box-shadow: 0px 8px 16px 0px rgba(44, 211, 202, 0.25);
          }
          &.active4 {
            box-shadow: 0px 8px 16px 0px rgba(181, 116, 245, 0.25);
          }
          .rate {
            margin-bottom: 30px;
            > p {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              > img {
                margin-left: 10px;
              }
            }
          }
          .line {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .name {
              font-weight: 500;
              display: flex;
              align-items: center;
              img {
                margin-right: 5px;
              }
            }
            .name-value {
              font-weight: 600;
            }
            .name,
            .name-value {
              font-size: 18px;
              font-family: PingFangSC-Medium, PingFang SC;
              color: #ffffff;
            }
            p {
              width: 100%;
              text-align: right;
              margin: 0;
              span {
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
                color: #ffffff;
                &:first-of-type {
                  font-weight: 400;
                  // letter-spacing: 20px;
                }
                &:last-of-type {
                  margin-left: 10px;
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