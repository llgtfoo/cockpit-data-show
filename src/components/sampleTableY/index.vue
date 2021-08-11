<template>
  <table
    border
    style="table-layout:fixed"
  >
    <tr>
      <th
        v-for="(item,index) in columns"
        :key="index"
      >
        {{item.name}}
      </th>
    </tr>
    <tr
      v-for="(item,index) in data"
      :key="index"
    >
      <td
        v-for="(it,i) in columns"
        :key="i"
      >
        {{item[it.key]}}
      </td>
    </tr>
  </table>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'SampleTableY',
  props: {
    columns: {
      type: Array,
      default: () => [],
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
    padding: 5px 10px;
  }
}
</style>