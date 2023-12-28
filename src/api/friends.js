import request from '@/utils/request'

// 获取用户详细信息
export function getFriendsList(data) {
  return request({
    url: '/mine/friends/getFriendsList',
    method: 'post',
    data: data
  })
}
