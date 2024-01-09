import request from '@/utils/request'

// 获取用户详细信息
export function getFriendsList(data) {
  return request({
    url: '/mine/friends/getFriendsList',
    method: 'post',
    data: data
  })
}

export function searchOne(params) {
  return request({
    url: '/mine/user/findOne',
    method: 'get',
    params
  })
}

export function addFriend(data) {
  return request({
    url: '/mine/addFriends/newFriends',
    method: 'post',
    data
  })
}
