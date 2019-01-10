import timeago from 'timeago.js'
const config = require('../../local_env')

export default {
  install: function (Vue, options) {
    Vue.prototype.$search = function (Table) {
      if (!this.fields) { return Table }
      let tmp = Table
      for (let field of this.fields) {
        let _value = this.$route.query[`search_${field.key}`]
        if (field.search && _value) {
          if (field.search.action) {
            tmp = field.search.action(tmp, this, _value)
            continue
          }
          if (field.search.type === 'select') {
            tmp = tmp.where({
              [field.key]: _value
            })
          } else {
            tmp = tmp.where([`${field.key} like ?`, _value])
          }
        }
      }
      return tmp
    }
    // 时间本地化
    Vue.prototype.$timeago = function (datetime) {
      return timeago().format(datetime, 'zh_CN')
    }
    // cdn地址
    Vue.prototype.$cdn = function (name, folder, process) {
      if (!name || name === '') {
        name = 'default.png'
      }
      if (/^http(s)?:\/\//.test(name)) {
        return name
      }
      let url = `${config.cdn}/${folder}/${name}`
      if (process) {
        url += `?x-oss-process=style/${process}`
      }
      return url
    }
  }
}
