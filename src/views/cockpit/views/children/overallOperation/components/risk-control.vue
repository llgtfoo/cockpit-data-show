<template>
  <div class="section-5">
    <div class="title">风险控制指标监管</div>
    <div class="content-main">
      <div class="left">
        <img
          src="@/assets/imgs/overallOperation/biaodan.png"
          alt=""
        >
        <echart-common :options="options"></echart-common>
      </div>
      <div class="right">
        <div class="title">
          <span>最新数据：2020年06月</span>
          <img
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
      count: 0,
      listLeft: [
        {
          name: '核心净资本',
          value1: '2000',
          value2: '2500',
        },
        {
          name: '附属净资本',
          value1: '900',
          value2: '1000',
        },
        {
          name: '净资本',
          value1: '2200',
          value2: '1800',
        },
        {
          name: '各项风险资本准备之和',
          value1: '1500',
          value2: '1200',
        },
        {
          name: '表内外资产总额',
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
    })
    onMounted(() => {
      state.options.yAxis.data = state.listLeft.map(item => item.name).reverse()
      state.options.series[0].data = state.listLeft.map(item => item.value1)
      state.options.series[1].data = state.listLeft.map(item => item.value2)
    })
    return {
      ...toRefs(state),
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
      }
    }
    .right {
      flex: 1;
      height: 100%;
      background: #fff;
      margin-right: 10px;
      border-radius: 10px;
      padding: 20px 10px;
      box-sizing: border-box;
      position: relative;
      .regulatory {
        width: 100%;
        height: 350px;
        margin-top: 15px;
        position: relative;
        .regulatory-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
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