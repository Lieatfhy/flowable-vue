import Vue from 'vue'
import Router from 'vue-router'
import group from '@/components/group'
import user from '@/components/user'
import axios from 'axios'

Vue.use(Router)
Vue.prototype.$axios = axios;
export default new Router({
  routes: [
    {
      path: '/',
      name: 'user',
      component: user
    },{
      path: '/user',
      name: 'user',
      component: user
    },{
      path: '/group',
      name: 'group',
      component: group
    }
  ]
})
