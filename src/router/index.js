import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore, useLayoutStore } from '../stores/index.js'
import { userRouterService } from '../api/auth/user.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      id: 1,
      path: '/login',
      name: 'login',
      component: () => import('../views/user/LoginView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: '/',
          component: () => import('../views/home/HomeListView.vue')
        },
        {
          path: '/blog/article/:id',
          component: () => import('../views/blog/blogArticleView.vue')
        },
        {
          path: '/acg/anime',
          component: () => import('../views/acg/AcgAnimeView.vue')
        },
        {
          path: '/blog/collation',
          component: () => import('../views/blog/blogArticleCollationView.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminHomeView.vue'),
      redirect: '/admin/discard',
      children: []
    },
    {
      path: '/:any(.*)',
      // name: 'notFound',
      component: () => import('../views/errors/404.vue')
    }
  ]
})
// 路由守卫核心代码
router.beforeEach((to, from, next) => {
  const store = useUserStore()
  // 先判断浏览器中是否已经有token了，有则true，否则false
  const isLogin = store.token ? true : false
  // 判断边栏路由是否存在
  const asideMenu = store.asideMenu ? true : false

  if (isLogin == false && to.name != 'login') {
    //无token,访问的地址不是login
    if (to.fullPath.includes('/admin')) {
      ElMessage.error('请先登录')
      next('/login')
    } else {
      next()
    }
  } else if (isLogin == false && to.name == 'login') {
    //无token，访问的地址是login
    next()
  } else {
    //有token
    const layout = useLayoutStore()
    // if (layout.menu.hidden == false) {
    //   layout.changeMenuHidden()
    // }
    // store.removeAsideMenu()

    if (!asideMenu && to.fullPath.includes('/admin')) {
      // if (to.fullPath.includes('/admin')) {
      //即使没有边栏路由并且访问的是后台
      const modules = import.meta.glob('../views/*/*.vue')
      userRouterService()
        .then((data) => {
          store.setAsideMenu(data)
          let children = []

          const getRoute = (arr) => {
            arr.forEach((item) => {
              item.meta = {
                title: item.meta
              }
              if (item.menuType == 'C') {
                // console.log(modules[`${item.component}`])
                item.component = modules[`${item.component}`]
                children.push(item)
              } else if (item.menuType == 'M' && item.children != null) {
                getRoute(item.children)
              }
            })
          }
          //边栏路由设置完毕
          // console.log(data)
          //获取动态路由

          getRoute(data)
          console.log(data)
          children.forEach((item) => {
            router.addRoute('admin', item)
          })

          next({ ...to, replace: true })
          return
        })
        .catch((error) => {
          router.push('/login')
        })
    } else {
      next()
    }
  }
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
export default router
