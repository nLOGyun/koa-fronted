<template>
  好友列表：
  <div v-for="(item, index) in friendsList">
    {{item.username}}1
  </div>
</template>

<script setup>
import {getFriendsList} from "@/api/friends.js";

const friendsList = ref([])

const getInfo = async () => {
  const userInfo = sessionStorage.getItem('userInfo')
  let res = await getFriendsList({
    username: JSON.parse(userInfo).username
  })
  if (res.code === 0) {
    friendsList.value = res.result
  }
}

getInfo()

</script>

<style scoped lang="scss">

</style>
