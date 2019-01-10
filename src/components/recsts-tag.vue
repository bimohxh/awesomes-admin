<template>
<div>
  <div class="tag tag-orange" v-if="value === '2'">
    <span>
      <i class="fe fe-loader"></i>
    </span>
    <span class="tag-addon">待审核</span>
  </div>
  <div class="tag tag-success"  v-if="value === '0'">
    <span><i class="fe fe-check"></i></span>
    <span class="tag-addon">可用</span>
  </div>
  <div class="tag"  v-if="value === '1'">
    <span><i class="fe fe-trash"></i></span>
    <span class="tag-addon">禁用</span>
  </div>
</div>
</template>

<script>
export default {
  props: ['value']
}
</script>