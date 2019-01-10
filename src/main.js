import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Axios from './plugins/axios'
import Alert from './plugins/alert'
import Common from './plugins/common'
import Pagination from './components/pagination'
import DataList from './components/data-list'
import RecstsTag from './components/recsts-tag'
import moment from 'moment'
import store from 'store'
import 'babel-polyfill'

require('moment/locale/zh-cn')

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Axios)
Vue.use(Alert)
Vue.use(Common)

let vueStore = new Vuex.Store({
  state: {
    session: {},
    unreads: []
  },
  mutations: {
    login (state, val) {
      state.session = val
    },
    notify (state, val) {
      state.unreads = val
    }
  }
})

Vue.component('pagination', Pagination)
Vue.component('data-list', DataList)
Vue.component('recsts-tag', RecstsTag)

// 过滤器
Vue.filter('formatime', function (timezone) {
  return moment(parseInt(timezone)).format('YYYY-MM-DD HH:mm:ss')
})

Vue.filter('friendtime', function (timezone) {
  return moment(timezone).fromNow()
})

// 初始化 缓存标识
store.set('cachetime', Date.now())

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: vueStore,
  components: { App },
  template: '<App/>'
})
