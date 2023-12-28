<template>
  <div class="index-container">
    <div class="com-container">
      <component :is="com"></component>
    </div>
    <div class="main-tab">
      <div v-for="(item) in mainTab" :class="{'active-tab' : active === item.key}" @click="changeTab(item)">
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script setup>
const version = ref('3.8.7')

import mainCom from '@/views/main/index.vue'
import friCom from '@/views/fri/index.vue'
import mineCom from '@/views/mine/index.vue'

const active = ref('main')
const mainTab = ref([{
    name: '主页',
    key: 'main',
    com: mainCom
  },{
    name: '好友',
    key: 'fri',
    com: friCom
  },{
    name: '我的',
    key: 'mine',
    com: mineCom
  }])

const com = ref(mainCom)

const changeTab = (item) => {
  active.value = item.key
  com.value = item.com
}
</script>

<style scoped lang="scss">
.index-container {
  padding: 40px;
  .com-container {
    margin-bottom: 40px;
  }
  .main-tab {
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    left: 0;
    height: 40px;
  }
  .active-tab {
    font-weight: 600;
  }
}
</style>

