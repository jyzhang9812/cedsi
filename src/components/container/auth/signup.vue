<template>
  <div id="sign-up">
    <el-col :offset="9">
      <el-row class="tab-bar">
        <button :style="isOrg ? '' : bar " @click="changeAccountType">个人</button>
        <button :style="isOrg ? bar: '' " @click="changeAccountType">企业</button>
      </el-row>
      <el-row class="form-outside" :style="height">
        <el-row class="space-line"></el-row>
        <el-row type="flex" justify="center" class="welcome">{{ isOrg ? '个人账号':'企业账号'}}</el-row>
        <el-row class="form-input" type="flex" justify="center" v-if="!isOrg">
          <input v-model="form.number" type="text" placeholder="账号" autocomplete="off" />
        </el-row>
        <el-row class="form-input" type="flex" justify="center">
          <input v-model="form.account" type="text" placeholder="用户名" autocomplete="off" />
        </el-row>
        <el-row class="form-input" type="flex" justify="center">
          <input
            v-model="form.password"
            type="password"
            placeholder="密码"
            autocomplete="new-password"
          />
        </el-row>
        <el-row class="form-input" type="flex" justify="center">
          <input
            v-model="form.password"
            type="password"
            placeholder="确认密码"
            autocomplete="new-password"
          />
        </el-row>
        <el-row type="flex" justify="center">
          <button class="confirm" @click="onSubmit">确定</button>
        </el-row>
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
      image:
        "https://cedsi.s3.cn-northwest-1.amazonaws.com.cn/signup-image.png",
      isOrg: true,
      bar: "background: transparent; color: #337AB7;",
      height: "height: 420px;"
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
    },
    changeAccountType() {
      this.isOrg = !this.isOrg;
      let temp = this.isOrg ? 42 : 50;
      this.height = `height: ${temp}0px;`;
    }
  }
};
</script>

<style scoped>
#sign-up {
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

#sign-up::before {
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

#sign-up .form-outside {
  width: 400px;
  border-radius: 10px;
  overflow: hidden;
  background: -webkit-linear-gradient(top, #7579ff, #b224ef);
  background: -o-linear-gradient(top, #7579ff, #b224ef);
  background: -moz-linear-gradient(top, #7579ff, #b224ef);
  background: linear-gradient(top, #7579ff, #b224ef);
}

#sign-up .form-height1 {
  height: 420px;
}

#sign-up .form-height2 {
  height: 500px;
}

#sign-up .image-outside {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

#sign-up .welcome {
  font-size: 22px;
  color: #fff;
  height: 45px;
  line-height: 45px;
}

#sign-up .space-line {
  height: 50px;
}

#sign-up .confirm {
  min-width: 120px;
  height: 50px;
  border-radius: 25px;
  font-size: 16px;
  font-family: Poppins-Medium;
  transition: all 0.4s;
  cursor: pointer;
}

#sign-up .confirm::before {
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

#sign-up .confirm:hover {
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

#sign-up .confirm:focus {
  outline: none;
}

#sign-up .confirm:hover:before {
  color: #fff;
  opacity: 0;
}

#sign-up .tab-bar {
  height: 47px;
  position: relative;
  top: 8px;
  display: inline-flex;
}

#sign-up .tab-bar > button {
  cursor: pointer;
  height: 100%;
  width: 100px;
  background: #7579ff;
  border: none;
  color: #fff;
  font-size: 14px;
  border-radius: 5px 5px 0 0;
}

#sign-up .tab-bar > button:focus {
  outline: none;
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