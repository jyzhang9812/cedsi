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
      <span class="upload-title">活动价格:</span>
      <input class="upload-input" placeholder="请输入活动价格" v-model="activityPrice" />
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
    <div class="upload">
      <span class="upload-title">上传内容图片:</span>
      <div class="upload-cover-btn">
        上传图片
        <input type="file" @change="getActivityImg($event)" style="opacity: 0" multiple="multiple" />
      </div>
    </div>
    <div class="upload upload-height">
      <span class="upload-title">预览:</span>
      <div class="upload-cover-img">
        <img id="headimage" :src="coverImages[0]" class="cover-image" alt v-show="coverImages[0]!==''" />
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
  import globalAxios from "axios";
  import instance from "../../../../axios-auth.js";

  export default {
    name: "addactivity",
    components: {
      SelectInput,
      DatePicker
    },
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
        activityPrice: "",
        coverImage: "",
        fileName: "",
        activityAddress: "",
        activityIntro: "",
        cover: [],
        coverImages: [],
        coverFile: []
      };
    },
    methods: {
      changeDate(value) {
        this.startDate = value;
      },
      changeOption(item, id) {
        Object.keys(this.inputData).forEach(res => {
          if (res === id) {
            this.inputData[res].option = item;
          }
        });
      },
      getCoverFile(event) {
        this.licenseFile = event.target.files[0];
        console.log(this.licenseFile);
        this.licenseFileName = this.licenseFile.name;
        this.licenseType = this.licenseFile.type.split("/")[1];
        this.licenseSize = this.licenseFile.size;
        var reader = new FileReader();
        var that = this;
        reader.readAsDataURL(this.licenseFile);
        reader.onload = function (e) {
          that.coverImage = this.result;
        };
      },
      getActivityImg(event) {
        for (var i = 0; i < event.target.files.length; i++) {
          let that = this;
          let file = event.target.files[i];
          let reader = new FileReader();
          // 调用reader.readAsDataURL()方法，把图片转成base64
          reader.readAsDataURL(file);
          // 监听reader对象的onload事件，当图片加载完成时，把base64编码賦值给预览图片
          reader.onload = function () {
            file.src = this.result;
            // console.log(this); 这里的this是FileReader对象
            // console.log(file)
            // 再把file对象添加到img数组
            //console.log(file.src);
            that.coverImages.push(file.src);
          };
        }
      },
      cancel() {
        this.$router.replace({
          path: "/Admin/activityManagement/"
        });
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
          this.$router.replace({ path: "/Admin/activityManagement/" });
          $(window).scrollTop(0);
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
          Key: "adminActivity/" + config.id + "." + file.type.split('/')[1],
          ContentType: file.type,
          Metadata: {
            'uploader': window.localStorage.getItem('user')
          }
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
          "ACTIVITY_TIME": this.startDate,
          "ACTIVITY_PLACE": this.activityAddress,
          "ACTIVITY_TITLE": this.activityName,
          "ACTIVITY_PRICE": this.activityPrice,
          "COVER_TYPE": types[0],
          "IMG_TYPE": types[1],
        }
        console.log(data);
        return instance.post("/admin/activity", data, config);
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
