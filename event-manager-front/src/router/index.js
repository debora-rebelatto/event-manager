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
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
