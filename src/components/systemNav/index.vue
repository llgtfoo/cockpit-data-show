/**
*@name: 系统导航栏
* @param {type}
*/
<template>
  <a-layout-header class="layout-header-nav">
    <div class="logo">
      <img
        src="../../assets/imgs/logo.png"
        alt=""
      >
    </div>
    <div class="system-name">高管驾驶舱</div>
    <div class="system-time">
      <date-time v-slot:default="slotProps">
        {{slotProps.data.year}}年 {{slotProps.data.month}}月
        {{slotProps.data.day}}日&nbsp;&nbsp;&nbsp;
        {{slotProps.data.week}}&nbsp;&nbsp;&nbsp;
        {{slotProps.data.time}}
      </date-time>
    </div>
    <div class="login-userInfo">
      <a-avatar>USER</a-avatar>
      <span>欢迎您，张三</span>
    </div>
  </a-layout-header>
</template>

<script>
import { defineComponent, reactive, toRefs, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { SettingOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'SystemNav',
  components: {},
  props: {},
  setup() {
    // eslint-disable-next-line no-unused-vars
    const router = useRouter()
    const state = reactive({

    })
    //获取用户信息
    const userInfo = computed(() => {
      return _this.$store.getters['common/user/userInfo']
    })
    return {
      ...toRefs(state),
      userInfo,
    }
  },
})

// ?
</script>

<style lang='scss' scoped>
.ant-layout-header {
  align-items: center;
  height: 60px;
  display: flex;
  padding: 0px;
  min-width: 800px;
  line-height: 60px;
  background: linear-gradient(90deg, #363fc8 0%, #786eff 100%);
  .logo {
    width: 200px;
    height: 100%;
    text-align: center;
  }
  .system-name {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    font-weight: bolder;
    margin-left: 50px;
  }
  .system-time {
    color: #fff;
    margin-left: auto;
    margin-right: 40px;
    font-size: 20px;
    font-weight: bolder;
    height: 50px;
    line-height: 50px;
  }
  .login-userInfo {
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 50px;
    span {
      margin-left: 10px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
</style>
