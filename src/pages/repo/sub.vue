<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">前端库提交</h3>
      
    </div>
    <data-list :isloading="isloading" :pagedata="pagedata" :fields="fields" v-if="fields">
      <tr v-for="item in items" >
        <td>{{item.id}}</td>
        <td>
          <a :href="item.html_url" target="_blank">
            {{item.html_url}}
          </a>
        </td>
        <td>{{item.rootyp}} / {{item.typcd}}</td>
        <td>
          <span class="tag" v-if="item.status === 'UNREAD'">未处理</span>
          <span class="tag tag-green" v-else>已处理</span>
        </td>
        <td>{{item.created_at}}</td>
        <td>
          
          <button class="btn btn-outline-danger btn-sm mr-2" @click="destroy(item)">删除</button>
          <button class="btn btn-outline-primary btn-sm" :disabled="item.fetching" @click="fetchSub(item)" v-if="item.status === 'UNREAD'">
            {{item.fetching ? '提取中...' : '提取'}}
          </button>
        </td>
      </tr>
    </data-list>
  </div>
</template>

<script>
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
  methods: {
    // 获取
    fetchItems: async function (page) {
      page = page || this.$route.query.page
      this.isloading = true
      let res = await this.$axios({ pageSize: pageSize, page: page }).get('data?table=submit', {
        params: {
          where: this.$route.query
        }
      })
      this.isloading = false
      this.items = res.data.data[0].items.map(item => {
        item.fetching = false
        return item
      })
      this.pagedata.totalcount = res.data.data[0].count
    },

    destroy: async function (item) {
      if (!confirm('确定删除该提交？')) {
        return false
      }
      let res = await this.$axios().delete(`data?table=submit&id=${item.id}`)
      if (res.data.status === '200') {
        this.$alert('success', '删除成功')
        this.fetchItems()
      }
    },

    fetchSub: async function (item) {
      item.fetching = true
      let res = await this.$axios().get(`submit/fetch?id=${item.id}`)
      if (res.data.status) {
        this.$alert('success', '抓取成功')
        this.fetchItems()
      } else {
        item.fetching = false
        this.$alert('danger', '抓取失败')
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
        title: '地址'
      }, {
        title: '类型'
      }, {
        title: '状态'
      }, {
        title: '提交时间'
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
