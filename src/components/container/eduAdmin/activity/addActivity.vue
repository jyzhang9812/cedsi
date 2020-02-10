<!--
 * @Email: rumosky@163.com
 * @Author: rumosky
 * @Github: https://github.com/rumosky
 * @Date: 2019-09-14 21:50:53
 * @Description: 教务角色发布活动页面
 -->
<template>
  <div id="add-activity">
    <el-form :model="form"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="50">
        <el-col :span="8">
          <el-form-item label="活动名称" required>
            <el-input v-model="form.activityName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="活动地点" required>
            <el-input v-model="form.activityAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="活动时间" required>
        <el-col :span="5">
          <el-form-item>
            <el-date-picker type="date" placeholder="选择日期" v-model="form.activityDate" style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-col :span="8">
        <el-form-item label="活动价格" required>
          <el-input v-model="form.activityPrice"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
      <el-form-item label="活动封面" required>
        <el-upload class="avatar-uploader" action="#" :show-file-list="false">
          <img v-if="form.coverImageUrl" :src="form.coverImageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="活动内容">
        <el-upload action="#" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="activityContent">
          <img width="100%" :src="form.contentImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <!-- <div class="upload">
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
        <img id="headimage" :src="coverImageDisplay" class="cover-image" alt />
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
        <img id="headimage" :src="activityContentImageDisplay" class="cover-image" alt />
      </div>
    </div>
    <div class="upload-footer">
      <button class="btn upload-btn" @click="submit">确定</button>
      <button class="btn upload-btn" @click="cancel">取消</button>
    </div>
  </div> -->
  </div>
</template>

<script>
  import AWS from "aws-sdk";
  import instance from "../../../../axios-auth.js";
  import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";

  export default {
    name: "addactivity",
    data() {
      return {
        form: {
          activityName: '',
          activityPlace: '',
          activityTime: '',
          activityPrice:'',
          activityDate: '',
          coverImageUrl:'',
          contentImageUrl:''
        },
        activityContent: false,
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.form.contentImageUrl = file.url;
        this.activityContent = true;
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
            this.$toast.success({ title: "新增活动", message: "操作成功" });
            this.$router.replace({
              path: "/eduAdmin/activity/",
              query: { alert: "1" }
            });
          })
          .catch(err => {
            console.log(err);
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
        return instance.post("/eduadmin/activity", data, config);
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
      let obj = JSON.parse(decodeURIComponent(this.$router.query.classId));
      if(obj !=null){
        this.form = JSON.parse(JSON.stringify(obj))
      }
    }
  };
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<!-- <style>
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

  #add-activity .upload img {
    width: 18px;
    height: 18px;
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
    line-height: 40px;
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
    text-align: inherit !important;
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
</style> -->