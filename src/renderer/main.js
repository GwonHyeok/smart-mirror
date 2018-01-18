import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
const mainInstance = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

// Register Vue Plugin
mainInstance.$electron.ipcRenderer.on('register-vue-plugin', (event, appName) => {
  const appProvider = mainInstance.$electron.remote.getGlobal("applicationProvider");
  appProvider.findApplication(appName).then(app => {
    const plugins = eval(app.code.plugins);
    plugins.forEach(plugin => Vue.use(plugin))
  });
})