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

