<template>
  <div>
    <div class="header py-4">
      <div class="container">
        <div class="d-flex">
          <a class="header-brand" href="../index.html">
            <h4>
              搭配家开发管理后台
            </h4>
          </a>
          <div class="d-flex order-lg-2 ml-auto">
            <div class="nav-item d-none d-md-flex">
              <a href="#" class="nav-link pr-0 leading-none" data-toggle="dropdown">
                <span class="avatar" :style="{'background-image': 'url(' + $store.state.session.profile_url + ')'}"></span>
                <span class="ml-2 d-none d-lg-block">
                  <span class="text-default">{{$store.state.session.nickname}}</span>
                  <small class="text-muted d-block mt-1">Administrator</small>
                </span>
              </a>
            </div>
            <div class="dropdown d-none d-md-flex" v-if="$store.state.unreads.length > 0">
              <a class="nav-link icon" data-toggle="dropdown">
                <i class="fe fe-bell"></i>
                <span class="nav-unread" v-if="$store.state.unreads.length > 0"></span>
              </a>
            </div>

            <!-- 登陆信息 -->
            <div class="dropdown" v-if="$store.state.session && $store.state.session.account">
              <a href="#" class="nav-link pr-0 leading-none" data-toggle="dropdown">
                <span class="avatar avatar-placeholder"></span>
                <span class="ml-2 d-none d-lg-block">
                  <span class="text-default">{{$store.state.session.account.name}}</span>
                </span>
              </a>
              <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                <!--<a class="dropdown-item" href="#">
                  <i class="dropdown-icon fe fe-user"></i> 账号资料
                </a>-->
                <!--<a class="dropdown-item" href="#">
                  <i class="dropdown-icon fe fe-settings"></i> 设置
                </a>-->
             
                <a class="dropdown-item" href="javascript: void(0)" @click="logout">
                  <i class="dropdown-icon fe fe-log-out"></i> 注销
                </a>
              </div>
            </div>
          </div>
          <a href="#" class="header-toggler d-lg-none ml-3 ml-lg-0" data-toggle="collapse" data-target="#headerMenuCollapse">
            <span class="header-toggler-icon"></span>
          </a>
        </div>
      </div>
    </div>
    <div class="header collapse d-lg-flex p-0" id="headerMenuCollapse">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-3 ml-auto">
          </div>
          <!-- 导航菜单 -->
          <div class="col-lg order-lg-first">
            <ul class="nav nav-tabs border-0 flex-column flex-lg-row">
              <li class="nav-item dropdown" v-for="menu in menus" v-if="hasSubMenu(menu)">
                <a href="javascript:void(0)" class="nav-link" data-toggle="dropdown">
                  <i :class="'fe ' + menu.icon"></i> {{menu.name}}
                </a>
                <div class="dropdown-menu dropdown-menu-arrow second-menus">
                  <router-link :to="sub.url" class="dropdown-item " v-for="sub in menu.children"  v-if="hasPower(sub)">{{sub.name}}</router-link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const menus = require('../../lib/menu')
var store = require('store')
export default {
  data () {
    return {
      menus: menus
    }
  },
  methods: {
    // 注销
    logout: function () {
      store.set('login', null)
      this.$router.push('/login')
    },

    // 判断当前子菜单是否有权限
    hasPower: function (sub) {
      return !sub.level || this.$store.state.session.level === sub.level
    },

    // 当前主菜单下是否有子菜单
    hasSubMenu: function (menu) {
      // let _self = this
      // return menu.children.some(sub => {
      //   return _self.hasPower(sub)
      // })
      return true
    }
  },
  created () {
  }
}
</script>

<style lang="scss">
.inbox-unread {
  font-size: 14px;
}
</style>