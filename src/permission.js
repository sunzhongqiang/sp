import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { isLogin } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/register', '/logout', '/callback'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // 白名单中的地址，无论是否登录活着是否有回话都可以访问
  if (whiteList.indexOf(to.path) !== -1) {
    // in the free login whitelist, go directly
    next()
    NProgress.done()
  } else {
    // determine whether the user has logged in
    if (isLogin()) { // 切登录
      if (to.path === '/login') {
      // if is logged in, redirect to the home page
        next({ path: '/' })
        NProgress.done()
      }
      next()
      NProgress.done();
    } else { // 没有登录，需要先登录
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
