import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/api/xxxx/getArtcleDetail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/api/xxxx/updateArtcle',
    method: 'put',
    data
  })
}

export function listArtcle(params) {
  return request({
    // url: '/api/list_artcle',
    url: '/api/xxxx/findAll',
    method: 'get',
    params
  })
}

export function saveArtcle(data) {
  return request({
    url: '/api/xxxx/saveArtcle',
    method: 'post',
    data
  })
}

export function listClassify(params) {
  return request({
    url: '/api/artcle/classify/findAll',
    method: 'get',
    params
  })
}

export function removeClassify(params) {
  return request({
    url: '/api/artcle/classify/removeClassify',
    method: 'delete',
    params
  })
}

export function postClassify(data) {
  return request({
    url: '/api/artcle/classify/postClassify',
    method: 'post',
    data
  })
}

export function removeArtcle(params) {
  return request({
    url: '/api/xxxx/remove',
    method: 'delete',
    params
  })
}
export function issueArtcle(params) {
  return request({
    url: '/api/xxxx/blogIssue',
    method: 'get',
    params
  })
}

export function unissueArtcle(params) {
  return request({
    url: '/api/xxxx/blogUnissue',
    method: 'get',
    params
  })
}
