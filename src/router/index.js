import Vue from 'vue'
import Router from 'vue-router'

const HomeIndex = () => import('@/pages/home/index')
const HomeLogin = () => import('@/pages/home/login')

const MemIndex = () => import('@/pages/mem/index')

const CommentIndex = () => import('@/pages/comment/index')

const RepoIndex = () => import('@/pages/repo/index')
const RepoSub = () => import('@/pages/repo/sub')
const RepoEdit = () => import('@/pages/repo/edit')

const MenutypIndex = () => import('@/pages/menutyp/index')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeIndex',
      component: HomeIndex
    },
    {
      path: '/login',
      name: 'HomeLogin',
      component: HomeLogin
    },
    {
      path: '/mem',
      name: 'MemIndex',
      component: MemIndex
    },
    {
      path: '/comment',
      name: 'CommentIndex',
      component: CommentIndex
    },
    {
      path: '/repo',
      name: 'RepoIndex',
      component: RepoIndex
    },
    {
      path: '/repo/sub',
      name: 'RepoSub',
      component: RepoSub
    },
    {
      path: '/repo/edit',
      name: 'RepoEdit',
      component: RepoEdit
    },
    {
      path: '/menutyp',
      name: 'MenutypIndex',
      component: MenutypIndex
    }
  ]
})
