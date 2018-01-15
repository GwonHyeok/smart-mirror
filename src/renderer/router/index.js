import Vue from 'vue'
import Router from 'vue-router'
import Splash from '@/components/Splash'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/splash',
      name: 'splash',
      component: Splash
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
