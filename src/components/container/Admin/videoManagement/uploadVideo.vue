<template>
  <div class="upload-video">
    <div class="upload">
      <span class="upload-title">视频名称:</span>
      <input class="upload-input" placeholder="请输入视频名称" />
    </div>
    <div class="upload upload-height">
      <span class="upload-title">视频描述:</span>
      <textarea class="upload-textarea" rows="8" cols="70" placeholder="请输入视频描述" />
      </div>
    <div class="upload">
      <span class="upload-title">请选择课程:</span>
        <select-input
          class="upload-select"
          id="course"
          tips="请选择课程"
          :option="inputData.course.option"
          @option="changeOption"
          :drop-down-list="inputData.course.list"
        ></select-input>
      </div>
    <div class="upload">
      <span class="upload-title">请选择章节:</span>
      <select-input
          class="upload-select"
          id="chapter"
          tips="请选章节"
          :option="inputData.chapter.option"
          @option="changeOption"
          :drop-down-list="inputData.chapter.list"
        ></select-input>
    </div>
    <div class="upload">
      <span class="upload-title">请选择视频:</span>
      <input type="file" @change="getFile($event)">
    </div>
    <div class="upload-footer">
      <button class="btn upload-btn" @click="submit1($event)">确定</button>
      <button class="btn upload-btn">取消</button>
    </div>
  </div>
</template>

<script>
  import SelectInput from "../../teacher/utils/selectInput";
  import fs from 'fs';
  import AWS from 'aws-sdk'

  export default {
    name: "uploadVideo",
    data() {
      return {
        file: null,
        fileName: '',
        inputData: {
          course: {
            option: "",
            list: ["课程一", "课程二", "课程三"]
          },
          chapter: {
            option: "",
            list: ["开学第一课", "开学第二课", "开学第三课"]
          }
        }
      };
    },
    methods: {
      changeOption(item, id) {
        Object.keys(this.inputData).forEach((res) => {
          if (res === id) {
            this.inputData[res].option = item;
          }
        });
      },
      getFile(event) {
        this.file = event.target.files[0]
        const extension = this.file.name.split('.')[1] === 'mp4'
        const extension2 = this.file.name.split('.')[1] === 'ppt'
        const extension3 = this.file.name.split('.')[1] === 'pdf'
        const extension4 = this.file.name.split('.')[1] === 'jpg'
        const isLt2M = this.file.size / 1024 / 1024 < 5
        // if (!extension && !extension2 && !extension3 && !extension4) {
        //   // this.$message.warning('上传模板只能是 mp4、ppt、pdf、swf、格式!')
        //   return
        // }
        // if (!isLt2M) {
        //   // this.$message.warning('上传模板大小不能超过 1000MB!')
        //   return
        // }
        console.log(this.file.name)
        this.fileName = this.file.name
      },
      submit1(event) {
        AWS.config = new AWS.Config({
          accessKeyId: 'AKIAS6QS63NLMGJEODPO',
          secretAccessKey: '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',
          region: 'cn-northwest-1'
        })
        var s3 = new AWS.S3();
        let formData = new FormData()

        formData.append('caption', this.caption)
        formData.append('hour', this.hour)
        formData.append('particulars', this.particulars)
        formData.append('content', this.file)
        console.log(this.fileName)
        const reader = new FileReader();
        var content = reader.readAsArrayBuffer(this.file);
        var params = {
          ACL: 'public-read',
          Bucket: "cedsi",
          Body: formData.get('content'),
          Key: "" + this.fileName,
          ContentType: 'video/mp4',
          Metadata: {
            'uploader': 'liwenhao'
          }
        };
        s3.putObject(params, function (err, data) {
          if (err) {
            console.log(err, err.stack);
          } else {
            console.log(data);
          }
        })
      },
    },
    components: { SelectInput }
  };
</script>

<style>
.upload-video {
  width: 98%;
  margin: 0 auto;
  padding-top: 30px;
}
.upload {
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
}
.upload-title {
  color: #606266;
  display: block;
  text-align: right;
  width: 80px;
  height: 40px;
  float: left;
  line-height: 40px;
}
.upload-input {
  width: 300px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #409eff;
  margin-left: 10px;
  padding-left: 10px;
}
.upload-input:hover {
  border: 1px solid #66b1ff;
}
.upload-input:focus {
  outline: none;
}
.upload-textarea {
  border: 1px solid #409eff;
  border-radius: 5px;
  margin-left: 10px;
  padding: 10px;
}
.upload-height {
  height: 190px;
}
.upload-textarea:hover {
  border: 1px solid #66b1ff;
}
.upload-textarea:focus {
  outline: none;
}
.outside[data-v-5567b275]{
  width: 300px !important;
  height: 40px !important;
  margin-left: 10px !important;
}
.inputBox[data-v-5567b275]{
    height: 35px !important;
    font-size: 14px !important;
    width: 230px !important;
}
.dropdown-menu{
    left: 100px !important;
}
.upload-footer{
    width: 100%;
    text-align: center
}
.upload-btn{
    background-color: #409eff;
    color: #fff;
    margin-left: 10px;
}
.upload-btn:hover{
    color: #fff
}
.upload-btn:focus{
    outline:none;
    color: #fff
}
</style>