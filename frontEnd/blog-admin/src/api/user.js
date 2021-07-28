import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    // url: '/api/admin/logout',
    url: '/api/auth/logout',
    method: 'get'
  })
}

export function adminLogin(data) {
  return request({
    // url: '/api/admin/login',
    url: '/api/auth/login',
    method: 'post',
    data
  })
}
export function getUserInfo() {
  return request({
    url: '/api/user/userInfo',
    method: 'get'
  })
}
export function getfindAll() {
  return request({
    url: '/api/user/findAll',
    method: 'get'
  })
}
