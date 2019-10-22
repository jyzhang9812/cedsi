<!--
 * @Email: rumosky@163.com
 * @Author: rumosky
 * @Gitee: https://gitee.com/rumosky_admin
 * @Date: 2019-10-22 19:27:43
 * @Description: 管理员角色发布活动页面
 -->
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
      <date-picker
        class="activity-time"
        tips="选择开始时间"
        id="datePicker"
        :date="startDate"
        @changeDate="changeDate"
      ></date-picker>
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
        <img id="headimage" :src="coverImageDisplay" class="cover-image" />
      </div>
    </div>
    <div class="upload">
      <span class="upload-title">上传内容图片:</span>
      <div class="upload-cover-btn">
        上传图片
        <input type="file" @change="getActivityImg($event)" style="opacity: 0" />
      </div>
    </div>
    <div class="upload upload-height">
      <span class="upload-title">预览:</span>
      <div class="upload-cover-img">
        <img id="headimage" :src="activityContentImageDisplay" class="cover-image" />
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
      coverImageDisplay: "",
      coverType: "",
      activityContentImage: "",
      activityContentImageDisplay: "",
      activityContentImageType: "",
      activityAddress: ""
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
      this.coverImage = event.target.files[0];
      console.log(this.coverImage);
      this.coverType = "." + this.coverImage.type.split("/")[1];
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(this.coverImage);
      reader.onload = function(e) {
        that.coverImageDisplay = this.result;
      };
    },
    getActivityImg(event) {   
      this.activityContentImage = event.target.files[0];
      console.log(this.activityContentImage);
      this.activityContentImageType =
        "." + this.activityContentImage.type.split("/")[1];
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(this.activityContentImage);
      reader.onload = function(e) {
        that.activityContentImageDisplay = this.result;
      };
    },
    cancel() {
      this.$router.replace({
        path: "/Admin/activityManagement/"
      });
    },
    uploadTwoImages(config) {
      let missions = [];
      let rawId = config.id;
      config.id = `${rawId}1`;
      missions.push(this.uploadToBucket(config, this.coverImage));
      config.id = `${rawId}2`;
      missions.push(this.uploadToBucket(config, this.activityContentImage));
      return Promise.all(missions);
    },
    submit() {
      let types = [this.coverType, this.activityContentImageType];
      this.insertActivity(types)
        .then(res => {
          console.log(res);
          return this.uploadTwoImages(res.data.data);
        })
        .then(res => {
          console.log(res);
          this.$router.replace({ path: "/Admin/activityManagement/",query:{alert:"1"} });
        })
        .catch(err => {
          console.log(err);
        });
    },
    uploadToBucket(config, file) {
      AWS.config = new AWS.Config({
        accessKeyId: config.AccessKeyId,
        secretAccessKey: config.SecretAccessKey,
        sessionToken: config.SessionToken,
        region: "cn-northwest-1"
      });
      let s3 = new AWS.S3();
      let params = {
        ACL: "public-read",
        Bucket: "cedsi",
        Body: file,
        Key: "activity/" + config.id + "." + file.type.split("/")[1],
        ContentType: file.type,
        Metadata: {
          uploader: window.localStorage.getItem("user")
        }
      };
      return new Promise((resolve, reject) => {
        s3.putObject(params, (err, data) => {
          err ? reject(err) : resolve(data);
        });
      });
    },
    insertActivity(types) {
      let config = {
        headers: { Authorization: localStorage.getItem("idToken") }
      };
      let data = {
        activityTime: this.startDate,
        activityPlace: this.activityAddress,
        activityTitle: this.activityName,
        activityPrice: this.activityPrice,
        coverType: types[0],
        imgType: types[1]
      };
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
  mounted() {}
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