import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App'
import store from './config/store'
import router from './config/router'
import './config/bootstrap'

Vue.config.productionTip = false

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IlBldGVyc29uIEZvbnNlY2EgU2ltacOjbyIsImFkbWluIjp0cnVlLCJhaXQiOjE1NjYyNzIxMTMsImV4cCI6MTU2NjUzMTMxM30.tdb_t0AMOp4faeqTfBbCIlFy3H0SeiOcZlGl3zwgC7E'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')