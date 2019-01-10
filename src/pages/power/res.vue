<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">「{{$route.query.name}}」权限拥有的资源</h3>
      <router-link to="/power" class="btn btn-secondary">
        <i class="fe fe-chevron-left" />返回权限列表
      </router-link>
    </div>
    <data-list :isloading="isloading" :pagedata="pagedata" :fields="fields" v-if="fields">
      <tr v-for="item in items" >
        <td>{{item.name}}</td>
        <td>{{item.key}}</td>
        <td>{{rtypes[item.type]}}</td>
        <td>{{item.client}}</td>
        <td>
          <vue-switch v-model="item.hased" :true="true" :false="false" :action="switchRecsts(item)"></vue-switch>
        </td>
        <td>
          <options :item="item" v-if="item.repower" />
        </td>
      </tr>
    </data-list>
  </div>
</template>

<script>
import VueSwitch from '@/components/vue-switch'
import Options from '@/components/res-option'
const pageSize = 20
export default {
  data () {
    return {
      items: [],
      isloading: true,
      pagedata: {
        totalcount: 0,
        pageSize: pageSize
      },
      rtypes: {
        api: '普通接口',
        classes: '万能接口',
        view: '视图'
      },
      fields: null,
      powerRes: {}
    }
  },
  components: {
    VueSwitch,
    Options
  },
  methods: {
    // 获取
    fetchItems: async function (page) {
      page = page || this.$route.query.page
      this.isloading = true
      let Table = this.$av.extend('pre_auth_resource')
      let data = await this.$search(Table).include('app_poi_apps').fetchAll({ pageSize: pageSize, page: page })
      this.isloading = false
      this.items = data.items.map(item => {
        item.hased = !!this.powerRes[item.id]
        // item.prid = this.powerRes[item.id].id
        // item.options = this.powerRes[item.id].options
        item.repower = this.powerRes[item.id]
        return item
      })
      this.pagedata.totalcount = data.count
    },
    // 获取当前权限的所有资源
    fetchPowerRes: async function () {
      let Table = this.$av.extend('pre_auth_power_resource')
      let data = await Table.where({
        power_poi_auth_power: this.$route.query.id
      }).keys('resource_poi_auth_resource,options').fetchAll()
      data.items.forEach(item => {
        this.powerRes[item.resource_poi_auth_resource] = item
      })
    },
     // 启用禁用
    switchRecsts: function (item) {
      let _self = this
      return async function (val) {
        let Table = this.$av.extend('pre_auth_power_resource')
        if (val) {
          // 添加
          let param = {
            power_poi_auth_power: _self.$route.query.id,
            resource_poi_auth_resource: item.id
          }
          if (item.type === 'classes') {
            param.options = 'r'
          }
          let data = await Table.forge(param).save()
          _self.powerRes[data.resource_poi_auth_resource] = data
          item.repower = data
          item.hased = true
        } else {
          // 删除
          await Table.forge({
            id: item.repower.id
          }).destroy()
          delete _self.powerRes[item.id]
          item.repower = {}
          item.hased = false
        }
        this.$alert('success', '操作成功！')
      }
    }
  },
  watch: {
    '$route': function () {
      this.fetchItems()
    }
  },
  async created () {
    this.fields = [
      {
        title: '资源名',
        key: 'name',
        search: true
      }, {
        title: 'KEY',
        key: 'key',
        search: true
      }, {
        title: '类型',
        key: 'type',
        search: {
          type: 'select',
          options: [
            {
              name: '普通接口',
              value: 'api'
            }, {
              name: '万能接口',
              value: 'classes'
            }, {
              name: '视图',
              value: 'view'
            }
          ]
        }
      }, {
        title: '终端',
        key: 'client'
      }, {
        title: '开启资源',
        key: 'openstatus',
        search: {
          type: 'select',
          options: [
            {
              name: '开启的',
              value: 'open'
            }, {
              name: '关闭的',
              value: 'close'
            }
          ],
          action: (table, target, value) => {
            let _ids = Object.keys(target.powerRes)
            return value === 'open' ? table.where(['id in ?', _ids]) : table.where(['id notin ?', _ids])
          }
        }
      }, {
        title: '参数'
      }
    ]
    await this.fetchPowerRes()
    this.fetchItems()
  }
}
</script>

<style scoped>
tr.valid-1 {
  color: #c4c3c3;
}

.loading-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 350px;
}
</style>
