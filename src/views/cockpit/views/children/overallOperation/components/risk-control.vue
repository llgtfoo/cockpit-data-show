<template>
  <div class="section-5">
    <div class="title">风险控制指标监管</div>
    <div class="content-main">
      <div class="left">
        <img
          @click="riskModelOne=true"
          src="@/assets/imgs/overallOperation/biaodan.png"
          alt=""
        >
        <echart-common :options="options"></echart-common>
      </div>
      <div class="right">
        <div class="title">
          <span>最新数据：2020年06月</span>
          <img
            @click="riskModelTwo=true"
            src="@/assets/imgs/overallOperation/biaodan.png"
            alt=""
          >
        </div>
        <div class="header">
          <ul>
            <li>
              <span class="icon"></span>
              <span>期初</span>
            </li>
            <li>
              <span class="icon"></span>
              <span>期末</span>
            </li>
          </ul>
        </div>
        <div class="regulatory">
          <div class="regulatory-bg">
            <div class="bg-1">
              <span>监管标准</span>
            </div>
            <div class="bg-2">
              <span>预警标准</span>
            </div>
            <div class="bg-3">
              <span>安全区域</span>
            </div>
          </div>
          <ul class="list-line">
            <li
              v-for="(item,index) in riskList"
              :key="index"
              @mouseenter="e=>tipShow(e,item,index)"
              @mouseleave="showTip = false"
            >
              <div class="block">
                <div class="begin">
                  <div class="icon"></div>
                  <div
                    class="line"
                    :style="beginClass(item)"
                  ></div>
                </div>
                <div class="end">
                  <div class="icon"></div>
                  <div
                    class="line"
                    :style="endClass(item)"
                  ></div>
                </div>
              </div>
              <div class="text">{{item.name}}</div>
            </li>
          </ul>
          <div
            class="tip"
            v-if="showTip"
            :style="tipStyle"
          >
            <p class="name">{{tipData.name}}</p>
            <p class="value">
              期初：{{tipData.beginningValue}}%
            </p>
            <p class="value">
              期末：{{tipData.endingValue}}%
            </p>
            <p class="risk">
              预警标准：>=120%
            </p>
            <p class="risk">
              监管标准：>=100%
            </p>
          </div>
        </div>
      </div>
    </div>
    <model-page
      v-model="riskModelOne"
      title="风控控制指标监管1"
    >
      <sample-table-y
        :columns="riskOneColumns"
        :data="listLeft"
      ></sample-table-y>
    </model-page>
    <model-page
      v-model="riskModelTwo"
      title="风控控制指标监管2"
    >
      <sample-table-y
        :columns="riskTwoColumns"
        :data="riskList"
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
      listLeft: [
        {
          name: '核心净资本（万元）',
          value1: '2000',
          value2: '2500',
        },
        {
          name: '附属净资本（万元）',
          value1: '900',
          value2: '1000',
        },
        {
          name: '净资本（万元）',
          value1: '2200',
          value2: '1800',
        },
        {
          name: '各项风险资本准备之和（万元）',
          value1: '1500',
          value2: '1200',
        },
        {
          name: '表内外资产总额（万元）',
          value1: '800',
          value2: '900',
        },
      ],
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
          },
          backgroundColor: 'rgba(31,31,31,.4)',
          borderColor: '#ddd',
          textStyle: {
            color: '#fff',
          },
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '5%',
          top: '5%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        yAxis: {
          type: 'category',
          data: [],
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#E2E2E2',
            },
          },
          axisLabel: {
            formatter: function (params) {
              return params.substring(0, params.indexOf('（万元）'))
            },
            textStyle: {
              color: '#3C3C3C', //坐标值得具体的颜色
              'fontWeight': 'bold',
              fontSize: '16px',
            },
          },
        },
        series: [
          {
            name: '期初',
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 1, color: '#7C9BFF' },
                  { offset: 0, color: '#193BFF' },
                ],
              ),
              //   barBorderRadius: 15,
            },
            data: [],
            barWidth: '20%',
          },
          {
            name: '期末',
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 1, color: '#DBB2FF' },
                  { offset: 0, color: '#DC34E5' },
                ],
              ),
              //   barBorderRadius: 15,
            },
            barWidth: '20%',
            data: [],
          },
        ],
      },
      riskList: [
        {
          name: '风险覆盖率',
          beginning: '0',
          beginningValue: '66',
          ending: '0',
          endingValue: '110',
          warning: '>=120%',
          supervision: '>=100%',
        },
        {
          name: '资本杠杆率',
          beginning: '0',
          beginningValue: '110',
          ending: '0',
          endingValue: '100',
          warning: '>=120%',
          supervision: '>=100%',
        },
        {
          name: '流动性覆盖率',
          beginning: '1',
          beginningValue: '110',
          ending: '1',
          endingValue: '100',
          warning: '>=120%',
          supervision: '>=100%',
        },
        {
          name: '净稳定资金率',
          beginning: '1',
          beginningValue: '77',
          ending: '1',
          endingValue: '110',
          warning: '>=120%',
          supervision: '>=100%',
        },
        {
          name: '自营权益类证劵及其衍生品/净资本',
          beginning: '2',
          beginningValue: '100',
          ending: '2',
          endingValue: '100',
          warning: '>=120%',
          supervision: '>=100%',
        },
        {
          name: '自营非权益类证劵及其衍生品/净资本',
          beginning: '2',
          beginningValue: '110',
          ending: '2',
          endingValue: '100',
          warning: '>=120%',
          supervision: '>=100%',
        },
        {
          name: '融资(含融劵)金额/净资本',
          beginning: '2',
          beginningValue: '100',
          ending: '2',
          endingValue: '110',
          warning: '>=120%',
          supervision: '>=100%',
        },
      ],
      showTip: false,
      tipData: {},
      tipStyle: {},
      riskModelOne: false,
      riskModelTwo: false,
      riskOneColumns: [
        {
          name: '指标',
          key: 'name',
        },
        {
          name: '期初',
          key: 'value1',
        },
        {
          key: 'value2',
          name: '期末',
        },
      ],
      riskTwoColumns: [
        { name: '指标', key: 'name' },
        { name: '期初', key: 'beginningValue' },
        { name: '期末', key: 'endingValue' },
        { name: '预警标准', key: 'warning' },
        { name: '监督标准', key: 'supervision' },
      ],
    })
    onMounted(() => {
      state.options.yAxis.data = state.listLeft.map(item => item.name).reverse()
      state.options.series[0].data = state.listLeft.map(item => item.value1)
      state.options.series[1].data = state.listLeft.map(item => item.value2)
    })
    const beginClass = (item) => {
      return {
        height: item.beginning === '0' ?
          item.beginningValue > item.endingValue ?
            '90px' :
            '80px' : item.beginning === '1' ?
            item.beginningValue > item.endingValue ? '150px' :
              '40px' : item.beginning === '2' ?
              item.beginningValue > item.endingValue ?
                '220px' :
                '210px' : '',
      }
    }
    const endClass = (item) => {
      return {
        height: item.ending === '0' ?
          item.endingValue > item.beginningValue ?
            '90px' :
            '80px' : item.ending === '1' ?
            item.endingValue > item.beginningValue ?
              '150px' :
              '40px' : item.ending === '2' ?
              item.endingValue > item.beginningValue ?
                '220px' :
                '210px' : '',
      }
    }
    //显示提示窗
    const tipShow = (e, item, index) => {
      state.showTip = true
      const { width } = e.target.getBoundingClientRect()
      state.tipData = item
      if (index < 5) {
        state.tipStyle = {
          left: `${(index + 1) * width - 20}px`,
        }
      } else {
        state.tipStyle = {
          right: `${(state.riskList.length - index) * width - 20}px`,
        }
      }
    }
    return {
      ...toRefs(state),
      endClass,
      beginClass,
      tipShow,
    }
  },
}
</script>

<style lang="scss" scoped>
.section-5 {
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
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
    height: 421px;
    display: flex;
    .left {
      width: 600px;
      height: 100%;
      background: #fff;
      margin-right: 10px;
      border-radius: 10px;
      position: relative;
      > img {
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
        z-index: 9;
      }
    }
    .right {
      flex: 1;
      height: 100%;
      background: #fff;
      margin-right: 10px;
      border-radius: 10px;
      padding: 10px;
      box-sizing: border-box;
      position: relative;
      .regulatory {
        width: 100%;
        height: 350px;
        margin-top: 15px;
        position: relative;
        .tip {
          position: absolute;
          background: rgba(31, 31, 31, 0.4);
          padding: 5px 10px;
          border: 1px solid #ddd;
          top: 35%;
          transform: translateY(-50%);
          z-index: 999;
          p {
            margin: 0;
            line-height: 30px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #fff;
          }
        }
        .regulatory-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 0;
          //   height: 100%;
          > div {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          span {
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            letter-spacing: 70px;
          }
          .bg-1 {
            height: 75px;
            background: #ffa497;
            span {
              color: #e47160;
            }
          }
          .bg-2 {
            height: 59px;
            background: #ffdaac;
            span {
              color: #e5ba84;
            }
          }
          .bg-3 {
            height: 121px;
            background: #e3fcee;
            span {
              color: #b6d9c5;
            }
          }
        }
        .list-line {
          z-index: 10;
          display: flex;
          align-items: center;
          position: absolute;
          top: 0px;
          bottom: 0;
          left: 0;
          right: 0;
          cursor: pointer;
          margin: 0;
          :hover {
            background: rgba(31, 31, 31, 0.1);
          }
          li {
            flex: 1;
            margin: 0;
            // height: 100%;
            .block {
              height: 255px;
              width: 100%;
              display: flex;
              align-items: flex-end;
              justify-content: center;
              .begin {
                display: flex;
                flex-direction: column;
                align-items: center;
                .icon {
                  display: inline-block;
                  width: 18px;
                  height: 18px;
                  border-radius: 50%;
                  position: relative;
                  background: #193bff;
                  &::before {
                    content: "";
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: #fff;
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                  }
                }
                .line {
                  width: 2px;
                  background: #193bff;
                }
              }
              .end {
                margin-left: 30px;
                display: flex;
                flex-direction: column;
                align-items: center;
                .icon {
                  display: inline-block;
                  width: 18px;
                  height: 18px;
                  border-radius: 50%;
                  position: relative;
                  background: #dc34e5;
                  &::before {
                    content: "";
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: #fff;
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                  }
                }
                .line {
                  width: 2px;
                  background: #dc34e5;
                }
              }
            }
            .text {
              height: 95px;
              width: 100%;
              box-sizing: border-box;
              font-size: 16px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 500;
              color: #3c3c3c;
              padding: 5px 10px;
              letter-spacing: 1px;
              text-align: center;
            }
          }
        }
      }
      .header {
        position: absolute;
        top: 15px;
        left: 50%;
        transform: translateX(-50%);
        ul {
          display: flex;
          align-items: center;
          li {
            display: flex;
            align-items: center;
            margin-right: 10px;
            .icon {
              display: inline-block;
              width: 18px;
              height: 18px;
              border-radius: 50%;
              margin-right: 10px;
              position: relative;
              &::before {
                content: "";
                position: absolute;
                width: 8px;
                height: 8px;
                background: #fff;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            }
            &:first-of-type {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #3653ff;
              span {
                &.icon {
                  background: #3653ff;
                }
              }
            }
            &:last-of-type {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #dc34e5;
              span {
                &.icon {
                  background: #dc34e5;
                }
              }
            }
          }
        }
      }
      .title {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #969696;
        > span {
          margin-right: 10px;
        }
        > img {
          cursor: pointer;
        }
      }
    }
  }
}
</style>