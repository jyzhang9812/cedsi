<template>
  <div id="sign-in">
    <el-col class="form-outside">
      <el-row class="space-line"></el-row>
      <el-row type="flex" justify="center">
        <div class="image-outside">
          <el-avatar :size="60" :src="image"></el-avatar>
        </div>
      </el-row>
      <el-row type="flex" justify="center" class="welcome">WELCOME</el-row>
      <el-row class="form-input" type="flex" justify="center">
        <input v-model="form.account" type="text" placeholder="用户名" autocomplete="off" />
      </el-row>
      <el-row class="form-input" type="flex" justify="center">
        <input v-model="form.password" type="password" placeholder="密码" autocomplete="new-password" />
      </el-row>
      <el-row type="flex" justify="center">
        <button class="confirm" @click="onSubmit">登录</button>
      </el-row>
    </el-col>
  </div>
</template>

<script>
import crypto from "crypto";
export default {
  data() {
    return {
      form: {
        account: "",
        password: ""
      },
      image: "https://cedsi.s3.cn-northwest-1.amazonaws.com.cn/signup-image.png"
    };
  },
  methods: {
    onSubmit() {
      if (this.checkLogin()) {
        let password = this.form.password;
        let account = this.form.account;
        let SHA256 = crypto.createHash("SHA256");
        password = SHA256.update(password).digest("hex");
        const formData = { password: password, username: account };
        this.$store.dispatch("login", formData).then(() => {
          let result = this.$store.getters.isAuthenticated;
          console.log({ 登录结果: result });
          if (!result) {
            this.$message({ type: "error", message: "账号或密码错误" });
          } else {
            this.$message({ type: "success", message: "欢迎回来" });
          }
        });
      }
    },
    checkLogin() {
      if (!this.form.account) {
        this.$message({ type: "error", message: "请输入用户名" });
        return false;
      }
      if (!this.form.password) {
        this.$message({ type: "error", message: "请输入密码" });
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
#sign-in {
  background-image: url("https://cedsi.s3.cn-northwest-1.amazonaws.com.cn/static/bg-01.jpg");
  height: 100%;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font: inherit;
}

#sign-in::before {
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

#sign-in .form-outside {
  width: 400px;
  height: 460px;
  border-radius: 10px;
  overflow: hidden;
  background: -webkit-linear-gradient(top, #7579ff, #b224ef);
  background: -o-linear-gradient(top, #7579ff, #b224ef);
  background: -moz-linear-gradient(top, #7579ff, #b224ef);
  background: linear-gradient(top, #7579ff, #b224ef);
}

#sign-in .image-outside {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

#sign-in .welcome {
  font-size: 22px;
  color: #fff;
  height: 45px;
  line-height: 45px;
}

#sign-in .space-line {
  height: 50px;
}

#sign-in .confirm {
  min-width: 120px;
  height: 50px;
  border-radius: 25px;
  font-size: 16px;
  font-family: Poppins-Medium;
  transition: all 0.4s;
  cursor: pointer;
}

#sign-in .confirm::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  background: #fff;
  top: 0;
  left: 0;
  opacity: 1;
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
}

#sign-in .confirm:hover {
  color: #fff;
  background: #9152f8;
  background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(#7579ff),
    to(#b224ef)
  );
  background: linear-gradient(bottom, #7579ff, #b224ef);
}

#sign-in .confirm:focus {
  outline: none;
}

#sign-in .confirm:hover:before {
  color: #fff;
  opacity: 0;
}

input {
  font-family: Poppins-Regular;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  line-height: 1.2;
  display: block;
  width: 250px;
  height: 45px;
  border: none;
  outline: none;
  background: transparent;
  border-bottom: 2px solid hsla(0, 0%, 100%, 0.24);
  margin-bottom: 30px;
  padding: 0 5px 0 28px;
}

input::-webkit-input-placeholder {
  color: #fff;
}

input::-moz-input-placeholder {
  color: #fff;
}

input::-ms-input-placeholder {
  color: #fff;
}
</style>