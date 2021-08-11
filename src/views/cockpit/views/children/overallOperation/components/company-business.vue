<template>
  <div class="section-4">
    <div class="title">公司营业收入与行业对比</div>
    <div class="content-main">
      <div class="tab-right">
        <div class="date">最新数据：2020年03月</div>
      </div>
      <div class="main-box">
        <div class="table-list">
          <ul>
            <li class="title">
              <span>收入结构(万元)</span>
              <span>本公司收入</span>
              <span>行业均值</span>
              <span>行业最高值</span>
              <span>排名</span>
            </li>
            <li
              class="line"
              v-for="(item,index) in companyList"
              :key="index"
            >
              <div class="list">
                <div class="n1">
                  {{item.name}}
                  <img
                    v-if="item.children&&item.children.length>0"
                    :class="{active:childrenShow}"
                    src="@/assets/imgs/overallOperation/xiala.png"
                    alt=""
                    @click="childrenShow=!childrenShow"
                  >
                </div>
                <div class="n2">
                  <span>{{item.income}}</span>
                  <div class="progress-bg">
                    <div
                      class="progress-value"
                      :style="{width:`${Math.abs(Number(item.income))*100/1500}%`}"
                      :class="{value1:!item.income.includes('-'),value2:item.income.includes('-')}"
                    ></div>
                  </div>
                </div>
                <div class="n3">
                  <span>{{item.average}}</span>
                  <div class="progress-bg">
                    <div
                      class="progress-value"
                      :style="{width:`${Math.abs(Number(item.average))*100/1500}%`}"
                      :class="{value1:!item.average.includes('-'),
                      value2:item.average.includes('-')}"
                    ></div>
                  </div>
                </div>
                <div class="n4">
                  <span>{{item.maximum}}</span>
                  <div class="progress-bg">
                    <div
                      class="progress-value"
                      :style="{width:`${Math.abs(Number(item.maximum))*100/1500}%`}"
                      :class="{value1:!item.maximum.includes('-'),
                      value2:item.maximum.includes('-')}"
                    ></div>
                  </div>
                </div>
                <div class="n5">
                  <span>{{item.ranking}}</span>
                  <span>/156</span>
                </div>
              </div>
              <transition name="sub-menu">
                <div
                  class="list-children"
                  v-if="item.children&&item.children.length>0&&childrenShow"
                >
                  <div
                    class="list"
                    v-for="(it,i) in item.children"
                    :key="i"
                  >
                    <div class="n1">{{it.name}}</div>
                    <div class="n2">
                      <span>{{it.income}}</span>
                      <div class="progress-bg">
                        <div
                          class="progress-value"
                          :style="{width:'50%'}"
                          :class="{value1:!it.income.includes('-'),
                        value2:it.income.includes('-')}"
                        ></div>
                      </div>
                    </div>
                    <div class="n3">
                      <span>{{it.average}}</span>
                      <div class="progress-bg">
                        <div
                          class="progress-value"
                          :style="{width:'50%'}"
                          :class="{value1:!it.average.includes('-'),
                        value2:it.average.includes('-')}"
                        ></div>
                      </div>
                    </div>
                    <div class="n4">
                      <span>{{it.maximum}}</span>
                      <div class="progress-bg">
                        <div
                          class="progress-value"
                          :style="{width:'50%'}"
                          :class="{value1:!it.maximum.includes('-'),
                        value2:it.maximum.includes('-')}"
                        ></div>
                      </div>
                    </div>
                    <div class="n5">
                      <span>{{it.ranking}}</span>
                      <span>/156</span>
                    </div>
                  </div>
                </div>
              </transition>
            </li>
          </ul>
        </div>
        <div class="trend">
          <div class="top">
            <span>历史走势</span>
            <div class="screening-items">
              <a-select
                v-model:value="value1"
                style="width: 180px;margin-right:20px"
              >
                <a-select-option
                  :value="item.value"
                  v-for="(item,index) in screeningList1"
                  :key="index"
                >
                  {{item.name}}
                </a-select-option>
              </a-select>
              <a-select
                v-model:value="value2"
                style="width: 120px;margin-right:20px"
              >
                <a-select-option
                  :value="item.value"
                  v-for="(item,index) in screeningList2"
                  :key="index"
                >
                  {{item.name}}
                </a-select-option>
              </a-select>
              <img
                @click="monthModel=true"
                src="@/assets/imgs/overallOperation/biaodan.png"
                alt=""
              >
            </div>
          </div>
          <div class="trend-line">
            <echart-common :options="options"></echart-common>
          </div>
        </div>
      </div>
    </div>
    <model-page
      v-model="monthModel"
      title="手续费及佣金收入（全部）"
    >
      <sample-table-x
        :columns="monthColumns"
        :data="monthData"
      ></sample-table-x>
    </model-page>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import * as echarts from 'echarts'
export default {
  setup() {
    const state = reactive({
      childrenShow: false,
      count: 0,
      companyList: [
        {
          name: '手续费及佣金收入',
          income: '1000',
          average: '900',
          maximum: '1200',
          ranking: '20',
          children: [
            {
              name: '证券经纪业务',
              income: '10000',
              average: '900',
              maximum: '1200',
              ranking: '20',
            },
            {
              name: '投资银行业务',
              income: '10000',
              average: '900',
              maximum: '1200',
              ranking: '20',
            },
            {
              name: '投资咨询业务',
              income: '10000',
              average: '900',
              maximum: '1200',
              ranking: '20',
            },
            {
              name: '资产管理业务',
              income: '10000',
              average: '900',
              maximum: '1200',
              ranking: '20',
            },
          ],
        },
        {
          name: '利息净收入',
          income: '1200',
          average: '1000',
          maximum: '1400',
          ranking: '20',
        },

        {
          name: '投资收益',
          income: '1100',
          average: '1100',
          maximum: '1200',
          ranking: '20',
        },
        {
          name: '公允价值变动收益',
          income: '-1200',
          average: '-920',
          maximum: '1500',
          ranking: '20',
        },
      ],
      value1: '01',
      value2: '01',
      screeningList1: [
        {
          name: '手术费及佣金收入',
          value: '01',
        },
        {
          name: '利息净收入',
          value: '02',
        },
        {
          name: '投资资收益',
          value: '03',
        },
        {
          name: '公允价值变动收益',
          value: '04',
        },
      ],
      screeningList2: [
        {
          name: '全部',
          value: '01',
        },
        {
          name: '经纪业务',
          value: '02',
        },
        {
          name: '投资银行业务',
          value: '03',
        },
        {
          name: '投资咨询业务',
          value: '04',
        },
        {
          name: '资产管理业务',
          value: '05',
        },
      ],
      options: {
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
        legend: {
          left: '100',
          icon: 'rect',
          top: '20',
          height: '10',
          // selectedMode: false,
          data: [
            '本公司', '行业均值', '行业最高值',
          ],
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
            yAxisIndex: 1,
            name: '本公司',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 1, color: '#8CF5DC' },
                  { offset: 0, color: '#05BEDC' },
                ],
              ),
              barBorderRadius: 15,
            },
            type: 'bar',
            barWidth: '15%',
            data: [],
          },
          {
            yAxisIndex: 1,
            name: '行业均值',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 1, color: '#FCAEC4' },
                  { offset: 0, color: '#F87692' },
                ],
              ),
              barBorderRadius: 15,
            },
            type: 'bar',
            barWidth: '15%',
            data: [],
          },
          {
            yAxisIndex: 1,
            name: '行业最高值',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 1, color: '#DBB2FF' },
                  { offset: 0, color: '#DC34E5' },
                ],
              ),
              barBorderRadius: 15,
            },
            type: 'bar',
            barWidth: '15%',
            data: [],
          },
        ],
      },
      list: [
        {
          name: '2020年3月',
          value1: '10000',
          value2: '12000',
          value3: '9000',
        },
        {
          name: '2020年4月',
          value1: '12000',
          value2: '10000',
          value3: '7000',
        },
        {
          name: '2020年5月',
          value1: '15000',
          value2: '13000',
          value3: '12000',
        },
        {
          name: '2020年6月',
          value1: '8000',
          value2: '7000',
          value3: '9000',
        },
        {
          name: '2020年7月',
          value1: '4000',
          value2: '3500',
          value3: '4500',
        },

      ],
      monthModel: false,
      monthColumns: ['指标', '本公司（万元）', '行业均值（万元） ', '行业最高值（万元 ）', '排名'],
      monthData: [
        ['2020年03月', '2020年06月', '2020年09月 ', '2020年12 月', '2021年03月'],
        ['2992.22', '1111', '1111 ', '111 1', '1111'],
        ['2992.22', '1111', '1111 ', '111 1', '1111'],
        ['2992.22', '1111', '1111 ', '111 1', '1111'],
        ['12/122', '13/122', '12/33 ', '22/12 2', '33/122'],
      ],
    })
    onMounted(() => {
      state.options.xAxis[0].data = state.list.map(item => item.name)
      state.options.series[0].data = state.list.map(item => item.value1)
      state.options.series[1].data = state.list.map(item => item.value2)
      state.options.series[2].data = state.list.map(item => item.value3)
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss" scoped>
.sub-menu-enter-active,
.sub-menu-leave-active {
  transition: all 0.5s ease;
  max-height: 270px; /* 这里将最大高度设置为折叠元素不可能超越的高度 比如1000px */
  opacity: 1;
}
.sub-menu-to,
.sub-menu-leave-to {
  max-height: 270px;
  opacity: 1;
}
.sub-menu-enter-from,
.sub-menu-leave-to {
  opacity: 0;
  max-height: 0px;
}
.section-4 {
  margin-top: 20px;
  position: relative;
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
    // height: 1030px;
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
      justify-content: flex-end;
    }
    .main-box {
      .table-list {
        width: 100%;
        border-bottom: 1px solid #e2e2e2;
        margin-top: 10px;
        ul {
          li {
            &.title {
              display: flex;
              align-items: center;
              font-size: 16px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: bold;
              color: #2f2f2f;
              margin-bottom: 20px;
              span {
                flex: 3;
                padding-left: 20px;
                box-sizing: border-box;
                &:last-of-type {
                  flex: 1;
                }
              }
            }
            &.line {
              .list {
                display: flex;
                align-items: center;
                width: 100%;
                height: 48px;
                background: url("~@/assets/imgs/overallOperation/com-bg.png")
                  no-repeat;
                background-size: 100% 100%;
                margin-bottom: 20px;
                > div {
                  padding-left: 27px;
                  box-sizing: border-box;
                  flex: 3;
                  &:last-of-type {
                    flex: 1;
                  }
                  &.n1 {
                    font-size: 16px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #2f2f2f;
                    > img {
                      margin-left: 10px;
                      cursor: pointer;
                      transform: rotate(180deg);
                      transition: transform 0.5s linear;
                      &.active {
                        transform: rotate(0deg);
                        transition: transform 0.5s linear;
                      }
                    }
                  }
                  &.n3,
                  &.n2,
                  &.n4 {
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: bold;
                    color: #2f2f2f;
                    .progress-value {
                      position: absolute;
                      top: 0;
                      left: 0;
                      border-radius: 10px;
                      height: 16px;
                      &.value1 {
                        background: linear-gradient(
                          45deg,
                          #193bff 0%,
                          #7c9bff 100%
                        );
                      }
                      &.value2 {
                        background: linear-gradient(
                          45deg,
                          #ff8343 0%,
                          #ffcdb2 100%
                        );
                      }
                    }
                    .progress-bg {
                      position: relative;
                      margin-left: 20px;
                      height: 16px;
                      width: 100%;
                      border-radius: 10px;
                    }
                    > span {
                      display: inline-block;
                      height: 100%;
                      width: 200px;
                    }
                  }
                  &.n5 {
                    span {
                      &:first-of-type {
                        font-size: 16px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: bold;
                        color: #2f2f2f;
                      }
                      &:last-of-type {
                        font-size: 16px;
                        font-family: PingFangSC-Medium, PingFang SC;
                        font-weight: 400;
                        color: #2f2f2f;
                      }
                    }
                  }
                }
              }
            }
            .list-children {
              overflow: hidden;
              .list {
                background: url("~@/assets/imgs/overallOperation/com-child.png")
                  no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }
      }
      .trend {
        width: 100%;
        height: 428px;
        padding: 20px 10px;
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          > span {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bolder;
            color: #2f2f2f;
          }
          .screening-items {
            display: flex;
            align-items: center;
          }
        }
        .trend-line {
          margin-top: 10px;
          width: 100%;
          height: 370px;
        }
      }
    }
  }
}
</style>