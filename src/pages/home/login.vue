<template>
<div>
  <div class="col col-login mx-auto">
    <div class="text-center mb-6">
      <h2 class="login-title">Login</h2>
    </div>
    <div class="card" action="" method="post">
      <div class="card-body p-6">
        <div class="form-group">
          <label class="form-label">账号</label>
          <input type="text" class="form-control"  placeholder="输入账号"  v-model="user.uid" @keyup.enter="login">
        </div>
        <div class="form-group">
          <label class="form-label">
            密码
          </label>
          <input type="password" class="form-control"  placeholder="输入密码" v-model="user.pwd" @keyup.enter="login">
        </div>
        <div class="form-group">
        </div>
        <div class="form-footer">
          <button  class="btn btn-primary btn-block" @click="login">登 录</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
var store = require('store')
export default {
  data () {
    return {
      user: {
        user_type: 'admin'
      }
    }
  },
  methods: {
    login: async function () {
      let res = await this.$axios().get(`admin/login`, {
        params: this.user
      })
      if (res.data.status) {
        store.set('login', {
          token: res.data.token
        })
        window.location.href = '/'
        return
      }
      this.$alert('danger', '账号或密码错误')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-title {
  color: #DDD
}
</style>