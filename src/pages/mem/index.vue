<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">会员管理</h3>
      
    </div>
    <data-list :isloading="isloading" :pagedata="pagedata" :fields="fields" v-if="fields">
      <tr v-for="item in items" :class="'valid-' + item.recsts">
        <td>{{item.id}}</td>
        <td>
          <a :href="'https://www.awesomes.cn/mem/' + item.id" target="_blank">{{item.nc}}</a>
        </td>
        <td>{{item.email}}</td>
        <td>{{item.mem_info.gender}}</td>
        <td>{{item.mem_info.location}}</td>
        <td>{{item.using}}</td>
        <td>
          {{item.created_at}}
        </td>
      </tr>
    </data-list>

    <!-- 编辑新增弹框 
    <edit-modal ref="power" :fetchItems="fetchItems" />-->
  </div>
</template>

<script>
import VueSwitch from '@/components/vue-switch'
// import EditModal from './_edit_modal'
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
    VueSwitch
    // EditModal
  },
  methods: {
    // 获取
    fetchItems: async function (page) {
      page = page || this.$route.query.page
      this.isloading = true
      let res = await this.$axios({ pageSize: pageSize, page: page }).get('data?table=mem', {
        params: {
          where: this.$route.query
        }
      })
      this.isloading = false
      this.items = res.data.data[0].items
      this.pagedata.totalcount = res.data.data[0].count
    },

    // 显示编辑框
    showEdit: function (item) {
      this.$refs.power.showEdit(item)
    }
  },
  watch: {
    '$route': function () {
      this.fetchItems()
    }
  },
  async created () {
    this.fetchItems()
    this.fields = [
      {
        title: 'ID'
      },
      {
        title: '昵称',
        key: 'nc',
        search: true
      }, {
        title: '邮箱',
        key: 'email',
        search: true
      }, {
        title: '性别'
      }, {
        title: '位置'
      }, {
        title: '在用'
      }, {
        title: '注册时间'
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
