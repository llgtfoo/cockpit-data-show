<template>
  <div class="content">
    <!-- 母公司资产情况 -->
    <parent-company></parent-company>
    <!-- 集团资产情况 -->
    <group></group>
    <!-- 预算目标完成率 -->
    <budget-target></budget-target>
    <!-- 公司营业收入与行业对比 -->
    <company-business></company-business>
    <!-- 风险控制指标监管 -->
    <risk-control></risk-control>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import parentCompany from './components/parent-company'
import group from './components/group'
import budgetTarget from './components/budget-target'
import companyBusiness from './components/company-business'
import riskControl from './components/risk-control'
export default {
  components: {
    parentCompany, group, budgetTarget, companyBusiness, riskControl,
  },
  setup() {
    const state = reactive({
      current: 0,
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