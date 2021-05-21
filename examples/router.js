import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      name: '首页',
      component: () => import('./views/home.vue')
    },
    {
      path: '/counterUpper',
      name: '数字滚动',
      component: () => import('./components/counterUpperR.vue')
    },
    {
      path: '/keyboardInputR',
      name: '数字键盘输入',
      component: () => import('./components/keyboardInputR.vue')
    },
    {
      path: '/pwdKeyboardR',
      name: '密码输入框',
      component: () => import('./components/pwdKeyboardR.vue')
    }
  ]
})
