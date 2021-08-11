<template>
  <table
    border
    style="table-layout:fixed"
  >
    <tr>
      <th>{{columns[0]}}</th>
      <th
        v-for="(item,index) in data[0]"
        :key="index"
      >
        {{item}}
      </th>
    </tr>
    <tr
      v-for="(item,index) in columns.length-1"
      :key="index"
    >
      <td>{{columns[index+1]}}</td>
      <td
        v-for="(item,index) in data[index+1]"
        :key="index"
      >
        {{item}}
      </td>
    </tr>
  </table>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'SampleTableX',
  props: {
    columns: {
      type: Array,
      default: () => ['日期', '总资产（万元）', '排名', '市场份额'],
    },
    data: {
      type: Array,
      default: () => [],
    },
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
table {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  border: none;
  overflow: auto;
  table-layout: fixed;
  th,
  td {
    text-align: center;
    height: 40px;
    width: 100px;
  }
}
</style>