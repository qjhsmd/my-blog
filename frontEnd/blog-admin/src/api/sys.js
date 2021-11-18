/*
 * @version: 1.0
 * @Author: QJH
 * @Date: 2021-07-28 09:34:37
 * @LastEditors: QJH
 * @LastEditTime: 2021-11-18 10:57:03
 */
import request from '@/utils/request'

export function userList(query) {
  return request({
    url: '/api/user/findAll',
    method: 'get',
    params: query
  })
}

export function userRemove(query) {
  return request({
    url: '/api/user/remove',
    method: 'get',
    params: query
  })
}
export function saveUser(data) {
  return request({
    url: '/api/user/saveUser',
    method: 'post',
    data
  })
}
export function updateUser(data) {
  return request({
    url: '/api/user/updateUser',
    method: 'put',
    data
  })
}

export function visitsList(query) {
  return request({
    url: '/api/visits/findAll',
    method: 'get',
    params: query
  })
}

export function visitsRemove(query) {
  return request({
    url: '/api/visits/remove',
    method: 'delete',
    params: query
  })
}
export function redeploy() {
  return request({
    url: '/api/user/redeploy',
    method: 'get'
  })
}
export function adminRedeploy() {
  return request({
    url: '/api/user/adminRedeploy',
    method: 'get'
  })
}
export function blogRedeploy() {
  return request({
    url: '/api/user/blogRedeploy',
    method: 'get'
  })
}
export function petRedeploy() {
  return request({
    url: '/api/user/petRedeploy',
    method: 'get'
  })
}

