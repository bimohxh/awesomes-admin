<template>
   <!-- Modal -->
    <div class="modal fade" id="edimodel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{isEdit ? '更新分类' : '新增分类'}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>KEY</label>
              <input type="text" class="form-control" v-model="editItem.key" />
            </div>
            <div class="form-group">
              <label>中文名</label>
              <input type="text" class="form-control" v-model="editItem.sdesc" />
            </div>
            <div class="form-group">
              <label>描述</label>
              <input type="text" class="form-control" v-model="editItem.fdesc" />
            </div>
            <div class="form-group">
              <label>级别</label>
              <select class="form-control" v-model="editItem.typcd">
                <option value="A">一级分类</option>
                <option value="B">二级分类</option>
              </select>
            </div>
            <div class="form-group" v-if="editItem.typcd === 'B'">
              <label>父级</label>
              <select class="form-control" v-model="editItem.parent">
                <option :value="first.key" v-for="first in firsts">{{first.sdesc}}</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="destory" v-if="isEdit">删除分类</button>
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
      firsts: []
    }
  },
  methods: {
    showEdit: function (item) {
      this.isEdit = !!item
      if (item) {
        let _data = JSON.parse(JSON.stringify(item))
        this.editItem = _data
      } else {
        this.editItem = {
          typcd: 'B'
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
      await this.$axios().post('data?table=menutyp', this.editItem)
      window.$('#edimodel').modal('hide')
      this.fetchItems(1)
    },
    // 更新
    subPut: async function () {
      await this.$axios().put('data?table=menutyp', this.editItem)
      window.$('#edimodel').modal('hide')
      this.fetchItems()
    },
    destory: async function () {
      if (!confirm('确定删除该分类？')) { return }
      await this.$axios().delete('data?table=menutyp&id=' + this.editItem.id, this.editItem)
      this.$alert('success', '删除成功！')
      window.$('#edimodel').modal('hide')
      this.fetchItems(1)
    },
    // 获取所有一级分类
    fetchFirst: async function () {
      let res = await this.$axios().get('data?table=menutyp', {
        params: {
          where: {
            typcd: 'A'
          }
        }
      })
      this.firsts = res.data.data[0].items
    }
  },
  created () {
    this.fetchFirst()
  }
}
</script>

<style scoped>
</style>
