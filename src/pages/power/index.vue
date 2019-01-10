<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">权限管理</h3>
      <a href="javascript: void(0)" class="btn btn-outline-info" @click="showEdit()">
        <i class="fe fe-plus"></i>添加权限
      </a>
    </div>
    <data-list :isloading="isloading" :pagedata="pagedata" :fields="fields" v-if="fields">
      <tr v-for="item in items" :class="'valid-' + item.recsts">
        <td>{{item.name}}</td>
        <td>{{item.app_poi_apps.name}}</td>
        <td>
          <router-link :to="'/power/res?id=' + item.id + '&name=' + item.name">
            <i class="fe fe-folder"></i>
          </router-link>
        </td>
        <td>
          <a href="javascript: void(0)"  @click="showEdit(item)" title="编辑">
            <i class="fe fe-edit-2"></i>
          </a>
        </td>
      </tr>
    </data-list>

    <!-- 编辑新增弹框 -->
    <edit-modal ref="power" :fetchItems="fetchItems" />
  </div>
</template>

<script>
import VueSwitch from '@/components/vue-switch'
import EditModal from './_edit_modal'
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
      fields: null,
      apps: []
    }
  },
  components: {
    VueSwitch,
    EditModal
  },
  methods: {
    // 获取
    fetchItems: async function (page) {
      page = page || this.$route.query.page
      this.isloading = true
      let Table = this.$av.extend('pre_auth_power')
      let data = await this.$search(Table).include('app_poi_apps').fetchAll({ pageSize: pageSize, page: page })
      this.isloading = false
      this.items = data.items
      this.pagedata.totalcount = data.count
    },

    // 启用禁用
    switchRecsts: function (item) {
      return async function (val) {
        let model = this.$av.extend('pre_auth_power').forge(item)
        model.set('switch_state', val)
        await model.update()
        this.$alert('success', '操作成功！')
        item.switch_state = val
      }
    },

    // 显示编辑框
    showEdit: function (item) {
      this.$refs.power.showEdit(item)
    },
    // 获取应用
    fetchApps: async function (page) {
      let Table = this.$av.extend('apps')
      let data = await Table.fetchAll()
      this.apps = data.items
    }
  },
  watch: {
    '$route': function () {
      this.fetchItems()
    }
  },
  async created () {
    this.fetchItems()
    await this.fetchApps()
    this.fields = [
      {
        title: '权限名',
        key: 'name',
        search: true
      }, {
        title: '所属应用',
        key: 'app_poi_apps',
        search: {
          type: 'select',
          options: this.apps.map(item => {
            return {
              name: item.name,
              value: item.id
            }
          })
        }
      }, {
        title: '资源'
      }, {
        title: '操作'
      }
    ]
  }
}
</script>

<style scoped>
tr.valid-1 {
  color: #c4c3c3;
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
