<template>
  <div id="add-activity">
    <div class="upload">
      <span class="upload-title">活动名称:</span>
      <input class="upload-input" placeholder="请输入活动名称" v-model="activityName" />
    </div>
    <div class="upload">
      <span class="upload-title">活动地点:</span>
      <input class="upload-input" placeholder="请输入活动地点" v-model="activityAddress" />
    </div>
    <div class="upload">
      <span class="upload-title">活动时间:</span>
      <date-picker class="activity-time" tips="选择开始时间" id="datePicker" :date="startDate" @changeDate="changeDate">
      </date-picker>
    </div>
    <div class="upload">
      <span class="upload-title">活动负责人:</span>
      <select-input class="upload-select" id="activity" tips="请选择活动负责人" :option="inputData.activity.option.name"
        @option="changeOption" :drop-down-list="inputData.activity.list"></select-input>
    </div>
    <div class="upload">
      <span class="upload-title">上传活动封面:</span>
      <div class="upload-cover-btn">
        上传文件
        <input type="file" @change="getCoverFile($event)" style="opacity: 0" />
      </div>
    </div>
    <div class="upload upload-height">
      <span class="upload-title">预览:</span>
      <div class="upload-cover-img">
        <img id="headimage" :src="coverImage" class="cover-image" alt v-show="coverImage!==''" />
      </div>
    </div>
    <div class="upload upload-height2">
      <span class="upload-title" style="display:block">活动描述:</span>
      <div class="item">
        <div ref="editor" class="editor"></div>
      </div>
    </div>
    <div class="upload">
      <span class="upload-title">上传活动图片:</span>
      <div class="upload-cover-btn upload-width">
        上传图片 (最多上传三张)
        <input type="file" @change="getActivityImg($event)" style="opacity: 0" multiple="multiple" />
      </div>
    </div>
    <div class="upload upload-height">
      <span class="upload-title">预览:</span>
      <div class="upload-cover-img">
        <img id="headimage1" :src="coverImages[0]" class="cover-image" alt v-show="coverImages[0]" />
      </div>
      <div class="upload-cover-img">
        <img id="headimage2" :src="coverImages[1]" class="cover-image" alt v-show="coverImages[1]" />
      </div>
      <div class="upload-cover-img">
        <img id="headimage3" :src="coverImages[2]" class="cover-image" alt v-show="coverImages[2]" />
      </div>
    </div>
    <div class="upload-footer">
      <button class="btn upload-btn" @click="submit">确定</button>
      <button class="btn upload-btn" @click="cancel">取消</button>
    </div>
  </div>
</template>

<script>
  import DatePicker from "../utils/datePicker";
  import SelectInput from "../../Admin/utils/selectInput";
  import AWS from "aws-sdk";
  import instance from "../../../../axios-auth.js";
  import E from "wangeditor";

  export default {
    name: "addactivity",
    components: { SelectInput, DatePicker },
    data() {
      return {
        startDate: "",
        inputData: {
          activity: {
            option: {},
            list: []
          }
        },
        activityName: "",
        coverImage: "",
        activityAddress: "",
        coverImages: [],
        coverFiles: [],
        licenseFile: {},
      };
    },
    methods: {
      changeDate(value) { this.startDate = value },
      changeOption(item, id) {
        this.inputData[id].option = item;
      },
      getCoverFile(event) {
        this.licenseFile = event.target.files[0];
        console.log(this.licenseFile);
        let reader = new FileReader();
        let that = this;
        reader.readAsDataURL(this.licenseFile);
        reader.onload = function (e) {
          that.coverImage = this.result;
        };
      },
      getActivityImg(event) {
        let that = this;
        this.coverFiles.splice(0);
        this.coverImages.splice(0);
        for (let i = 0; i < event.target.files.length; i++) {
          let reader = new FileReader();
          reader.onload = function () {
            that.coverImages.push(this.result);
          };
          let file = event.target.files[i];
          reader.readAsDataURL(file);
          this.coverFiles.push(file);
        }
      },
      uploadFourImages(config) {
        let missions = [];
        let files = [this.licenseFile].concat(this.coverFiles);
        let rawId = config.id;
        for (let i = 1; i < 4; i += 1) {
          config.id = `${rawId}${i}`;
          missions.push(this.uploadToBucket(config, files[i - 1]));
        }
        return Promise.all(missions);
      },
      submit() {
        let types = [this.licenseFile.type.split('/')[1] || 'null'];
        for (let i = 0; i < 3; i += 1) {
          let file = this.coverFiles[i];
          types.push(file ? `.${file.type.split('/')[1]}` : 'null');
        }
        this.insertActivity(types)
          .then(res => {
            console.log(res);
            return this.uploadFourImages(res.data.data);
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })
      },
      cancel() {
        this.$router.replace({ path: "/eduAdmin/activity/" });
      },
      uploadToBucket(config, file) {
        AWS.config = new AWS.Config({
          accessKeyId: config.AccessKeyId,
          secretAccessKey: config.SecretAccessKey,
          sessionToken: config.SessionToken,
          region: 'cn-northwest-1'
        });
        let s3 = new AWS.S3();
        let params = {
          ACL: 'public-read',
          Bucket: "cedsi",
          Body: file,
          Key: "eduActivity/" + config.id + "." + file.type.split('/')[1],
          ContentType: file.type,
          Metadata: { 'uploader': window.localStorage.getItem('user') }
        };
        return new Promise((resolve, reject) => {
          s3.putObject(params, (err, data) => {
            err ? reject(err) : resolve(data);
          });
        });
      },
      insertActivity(types) {
        let config = { headers: { Authorization: localStorage.getItem('idToken') } };
        let data = {
          "CONTENT": this.editor.txt.text(),
          "ACTIVITY_TIME": this.startDate,
          "ACTIVITY_PLACE": this.activityAddress,
          "ACTIVITY_NAME": this.activityName,
          "COVER_TYPE": types[0],
          "IMG1_TYPE": types[1],
          "IMG2_TYPE": types[2],
          "IMG3_TYPE": types[3],
          "PRINCIPAL_ID": this.inputData.activity.option.id
        }
        console.log(data);
        return instance.post("/eduadmin/activity", data, config);
      },
      getPrincipalTeachers() {
        let config = { headers: { Authorization: localStorage.getItem('idToken') } };
        return instance.get("/eduadmin/activity/teacher", config)
          .then(res => {
            if (res.data.length) {
              this.inputData.activity.list = res.data.map(item => {
                return { name: item.TEACHER_NAME, id: item.TEACHER_ID }
              });
            }
          })
          .catch(err => { console.log(err) });
      }
    },
    computed: {
      currentPrincipal() {
        let name = this.inputData.activity.option;
        return this.inputData.activity.list.find(item => {
          console.log(item.name);
          console.log(name);
          return item.name === name;
        });
      }
    },
    mounted() {
      this.editor = new E(this.$refs.editor);
      let editor = this.editor;
      editor.customConfig.uploadImgShowBase64 = true;
      editor.customConfig.onchange = html => {
        this.editorContent = html;
      };
      editor.customConfig.menus = [
        "head", "bold", "fontSize", "fontName",
        "italic", "underline", "strikeThrough", "foreColor",
        "backColor", "link", "list", "justify",
        "quote", "emoticon", "image", "table",
        "video", "code", "undo", "redo"
      ];
      editor.create();
      editor.txt.html("<p></p>");
      this.getPrincipalTeachers();
    }
  };
</script>

<style>
  #add-activity {
    width: 98%;
    margin: 0 auto;
    padding-top: 30px;
  }

  #add-activity .upload {
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
  }

  #add-activity .upload-title {
    color: #606266;
    display: block;
    text-align: right;
    width: 100px;
    height: 40px;
    float: left;
    line-height: 40px;
  }

  #add-activity .upload-input {
    width: 300px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #409eff;
    margin-left: 10px;
    padding-left: 10px;
  }

  #add-activity .upload-input:hover {
    border: 1px solid #66b1ff;
  }

  #add-activity .upload-input:focus {
    outline: none;
  }

  #add-activity .activity-time {
    margin-left: 10px !important;
    height: 40px !important;
    width: 300px !important;
  }

  #add-activity #datePicker {
    width: 200px !important;
  }

  #add-activity .upload-textarea {
    border: 1px solid #409eff;
    border-radius: 5px;
    margin-left: 10px;
    padding: 10px;
  }

  #add-activity .upload-height {
    height: 190px;
  }

  #add-activity .upload-textarea:hover {
    border: 1px solid #66b1ff;
  }

  #add-activity .upload-textarea:focus {
    outline: none;
  }

  #add-activity .outside {
    width: 300px !important;
    height: 40px !important;
    margin-left: 10px !important;
  }

  #add-activity .inputBox,
  #add-activity .inputbox {
    height: 35px !important;
    font-size: 14px !important;
    width: 230px !important;
  }

  #add-activity .dropdown-menu {
    left: 100px !important;
  }

  #add-activity .upload-footer {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }

  #add-activity .upload-btn {
    background-color: #409eff;
    color: #fff;
    margin-left: 10px;
  }

  #add-activity .upload-btn:hover {
    color: #fff;
  }

  #add-activity .upload-btn:focus {
    outline: none;
    color: #fff;
  }

  /**/
  #add-activity .address-input select {
    margin-left: 10px;
    font-size: 14px;
  }

  #add-activity .upload-cover-btn {
    margin-left: 10px;
    width: 80px;
    height: 35px;
    display: inline-block;
    background-color: #409eff;
    color: #fff;
    border-radius: 5px;
    line-height: 35px;
    text-align: center;
  }

  #add-activity input[type="file"] {
    width: 80px;
    height: 35px;
    position: relative;
    top: -35px;
  }

  #add-activity .upload-cover-img {
    display: inline-block;
    border: 1px dashed #dcdfe6;
    width: 290px;
    height: 150px;
    margin-left: 10px;
    border-radius: 5px;
    background-color: #f5f7fa;
  }

  #add-activity .cover-image {
    width: 100%;
    height: 100%;
  }

  #add-activity .upload-height {
    height: 190px;
  }

  #add-activity .editor {
    width: 800px;
    position: relative;
  }

  #add-activity .w-e-toolbar {
    position: relative;
    left: 10px;
  }

  #add-activity .w-e-text-container {
    position: relative;
    left: 110px;
    width: 700px;
  }

  #add-activity .w-e-text {
    position: relative;
    top: -10px;
    background-color: #fff;
  }

  #add-activity .upload-height2 {
    height: 350px;
  }

  #add-activity .upload-width {
    width: 200px;
  }
</style>