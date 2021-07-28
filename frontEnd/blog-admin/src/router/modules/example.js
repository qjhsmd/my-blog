import Layout from '@/layout'

const exampleRouter = {
  path: '/example',
  component: Layout,
  redirect: '/example/list',
  name: 'Example',
  meta: {
    title: 'example',
    icon: 'el-icon-s-help'
  },
  children: [
    {
      path: 'classify',
      component: () => import('@/views/example/classify'),
      name: 'Classify',
      meta: { title: '文章分类', icon: 'list' }
    },
    {
      path: 'create',
      component: () => import('@/views/example/create'),
      name: 'CreateArticle',
      meta: { title: 'createArticle', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/example/edit'),
      name: 'EditArticle',
      meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
      hidden: true
    },
    {
      path: 'list',
      component: () => import('@/views/example/list'),
      name: 'ArticleList',
      meta: { title: 'articleList', icon: 'list' }
    }
  ]
}
export default exampleRouter
