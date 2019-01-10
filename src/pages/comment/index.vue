<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">评论管理</h3>
      
    </div>
    <data-list :isloading="isloading" :pagedata="pagedata" :fields="fields" v-if="fields">
      <tr v-for="item in items" :class="'valid-' + item.recsts">
        <td>{{item.id}}</td>
        <td>{{item.mem.nc}}</td>
        <td>
          <a :href="targetURL(item)" target="_blank">
            {{item.repo.name}}
          </a>
        </td>
        <td>
          {{item.created_at}}
        </td>
        <td>
          <a href="javascript: void(0)"  @click="destroy(item)" title="编辑">
            <i class="fe fe-trash"></i>
          </a>
        </td>
        <td>{{item.con}}</td>

      </tr>
    </data-list>

    <!-- 编辑新增弹框 
    <edit-modal ref="power" :fetchItems="fetchItems" />-->
  </div>
</template>

<script>
import VueSwitch from '@/components/vue-switch'
// import EditModal from './_edit_modal'
const config = require('../../../local_env')
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
      let _where = this.$route.query
      _where.typ = 'REPO'
      let res = await this.$axios({ pageSize: pageSize, page: page }).get('data?table=comment', {
        params: {
          where: _where
        }
      })
      this.isloading = false
      this.items = res.data.data[0].items
      this.pagedata.totalcount = res.data.data[0].count
    },

    // 显示编辑框
    destroy: async function (item) {
      if (!confirm('确定删除该评论？')) {
        return false
      }
      let res = await this.$axios().delete(`data?table=comment&id=${item.id}`)
      if (res.data.status === '200') {
        this.$alert('success', '删除评论成功')
        this.fetchItems()
      }
    },
    targetURL: function (item) {
      return `${config.api}comment/${item.id}/target`
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
        title: '会员'
      }, {
        title: '评论库'
      }, {
        title: '评论时间'
      }, {
        title: '操作'
      }, {
        title: '内容'
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
