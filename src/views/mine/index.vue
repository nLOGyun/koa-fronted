<template>
  <div class="mine-container">
    欢迎你，小{{userInfo.username}}
    <br/>
    <el-button @click="logout">退出登录</el-button>
  </div>
</template>

<script setup>
import { getInfo } from "@/api/login";
const router = useRouter();

const userInfo = ref({})

const checkToken = async () => {
  let res = await getInfo()
  if (res.code === 0) {
    userInfo.value = res.result
  }
}

const logout = () => {
  router.push('/login')
}

checkToken()

</script>

<style scoped lang="scss">
.mine-container {

}
</style>
