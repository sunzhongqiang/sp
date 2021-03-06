import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: '/callback',
    component: () => import('@/views/callback'),
    hidden: true
  },

  {
    path: '/error',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'home',
    meta: { title: '首页', icon: 'dashboard' },
    children: [{
      path: 'dashboard',
      name: 'home',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/trade',
    component: Layout,
    redirect: '/trade/table',
    name: 'trade',
    meta: { title: '订单打印', icon: 'table' },
    children: [
      {
        path: 'table',
        name: 'trade-print',
        component: () => import('@/views/table/index'),
        meta: { title: '订单打印' }
      },
      {
        path: 'free',
        name: 'free-print',
        component: () => import('@/views/freeprint/index'),
        meta: { title: '自由打印' }
      }
    ]
  },
  {
    path: '/aftersale',
    component: Layout,
    redirect: '/aftersale/question',
    name: 'trade',
    meta: { title: '售后问题', icon: 'table' },
    children: [
      {
        path: 'question',
        name: 'after-sale-question',
        component: () => import('@/views/aftersale/question'),
        meta: { title: '售后问题' }
      },
      {
        path: 'category',
        name: 'after-sale-category',
        component: () => import('@/views/aftersale/category'),
        meta: { title: '售后分类' }
      }
    ]
  },
  {
    path: '/supply',
    component: Layout,
    redirect: '/supply/supplier',
    name: 'trade',
    meta: { title: '供应管理', icon: 'table' },
    children: [
      {
        path: 'supplier',
        component: () => import('@/views/supplier'),
        meta: { title: '供应商' }
      },
      {
        path: 'supplierGoods',
        component: () => import('@/views/goods'),
        meta: { title: '采购商品' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/printbill',
    name: 'Nested',
    meta: {
      title: '设置',
      icon: 'nested'
    },
    children: [

      {
        path: 'printtemplate',
        component: () => import('@/views/print-template'), // Parent router-view
        name: 'printbill',
        meta: { title: '打印模版' }
      },
      {
        path: 'shop',
        component: () => import('@/views/shop'),
        meta: { title: '店铺管理' }
      },
      {
        path: 'sender',
        component: () => import('@/views/sender'),
        meta: { title: '地址管理' }
      },

      {
        path: 'goodsCategory',
        component: () => import('@/views/category'),
        meta: { title: '商品分类' }
      },
      {
        path: 'department',
        component: () => import('@/views/department'),
        meta: { title: '部门设置' }
      },
      {
        path: 'user',
        component: () => import('@/views/user'),
        meta: { title: '用户信息' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
