<template>
   <!-- Modal -->
    <div class="modal fade" id="edimodel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{isEdit ? '更新权限' : '新增权限'}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>权限名</label>
              <input type="text" class="form-control" v-model="editItem.name" />
            </div>
            <div class="form-group">
              <label>所属应用</label>
              <select class="form-control" v-model="editItem.app_poi_apps">
                <option v-for="app in apps" :value="app.id">{{app.name}}</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="destory" v-if="isEdit">删除权限</button>
            <div style="flex-grow: 1; text-align: right;">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-flat btn-primary ml-2" @click="submit">提交保存</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['fetchItems'],
  data () {
    return {
      editItem: {},
      isEdit: false,
      apps: []
    }
  },
  methods: {
    // 获取应用
    fetchIApps: async function (page) {
      let Table = this.$av.extend('apps')
      let data = await Table.fetchAll()
      this.apps = data.items
    },

    showEdit: function (item) {
      this.isEdit = !!item
      if (item) {
        let _data = JSON.parse(JSON.stringify(item))
        _data.app_poi_apps = (_data.app_poi_apps || {}).id
        this.editItem = _data
      } else {
        this.editItem = {
          app_poi_apps: this.apps[0].id
        }
      }
      window.$('#edimodel').modal('show')
    },
    // 提交
    submit: async function () {
      this.isEdit ? this.subPut() : this.subPost()
    },
    // 新增
    subPost: async function () {
      await this.$av.extend('pre_auth_power').forge(this.editItem).save()
      window.$('#edimodel').modal('hide')
      this.fetchItems(1)
    },
    // 更新
    subPut: async function () {
      await this.$av.extend('pre_auth_power').forge(this.editItem).update()
      window.$('#edimodel').modal('hide')
      this.fetchItems()
    },
    destory: async function () {
      if (!confirm('确定删除该权限？')) { return }
      await this.$av.extend('pre_auth_power').forge(this.editItem).destroy()
      this.$alert('success', '删除成功！')
      window.$('#edimodel').modal('hide')
      this.fetchItems(1)
    },
    showFaceModal: function (item) {
      this.$refs.face.init(item)
    }
  },
  created () {
    this.fetchIApps()
  }
}
</script>

<style scoped>
</style>
