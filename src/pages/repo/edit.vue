<template>
<div class="card repo-edit">
  <div class="card-header">
    <h3 class="card-title">编辑前端库 [{{repo.full_name}}]</h3>
  </div>

  <div class="card-body">
    <div class="form-group">
      <label>别名</label>
      <input class="form-control" v-model="repo.alia" />
    </div>

    <div class="form-group">
      <label>GitHub</label>
      <input class="form-control" v-model="repo.html_url" />
    </div>

    <div class="form-group">
      <label>英文描述</label>
      <input class="form-control" v-model="repo.description" />
    </div>

    <div class="form-group">
      <label>中文描述</label>
      <input class="form-control" v-model="repo.description_cn" />
    </div>

    <div class="form-group">
      <label>官网</label>
      <input class="form-control" v-model="repo.homepage" />
    </div>

    <div class="form-group">
      <label>归类</label>
      <select class="form-control" v-model="repo_typ">
        <option v-for="typ in menutyps" :value="typ.value">{{typ.name}}</option>
      </select>
    </div>

    <div class="form-group">
      <label>标签</label>
      <input class="form-control" v-model="repo.tag" />
    </div>

    <div class="form-group">
      <label>预览图</label>
      <img :src="$cdn(repo.cover, 'repo')" class="repo-cover" />
      <button class="btn btn-outline-primary" style="position: relative">
        上传
        <upload folder="repo" v-model="repo.cover" />
      </button>
    </div>

    <div class="form-group">
      <label>首页推荐</label>
      <input class="form-control" v-model="repo.recommend" />
      <span>首页幻灯片，大于 0 则推荐，数字越大排在越前面</span>
    </div>

    <div class="form-group" v-if="repo.recommend > 0">
      <label>推荐大图</label>
      <img :src="$cdn(repo.banner_cover, 'repo')" />
      <button class="btn btn-outline-primary" style="position: relative">
        上传
        <upload folder="repo" v-model="repo.banner_cover" />
      </button>
    </div>
  </div>

  <div class="card-footer text-right">
    <button class="btn btn-primary" :disabled="submiting" @click="update">
      {{submiting ? '更新中...' : '提交更新'}}
    </button>
  </div>
</div>
</template>

<script>
import Upload from '@/components/upload'
export default {
  data () {
    return {
      repo: {},
      repo_typ: '',
      menutyps: [],
      submiting: false,
      typmaps: {}
    }
  },
  components: {
    Upload
  },
  methods: {
    fetchMenutyps: async function () {
      let res = await this.$axios().get(`data?table=menutyp`, {
        params: {
          limit: 10000
        }
      })
      let _typs = []
      let _self = this
      res.data.data[0].items.forEach(item => {
        _self.typmaps[item.key] = item.sdesc
        if (item.typcd === 'B') {
          let _parent = res.data.data[0].items.find(sub => sub.key === item.parent)
          _typs.push({
            name: _parent.sdesc + ' - ' + item.sdesc,
            value: _parent.key + '-' + item.key
          })
        }
      })
      this.menutyps = _typs
    },
    update: async function () {
      this.submiting = true
      let res = await this.$axios().put(`repo/${this.repo.id}`, this.repo)
      if (res.data.status) {
        this.$alert('success', '更新成功')
      } else {
        this.$alert('danger', '更新失败')
      }
      this.submiting = false
    }
  },
  watch: {
    repo_typ: function (val) {
      let _typval = val.split('-')
      this.repo.rootyp = _typval[0]
      this.repo.rootyp_zh = this.typmaps[_typval[0]]
      this.repo.typcd = _typval[1]
      this.repo.typcd_zh = this.typmaps[_typval[1]]
    }
  },
  async created () {
    this.fetchMenutyps()
    let res = await this.$axios().get(`data/detail?table=repo&id=` + this.$route.query.id)
    this.repo = res.data.data[0]
    this.repo_typ = this.repo.rootyp + '-' + this.repo.typcd
  }
}
</script>

<style scoped lang="scss">
.repo-edit {
  .form-group {
    display: flex;
    align-items: center;

    label {
      display: inline-block;
      width: 100px;
      text-align: right;
      padding-right: 10px;
      flex-shrink: 0;
    }
    span {
      flex-shrink: 0;
      padding-left: 10px;
      color: #AAA
    }
  }
  .repo-cover {
    max-width: 200px;
    border: #DDD 1px solid;
    margin-right: 20px;
  }
}
</style>