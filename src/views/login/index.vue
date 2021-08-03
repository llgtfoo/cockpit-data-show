<template>
  <div class="login-wraper">
    <div>
      <div class="logo-left"></div>
      <div class="logo-right">
        <div class="login-title"></div>
        <div class="name">用户登录</div>
        <a-form
          labelAlign="left"
          ref="formRef"
          :model="formState"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item
            label=""
            name="username"
          >
            <a-input
              v-model:value="formState.username"
              placeholder="请输入用户名"
              autocomplete="off"
            >
              <template #prefix>
                <UserOutlined style="color: #fff" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            label=""
            name="password"
          >
            <a-input
              v-model:value="formState.password"
              type="password"
              placeholder="请输入密码"
            >
              <template #prefix>
                <LockOutlined style="color: #fff" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="type">
            <a-checkbox
              :disabled="formState.username === ''"
              @change="onChnage"
              v-model:checked="formState.checked"
              style="color: #fff"
            >
              记住用户名
            </a-checkbox>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 18, offset: 3 }">
            <a-button
              type="primary"
              size=" large"
              block
              shape="round"
              @click="onSubmit"
              @keyup.enter.native="onSubmit"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, onMounted, watch } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const router = useRouter()
    // eslint-disable-next-line no-unused-vars
    const route = useRoute()
    onMounted(() => {
      keyEnter()
      if (localStorage.getItem('username')) {
        formState.checked = true
        formState.username = localStorage.getItem('username')
      }
    })
    const formRef = ref(null) //$refs获取组件实例
    const formState = reactive({
      username: 'lltfoo',
      password: '',
      checked: false,
    })
    watch(
      () => formState.username,
      (newValue) => {
        if (newValue === '') {
          formState.checked = false
        }
      },
    )
    //   // 用户名自定义规则
    // eslint-disable-next-line no-unused-vars
    const validateUsername = async (rule, value) => {
      if (value === '') {
        return Promise.reject('用户名不能为空')
      } else {
        return Promise.resolve()
      }
    }
    // 密码自定义规则
    // eslint-disable-next-line no-unused-vars
    const validatePassword = async (rule, value) => {
      if (value === '') {
        return Promise.reject('密码不能为空')
      } else {
        return Promise.resolve()
      }
    }
    //校验规则
    const rules = {
      username: [{ validator: validateUsername, trigger: 'change' }],
      password: [{ validator: validatePassword, trigger: 'change' }],
    }
    //记住用户名操作
    const onChnage = function (e) {
      if (e.target.checked && formState.username !== '') {
        localStorage.setItem('username', formState.username)
      } else {
        localStorage.removeItem('username')
      }
    }
    //enter按键登录
    function keyEnter() {
      document.onkeydown = (e) => {
        if (e.keyCode === 13 && e.target.baseURI.includes('login')) {
          onSubmit()
        }
      }
    }
    //登录
    const onSubmit = function () {
      const root = formRef.value //$refs
      console.log(root, 'root')
      root
        .validate()
        .then(() => {
          console.log('values', formState)
          localStorage.setItem('token', 'llgtfoo')
          router.push('/cockpit')
        })
        .catch((error) => {
          console.log('error', error)
        })
    }
    return {
      formRef,
      formState,
      rules,
      labelCol: { span: 6, offset: 3 },
      wrapperCol: { span: 18, offset: 3 },
      onSubmit,
      onChnage,
    }
  },
})
// ;
</script>

<style lang="scss" scoped>
.login-wraper {
  width: 100%;
  height: 100%;
  background: url("../../assets/imgs/login.png") no-repeat;
  position: relative;
  min-width: 1200px;
  .logo-left {
    width: 445px;
    height: 462px;
    background: url("../../assets/imgs/chahua.png") no-repeat;
    position: absolute;
    top: 50%;
    left: 20%;
    transform: translateY(-50%);
  }
  .logo-right {
    width: 488px;
    height: 506px;
    background: url("../../assets/imgs/login-bg.png") no-repeat;
    position: absolute;
    top: 50%;
    right: 20%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    .name {
      text-align: center;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bolder;
      letter-spacing: 3px;
      color: #ffffff;
      margin-bottom: 30px;
    }
    .login-title {
      width: 284px;
      height: 38px;
      background: url("../../assets/imgs/login-title.png") no-repeat;
      position: absolute;
      top: -70px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>

<style lang="scss">
.login-wraper {
  .ant-form {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .ant-form-item-label label,
  .ant-form-item-children span {
    color: #fff;
  }
  .ant-btn-round {
    height: 40px;
    font-size: 16px;
  }
  .ant-input {
    background: transparent !important;
    border: 0;
    -webkit-appearance: none;
    border-radius: 0;
    padding: 12px 5px 12px 20px;
    height: 30px !important;
    color: #fff;
    font-size: 16px;
  }
  .ant-input-affix-wrapper {
    background: rgba(101, 172, 255, 0.2) !important;
    border-radius: 21px;
    border: 1px solid rgba(135, 231, 255, 0.25);
  }
}
</style>
