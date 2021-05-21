import Vue from 'vue'
import App from './App.vue'
import router from './router'
import stysUi from 'vustys'
import  'vustys/lib/stysUi.css'
// import stysUi from '../src/index.js'
Vue.config.productionTip = false
Vue.use(stysUi,{router})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
