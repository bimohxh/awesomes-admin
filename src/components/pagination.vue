<template>
  <div class="page-box">
    <div :id="pid"></div>
    <div class="summary">
      共查询到 
      <strong> {{option.totalcount}} </strong> 条记录
    </div>
  </div>
</template>

<script>

export default {
  props: ['option'],
  methods: {
    pgination: function () {
      let isFirstFetch = true
      let _self = this
      window.$(`#${this.pid}`).pagination({
        dataSource: [this.option.totalcount],
        pageSize: this.option.pageSize || 15,
        pageNumber: this.option.page || 1,
        showGoInput: true,
        showGoButton: true,
        goButtonText: '跳转',
        ulClassName: 'pagination',
        callback: function (data, pagination) {
          if (isFirstFetch) {
            isFirstFetch = false
            return
          }
          if (_self.option.callback) {
            _self.option.callback(pagination.pageNumber)
          }
        }
      })
    }
  },
  data () {
    return {
      pid: `pagina-${parseInt(Math.random(10) * 10000)}`
    }
  },
  watch: {
    'option.totalcount': function () {
      this.pgination()
    }
  },
  mounted () {
    this.pgination()
  }
}
</script>

<style lang="scss">
.page-box {
  display: flex;
  align-items: center;

  .summary {
    margin-left: 20px;
  }
}
.paginationjs .paginationjs-pages li {
  border: 1px solid #daddde;
  border-right: none;
}
.paginationjs .paginationjs-go-input>input[type=text] {
  border: 1px solid #daddde;
}
.paginationjs .paginationjs-go-button>input[type=button] {
  border: 1px solid #daddde;
  color: #9c9b9b
}
.paginationjs .paginationjs-pages li>a {
  color: #c0c0c0
}
</style>