import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/templates/Dashboard'
import Login from '@/templates/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        document.title = `${to.name}`
        next();
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        document.title = `${to.name}`
        next();
      }
    }
  ]
})
