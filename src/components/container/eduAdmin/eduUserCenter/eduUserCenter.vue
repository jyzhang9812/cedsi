<template>
  <el-form ref="form" :model="form" label-width="80px" v-loading="screenLoading" element-loading-text="正在保存，请耐心等待！">
    <el-form-item label="昵称">
      <el-input type="text" v-model="user.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="user.gender">
        <el-radio label="1">男</el-radio>
        <el-radio label="0">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="头像">
      <el-upload class="avatar-uploader" action="#" :http-request="loadUserAvatar" :show-file-list="false">
        <img v-if="user.avatar" :src="user.avatar" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input type="text" v-model="user.email" placeholder="请输入邮箱"></el-input>
    </el-form-item>
    <el-form-item label="固定电话">
      <el-input type="text" v-model="user.phone" placeholder="请输入固定电话"></el-input>
    </el-form-item>
    <div v-if="!needModifyPwd">
      <el-form-item>
        <el-link type="primary" :underline="false" @click="showModifyPwd">修改密码</el-link>
      </el-form-item>
    </div>
    <div v-else>
      <el-form-item label="旧密码" prop="pass">
        <el-input type="password" auto-complete="new-password" v-model="form.oldPass" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" auto-complete="new-password" v-model="form.newPass" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" auto-complete="new-password" v-model="form.checkPass" placeholder="请再次输入密码">
        </el-input>
      </el-form-item>
    </div>
    <el-form-item>
      <el-button type="primary" @click="saveUserInfo">保存信息</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import AWS from 'aws-sdk';
  import instance from '../../../../axios-auth.js';
  import crypto from 'crypto';

  export default {
    name: 'adminUserCenter',
    data() {
      return {
        form: {
          oldPass: "",
          newPass: "",
          checkPass: "",
          avatarFile: ""
        },
        screenLoading: false,
        needModifyPwd: false
      }
    },
    methods: {
      postImgToS3(config, file) {
        const that = this;
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
          Key: `user/avatar/${config.id.substring(0, 10)}.${file.type.split('/')[1]}`,
          ContentType: file.type,
          Metadata: { 'uploader': window.localStorage.getItem('user') }
        };
        s3.putObject(params, function (err, data) {
          console.log(err);
          console.log(data);
          that.screenLoading = false;
          if (data.ETag) {
            that.$message({ message: '用户信息保存成功', type: 'success' });
          } else {
            that.$message({ message: '用户信息保存失败', type: 'error' });
          }
        });
      },
      loadUserAvatar(event) {
        this.form.avatarFile = event.file;
        let reader = new FileReader();
        let that = this;
        reader.readAsDataURL(event.file);
        reader.onload = function () {
          that.user.avatar = this.result;
        }
      },
      saveUserInfo() {
        this.screenLoading = true;
        const file = this.form.avatarFile;
        const data = {
          nickName: this.user.username,
          gender: this.user.gender,
          email: this.user.email,
          phone: this.user.phone,
          type: file ? file.type.split('/')[1] : ""
        };
        let config = { headers: { Authorization: localStorage.getItem('idToken') } };
        console.log(data);
        this.modifyUserInfo(data, config);
        // 如果需要修改密码
        if (this.needModifyPwd) {
          // 先进行表单验证
          this.modifyUserPwd(config);
        }
      },
      showModifyPwd() {
        this.needModifyPwd = !this.needModifyPwd;
      },
      modifyUserInfo(data, config) {
        instance.put('/student/studentinfo', data, config)
          .then(res => {
            console.log({ "字段上传情况": res });
            const failToast = { message: '用户信息保存失败', type: 'error' };
            const successToast = { message: '用户信息保存成功', type: 'success' };
            this.screenLoading = false;
            if (this.form.avatarFile) {
              if (res.data.AccessKeyId) {
                this.postImgToS3(res.data, this.form.avatarFile);
              } else {
                this.$message(failToast);
              }
            } else {
              this.$message(res.data.status === "200" ? successToast : failToast);
            }
          })
          .catch(err => { console.log(err) });
      },
      modifyUserPwd(config) {
        const that = this;
        const password = {
          oldPassword: crypto.createHash('SHA256').update(this.form.oldPass).digest('hex'),
          newPassword: crypto.createHash('SHA256').update(this.form.newPass).digest('hex')
        };
        console.log(password);
        instance.post('/user/password', password, config)
          .then(res => {
            if (res.data.errorMessage === "密码错误") {
              this.$message({ message: '密码修改失败, 原密码错误!', type: 'error' });
            } else {
              this.$message({ message: '密码修改成功, 请重新登录!', type: 'success' });
              localStorage.clear();
              setTimeout(() => {
                that.$router.push({ path: "/signin" });
              }, 1000);
            }
          })
          .catch(err => { console.log(err) });
      }
    },
    created: function () {
      this.$store.commit('updateLoading', true);
      this.$store.dispatch('getUser');
    },
    computed: {
      user(state) {
        return this.$store.state.userInfo
      }
    }
  }

</script>

<style scoped>
  .el-form-item {
    width: 400px;
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
    border-color: #409EFF;
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