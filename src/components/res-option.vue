<template>
  <div>
    <!--万能接口-->
    <template v-if="item.type === 'classes' && item.hased">
      <span style="cursor: pointer" :class="'tag ml-1 ' + (options.indexOf(oper.key) > -1 ? oper.style : '')" v-for="oper in opers" @click="switchOper(oper)">{{oper.name}}</span>
    </template>
  </div>
</template>

<script>
var OPERS = [
  {
    name: '增',
    key: 'c',
    style: 'tag-green'
  }, {
    name: '删',
    key: 'd',
    style: 'tag-red'
  }, {
    name: '改',
    key: 'u',
    style: 'tag-orange'
  }, {
    name: '查',
    key: 'r',
    style: 'tag-azure'
  }
]
export default {
  props: ['item', 'table'],
  data () {
    let _self = this
    return {
      options: _self.item.repower.options || '',
      opers: OPERS
    }
  },
  methods: {
    switchOper: async function (oper) {
      let Table = this.$av.extend(this.table || 'pre_auth_power_resource')
      if (this.options.indexOf(oper.key) > -1) {
        this.options = this.options.replace(oper.key, '')
      } else {
        this.options += oper.key
      }
      await Table.forge({
        id: this.item.repower.id,
        options: this.options
      }).update()
    }
  }
}
</script>