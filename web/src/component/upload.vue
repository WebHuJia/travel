<template>
  <div id="Upload" v-if="showpop">
    <h3>{{$t(title)}}</h3>
    <!-- <v-uploader @done="uploadDone" ></v-uploader> -->
    <ul>
      <li :class="{'act':uploadfile}" @click.stop="uploadfile=true,networdfile=false">{{$t('upload.file')}}</li>
      <li v-if="false" :class="{'act':!uploadfile}" @click.stop="uploadfile=false,networdfile=true">{{$t('upload.net')}}</li>
    </ul>
    <div v-if="uploadfile" class='uploadfile' :style="uploadfilelist ? 'background:none' : ''">
      <span >
        <img v-if="showPrevimg" :src="showPrevimg" alt="">
        <img :src="previmg" alt="" v-if="uploadfilelist && !showPrevimg">
        <label v-if="!uploadfilelist">{{$t('upload.selectfile')}}</label>
        <input type="file" @change="imgUrl" />
      </span>
      <i>{{uploadName}}</i>
    </div>
    <div v-if="networdfile" class="networdfile">
      <span>{{$t('upload.addressnet')}}</span>
      <input type="text" placeholder="http://" v-model.trim="networdimgurl">
    </div>
    <div>
      <button  @click.stop="closeupload">{{$t('common.cancel')}}</button>
      <button  @click.stop="affirmupload" :disabled="btnDisabled">{{$t('common.ok')}}</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'upload.image'
    },
    showpop: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      uploadfilelist: false,
      uploadfile: true,
      networdfile: false,
      previmg: '',
      uploadName: '',
      uploadonoff: false,
      btnDisabled: true,
      showPrevimg: '',
      cancel: ''
    }
  },
  created () {
    this.source = this.axios.axios.CancelToken.source();
  },
  methods: {
    imgUrl (d) {
      this.previmg = ''
      this.uploadName = ''
      this.showPrevimg = ''
      var fd = new FormData()
      var size = d.currentTarget.files[0].size / 1000
      var uploadType = d.currentTarget.files[0].name.split('.')
      if (size > 10240) {
        this.$message({
          content: this.$t('upload.max')
        })
        return
      }
      this.uploadName = d.currentTarget.files[0].name
      fd.append('file', d.currentTarget.files[0])
      var url = ''
      this.uploadfilelist = true
      var data = {
        filetype: 'file',
        file: fd
      }
      var config = {
        headers: {
          'x-device-language': this.$store.state.LANG,
          'XX-Token': localStorage.getItem('token'),
          'XX-Device-Type': this.$store.state.users.device_type,
          'Content-Type': 'multipart/form-data'
        }
      }
      this.previmg = '/static/staticfile/images/loading.gif'
      switch (uploadType[uploadType.length-1]) {
        case 'pdf': case 'fdf': case 'doc': case 'docx': case 'ppt': case 'pptx': case 'xls': case 'xla': case 'air': case 'zip': case 'rar': case '7z':
          url = '/user/upload?filetype=file'
          break
        case 'png' : case 'jpg': case 'png': case 'jpeg': case 'gif': case 'bmp': case 'cgm': case 'dng': case 'emf': case 'svg': case 'webp': case 'JPG': case 'PNG':
          url = '/user/upload'
          break
        default:
          this.$message({
            content: this.$t('upload.notsup')
          })
          this.previmg = ''
          this.uploadfilelist = false
          this.uploadName = ''
          return
      }
      this.axios.axios.post(this.DefaultJs.APIURL + url,fd,config).then((ret) => {
        if (ret.data.code == 0) {
          this.$message({content: ret.data.msg})
          return
        }
        this.uploadonoff = true
        this.$message({content: ret.data.msg || '上传完成',type: 'check'})
        this.btnDisabled = false
        this.previmg = ret.data.data.preview_url
        switch (uploadType[uploadType.length-1]) {
          case 'pdf': case 'fdf': case 'doc': case 'docx': case 'ppt': case 'pptx': case 'xls': case 'xla': case 'air': case 'zip': case '7z': case 'rar':
            this.showPrevimg = '/static/staticfile/images/fileicon/' + uploadType[uploadType.length-1]+ '.png'
            break
          case 'png' : case 'jpg': case 'png': case 'jpeg': case 'gif': case 'bmp': case 'cgm': case 'dng': case 'emf': case 'svg': case 'webp': case 'JPG': case 'PNG':
            this.showPrevimg = ''
            break
          default:
            this.showPrevimg = ''
            this.$message({content: this.$t('upload.notsup')})
          return
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    closeupload () {
      this.previmg = ''
      this.uploadfilelist = false
      this.uploadfile = true
      this.networdfile = false
      this.uploadName = ''
      this.btnDisabled = true
      this.showPrevimg = ''
      this.$emit('hidepop', {showpop: false})
    },
    affirmupload () {
      if (!this.networdimgurl && !this.previmg) {
        this.$message({content: '请选择上传文件'})
        this.btnDisabled = true
        return
      }
      if (this.networdimgurl && (this.networdfile && !this.uploadfile)) {
        if (this.networdimgurl.indexOf('http://') != -1 || this.networdimgurl.indexOf('https://') != -1) {
          this.previmg =  this.networdimgurl
        } else {
          this.previmg = `//${this.networdimgurl}`
        }
      }
      this.$emit('uploadImg', {imgurl: this.previmg,onoff:false,name: (this.uploadName || this.previmg.split('/')[this.previmg.split('/').length-1])})
      this.uploadfilelist = false
      this.uploadfile = true
      this.networdfile = false
      this.networdimgurl = ''
      this.uploadName = ''
      this.btnDisabled = true
    },
  }
};
</script>
<style lang="less" scoped>
#Upload{position: fixed;top:0;left:0;right:0;bottom:0;margin:auto;width:600px;height:440px;background:#fff;display:block;z-index: 12345;flex-flow:wrap;
    box-shadow: -6.364px 6.364px 36px 0px rgba(31, 30, 77, 0.2);
    h3{height:60px;width:100%;line-height:60px;text-indent: 1em;flex-shrink: 0;}
    ul{margin:10px;height:30px;display: flex;line-height:30px;width:100%;border-bottom:1px solid #e6e6e6;
        li{ color:#18BC9C;cursor: pointer;padding:8px;box-sizing:border-box;border:1px solid #fff;border-bottom:1px solid #e6e6e6;margin:0 0 -1px 20px;
            &.act{color:#2C3E50;border-color:#e6e6e6;border-bottom-color:#fff;}
        }
    }
    .uploadfile{width:560px;height:240px;margin:0 auto;border:3px dashed #e6e6e6;position:relative;border-radius: 2px;flex-flow: column;justify-content: center;align-items: center;
        background:url(/static/staticfile/images/image.png) no-repeat 50% 30%;
        span{display: block;width: 200px;height: 200px;position: relative;overflow:hidden;
          img{width:90%;height:90%;display: block;margin:0 auto;object-fit:scale-down;}
          label{position:absolute;top:90px;right:0;bottom:0;left:0;margin:auto;width:168px;height:44px;background:#00b7ee;font-size:18px;color:#fff;text-align:center;line-height:44px;border-radius:2px;cursor: pointer;}
          input{position:absolute;top:0;right:0;bottom:0;left:0;margin:auto;width:100%;height:100%;opacity: 0;z-index: 12345;cursor: pointer;}
          i{    position: absolute;
            /* bottom: -10px; */
            white-space: nowrap;
            /* -webkit-transform: translateX(-50%); */
            /* transform: translateX(-50%); */
            /* margin-left: 50%; */
            width: 100%;
            text-align: center;}
        }
    }
    .networdfile{display: block;padding:0 20px 20px;height:226px;
        span{display: block;margin-bottom:10px;}
    }
    input{width:550px;height:50px;text-indent: 1em;border-radius: 2px;line-height:50px;border:1px solid #d7d7d7;margin-bottom:20px;}
    div{display: flex;flex-flow:wrap;justify-content: space-around;width:100%;}
    button{width: 140px;height:40px;color:#fff;display: block;margin:20px auto 40px;background:#20b555;text-align: center;line-height: 40px;border-radius: 2px;
      &:disabled{background: rgb(235, 235, 228);}
    }
}
</style>
