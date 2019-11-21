<template>
  <div id="signup" class="bcg" :style="{backgroundImage:'url('+imagesurl+')'}">
    <div style="width: 400px;">
      <ul class="nav nav-pills" role="tablist">
        <li :key="index" :class="index==0?'active':''" v-for="(role,index) in roleList">
          <a class="nav-link" role="tab" data-toggle="pill" :href="'#'+ index">{{role.name}}</a>
        </li>
      </ul>
    </div>

    <!-- Tab panes -->
    <div class="tab-content">
      <div
        :id="index"
        :class="index==0?'tab-pane fade in active':'tab-pane fade in'"
        :key="index"
        v-for="(role,index) in roleList"
      >
        <div class="signup-form">
          <span class="login100-form-title p-b-34 p-t-27">{{role.name}}账号</span>
          <form @submit.prevent="onSubmit">
            <div class="wrap-input100 validate-input" v-show="index!=0">
              <input type="text" id="account" v-model="account" class="input100" placeholder="账号" />
              <span class="focus-input100" data-placeholder></span>
            </div>
            <div class="text-center p-t-90" v-if="submit && !checkaccount()" v-show="index!=0">
              <p style="color: #f87c56">企业账号不能为空</p>
            </div>
            <div class="wrap-input100 validate-input">
              <input
                type="text"
                id="username"
                v-model="username"
                class="input100"
                placeholder="用户名"
                maxlength=12
                @focus="usernameFocus"
                @blur="usernameBlur"
              />
              <span class="tip">{{ tip.tip1 }}</span>
              <span class="focus-input100" data-placeholder></span>
            </div>
            <div class="text-center p-t-90" v-if="submit && !checkusr()">
              <p style="color: #f87c56">用户名输入不规范</p>
            </div>
            <div class="wrap-input100 validate-input">
              <input
                type="password"
                id="password"
                v-model="password"
                class="input100"
                placeholder="密码"
                maxlength=12
                @focus="passwordFocus"
                @blur="passwordBlur"
              />
              <span class="tip">{{ tip.tip2 }}</span>
              <span class="focus-input100" data-placeholder></span>
            </div>
            <div class="text-center p-t-90" v-if="submit && !checkpwd()">
              <p style="color: #f87c56">密码少于六位或超过12位</p>
            </div>
            <div class="wrap-input100 validate-input">
              <input
                type="password"
                id="confirmPassword"
                v-model="confirmPassword"
                class="input100"
                placeholder="确认密码"
              />
              <span class="focus-input100" data-placeholder></span>
            </div>
            <div class="text-center p-t-90" v-if="submit && !onConfirm()">
              <p style="color: #f87c56">确认密码与原密码不符合，请重试</p>
            </div>
            <div class="container-login100-form-btn">
              <button type="submit" class="login100-form-btn">确定</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
// import axios from '../../axios-auth';
import crypto from "crypto";
export default {
  data() {
    return {
      email: "",
      age: null,
      password: "",
      account: "",
      confirmPassword: "",
      role: "1",
      username: "",
      tip: {
        tip1: "",
        tip2: "",
      },
      submit: 0,
      code: "",
      roleList: [{ name: "个人" }, { name: "企业" }]
    };
  },
  watch: {
    username: function() {
      this.username = this.username.replace(
        /[`~!@$%^&()\-+=<>?:"{}|,./;'#*·~！@￥%……&（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
        ""
      );
      this.username = this.username.replace(/[^_A-Za-z0-9\u4e00-\u9fa5]/g,'');
      console.log(this.tip.tip1.length);
      if (this.username.length >= 6 && this.username.length <= 12) {
        this.tip.tip1 = "";
        this.username = this.username.substring(0,12);
        console.log(this.username);
      }
    },
    password: function() {
      this.password = this.password.replace(
        /[`~!@$%^&()\-+=<>?:"{}|,./;'#*·~！@￥%……&（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
        ""
      );
      this.password = this.password.replace(/[\W]/g, "");
      console.log(this.password);
      if (this.password.length >= 6 && this.password.length <= 12) {
        this.tip.tip2 = "";
      }
    }
  },
  methods: {
    onSubmit() {
      this.submit = 1;
      var password = this.password;
      password = crypto
        .createHash("SHA256")
        .update(password)
        .digest("hex");
      const formData = {
        account: this.account,
        username: this.username,
        password: password,
        confirmPassword: this.confirmPassword,
        role: this.role
      };
      console.log(formData);
      if (this.checkusr() && this.checkpwd() && this.onConfirm()) {
        this.$store.dispatch("signup", formData);
      } else {
        console.log("aaa");
      }
    },
    checkNull(arr) {
      if (arr == "") {
        return 0;
      } else return 1;
    },
    checkNum(arr) {
      if (arr.length < 6 || arr.length > 12) {
        return 0;
      } else return 1;
    },
    usernameFocus(){
      this.tip.tip1 = "请输入6~12位数字和大小写字母";
    },
    usernameBlur(){
      this.tip.tip1 = "";
    },
    checkusr() {
      return this.checkNull(this.username) && this.checkNum(this.username);
    },
    checkaccount() {
      return this.checkNull(this.account);
    },
    passwordFocus(){
      this.tip.tip2 = "请输入6~12位数字、大小写字母和字符";
    },
    passwordBlur(){
      this.tip.tip2 = "";
    },
    checkpwd() {
      return this.checkNull(this.password) && this.checkNum(this.password);
    },
    onConfirm() {
      if (this.password == this.confirmPassword) {
        return 1;
      } else return 0;
    }
  },
  created() {
    this.imagesurl =
      "https://cedsi.s3.cn-northwest-1.amazonaws.com.cn/static/bg-01.jpg";
  }
};
</script>

<style scoped>
#signup {
  min-height: 600px;
  flex-direction: column;
}

.nav-pills {
  border-radius: 12px;
  margin-bottom: -10px;
}

.nav-pills > li {
  width: 100px;
  float: left;
  margin-bottom: -10px;
}

.nav-pills > li.active > a,
.nav-pills > li.active > a:focus,
.nav-pills > li.active > a:hover {
  color: #fff;
  cursor: default;
  background-color: #7579ff;
  border: none;
}
.nav > li > a:focus,
.nav > li > a:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
.nav-pills > li > a {
  line-height: 1.4;
  border-radius: 4px 4px 0 0;
}

.tab-content {
  border: 10px;
}

.bcg {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  z-index: 1;
}

.bcg::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
}

.signup-form {
  width: 400px;
  border-radius: 10px;
  overflow: hidden;
  padding: 55px 55px 37px 55px;

  /* background: #9152f8; */
  background: -webkit-linear-gradient(top, #7579ff, #b224ef);
  background: -o-linear-gradient(top, #7579ff, #b224ef);
  background: -moz-linear-gradient(top, #7579ff, #b224ef);
  background: linear-gradient(top, #7579ff, #b224ef);
}

/*---------------------------------------------*/
input {
  outline: none;
  border: none;
}

.tip {
  color: #f87c56;
}

textarea {
  outline: none;
  border: none;
}

textarea:focus,
input:focus {
  border-color: transparent !important;
}

input:focus::-webkit-input-placeholder {
  color: transparent;
}

input:focus:-moz-placeholder {
  color: transparent;
}

input:focus::-moz-placeholder {
  color: transparent;
}

input:focus:-ms-input-placeholder {
  color: transparent;
}

textarea:focus::-webkit-input-placeholder {
  color: transparent;
}

textarea:focus:-moz-placeholder {
  color: transparent;
}

textarea:focus::-moz-placeholder {
  color: transparent;
}

textarea:focus:-ms-input-placeholder {
  color: transparent;
}

input::-webkit-input-placeholder {
  color: #fff;
}

input:-moz-placeholder {
  color: #fff;
}

input::-moz-placeholder {
  color: #fff;
}

input:-ms-input-placeholder {
  color: #fff;
}

textarea::-webkit-input-placeholder {
  color: #fff;
}

textarea:-moz-placeholder {
  color: #fff;
}

textarea::-moz-placeholder {
  color: #fff;
}

textarea:-ms-input-placeholder {
  color: #fff;
}

label {
  margin: 0;
  display: block;
}

/*------------------------------------------------------------------
  [ Form ]*/

.login100-form {
  width: 100%;
}

.login100-form-logo {
  font-size: 60px;
  color: #333333;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #fff;
  margin: 0 auto;
}

.login100-form-title {
  font-family: Poppins-Medium;
  font-size: 22px;
  color: #fff;
  line-height: 2;
  text-align: center;
  text-transform: uppercase;
  display: block;
}

/*------------------------------------------------------------------
  [ Input ]*/

.wrap-input100 {
  width: 100%;
  position: relative;
  border-bottom: 2px solid rgba(255, 255, 255, 0.24);
  margin-bottom: 30px;
}

.input100 {
  font-family: Poppins-Regular;
  font-size: 16px;
  color: #fff;
  line-height: 1.2;

  display: block;
  width: 100%;
  height: 45px;
  background: transparent;
  padding: 0 5px 0 38px;
}

/*---------------------------------------------*/
.focus-input100 {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.focus-input100::before {
  content: "";
  display: block;
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;

  background: #fff;
}

.focus-input100::after {
  font-family: Material-Design-Iconic-Font;
  font-size: 22px;
  color: #fff;

  content: attr(data-placeholder);
  display: block;
  width: 100%;
  position: absolute;
  top: 6px;
  left: 0px;
  padding-left: 5px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.input100:focus {
  padding-left: 5px;
}

.input100:focus + .focus-input100::after {
  top: -22px;
  font-size: 18px;
}

.input100:focus + .focus-input100::before {
  width: 100%;
}

.has-val.input100 + .focus-input100::after {
  top: -22px;
  font-size: 18px;
}

.has-val.input100 + .focus-input100::before {
  width: 100%;
}

.has-val.input100 {
  padding-left: 5px;
}

/*[ Button ]*/
.container-login100-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.login100-form-btn {
  font-family: Poppins-Medium;
  font-size: 16px;
  color: #555555;
  line-height: 1.2;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  min-width: 120px;
  height: 50px;
  border-radius: 25px;

  background: #9152f8;
  background: -webkit-linear-gradient(bottom, #7579ff, #b224ef);
  background: -o-linear-gradient(bottom, #7579ff, #b224ef);
  background: -moz-linear-gradient(bottom, #7579ff, #b224ef);
  background: linear-gradient(bottom, #7579ff, #b224ef);
  position: relative;
  z-index: 1;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.login100-form-btn::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  background-color: #fff;
  top: 0;
  left: 0;
  opacity: 1;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.login100-form-btn:hover {
  color: #fff;
}

.login100-form-btn:hover:before {
  opacity: 0;
}

/*==================================================================
  [ Restyle Checkbox ]*/

.contact100-form-checkbox {
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 35px;
}

.input-checkbox100 {
  display: none;
}

.label-checkbox100 {
  font-family: Poppins-Regular;
  font-size: 13px;
  color: #fff;
  line-height: 1.2;

  display: block;
  position: relative;
  padding-left: 26px;
  cursor: pointer;
}

.label-checkbox100::before {
  content: "\f26b";
  font-family: Material-Design-Iconic-Font;
  font-size: 13px;
  color: transparent;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background: #fff;
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
}

.input-checkbox100:checked + .label-checkbox100::before {
  color: #555555;
}

/*//////////////////////////////////////////////////////////////////
  [ Utility ]*/
.txt1 {
  font-family: Poppins-Regular;
  font-size: 13px;
  color: #e5e5e5;
  line-height: 1.5;
}
</style>