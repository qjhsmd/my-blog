/*
 * @version: 1.0
 * @Author: QJH
 * @Date: 2021-07-28 09:34:37
 * @LastEditors: QJH
 * @LastEditTime: 2021-10-20 11:35:57
 */
import request from '@/utils/request'

export function fetchList(params) {
    return request({
        url: '/api/xxxx/wenzhangliebiao',
        method: 'post',
        params: params
    })
}

export function fetchFocus() {
    return request({
        url: '/api/focus/list',
        method: 'get',
        params: {}
    })
}

export function fetchCategory() {
    return request({
        url: '/api/artcle/classify/findAll',
        method: 'get',
        params: {}
    })
}

export function fetchFriend() {
    return request({
        url: '/friend',
        method: 'get',
        params: {}
    })
}

export function fetchSocial() {
    return request({
        url: '/api/social/findAll',
        method: 'get',
        params: {}
    });
}

export function fetchSiteInfo() {
    return request({
        url: '/site',
        method: 'get',
        params: {}
    })
}

export function fetchComment() {
    return request({
        url: '/comment',
        method: 'get',
        params: {}
    })
}
// node 后端
export function baseInfo(){
   return request({
       url:'/api/user/baseInfo',
       method:'get',
   })
}
export function artcleDetail(params) {
    return request({
        url:'/api/artcle/blogDetail',
        method:'get',
        params
    })
}
export function creatMessage(data) {
    return request({
        url:'/api/msg/postMsg',
        method:'post',
        data
    })
}
export function addComment(data) {
    return request({
        url:'/api/artcle/addComment',
        method:'post',
        data
    })
}

export function listComment(params) {
    return request({
        url:'/api/artcle/listComment',
        method:'get',
        params
    })
}