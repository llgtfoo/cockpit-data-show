<template>
  <theme-provider
    id="app"
    :theme="theme"
  >
    <a-config-provider :locale="locale">
      <div class="wrapper">
        <router-view v-slot="{ Component, route }">
          <keep-alive v-if="Component&&Object.keys(Component).length>0">
            <component
              :is="Component"
              :route="route"
            >
            </component>
          </keep-alive>
          <loading v-else></loading>
        </router-view>
      </div>
    </a-config-provider>
  </theme-provider>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const theme = computed(() => {
      return store.getters['common/user/userTheme']
    })
    return { locale: ref(zhCN), theme }
  },
})
// ?
</script>


<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.ant-layout {
  background: #f4f4f4;
}
</style>
