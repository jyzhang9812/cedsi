<template>
  <div id="add-activity">
    <el-form ref="form" :model="form" label-width="105px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="活动名称">
            <el-input v-model="form.activityName" placeholder="请输入活动名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="活动地点">
            <el-input v-model="form.activityAddress" placeholder="请输入活动地点"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="活动价格">
            <el-input v-model="form.activityPrice" placeholder="请输入活动价格"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="活动时间">
            <el-date-picker
              style="width: 250.45px;"
              v-model="form.startDate"
              type="datetime"
              placeholder="选择开始时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="表单类型">
            <el-select
              v-model="form.formType.option"
              placeholder="请选择表单类型"
              style="width: 250.45px;"
            >
              <el-option
                v-for="item in form.formType.list"
                :key="item.title"
                :label="item.title"
                :value="item.title"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否置顶">
            <el-switch v-model="form.isTop" active-text="置顶" inactive-text="不置顶"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="上传活动封面">
        <!-- <el-upload action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
          :on-remove="handleRemove" list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>-->
        <div class="upload-cover-btn">
          上传封面
          <input type="file" @change="getCoverFile($event)" style="opacity: 0" />
        </div>
      </el-form-item>
      <el-form-item label="预览" class="preview-height">
        <div class="upload-cover-img">
          <img class="cover-image" :src="form.coverImageDisplay" alt />
        </div>
      </el-form-item>
      <el-form-item label="上传内容图片">
        <div class="upload-cover-btn">
          上传图片
          <input type="file" @change="getActivityImg($event)" style="opacity: 0" />
        </div>
      </el-form-item>
      <el-form-item label="预览" class="preview-height">
        <div class="upload-cover-img">
          <img class="cover-image" :src="form.activityContentImageDisplay" alt />
        </div>
      </el-form-item>
      <el-form-item label="请选择视频">
        <div class="upload-cover-btn">
          上传视频
          <input type="file" @change="getVideoFile($event)" style="opacity: 0" />
        </div>
      </el-form-item>
      <el-form-item label="上传进度" class="preview-height">
        <el-progress
          :text-inside="true"
          :stroke-width="18"
          :percentage="form.progressWidth"
          status="success"
          style=" display: inline-block;
        vertical-align: middle;width: 500px;"
        ></el-progress>
      </el-form-item>
      <el-form-item label="文件名称">
        <el-input
          placeholder="暂未上传"
          style="width: 350px;"
          v-model="form.videoName"
          :disabled="true"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button class="upload-btn" type="primary" @click="submit">确定</el-button>
      <el-button class="upload-btn" type="primary" @click="cancle">取消</el-button>
    </div>
  </div>
</template>

<script>
import AWS from "aws-sdk";
import globalAxios from "axios";
import instance from "../../../../axios-auth.js";

export default {
  name: "addactivity",
  data() {
    return {
      form: {
        activityName: "",
        activityAddress: "",
        startDate: "",
        activityPrice: "",
        formType: {
          option: "",
          list: [
            {
              title: "大学生",
              data: [
                ["name", "姓名"],
                ["phone", "联系电话"],
                ["school", "学校"],
                ["grade", "年级"],
                ["major", "专业"],
                ["remark", "备注说明"]
              ]
            },
            {
              title: "中小学生",
              data: [
                ["name", "学生姓名"],
                ["phone", "家长电话"],
                ["school", "学校"],
                ["grade", "年级"],
                ["pName", "家长姓名"],
                ["remark", "备注说明"]
              ]
            },
            {
              title: "在职学校教师",
              data: [
                ["name", "姓名"],
                ["phone", "电话"],
                ["school", "学校"],
                ["subject", "学科"],
                ["remark", "备注说明"]
              ]
            },
            {
              title: "在职机构教师",
              data: [
                ["name", "姓名"],
                ["phone", "电话"],
                ["school", "学校"],
                ["subject", "学科"],
                ["remark", "备注说明"]
              ]
            }
          ]
        },
        isTop: false,
        coverImage: "",
        coverImageDisplay: "",
        coverType: "",
        activityContentImage: "",
        activityContentImageDisplay: "",
        activityContentImageType: "",
        progressWidth: 0,
        videoFile: "",
        videoName: "暂未上传",
        videoType: ""
      }
    };
  },
  methods: {
    repairZero(num) {
      if (num < 10) {
        num = "0" + num;
      }
      return num;
    },
    getCoverFile(event) {
      console.log(event);
      this.form.coverImage = event.target.files[0];
      console.log(this.form.coverImage);
      this.form.coverType = "." + this.form.coverImage.type.split("/")[1];
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(this.form.coverImage);
      reader.onload = function(e) {
        that.form.coverImageDisplay = this.result;
      };
    },
    getActivityImg(event) {
      this.form.activityContentImage = event.target.files[0];
      console.log(this.form.activityContentImage);
      this.form.activityContentImageType =
        "." + this.form.activityContentImage.type.split("/")[1];
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(this.form.activityContentImage);
      reader.onload = function(e) {
        that.form.activityContentImageDisplay = this.result;
      };
    },
    getVideoFile(event) {
      this.form.videoFile = event.target.files[0];
      console.log(this.form.videoFile);
      this.form.videoName = this.form.videoFile.name;
      this.form.videoType = this.form.videoFile.type.split("/")[1];
      this.form.videoSize = this.form.videoFile.size;
    },
    uploadTwoImages(config) {
      let missions = [];
      let rawId = config.id;
      config.id = `${rawId}1`;
      missions.push(this.uploadFileToBucket(config, this.form.coverImage));
      config.id = `${rawId}2`;
      missions.push(
        this.uploadFileToBucket(config, this.form.activityContentImage)
      );
      return Promise.all(missions);
    },
    uploadVideoFile(config, file) {
      AWS.config = new AWS.Config({
        accessKeyId: config.AccessKeyId,
        secretAccessKey: config.SecretAccessKey,
        sessionToken: config.SessionToken,
        region: "cn-northwest-1"
      });
      let that = this;
      let s3 = new AWS.S3();
      let rawId = config.id;
      config.id = `${rawId}3`;
      let params = {
        ACL: "public-read",
        Bucket: "cedsi",
        Body: file,
        Key: "activity/" + config.id + "." + file.type.split("/")[1],
        ContentType: file.type,
        Metadata: { uploader: window.localStorage.getItem("userId") }
      };
      return new Promise((resolve, reject) => {
        s3.putObject(params, (err, data) => {
          err ? reject(err) : resolve(data);
        }).on("httpUploadProgress", event => {
          let process = Number((event.loaded * 100) / event.total);
          that.form.progressWidth = parseInt(process);
        });
      });
    },
    submit() {
      let types = [this.form.coverType, this.form.activityContentImageType];
      let config = {};
      this.insertActivity(types)
        .then(res => {
          console.log(res);
          config = res.data.data;
          return this.uploadTwoImages(config);
        })
        .then(res => {
          console.log(res);
          if (this.form.videoFile) {
            return this.uploadVideoFile(config, this.form.videoFile);
          }
          return Promise.resolve("activity with no video!");
        })
        .then(res => {
          console.log(res);
          this.$message({ type: "success", message: "添加成功" });
          this.$router.replace({
            path: "/Admin/activityManagement/",
            query: { alert: "1" }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    uploadFileToBucket(config, file) {
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
        Metadata: { uploader: window.localStorage.getItem("userId") }
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
      let formType = this.form.formType;
      let formDetail = formType.list.find(
        item => (item.title = formType.option)
      );
      formDetail = formDetail || formType.list[0];
      let date =
        this.form.startDate.getFullYear() +
        "-" +
        this.repairZero(this.form.startDate.getMonth() + 1) +
        "-" +
        this.repairZero(this.form.startDate.getDate()) +
        " " +
        this.repairZero(this.form.startDate.getHours()) +
        ":" +
        this.repairZero(this.form.startDate.getMinutes()) +
        ":" +
        this.repairZero(this.form.startDate.getSeconds());
      let data = {
        activityStick: this.form.isTop,
        activityTime: date,
        activityPlace: this.form.activityAddress,
        activityTitle: this.form.activityName,
        activityPrice: this.form.activityPrice,
        coverType: types[0],
        imgType: types[1],
        videoType: this.form.videoType || "null",
        formDetail: formDetail
      };
      console.log("hhhhhhhhhh");
      console.log(data);
      return instance.post("/admin/activity", data, config);
    },
    cancle() {
      this.$router.replace({
        path: "/Admin/activityManagement/"
      });
      this.submitButtonIsAvailable;
    },
    submitButtonIsAvailable() {
      if (this.activityNameNormative) {
        return false;
      }
      if (this.activityPlaceIsNormative) {
        return false;
      }
      if (this.activityImageIsNormative) {
        return false;
      }
    },
    activityNameNormative() {
      if (this.activityName.length > 20) {
        return false;
      }
      return true;
    },
    activityPlaceIsNormative() {
      if (this.activityAddress.length > 50) {
        return false;
      }
      return true;
    },
    activityImageIsNormative() {
      if (this.coverImage && this.coverType) {
        return true;
      }
      return false;
    }
  },
  computed: {},
  mounted() {}
};
</script>

<style>
#add-activity {
  width: 98%;
  margin: 0 auto;
  padding-top: 30px;
}

#add-activity .upload-cover-btn {
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

#add-activity .preview-height {
  margin-top: -35px;
}

#add-activity .upload-cover-img {
  display: inline-block;
  border: 1px dashed #dcdfe6;
  width: 290px;
  height: 150px;
  border-radius: 5px;
  background-color: #f5f7fa;
}

#add-activity .cover-image {
  width: 100%;
  height: 100%;
}

#add-activity .btn-box {
  margin-top: 25px;
  width: 100%;
  text-align: center;
}

#add-activity .upload-btn:focus {
  outline: none;
  color: #fff;
}
</style>