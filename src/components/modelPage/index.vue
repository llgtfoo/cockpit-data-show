<template>
  <transition name="fade">
    <div
      class="modal-box"
      v-if="modelValue"
    >
      <div class="modal-mask" />
      <div class="modal-content">
        <div class="model-header">
          <span>{{title}}</span>
          <i
            class="modal-close"
            @click="close"
          />
        </div>
        <div class="table-main">
          <slot />
        </div>
        <div class="footer">
          <img
            src="./imgs/daochu.png"
            alt=""
          >
          导出
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'

export default {
  name: 'ModelPage',
  props: {
    modelValue: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '总资产(万元)',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const state = reactive({
      count: 0,
    })
    const modelValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    })
    const close = () => {
      modelValue.value = false
    }
    return {
      ...toRefs(state), close,
    }
  },
}
</script>

<style lang="scss" scoped>
.modal-box {
  position: fixed;
  width: 100%;
  z-index: 500;
  height: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 999999999;
  .modal-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 9, 23, 0.66);
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 999999999;
  }
}
.modal-content {
  border-radius: 10px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  z-index: 1000000000;
  box-sizing: border-box;

  .model-header {
    background: #363fc8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 45px;
    > span {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
    .modal-close {
      display: inline-block;
      cursor: pointer;
      width: 20px;
      height: 20px;
      background: url("./imgs/close.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .table-main {
    width: 100%;
    height: calc(100% - 45px);
    padding: 5px;
    padding-right: 10px;
    max-width: 1200px;
    max-height: 800px;
    overflow: auto;
    box-sizing: border-box;
  }
  .footer {
    width: 124px;
    height: 52px;
    background: #ffffff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #363fc8;
    bottom: -60px;
    right: 0;
    cursor: pointer;
    > img {
      margin-right: 5px;
    }
  }
}
.fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
.fade-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>