<template>
  <a-layout style="height: 100%">
    <system-nav></system-nav>
    <a-layout>
      <!-- 导航栏 -->
      <a-layout-sider
        v-model:collapsed="collapsed"
        collapsible
        :trigger="null"
        class="menu-layout"
        width="250"
      >
        <a-menu
          mode="inline"
          theme="dark"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          :inlineCollapsed="collapsed"
          @click="selectedItem"
          @openChange="onOpenChange"
        >
          <template v-for="v in menusJson">
            <template v-if="!v.children">
              <a-menu-item :key="v.cnameKey">
                <span
                  class="iconfont"
                  :class="v.icon"
                  v-if="v.icon"
                ></span>
                <span>{{v.cname}}</span>
              </a-menu-item>
            </template>
            <template v-else>
              <sub-menu
                :menuInfo="v"
                :key="v.cnameKey"
              />
            </template>
          </template>
        </a-menu>
      </a-layout-sider>

      <a-layout>
        <!-- 内容区 -->
        <a-layout-content
          class="layout-content"
          :style="{margin: '15px', 'margin-right': '5px'}"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import menusJson from 'mock/menus/index.json'
import { createFromIconfontCN } from '@ant-design/icons-vue'
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
//阿里图标库引用
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2287282_0cednzk5tnru.js',
})
//菜单无限循环生成
const SubMenu = {
  name: 'SubMenu',
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
    collapsed: {
      type: Boolean,
    },
  },
  components: {
    // 'icon-font': IconFont,
  },
  template: `
   <a-sub-menu :key="menuInfo.cnameKey" v-bind="$attrs">
     <template #title>
        <span>
          <span
            class="iconfont" :class="menuInfo.icon" v-if="menuInfo.icon"></span>
         <span v-if='!collapsed'>{{menuInfo.cname }}</span>
        </span>
      </template>
     <template v-for="v in menuInfo.children" :key="v.cnameKey">
        <template v-if="!v.children">
         <a-menu-item :key="v.cnameKey">
         <span
            class="iconfont" :class="v.icon" v-if="v.icon"></span>
            <span>{{v.cname}}</span>
          </a-menu-item>
        </template>
        <template v-else>
         <sub-menu :menu-info="v" :key="v.cnameKey" />
        </template>
    </template>
    </a-sub-menu>
  `,
}

export default defineComponent({
  name: 'Layout',
  components: {
    'sub-menu': SubMenu,
    'icon-font': IconFont,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    // console.log(route, router, route.fullPath)
    const state = reactive({
      current: ['setting:1'],
      visible: false,
      menusJson, //mock数据
      collapsed: false,
      openKeys: [route.matched[0].path], //根据路由打开菜单
      selectedKeys: [route.fullPath], //根据路由选中菜单
    })
    //当前选择菜单名称
    const systemName = computed(() => {
      return route.meta.name
    })
    //监测菜单收缩
    watch(() => state.collapsed, (newVal) => {
      if (newVal) {
        state.openKeys = []
      } else {
        state.openKeys = [route.matched[0].path]
      }
    })
    //控制只打开一个菜单组
    const onOpenChange = (openKeys) => {
      if (openKeys.length !== 0) {
        state.openKeys = [openKeys[1]]
      } else {
        state.openKeys = ['']
      }
    }
    //点击跳转
    // eslint-disable-next-line no-unused-vars
    const selectedItem = ({ item, key, keyPath }) => {
      router.push(key)
    }

    const infoChange = function (e) {
      state.current = [e.key]
    }
    return {
      systemName,
      onOpenChange,
      selectedItem,
      infoChange,
      ...toRefs(state),
    }
  },
})
// ?
</script>
<style lang='less' scoped>
.layout-content {
  // background: #fff;
  // padding: 20px;
  margin: 0;
  // overflow: hidden;
  min-width: 800px;
  padding-bottom: 0px;
  min-width: 1200px;
}
.menu-layout,
.ant-menu.ant-menu-dark,
.ant-menu-dark .ant-menu-sub,
.ant-menu.ant-menu-dark .ant-menu-sub,
/deep/.ant-menu-inline {
  background: #363fc8 !important;
}
/deep/.ant-menu-item-selected {
  background: #fff !important;
  span {
    color: #363fc8 !important;
  }
}
/deep/.iconfont {
  margin-right: 5px !important;
}
.ant-layout {
  overflow: auto;
}
</style>