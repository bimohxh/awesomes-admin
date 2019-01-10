<template>
<div :class="'switch-box loading-' + loading + ' disabled-' + disabled">
  <label class="custom-switch">
    <input type="checkbox" v-model="val" class="custom-switch-input">
    <span class="custom-switch-indicator"></span>
  </label>
  <div class="cover" @click="switchTo"></div>
</div>
</template>

<script>
export default {
  props: ['value', 'true', 'false', 'action', 'disabled'],
  data () {
    return {
      val: this.value === this.true,
      loading: false
    }
  },
  methods: {
    // 触发切换
    switchTo: async function () {
      // 如果是异步的则需要加入进度
      if (this.disabled) {
        return
      }
      if (this.action) {
        if (this.loading) { return }
        this.loading = true
        await this.action(this.val ? this.false : this.true)
        this.loading = false
      } else {
        this.val = !this.val
      }
    }
  },
  watch: {
    'val': function () {
      let result = this.val ? this.true : this.false
      this.$emit('input', result)
    },
    'value': function () {
      this.val = String(this.value) === String(this.true)
    }
  }
}
</script>

<style scoped lang="scss">
.switch-box {
  display: inline-block;
  position: relative;
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  }
  &.loading-true {
    &::after {
      content: '';
      animation: loader 500ms infinite linear;
      border: 2px solid #fff;
      border-radius: 50%;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      display: block;
      height: 1em;
      width: 1em;
      position: absolute;
      left: calc(50% - (1.4em / 2));
      top: calc(50% - (1.4em / 2));
      transform-origin: center;
      position: absolute !important;
      left: 0.7rem;
    }
    .custom-switch-indicator:before {
      display: none
    }
  }
  &.disabled-true {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>