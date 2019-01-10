<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">分类管理</h3>
      
      <a href="javascript: void(0)" class="btn btn-outline-info" @click="showEdit()">
        <i class="fe fe-plus"></i>新增分类
      </a>
    </div>
    <data-list :isloading="isloading" :pagedata="pagedata" :fields="fields" v-if="fields">
      <tr v-for="item in items" :class="'valid-' + item.recsts">
        <td>{{item.id}}</td>
        <td>{{item.key}}</td>
        <td>{{item.sdesc}}</td>
        <td>{{item.icon}}</td>
        <td>
          <span class="tag tag-purple" v-if="item.typcd === 'A'">一级</span>
          <span class="tag" v-if="item.typcd === 'B'">二级</span>
        </td>
        <td>{{item.parent}}</td>
        <td>
          <a href="javascript: void(0)"  @click="showEdit(item)" title="编辑">
            <i class="fe fe-edit-2"></i>
          </a>
        </td>
      </tr>
    </data-list>

    <!-- 编辑新增弹框 -->
    <edit-modal ref="edit" :fetchItems="fetchItems" />
  </div>
</template>

<script>
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
    EditModal
  },
  methods: {
    // 获取
    fetchItems: async function (page) {
      page = page || this.$route.query.page
      this.isloading = true
      let res = await this.$axios({ pageSize: pageSize, page: page }).get('data?table=menutyp', {
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
      this.$refs.edit.showEdit(item)
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
        title: 'KEY',
        key: 'key',
        search: true
      }, {
        title: '中文名',
        key: 'sdesc',
        search: true
      }, {
        title: '图标'
      }, {
        title: '级别'
      }, {
        title: '父级',
        key: 'parent',
        search: true
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
