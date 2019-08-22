<template>
  <div id="signin" class="bcg"
    :style="{backgroundImage:'url('+require('../../../../static/images/auth/bg-01.jpg')+')'}">
    <div class="signin-form">
      <span class="login100-form-logo">
        <i class="zmdi zmdi-landscape"></i>
      </span>

      <span class="login100-form-title p-b-34 p-t-27">
        welcome
      </span>
      <form @submit.prevent="onSubmit">
        <div class="wrap-input100 validate-input" data-validate="Enter username">
          <input type="username" id="username" v-model="username" class="input100" placeholder="用户名">
          <span class="focus-input100" data-placeholder=""></span>
        </div>
        <div class="wrap-input100 validate-input" data-validate="Enter password">
          <input type="password" id="password" v-model="password" class="input100" placeholder="密码">
          <span class="focus-input100" data-placeholder=""></span>
        </div>

        <!-- <div class="contact100-form-checkbox">
          <input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
          <label class="label-checkbox100" for="ckb1">
            Remember me
          </label>
        </div> -->
        <div class="text-center p-t-90" v-show='error'>
          <p style="color: #f87c56">
            用户名或密码错误 请重试
          </p>
        </div>
        <div class="container-login100-form-btn">
          <button type="submit" class="login100-form-btn">登录</button>
        </div>
        <div class="text-center p-t-90">
          <a class="txt1" href="#">
            忘记密码？
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        username: '',
        error: 0,
      }
    },
    methods: {
      onSubmit() {
        const formData = {
          password: this.password,
          username: this.username
        }
        this.$store.dispatch('login', formData).then(() => {
          console.log('+++++++++++++++++++')
          this.error = this.$store.getters.isAuthenticated;
        })
      }
    },
  }
</script>

<style scoped>
  #signin {
    min-height: 100%;
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

  .signin-form {
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

  .input100:focus+.focus-input100::after {
    top: -22px;
    font-size: 18px;
  }

  .input100:focus+.focus-input100::before {
    width: 100%;
  }

  .has-val.input100+.focus-input100::after {
    top: -22px;
    font-size: 18px;
  }

  .has-val.input100+.focus-input100::before {
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

  .input-checkbox100:checked+.label-checkbox100::before {
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