import Vue from 'vue'
import Router from 'vue-router'
import Splash from '@/components/Splash'
import UniverseMirror from '@/components/UniverseMirror'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'splash',
      component: Splash
    },
    {
      path: '/home',
      name: 'home',
      component: UniverseMirror
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
