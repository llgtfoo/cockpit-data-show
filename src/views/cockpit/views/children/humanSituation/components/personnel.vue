<template>
  <div class="section-1">
    <div class="title">人员情况</div>
    <div class="content-main">
      <div class="date-header">
        <span class="date">最新数据：2021年06月</span>
        <a-month-picker
          v-model:value="timeSelect"
          size="large"
          format="YYYY-MM"
          :open="isOpen"
          @change="change"
        >
          <span
            class="goSelect"
            @click="isOpen=true"
          >查看历史</span>
          <template #renderExtraFooter>
            <div class="date-footer-box">
              <span>{{timeSelect?moment(timeSelect).format('YYYY-MM'):""}}</span>
              <div class="button-box">
                <a-button
                  shape="round"
                  @click="clear"
                >
                  清空
                </a-button>
                <a-button
                  type="primary"
                  shape="round"
                  ghost
                  @click="currtentMonth"
                >
                  最新
                </a-button>
                <a-button
                  type="primary"
                  shape="round"
                  @click="confrim"
                >
                  确定
                </a-button>
              </div>
            </div>
          </template>
        </a-month-picker>
      </div>
      <ul class="card-list">
        <li
          v-for="(item,index) in cardList"
          :key="index"
          :style="{'background-image':'url('+cardImages[index]['bg']+')'}"
        >
          <div
            class="left"
            v-if="item.rate"
          >
            <p class="line1">
              <span>{{item.total}}人</span>
              <span>[+{{item.rate}}]</span>
            </p>
            <p class="line2">
              <span>{{item.name}}</span>
              <span>(环比)</span>
            </p>
          </div>
          <div
            class="left"
            v-else
          >
            <p class="line1">
              <span>{{item.total}}人</span>
              <span>[{{item.parant}}人/{{item.child}}人]</span>
            </p>
            <p class="line2">
              <span>{{item.name}}</span>
              <span>(母公司/子公司)</span>
            </p>
          </div>
          <img
            :src="cardImages[index]['icon']"
            alt=""
          >
        </li>
      </ul>
      <div class="middle-show">
        <tab-toggle
          :change="tabChange"
          :tab="['母公司', '子公司']"
        ></tab-toggle>
        <div class="data-show">
          <span>月末数据：</span>
          <span>1008</span>人
          [同比+<span>10.19%</span>]
          <img
            @click="quarterModel=true"
            src="@/assets/imgs/overallOperation/biaodan.png"
            alt=""
          >
        </div>
      </div>
      <div class="echarts-people">
        <echart-common :options="quarterOptions"></echart-common>
      </div>
    </div>
    <model-page
      v-model="quarterModel"
      title="人员情况"
    >
      <sample-table-y
        :columns="columns"
        :data="endMonth"
      ></sample-table-y>
    </model-page>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import moment from 'moment'
import * as echarts from 'echarts'
export default defineComponent({
  setup() {
    const state = reactive({
      timeSelect: '',
      isOpen: false,
      quarterModel: false,
      //图片背景
      cardImages: [
        {
          icon: require('@/assets/imgs/humanSituation/icon-1.png'),
          bg: require('@/assets/imgs/humanSituation/bg-1.png'),
        },
        {
          icon: require('@/assets/imgs/humanSituation/icon-2.png'),
          bg: require('@/assets/imgs/humanSituation/bg-2.png'),
        },
        {
          icon: require('@/assets/imgs/humanSituation/icon-3.png'),
          bg: require('@/assets/imgs/humanSituation/bg-3.png'),
        },
      ],
      cardList: [
        {
          name: '本月新增',
          total: '35',
          parant: '11',
          child: '14',
        },
        {
          name: '本月减少',
          total: '35',
          parant: '11',
          child: '14',
        },
        {
          name: '月末数据',
          total: '1234',
          rate: '10.12%',
        },
      ],
      quarterOptions: {
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
            return `<div class='tooltips'>
               <p>${state.endMonth[params[0].dataIndex].name}</p>
               <p><span>月度数据(人)：</span> ${state.endMonth[params[0].dataIndex].total}</p>
               <p><span>本月新增(人)：</span>${state.endMonth[params[0].dataIndex].add}</p>
               <p><span>月度减少(人)：</span>${state.endMonth[params[0].dataIndex].reduce}</p>
               <p><span>同比：</span>${state.endMonth[params[0].dataIndex].rate}</p>
            </div>`
          },
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
              color: function (params) {
                if (params.dataIndex < 11) {
                  return new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 1, color: '#7C9BFF' },
                      { offset: 0, color: '#193BFF' },
                    ],
                  )
                } else {
                  return new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 1, color: '#FFB388' },
                      { offset: 0, color: '#FD7C50' },
                    ],
                  )
                }
              },
              barBorderRadius: 15,
            },
            type: 'bar',
            barWidth: '20%',
            data: [],
          },
        ],
      },
      endMonth: [
        {
          name: '投行条线',
          total: '111',
          add: '11',
          reduce: '1',
          rate: '11.22%',
        },
        {
          name: '资管条线',
          total: '22',
          add: '11',
          reduce: '1',
          rate: '11.22%',
        },
        {
          name: '自营条线',
          total: '33',
          add: '11',
          reduce: '1',
          rate: '11.22%',
        },
        {
          name: '研究条线',
          total: '11',
          add: '66',
          reduce: '1',
          rate: '11.22%',
        },
        {
          name: '财富管理',
          total: '22',
          add: '11',
          reduce: '1',
          rate: '11.22%',
        },
        {
          name: '资产托管',
          total: '23',
          add: '11',
          reduce: '1',
          rate: '11.22%',
        },
        {
          name: '证劵金融',
          total: '33',
          add: '11',
          reduce: '1',
          rate: '11.22%',
        },
        {
          name: '合规风控稽核',
          total: '43',
          add: '11',
          reduce: '1',
          rate: '11.22%',
        },
        {
          name: '信息与科技',
          total: '12',
          add: '11',
          reduce: '1',
          rate: '11.22%',
        },
        {
          name: '运营管理',
          total: '33',
          add: '11',
          reduce: '1',
          rate: '11.22%',
        },
        {
          name: '其他',
          total: '133',
          add: '11',
          reduce: '1',
          rate: '11.22%',
        },
        {
          name: '统招员工',
          total: '122',
          add: '11',
          reduce: '1',
          rate: '11.22%',
        },
        {
          name: '员工制营销人员',
          total: '44',
          add: '11',
          reduce: '1',
          rate: '11.22%',
        },
      ],
      columns: [
        {
          name: '机构名称',
          key: 'name',
        },
        {
          name: '本月新增',
          key: 'add',
        },
        {
          name: '本月减少',
          key: 'reduce',
        },
        {
          name: '月末数据',
          key: 'total',
        },
        {
          name: '同比',
          key: 'rate',
        },
      ],
    })
    onMounted(() => {
      state.quarterOptions.xAxis[0].data = state.endMonth.map(item => item.name)
      state.quarterOptions.series[0].data = state.endMonth.map(item => item.total)
      // const nameList = state.endMonth.map(item => item.name)
      // state.columns = [...state.columns, ...nameList]
    })
    //日期改变
    const change = (date, dateString) => {
      console.log(date, dateString, state.timeSelect)
    }
    //确定
    const confrim = () => {
      state.isOpen = false
    }
    //清空
    const clear = () => {
      state.timeSelect = ''
      state.isOpen = false
    }
    //当前月
    const currtentMonth = () => {
      state.timeSelect = moment(new Date()).format('YYYY-MM')
    }
    //切换
    const tabChange = (index) => {
      console.log(index)
    }

    return {
      ...toRefs(state),
      change,
      moment,
      confrim,
      clear,
      currtentMonth,
      tabChange,
    }
  },
})
</script>

<style scoped lang='scss'>
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
    height: 637px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px;
    .echarts-people {
      width: 100%;
      height: 390px;
    }
    .middle-show {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      .data-show {
        font-size: 16px;
        font-family: DIN-Medium, DIN;
        font-weight: 500;
        color: #969696;
        > img {
          margin-left: 20px;
          cursor: pointer;
        }
        span {
          &:nth-of-type(2) {
            color: #193bff;
          }
          &:nth-of-type(3) {
            color: #ff5f19;
          }
        }
      }
    }
    .card-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;
      li {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        box-sizing: border-box;
        flex: 1;
        height: 100px;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 20px;
        .left {
          p {
            margin: 0;
            line-height: 30px;
            &.line1 {
              span {
                font-size: 20px;
                font-family: DIN-Medium, DIN;
                font-weight: 500;
                color: #ffffff;
                &:first-of-type {
                  text-align: right;
                  display: inline-block;
                  width: 100px;
                  margin-right: 20px;
                }
                &:last-of-type {
                }
              }
            }
            &.line2 {
              span {
                &:first-of-type {
                  font-size: 16px;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #ffffff;
                  text-align: right;
                  display: inline-block;
                  width: 100px;
                  margin-right: 20px;
                }
                &:last-of-type {
                  font-size: 16px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 300;
                  color: #ffffff;
                }
              }
            }
          }
        }
        &:last-of-type {
          margin-right: 0px;
        }
      }
    }
    .date-header {
      .date {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #969696;
      }
      span {
        &.goSelect {
          margin-left: 10px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #363fc8;
          cursor: pointer;
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

<style>
.date-footer-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ant-calendar-month {
  width: 350px !important;
}
</style>