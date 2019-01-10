<template>
<div class="form">
  <input type="file" name="file"  @change="uploadFile" />
</div>
</template>
<script>
  export default {
    props: ['value', 'folder', 'progress', 'success', 'beforeUpload'],
    computed: {
      fromid: function () {
        return `upload-form-${Date.now()}-${parseInt(Math.random() * 1000)}`
      }
    },
    methods: {
      uploadFile: async function (event) {
        if (this.beforeUpload) {
          this.beforeUpload()
        }
        let _file = event.target.files[0]
        let fd = new FormData()
        fd.append('folder', this.folder)
        fd.append('filepath', window.$(event.target).val())
        fd.append('file', _file)
        let _self = this
        let res = await this.$axios().post(`upload`, fd, {
          onUploadProgress: function (evt) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total)
            if (_self.progress) {
              _self.progress(percentComplete)
            }
          }
        })
        this.$alert('success', '上传文件成功！')
        this.$emit('input', res.data.filename)
        if (this.success) {
          this.success(res.data)
        }
      },
      uploadProgress: function (evt) {
        // if (evt.lengthComputable) {
        //   var percentComplete = Math.round(evt.loaded * 100 / evt.total)
        //   document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%'
        // }
        // else {
        //   document.getElementById('progressNumber').innerHTML = 'unable to compute'
        // }
      },
      uploadComplete: function (evt) {
      },
      uploadFailed: function (evt) {
      },
      uploadCanceled: function (evt) {
      }
    }
  }
</script>
<style lang="scss" scoped>
input {
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  opacity: 0;
  
}
</style>