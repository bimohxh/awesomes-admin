<template>
  <div class="page">
    <template v-if="hasLayout">
      <div class="page-main">
        <vue-header></vue-header>
        <div class="my-3 my-md-5">
          <div class="container">
            <!--
            <div class="page-header">
              <h1 class="page-title" v-if="location.first">
              {{location.second.name}}
              </h1>
            </div>
            -->
            <router-view/>
          </div>
        </div>
      </div>
      <vue-footer></vue-footer>
    </template>
    <template v-else>
      <router-view/>
    </template>
  </div>
</template>

<script>
import VueHeader from '@/pages/_layout/header'
import VueFooter from '@/pages/_layout/footer'
// const menus = require('./lib/menu.json')
var store = require('store')
export default {
  name: 'App',
  data () {
    return {
      location: {},
      hasLayout: false
    }
  },
  components: {
    VueHeader,
    VueFooter
  },
  watch: {
    '$route': function () {
      this.hasLayout = ['HomeLogin'].indexOf(this.$route.name) < 0
    }
  },

  async beforeCreate () {
    let _alogin = store.get('login')
    if (!_alogin || !_alogin.token) {
      this.$router.push('/login')
      window.location.href = '/#/login'
      return
    }
    try {
      let res = await this.$axios().get(`developer/current`)
      this.$store.commit('login', res.data)
      if (this.$route.name === 'HomeLogin') {
        window.location.href = '/'
      }
    } catch (ex) {
      this.$alert('danger', '账号或密码错误')
    }
  }
}
</script>

<style lang="scss">
html {
  // font-size: 15px;
  color: #444;
}

a {
   transition: all .3s;
}

.vue-alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2000;
  border-radius: 0;
  text-align: center
}

.table {
  a {
    text-decoration: none;
    .fe {
      color: #9ea3a9;
      margin: 0 1px;
    }
    &:hover {
      .fe {
        color: #4a5057;
      }
    }
  }
}

.no-item {
  font-size: 80px;
  color: #DDD;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 350px;
}


/** tabler pack **/
.header-brand {
  h4 {
    margin-bottom: 0;
    color: #86898a
  }
}
.d-flex {
  align-items: center
}
.table tr {
  &:hover {
    // background-color: #fbfcff;
  }
}
.nav {
  // font-size: 0.9rem;
}
.header .dropdown-menu {
  margin-top: .5rem;
}

.card-header {
  .card-title {
    flex-grow: 1
  }
  .btn {
    font-size: 0.7rem;
  }
}

</style>
