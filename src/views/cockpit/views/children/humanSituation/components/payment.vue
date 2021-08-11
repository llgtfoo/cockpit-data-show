<template>
  <div class="section-2">
    <div class="title">薪酬情况</div>
    <div class="date">最新数据：2021年07月</div>
    <div class="content-main">
      <ul class="card">
        <li>
          <img
            src="@/assets/imgs/humanSituation/pay-1.png"
            alt=""
          >
          <div class="data">
            <p>
              <span>150.12 万元</span>
              <span :class="{n1:true}">(+10.10%)</span>
            </p>
            <p>本月发生(环比)</p>
          </div>
        </li>
        <li>
          <img
            src="@/assets/imgs/humanSituation/pay-2.png"
            alt=""
          >
          <div class="data">
            <p>
              <span>2101.56 万元</span>
              <span :class="{n2:true}">(-0.58%)</span>
            </p>
            <p>全年累计(同比)</p>
          </div>
        </li>
      </ul>
      <div class="trend">
        <div class="title">
          <p>母公司本月发生薪酬机构分布和走势</p>
          <img
            @click="parentModel=true"
            src="@/assets/imgs/overallOperation/biaodan.png"
            alt=""
          >
        </div>
        <div class="card-line">
          <div class="left">
            <echart-common
              :options="parentsOptions"
              :hasClick="true"
              @handleChange="parentChange"
            ></echart-common>
          </div>
          <div class="right">
            <echart-common :options="parentOptions"></echart-common>
          </div>
        </div>
        <div class="title">
          <p>子公司本月发生薪酬机构分布和走势</p>
          <img
            @click="childModel=true"
            src="@/assets/imgs/overallOperation/biaodan.png"
            alt=""
          >
        </div>
        <div class="card-line">
          <div class="left">
            <echart-common
              :options="childOptions"
              :hasClick="true"
              @handleChange="childChange"
            ></echart-common>
          </div>
          <div class="right">
            <echart-common :options="haOptions"></echart-common>
          </div>
        </div>
      </div>
    </div>
    <model-page
      v-model="parentModel"
      title="母公司2021年6月发生薪酬机构分布和走势"
    >
      <sample-table-y
        :columns="parentColumns"
        :data="parentData"
      ></sample-table-y>
    </model-page>
    <model-page
      v-model="childModel"
      title="子公司2021年6月发生薪酬机构分布和走势"
    >
      <sample-table-y
        :columns="childColumns"
        :data="childData"
      ></sample-table-y>
    </model-page>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import * as echarts from 'echarts'
export default {
  setup() {
    const state = reactive({
      count: 0,
      parentOptions: {
        // 'backgroundColor': '#F8F9FA',
        title: {
          text: '母公司薪酬当年累计(万元)',
          x: '20',
          y: '20',
        },
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
          formatter: (params) => {
            return `<div style='color:#fff' class='tooltips'>
               <p>${state.list[params[0].dataIndex].name}</p>
               <p>当年累计(万元)：${state.list[params[0].dataIndex].value}</p>
               <p>同比：${state.list[params[0].dataIndex].rate}%</p>
             </div>`
          },
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '2%',
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
      haOptions: {
        // 'backgroundColor': '#F8F9FA',
        title: {
          text: '华安期货薪酬当年累计(万元)',
          x: '20',
          y: '20',
        },
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
          formatter: (params) => {
            return `<div style='color:#fff' class='tooltips'>
               <p>${state.list[params[0].dataIndex].name}</p>
               <p>当年累计(万元)：${state.list[params[0].dataIndex].value}</p>
               <p>同比：${state.list[params[0].dataIndex].rate}%</p>
             </div>`
          },
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
      list: [
        {
          name: '2021-01',
          value: '143.12',
          rate: '22.12',
        },
        {
          name: '2021-02',
          value: '243.12',
          rate: '22.12',
        },
        {
          name: '2021-03',
          value: '343.12',
          rate: '22.12',
        },
        {
          name: '2021-04',
          value: '443.12',
          rate: '22.12',
        },
        {
          name: '2021-05',
          value: '343.12',
          rate: '22.12',
        },
        {
          name: '2021-06',
          value: '543.12',
          rate: '22.12',
        },
        {
          name: '2021-07',
          value: '443.12',
          rate: '22.12',
        },
        {
          name: '2021-08',
          value: '343.12',
          rate: '22.12',
        },
        {
          name: '2021-09',
          value: '543.12',
          rate: '22.12',
        },
        {
          name: '2021-10',
          value: '443.12',
          rate: '22.12',
        },
        {
          name: '2021-11',
          value: '343.12',
          rate: '22.12',
        },
        {
          name: '2021-12',
          value: '543.12',
          rate: '22.12',
        },
      ],
      childOptions: {
        color: ['#678DF7', '#B34BFC', '#F05A59', '#FD9C34', '#544BFC'],
        legend: {
          bottom: '10',
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(31,31,31,.4)',
          borderColor: '#ddd',
          textStyle: {
            color: '#fff',
          },
          formatter: (params) => {
            return `<div class='tooltips'>
            <p>${params.data.name}</p>
            <p>本月发生(万元)：${params.data.value}</p>
            <p>环比：${params.data.rate}%</p>
            </div>`
          },
        },
        series: [
          {
            type: 'pie',
            radius: [50, 180],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              // borderRadius: 8,
            },
            data: [],
          },
        ],
      },
      childList: [
        {
          name: '华安国际',
          value: '112.12',
          rate: '11.11',
        },
        {
          name: '新兴咨询',
          value: '122.12',
          rate: '11.11',
        },
        {
          name: '华富瑞兴',
          value: '132.12',
          rate: '11.11',
        },
        {
          name: '华富嘉业',
          value: '82.12',
          rate: '11.11',
        },
        {
          name: '华安期货',
          value: '282.12',
          rate: '11.11',
        },
      ],
      parentsOptions: {
        color: ['#678DF7', '#FD9C34', '#A7ECFF',
          '#0D8591', '#8421B0', '#F23A39', '#B34BFC', '#A7C736', '#FFAA77',
          'cyan', '#DA10FE', '#16A65F',
          '#F05A59', '#544BFC', 'red'],
        legend: {
          bottom: '20',
          left: '15',
          itemGap: 15,
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(31,31,31,.4)',
          borderColor: '#ddd',
          textStyle: {
            color: '#fff',
          },
          formatter: (params) => {
            return `<div class='tooltips'>
            <p>${params.data.name}</p>
            <p>本月发生(万元)：${params.data.value}</p>
            <p>环比：${params.data.rate}%</p>
            </div>`
          },
        },
        series: [
          {
            type: 'pie',
            radius: [0, 85],
            label: {
              position: 'inner',
              fontSize: 14,
              color: '#fff',
            },
            labelLine: {
              show: false,
            },
            data: [],
          },
          {
            type: 'pie',
            radius: [90, 130],
            center: ['50%', '50%'],
            // roseType: 'area',
            emphasis: { focus: 'none' },
            scaleSize: 20,
            scale: true,
            itemStyle: {
              // borderRadius: 8,
            },
            data: [],
          },
        ],
      },
      parentsList: [
        {
          name: '统招员工',
          value: '131',
          rate: '11.11',
        }, {
          name: '员工制营销人员',
          value: '171.2',
          rate: '11.11',
        }, {
          name: '投行条线',
          value: '111',
          rate: '11.11',
        }, {
          name: '资管条线',
          value: '101',
          rate: '11.11',
        }, {
          name: '自营条线',
          value: '100.11',
          rate: '11.11',
        }, {
          name: '研究条线',
          value: '111.11',
          rate: '11.11',
        }, {
          name: '财富管理',
          value: '210.11',
          rate: '11.11',
        }, {
          name: '资产托管',
          value: '121',
          rate: '11.11',
        }, {
          name: '证劵金融',
          value: '131',
          rate: '11.11',
        }, {
          name: '合规风控稽核',
          value: '141',
          rate: '11.11',
        }, {
          name: '信息与科技',
          value: '91',
          rate: '11.11',
        }, {
          name: '运营管理',
          value: '81',
          rate: '11.11',
        }, {
          name: '其他',
          value: '51',
          rate: '11.11',
        },
      ],
      parentsListN: [
        {
          name: '公司总部',
          value: '131',
          rate: '11.11',
        },
        {
          name: '分支机构',
          value: '41',
          rate: '11.11',
        },
      ],
      parentModel: false,
      parentColumns: [
        {
          name: '机构名称',
          key: 'name',
        },
        {
          name: '本月发生（万元)',
          key: 'month',
        },
        {
          name: '环比',
          key: 'seq',
        },
        {
          name: '全年累计（万元）',
          key: 'year',
        },
        {
          name: '同比',
          key: 'com',
        },
      ],
      parentData: [
        {
          name: '华安期货',
          month: '11',
          seq: '+11.12%',
          year: '111',
          com: '-11.98%',
        },
        {
          name: '华富嘉业',
          month: '11',
          seq: '+11.12%',
          year: '111',
          com: '-11.98%',
        }, {
          name: '华富瑞兴',
          month: '11',
          seq: '+11.12%',
          year: '111',
          com: '-11.98%',
        }, {
          name: '新兴咨询',
          month: '11',
          seq: '+11.12%',
          year: '111',
          com: '-11.98%',
        }, {
          name: '华安国际',
          month: '11',
          seq: '+11.12%',
          year: '111',
          com: '-11.98%',
        }, {
          name: '子公司合计',
          month: '111',
          seq: '+11.12%',
          year: '311',
          com: '-11.98%',
        },
      ],
      childModel: false,
      childColumns: [
        {
          name: '机构名称',
          key: 'name',
        },
        {
          name: '本月发生（万元)',
          key: 'month',
        },
        {
          name: '环比',
          key: 'seq',
        },
        {
          name: '全年累计（万元）',
          key: 'year',
        },
        {
          name: '同比',
          key: 'com',
        },
      ],
      childData: [
        {
          name: '华安期货',
          month: '11',
          seq: '+11.12%',
          year: '111',
          com: '-11.98%',
        },
        {
          name: '华富嘉业',
          month: '11',
          seq: '+11.12%',
          year: '111',
          com: '-11.98%',
        }, {
          name: '华富瑞兴',
          month: '11',
          seq: '+11.12%',
          year: '111',
          com: '-11.98%',
        }, {
          name: '新兴咨询',
          month: '11',
          seq: '+11.12%',
          year: '111',
          com: '-11.98%',
        }, {
          name: '华安国际',
          month: '11',
          seq: '+11.12%',
          year: '111',
          com: '-11.98%',
        }, {
          name: '子公司合计',
          month: '111',
          seq: '+11.12%',
          year: '311',
          com: '-11.98%',
        },
      ],
    })
    onMounted(() => {
      state.parentOptions.xAxis[0].data = state.list.map(item => item.name)
      state.parentOptions.series[0].data = state.list.map(item => item.value)
      state.haOptions.xAxis[0].data = state.list.map(item => item.name)
      state.haOptions.series[0].data = state.list.map(item => item.value)
      state.childOptions.series[0].data = state.childList
      state.parentsOptions.series[1].data = state.parentsList
      state.parentsOptions.series[0].data = state.parentsListN
    })
    //母公司点击回调
    const parentChange = (data) => {
      console.log(data)
    }
    //子公司点击回调
    const childChange = (data) => {
      console.log(data)
    }
    return {
      ...toRefs(state), parentChange, childChange,
    }
  },
}
</script>

<style lang="scss" scoped>
.section-2 {
  margin-top: 20px;
  position: relative;
  .date {
    position: absolute;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #969696;
    right: 30px;
    top: 0;
  }
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
    border-radius: 10px;
    box-sizing: border-box;
    // padding: 20px;
    .trend {
      background: #fff;
      //   height: 1196px;
      border-radius: 10px;
      padding: 5px 10px;
      padding-bottom: 30px;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        margin-top: 20px;
        > p {
          margin: 0;
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bolder;
          color: #2f2f2f;
        }
        > img {
          cursor: pointer;
        }
      }
      .card-line {
        height: 500px;
        display: flex;
        > div {
          border-radius: 10px;
          border: 1px solid #e2e2e2;
        }
        .left {
          width: 770px;
        }
        .right {
          margin-left: 20px;
          flex: 1;
        }
      }
    }
    .card {
      display: flex;
      align-items: center;
      > li {
        background: #ffffff;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px;
        flex: 1;
        &:first-of-type {
          margin-right: 20px;
        }
        > img {
          margin-right: 50px;
        }
        .data {
          p {
            margin: 0;
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #6d6d6d;
            line-height: 30px;
            text-align: center;
            span {
              &.n1 {
                color: #ff1054;
              }
              &.n2 {
                color: #16a65f;
              }
            }
            span {
              &:first-of-type {
                font-size: 24px;
                font-family: DIN-Medium, DIN;
                font-weight: bolder;
                color: #2f2f2f;
              }
              &:last-of-type {
                font-size: 24px;
                font-family: DIN-Medium, DIN;
                font-weight: 500;
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
  }
  /deep/.tooltips {
    p {
      margin: 0;
      line-height: 30px;
    }
  }
}
</style>