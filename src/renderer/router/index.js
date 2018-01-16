import Vue from 'vue'
import Router from 'vue-router'
import Splash from '@/components/Splash'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'splash',
      component: require('@/components/Splash').default
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
