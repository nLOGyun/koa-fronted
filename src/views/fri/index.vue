<template>
  <div class="friends-container">
    <Search
        v-model="searchVal"
        show-action
        :clearable="false"
        placeholder="搜索用户"
        @focus="focusSearch = true"
        @blur="!searchVal && (focusSearch = false)"
        @search="onSearch"
        @cancel="onCancel"
    />
    <br/>
    <div v-if="!focusSearch" class="friends-list-container">
      好友列表：
      <div v-for="(item, index) in friendsList">
        {{item.username}}
      </div>
    </div>
    <div v-if="focusSearch" class="friends-list-container">
      您搜到了：
      <div v-for="(item, index) in searchList" class="user-item" :key="index">
        {{item.username}}<Icon name="add-o" @click="addFriends(item)"/>
      </div>

      <Dialog :show="showDialog" :showCancelButton="true" title="添加好友" @cancel="cancelAdd" @confirm="confirmAdd">
        <Field v-model="text" label="备注" placeholder="人家凭啥加你 给点tips"/>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import {getFriendsList, searchOne, addFriend} from "@/api/friends.js";
import {Search, Icon, Dialog, Field, showNotify} from 'vant'
const friendsList = ref([])
const userInfo = ref(null)
const searchVal = ref('')
const searchList = ref([])
const focusSearch = ref(false)
const showDialog = ref(false)
const friendsInfo = ref(null)
const text = ref('')

function setUserInfo () {
  userInfo.value = JSON.parse(sessionStorage.getItem('userInfo'))
}


const getInfo = async () => {
  let res = await getFriendsList({
    username: userInfo.value.username
  })
  if (res.code === 0) {
    friendsList.value = res.result
  }
}

async function onSearch () {
  let res = await searchOne({username: searchVal.value})
  if (res.code === 0 && res.result) {
    searchList.value = res.result
  }
}

function addFriends(item) {
  friendsInfo.value = item
  showDialog.value = true
}

function onCancel () {
  focusSearch.value = false
  searchList.value = []
}

function cancelAdd() {
  showDialog.value = false
  text.value = ''
}

async function confirmAdd () {
  let res = await addFriend({
    text: text.value,
    userid: friendsInfo.value.id,
  })

  if (res.code === 0) {
    showNotify({
      type: 'success',
      message: res.message
    })
  } else {
    showNotify({
      type: 'warning',
      message: res.message
    })
  }

  showDialog.value = false
  text.value = ''
}


setUserInfo()
getInfo()

</script>

<style scoped lang="scss">
.friends-container {
  .user-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
