<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">前端库管理</h3>
      
    </div>
    <data-list :isloading="isloading" :pagedata="pagedata" :fields="fields" v-if="fields">
      <tr v-for="item in items" :class="'valid-' + item.recsts">
        <td>{{item.id}}</td>
        <td>{{item.full_name}}</td>
        <td>
          <img :src="$cdn(item.cover, 'repo', 'subject_repo')" class="scover" />
        </td>
        <td>{{item.description_cn || item.description}}</td>
        <td>{{item.comment}}</td>
        <td>{{item.using}}</td>
        <td>{{item.score}}</td>
        <td>
          <a href="javascript: void(0)"  @click="destroy(item)" title="删除">
            <i class="fe fe-trash"></i>
          </a>
          <router-link :to="'repo/edit?id=' + item.id"  title="编辑">
            <i class="fe fe-edit-2"></i>
          </router-link>
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
      let res = await this.$axios({ pageSize: pageSize, page: page }).get('data?table=repo', {
        params: {
          where: this.$route.query
        }
      })
      this.isloading = false
      this.items = res.data.data[0].items
      this.pagedata.totalcount = res.data.data[0].count
    },

    // 显示编辑框
    destroy: async function (item) {
      if (!confirm('确定删除该Repo？')) {
        return false
      }
      let res = await this.$axios().delete(`data?table=repo&id=${item.id}`)
      if (res.data.status === '200') {
        this.$alert('success', '删除成功')
        this.fetchItems()
      }
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
        title: '名字',
        key: 'full_name',
        search: true
      }, {
        title: '描述'
      }, {
        title: '评论'
      }, {
        title: '在用'
      }, {
        title: '得分'
      }, {
        title: '操作'
      }
    ]
  }
}
</script>

<style scoped>
.scover {
  width: 40px;
  height: 40px;
}
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
