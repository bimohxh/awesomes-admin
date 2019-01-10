var Alert = {}
Alert.install = function (Vue, options) {
  Vue.prototype.$alert = function (type, msg, keep) {
    var div = document.createElement('div')
    div.setAttribute('class', `alert alert-${type} vue-alert`)
    var txt = document.createTextNode(msg)
    div.appendChild(txt)
    document.getElementsByTagName('body')[0].appendChild(div)
    if (!keep) {
      setTimeout(function () {
        document.getElementsByTagName('body')[0].removeChild(div)
      }, 3000)
    }
  }
}

export default Alert
