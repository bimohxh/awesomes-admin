<template>
  <div>
    <div v-if="isloading" class="loading-box">
      <loading></loading>
    </div>
    <template v-if="!isloading">
      <div class="table-responsive">
        <table class="table card-table table-vcenter text-nowrap"  v-if="fields">
          <tr>
            <th v-for="field in fields">{{field.title}}</th>
          </tr>
          <tr>
            <td v-for="field in fields">
              <template v-if="field.search">
                <input type="text" class="form-control" @keyup.enter="search(field)" v-model="params[field.key]" v-if="!field.search.type" />

                <select v-model="params[field.key]" v-if="field.search.type === 'select'" class="form-control" @change="search(field)" >
                  <option :value="selectAll">全部</option>
                  <option v-for="option in field.search.options" :value="option.value">{{option.name}}</option>
                </select>
              </template>
            </td>
          </tr>
          <template v-if="hasdata">
            <slot></slot>
          </template>
          
          <tr v-else>
            <td colspan="100">
              <div class="no-item">無</div>
            </td>
          </tr>
        </table>

        <template  v-if="!fields">
          <template v-if="hasdata">
            <slot></slot>
          </template>
          <div class="no-item" v-else>無</div>
        </template>

        <div class="card-footer" v-if="hasdata && mypagedata && !hidepagination" >
          <pagination :option="mypagedata"></pagination>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Loading from '@/components/loading'
export default {
  props: ['isloading', 'pagedata', 'data', 'fields', 'hidepagination'],
  data () {
    return {
      mypagedata: this.pagedata ? {
        totalcount: this.pagedata.totalcount,
        pageSize: this.pagedata.pageSize || 1,
        callback: this.callback,
        page: this.pagedata.page || this.$route.query.page
      } : null,
      selectAll: 'all-select-options',
      params: {}
    }
  },
  computed: {
    hasdata: function () {
      if (this.pagedata) {
        return this.pagedata.totalcount > 0
      }
      if (this.data) {
        return this.data.length > 0
      }
    }
  },
  methods: {
    callback: async function (page) {
      if (this.pagedata.callback) {
        this.mypagedata.page = page
        await this.pagedata.callback(page)
      } else {
        let _param = {
          page: page
        }
        Object.keys(this.$route.query).forEach(key => {
          if (key !== 'page') {
            _param[key] = this.$route.query[key]
          }
        })
        _param = Object.keys(_param).map(key => `${key}=${_param[key]}`).join('&')
        this.$router.push(`?${_param}`)
      }
    },
    search: function (field) {
      let _param = Object.keys(this.params).filter(key => {
        let _field = this.fields.find(item => item.key === key)
        if (_field && _field.search.type === 'select') {
          return this.params[key] && this.params[key] !== this.selectAll
        }
        return this.params[key]
      }).map(key => `search_${key}=${this.params[key]}`)
      Object.keys(this.$route.query).forEach(key => {
        if (!/^search_/.test(key) && key !== 'page') {
          _param.push(`${key}=${this.$route.query[key]}`)
        }
      })
      this.$router.push(`?${_param.join('&')}`)
    }
  },
  watch: {
    'pagedata.totalcount': function () {
      this.mypagedata.totalcount = this.pagedata.totalcount
    },
    '$route': function () {
      this.mypagedata.page = this.$route.query.page
    }
  },
  components: {
    Loading
  },
  created () {
    if (this.fields) {
      this.fields.filter(item => item.search).forEach(item => {
        this.params[item.key] = this.$route.query[`search_${item.key}`] || (item.search.type === 'select' ? this.selectAll : '')
      })
    }
  }
}
</script>

<style scoped>
tr.valid-1 {
  color: #c4c3c3
}
.no-item {
  font-size: 80px;
  color: #ddd;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 350px;
}

.loading-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 350px;
}
</style>
