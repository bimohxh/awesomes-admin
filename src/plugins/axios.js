import axios from 'axios'
const Config = require('../../local_env')
var Axios = {}
var store = require('store')

let axiosreq = function (pagination) {
  let _config = {
    baseURL: Config.api,
    headers: {
      'token': (store.get('login') || {}).token
    }
  }
  if (pagination) {
    let _pagesize = pagination.pageSize || 15
    _config.params = {
      skip: ((pagination.page || 1) - 1) * _pagesize,
      limit: _pagesize,
      show_total_count: true
    }
  }
  return axios.create(_config)
}

let req = function (pagination) {
  return ['get', 'post', 'patch', 'put', 'delete'].reduce((result, method) => {
    result[method] = async (...params) => {
      let res = await axiosreq(pagination)[method](...params)
      return res
    }
    return result
  }, {})
}

Axios.install = function (Vue, options) {
  Vue.prototype.$axios = req
}

Axios.init = req

export default Axios
