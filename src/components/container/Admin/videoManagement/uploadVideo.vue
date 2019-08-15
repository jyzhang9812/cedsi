<template>
  <div class="upload-video">
    <div class="upload">
      <span class="upload-title">视频名称:</span>
      <input class="upload-input" placeholder="请输入视频名称" v-model="videoName"/>
    </div>
    <div class="upload upload-height">
      <span class="upload-title">视频描述:</span>
      <textarea class="upload-textarea" rows="8" cols="70" placeholder="请输入视频描述" v-model="videoIntro"/>
      </div>
    <div class="upload">
      <span class="upload-title">请选择章节:</span>
      <select-input
          class="upload-select"
          id="chapter"
          tips="请选章节"
          :option="inputData.chapter.option.name"
          @option="changeOption"
          :drop-down-list="inputData.chapter.list"
        ></select-input>
    </div>
    <div class="upload">
      <span class="upload-title">请选择视频:</span>
      <input type="file" @change="getFile($event)">
    </div>
    <div class="upload-footer">
      <button class="btn upload-btn" @click="submit($event)">确定</button>
      <button class="btn upload-btn">取消</button>
    </div>
  </div>
</template>

<script>
  import SelectInput from "../utils/selectInput";
  import AWS from 'aws-sdk'
  import globalAxios from "axios";

  export default {
    name: "uploadVideo",
    data() {
      return {
        file: null,
        fileName: '',
        inputData: {
          chapter: {
            option: "",
            list: []
          }
        },
        videoName:"",
        videoIntro:""
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
        console.log(this.file.name)
        this.fileName = this.file.name
      },
      submit(event) {
        var token = window.localStorage.getItem("idToken");
        console.log(this.videoName,this.videoIntro,this.inputData.chapter.option.id)
        var uploadVideo={}
        uploadVideo.name=this.videoName
        uploadVideo.introduction=this.videoIntro
        uploadVideo.chapterId=this.inputData.chapter.option.id
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
        console.log(window.localStorage.getItem('user'))
        const reader = new FileReader();
        var content = reader.readAsArrayBuffer(this.file);
        var params = {
          ACL: 'public-read',
          Bucket: "cedsi",
          Body: formData.get('content'),
          Key: "" + this.fileName,
          ContentType: 'video/mp4',
          Metadata: {
            'uploader': window.localStorage.getItem('user')
          }
        };
        s3.putObject(params, function (err, data) {
          if (err) {
            console.log(err, err.stack);
          } else {
            console.log(data);
          }
        })
        globalAxios
            .post(
              "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/admin/course/" +
                this.courseId +
                "/video",{uploadVideo},
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token
                }
              }
            )
            .then(
              response => {
                //console.log(response);
                var chapterArr = [];
                var chapterData = [];
                chapterArr = response.data.data;
                for (var i = 0; i < chapterArr.length; i++) {
                  var chapter = {};
                  chapter.name = chapterArr[i].CP_NAME;
                  chapter.id = chapterArr[i].CP_ID
                  chapterData.push(chapter);
                }
                this.inputData.chapter.list=chapterData;
                //console.log(this.inputData.chapter.list);
              },
              error => {
                // this.$router.push({path:'/404'})
                console.log(error);
              }
            );
      },
    },
    created(){
      var token = window.localStorage.getItem("idToken");
      //console.log(this.$route.params.courseId)
      this.courseId=this.$route.params.courseId
      console.log(this.courseId)
      globalAxios
            .get(
              "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/admin/course/" +
                this.courseId +
                "/video",
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token
                }
              }
            )
            .then(
              response => {
                //console.log(response);
                var chapterArr = [];
                var chapterData = [];
                chapterArr = response.data.data;
                for (var i = 0; i < chapterArr.length; i++) {
                  var chapter = {};
                  chapter.name = chapterArr[i].CP_NAME;
                  chapter.id = chapterArr[i].CP_ID
                  chapterData.push(chapter);
                }
                this.inputData.chapter.list=chapterData;
                //console.log(this.inputData.chapter.list);
              },
              error => {
                // this.$router.push({path:'/404'})
                console.log(error);
              }
            );
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
.outside[data-v-d899aefc]{
  width: 300px !important;
  height: 40px !important;
  margin-left: 10px !important;
}
.inputBox[data-v-d899aefc]{
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