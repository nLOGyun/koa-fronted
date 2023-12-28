<template>
  <div class="login-container">
    <el-input
        v-model="loginForm.username"
        class="margin-item"
        type="text"
        size="large"
        auto-complete="off"
        placeholder="账号"
    />
    <el-input
        v-model="loginForm.password"
        class="margin-item"
        type="text"
        size="large"
        auto-complete="off"
        placeholder="密码"
    />
    <el-button @click="goLogin">登录</el-button>
    <el-button @click="goRegister">注册</el-button>
  </div>
</template>

<script setup>
import { login, getInfo } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import useUserStore from '@/store/modules/user'
import {ElMessage} from "element-plus";
import {setToken, getToken, removeToken} from "@/utils/auth.js";

const userStore = useUserStore()
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();

const loginForm = ref({
  username: "",
  password: "",
  rememberMe: false,
  code: "",
  uuid: ""
});

const loginRules = {
  username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
  code: [{ required: true, trigger: "change", message: "请输入验证码" }]
};

const loading = ref(false);
// 验证码开关
const redirect = ref(undefined);

watch(route, (newRoute) => {
    redirect.value = newRoute.query && newRoute.query.redirect;
}, { immediate: true });

const goLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    ElMessage({ message: '请填写用户名密码', type: 'error' })
    return
  }
  let res = await login({username: loginForm.value.username, password: loginForm.value.password})
  if (res.code === 0) {
    ElMessage({ message: '登录成功', type: 'success' })
    setToken(res.result.token)
    sessionStorage.setItem(
        'userInfo',
        JSON.stringify(res.result.userInfo)
    )
    router.push('/index')
  }
}

const goRegister = () => {
  router.push('/register')
}


removeToken();

</script>

<style lang='scss' scoped>
.login-container {
  padding: 40px;
  .margin-item {
    margin-bottom: 24px;
  }
}
</style>
