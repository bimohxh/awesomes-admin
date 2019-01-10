<template>
<div>
  <div :class="'tag ' + statuscd().tag" v-if="issue.recsts == 0">
    <span>
      <i :class="'fe ' + statuscd().icon"></i>
    </span>
    <span class="tag-addon">{{issueStatus[issue.status]}}</span>
  </div>

  <div v-else class="tag">
    <span>
      <i class="fe fe-trash"></i>
    </span>
    <span class="tag-addon">工单已删除</span>
  </div>
</div>
</template>

<script>
export default {
  props: ['issue'],
  data () {
    return {
      issueStatus: {}
    }
  },
  methods: {
    statuscd: function () {
      return {
        SUBMIT: {
          tag: 'tag-azure',
          icon: 'fe-send'
        },
        ACCEPT: {
          tag: 'tag-blue',
          icon: 'fe-tag'
        },
        FEEDBACK_COMMON: {
          tag: 'tag-orange',
          icon: 'fe-message-circle'
        },
        FEEDBACK_APP: {
          tag: 'tag-orange',
          icon: 'fe-message-circle'
        },
        DONE: {
          tag: '',
          icon: 'fe-check'
        },
        WACK: {
          tag: 'tag-yellow',
          icon: 'fe-activity'
        }
      }[this.issue.status] || {
        tag: '',
        icon: 'fe-star'
      }
    }
  },
  async created () {
    this.issueStatus = await this.$refcd('ISSUE_STATUS')
  }
}
</script>