<template>
  <!-- 可参考 adminUserCenter 基本逻辑实现相同 -->
  <div id="personalcontent">
    <div class="contentdetail">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="昵称">
          <el-input type="text" size="small" v-model="user.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="user.gender">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="#"
            :http-request="loadUserAvatar"
            :show-file-list="false"
          >
            <img v-if="user.avatar" :src="user.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input type="text" size="small" v-model="user.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input type="text" size="small" v-model="user.phone" placeholder="请输入固定电话"></el-input>
        </el-form-item>
        <div v-if="!needPassword">
          <el-form-item>
            <el-link type="primary" :underline="false" @click="needPassword=!needPassword">修改密码</el-link>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="旧密码" prop="pass">
            <el-input
              type="password"
              size="small"
              auto-complete="new-password"
              v-model="form.oldPass"
              placeholder="请输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input
              type="password"
              size="small"
              auto-complete="new-password"
              v-model="form.newPass"
              placeholder="请输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              size="small"
              auto-complete="new-password"
              v-model="form.checkPass"
              placeholder="请再次输入密码"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" size="small">保存信息</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import AWS from "aws-sdk";
import instance from "../../../../../axios-auth.js";
import crypto from "crypto";

export default {
  name: "adminUserCenter",
  data() {
    return {
      newpassword: "",
      needPassword: false,
      password: "*********",
      form: {
        oldPass: "",
        newPass: "",
        checkPass: "",
        avatarFile: ""
      }
    };
  },
  methods: {
    updatePassword() {
      this.updatePW = false;
      this.password = "";
    },
    loadUserAvatar(event) {
      this.form.avatarFile = event.file;
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(event.file);
      reader.onload = function() {
        that.user.avatar = this.result;
      };
    },
    submitPassword() {
      var that = this;
      var password = {};
      password.oldPassword = crypto
        .createHash("SHA256")
        .update(this.password)
        .digest("hex");
      password.newPassword = crypto
        .createHash("SHA256")
        .update(this.newpassword)
        .digest("hex");
      console.log(password);
      instance
        .post("/user/password", password, {
          headers: {
            Authorization: localStorage.getItem("idToken"),
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.errorMessage == "密码错误") {
            that.$message.error({
              title: "个人中心",
              message: "修改失败！原密码错误"
            });
          } else {
            that.$message.success({ title: "个人中心", message: "修改成功" });
            localStorage.clear();
            that.$router.push({ path: "/signin" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFile(event) {
      this.file = event.target.files[0];
      console.log(this.file);
      this.fileName = this.file.name;
      var reader = new FileReader();
      var that = this;
      reader.readAsDataURL(this.file);
      reader.onload = function(e) {
        that.user.avatar = this.result;
      };
    },
    submit(event) {
      var that = this;
      let postImgToS3 = function(config, file) {
        AWS.config = new AWS.Config({
          accessKeyId: config.AccessKeyId,
          secretAccessKey: config.SecretAccessKey,
          sessionToken: config.SessionToken,
          region: "cn-northwest-1"
        });
        var s3 = new AWS.S3();
        let formData = new FormData();
        formData.append("content", file);
        const reader = new FileReader();
        var content = reader.readAsArrayBuffer(file);
        var params = {
          ACL: "public-read",
          Bucket: "cedsi",
          Body: formData.get("content"),
          Key: "user/avatar/" + config.id + "." + file.type.split("/")[1],
          ContentType: file.type,
          Metadata: { uploader: window.localStorage.getItem("user") }
        };
        s3.putObject(params, function(err, data) {
          if (err) {
            console.log(err, err.stack);
          } else {
            console.log(data);
            if (data.hasOwnProperty("ETag")) {
              that.$message.success({
                title: "个人中心",
                message: "头像修改成功"
              });
              // alert("上传成功!");
              that.$router.replace({ path: "/dashboard/class" });
            } else {
              that.$message.error({
                title: "个人中心",
                message: "头像保存失败"
              });
            }
          }
        });
      };
      this.postFormData(
        {
          nickName: this.user.username,
          email: this.user.email,
          gender: this.user.gender,
          mobile: this.user.mobile,
          phone: this.user.phone,
          time: this.user.time,
          type: this.file ? this.file.type.split("/")[1] : ""
        },
        postImgToS3
      );
    },
    postFormData(formData, postImgToS3) {
      let file = this.file;
      instance
        .put("/student/studentinfo", formData, {
          headers: {
            Authorization: localStorage.getItem("idToken"),
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          console.log(res);
          if (res.status == "200") {
            this.$message.success({ title: "个人中心", message: "修改成功" });
          } else {
            this.$message.error({ title: "个人中心", message: "修改失败" });
          }
          if (res.data.AccessKeyId) {
            postImgToS3(res.data, file);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created: function() {
    this.$store.commit("updateLoading", true);
    this.$store.dispatch("getUser");
    console.log(this.user);
  },
  computed: {
    user: function(state) {
      return this.$store.state.userInfo;
    }
  }
};
</script>

<style scoped>
#personalcontent {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  border-radius: 12px;
  width: 50%;
  margin: 15px auto;
  height: 525px;
  overflow-y: auto;
}

.contentdetail {
  padding: 20px;
  margin-bottom: 12px;
}

.el-form-item {
  width: 400px;
  margin-bottom: 15px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 120px;
  height: 120px;
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>