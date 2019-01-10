<template>
  <div class="date-picker-box" >
    <input type="text" class="form-control bootdatepicker" :value="value" :id="ele" :style="{width: width || '100%'}"/>
    <i class="fa fa-calendar"></i>
  </div>
</template>

<script>
export default {
  props: ['value', 'width'],
  data () {
    return {
      date: '',
      ele: `date-picker-${Date.now()}-${parseInt(Math.random() * 10000)}`
    }
  },
  methods: {
  },
  mounted () {
    let _self = this
    window.$(`#${this.ele}`).datepicker({
      format: 'yyyy-mm-dd',
      language: 'zh-CN',
      autoclose: true
    }).on('changeDate', function (e) {
      console.log(e.format())
      _self.$emit('input', e.format())
    })
  }
}
</script>

<style lang="scss" scoped>
.date-picker-box {
  position: relative;
  input {
    padding-right: 20px;
  }
  .fa {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
</style>
