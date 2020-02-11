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
      <el-row>
        <input v-model="form.account" type="text" placeholder="用户名" />
      </el-row>
      <el-row>
        <input v-model="form.password" type="password" placeholder="密码" />
      </el-row>
      <el-row>
        <el-button class="confirm">确定</el-button>
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
      var password = this.password;
      password = crypto
        .createHash("SHA256")
        .update(password)
        .digest("hex");
      const formData = {
        password: password,
        username: this.username
      };
      this.$store.dispatch("login", formData).then(() => {
        console.log("\\\\\\\\\\\\\\\\\\\\\\\\");
        this.error = !this.$store.getters.isAuthenticated;
      });
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

#sign-in input {
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

</style>