<template>
  <div class="register-container">
    <el-input
        v-model="registerForm.username"
        class="margin-item"
        type="text"
        size="large"
        auto-complete="off"
        placeholder="账号"
    />
    <el-input
        v-model="registerForm.password"
        class="margin-item"
        type="text"
        size="large"
        auto-complete="off"
        placeholder="密码"
    />
    <el-input
        v-model="registerForm.confirmPassword"
        class="margin-item"
        type="text"
        size="large"
        auto-complete="off"
        placeholder="确认密码"
    />
    <el-button @click="myRegister">注册</el-button>
  </div>
</template>

<script setup>
import { register } from "@/api/login";

import {ElMessage} from "element-plus";

const router = useRouter();
const { proxy } = getCurrentInstance();

const registerForm = ref({
  username: "",
  password: "",
  confirmPassword: "",
});

const myRegister = async () => {
  if (!registerForm.value.username || !registerForm.value.password || !registerForm.value.confirmPassword) {
    ElMessage({ message: '请填写用户名密码', type: 'error' })
    return
  } else if (registerForm.value.password !== registerForm.value.confirmPassword) {
    ElMessage({ message: '两次密码不一致', type: 'error' })
    return
  }
  let res = await register({
    username: registerForm.value.username,
    password: registerForm.value.password
  })
  if (res.code === 0) {
    ElMessage({ message: '注册成功！', type: 'success' })
    router.push('/login')
  }

}

const codeUrl = ref("");
const loading = ref(false);
const captchaEnabled = ref(true);


</script>

<style lang='scss' scoped>
.register-container {
  padding: 40px;
  .margin-item {
    margin-bottom: 24px;
  }
}
</style>
