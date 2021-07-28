/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const sysRouter = {
  path: '/sys',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Sys',
  meta: {
    title: '系统管理',
    icon: 'el-icon-setting'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/sys/user/list'),
      name: 'UserMage',
      meta: { title: '用户管理' }
    },
    {
      path: 'visits-list',
      component: () => import('@/views/sys/visitsList'),
      name: 'UserMage',
      meta: { title: '访问列表' }
    }
  ]
}
export default sysRouter
