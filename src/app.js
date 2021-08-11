import '@/assets/css/init.scss' //全局默认css
import '@/assets/css/scroll.scss' //全局默认css
import '@/icons/index' //svg图标
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less' //ui库
import * as echarts from 'echarts' //百度echarts图表
import { createApp } from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import components from './components/index' //全局组件
import directives from './directives/index' //全局指令
import axiosPlugin from './http/axios' //axios请求协议
import http from './http/index' //自定义post和get协议
//import './permission' //路由守卫
import router from './router' //路由
import store from './store' //状态管理
import utils from './utils/index' //全局工具函数
import views from './views/index'
sync(store, router) //route和store结合
const app = createApp(App)
  .use(views, router, store)
  .use(axiosPlugin)
  .use(store)
  .use(router)
  .use(components)
  .use(directives)
  .use(utils)
  .use(Antd)
//全局挂载
app.config.globalProperties.$http = http
app.config.globalProperties.$echarts = echarts
export default app
