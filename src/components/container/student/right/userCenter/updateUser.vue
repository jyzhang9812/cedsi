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
          <el-upload class="avatar-uploader" action="#" :http-request="loadUserAvatar" :show-file-list="false">
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
            <el-input type="password" size="small" auto-complete="new-password" v-model="form.oldPass"
              placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input type="password" size="small" auto-complete="new-password" v-model="form.newPass"
              placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" size="small" auto-complete="new-password" v-model="form.checkPass"
              placeholder="请再次输入新密码"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" size="small" @click='submitPassword'>gai</el-button>
          <el-button type="primary" size="small" @click='submit'>保存信息</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import AWS from "aws-sdk";
  import mime from "mime";
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
          avatarFile: "",
          fileName: '',
        }
      };
    },
    methods: {
      // updatePassword() {
      //   this.updatePW = false;
      //   this.password = "";
      // },
      validate(data) {
      if (!data.oldPass) {
        this.$message({ type: "error", message: "请输入旧密码" });
        return false;
      }
      if (!data.newPass) {
        this.$message({ type: "error", message: "请输入新密码" });
        return false;
      }
      if (!data.checkPass) {
        this.$message({ type: "error", message: "请再次输入密码" });
        return false;
      }
      if (data.newPass !== data.checkPass) {
        this.$message({ type: "error", message: "两次密码不一致" });
        return false;
      }
      return true;
    },
      loadUserAvatar(event) {
        console.log(event)
        this.form.avatarFile = event.file;
        this.form.fileName = event.file.name;
        let reader = new FileReader();
        let that = this;
        reader.readAsDataURL(event.file);
        reader.onload = function () {
          that.user.avatar = this.result;
        };
      },
      submitPassword() {
        var that = this;
        var password = {};
        if(this.validate(this.form)){
          password.oldPassword = crypto
          .createHash("SHA256")
          .update(this.form.oldPass)
          .digest("hex");
        password.newPassword = crypto
          .createHash("SHA256")
          .update(this.form.newPass)
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
        }
      },
      submit(event) {
        console.log(this.form);
        if(this.needPassword){
          this.submitPassword();
        }
        let data = {
          nickName: this.user.username,
          email: this.user.email,
          gender: this.user.gender,
          mobile: this.user.mobile,
          phone: this.user.phone,
          time: this.user.time,
          type: this.form.avatarFile=="" ? "" : this.form.avatarFile.type.split("/")[1]
        };
        this.postFormData(data);
      },

      postImgToS3(config, file) {
        const that = this;
        AWS.config = new AWS.Config({
          accessKeyId: config.AccessKeyId,
          secretAccessKey: config.SecretAccessKey,
          sessionToken: config.SessionToken,
          region: 'cn-northwest-1'
        });
        let s3 = new AWS.S3();
        let formData = new FormData();
        formData.append("content", file);

        let params = {
          ACL: 'public-read',
          Bucket: "cedsi",
          Body: formData.get("content"),
          Key: "user/avatar/" + config.id + "." + file.type.split("/")[1],
          ContentType: file.type,
        };
        s3.putObject(params, function (err, data) {
          console.log(err);
          console.log(data);
          that.screenLoading = false;
          if (data.ETag) {
            that.$message({ message: '头像修改成功', type: 'success' });
          } else {
            that.$message({ message: '头像修改失败', type: 'error' });
          }
        });
      },

      postFormData(formData) {
        let file = this.form.avatarFile;
        instance
          .put("/student/studentinfo", formData, {
            headers: { Authorization: localStorage.getItem("idToken") }
          })
          .then(res => {
            console.log(res);
            this.postImgToS3(res.data, file);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    created: function () {
      this.$store.commit("updateLoading", true);
      this.$store.dispatch("getUser");
      console.log(this.user);
    },
    computed: {
      user: function (state) {
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