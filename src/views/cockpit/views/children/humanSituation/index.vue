<template>
  <div class="content">
    <!-- 人员情况 -->
    <personnel></personnel>
    <!-- 薪酬情况 -->
    <payment></payment>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import personnel from './components/personnel.vue'
import payment from './components/payment.vue'
export default {
  components: {
    personnel, payment,
  },
  setup() {
    const state = reactive({
      count: 0,
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  padding-bottom: 5px;
}
</style>