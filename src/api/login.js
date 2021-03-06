import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      'user.loginname': username,
      'user.password': password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/getInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
