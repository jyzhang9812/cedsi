<template>
  <div class="personalcenter">
    <div class="personalcenterdetail">
      <div class="word">
        <span>个人中心</span>
      </div>
      <div class="personal">
        <h1>基本信息</h1>
        <div class="personalcontent">
          <div class="contentdetail">
            <form class="form" @submit.prevent="onSubmit">
              <div class="formdetail">
                <label class="formlabel" for="account">账号</label>
                <label>
                  <input class="input account disabledinput" type="text" name="account"
                         placeholder="account" disabled="disabled" v-model="account" id="account">
                </label>
              </div>
              <div class="formdetail">
                <label class="formlabel" for="name">姓名</label>
                <input class="input inputfocus name" type="text" name="name" id="name"
                       placeholder="请输入用户名" v-model="name">
              </div>
              <div class="formdetail">
                <label class="formlabel" for="role">角色</label>
                <input class="input role disabledinput" type="text" name="role" id="role"
                       placeholder="role" disabled="disabled" v-model="role">
              </div>
              <div class="formdetail">
                <label class="formlabel" for="headsculpture">头像</label>
                <img id="headimage" :src="headsculpture" class="image" alt="">
                <input class="input headsculpture" type="file" name="headsculpture" id="headsculpture"
                       accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event)">
              </div>
              <div class="formdetail">
                <label class="formlabel" for="email">邮箱</label>
                <input class="input inputfocus email" type="text" name="email" id="email"
                       placeholder="请输入邮箱" v-model="email">
              </div>
              <div class="formdetail">
                <label class="formlabel" for="telnumber">手机号码</label>
                <input class="input inputfocus telnumber" type="text" name="telnumber" id="telnumber"
                       placeholder="请输入手机号码" v-model="telnumber">
              </div>
              <div class="formdetail">
                <label class="formlabel remarklabel" for="remark">备注</label>
                <label>
                  <textarea rows="5" placeholder="请输入备注" class="remark" v-model="remark" id="remark"></textarea>
                </label>
              </div>
              <div class="formdetail">
                <button type="submit" class="buttonsave">
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'space',
    data() {
      return {
        account: '',
        name: '',
        role: '',
        email: '',
        telnumber: '',
        remark: '',
        headsculpture: this.$store.state.url + '/teacher/headsculpture.jpg',
      }
    },
    methods: {
      changeImage(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        var that = this;
        reader.readAsDataURL(file);
        reader.onload = function (e) {
          that.headsculpture = this.result
        }
      },
      onSubmit() {
        const formData = {
          account: this.account,
          name: this.name,
          role: this.role,
          email: this.email,
          telnumber: this.telnumber,
          remark: this.remark,
        };
        console.log(formData)
      }
    }
  }

</script>

<style scoped>

  * {
    box-sizing: border-box;
    border: 0;
    outline: 0;
    font-size:12px;
    font-family: Helvetica, Arial, sans-serif;
  }

  .personalcenterdetail {
    font-family: Helvetica, Arial, sans-serif;
    display: block;
    width: 100%;
    flex: 1;
  }

  .word span {
    margin-bottom: 5px;
    margin-left: 6px;
  }

  .personalcontent {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border: 1px solid #ebeef5;
    background-color: #fff;
    color: #303133;
    border-radius: 4px;
    margin: 15px 0;
  }

  .contentdetail {
    padding: 20px;
    margin-bottom: 12px;
  }

  .personal {
    width: 1000px;
    margin: 10px 10px;
  }

  .formdetail {
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  /* 清除浮动 */
  .formdetail::after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .formlabel {
    width: 80px;
    font-size: 12px;
    line-height: 15px;
    margin-left: 10px;
    text-align: right;
    margin-right: 20px;
    float: left;
  }

  .input {
    width: 500px;
    line-height: 15px;
    color: #000;
    padding: 5px 15px;
    border-radius: 5px;
    font-size: 12px;
    border: 1px solid #67c23a;
  }

  .disabledinput {
    border-color: #e4e7ed;
    background-color: #f5f7fa;
    color: #c0c4cc;
  }

  .inputfocus:focus {
    border-color: #f56c6c;
  }

  .image {
    width: 220px;
    height: 220px;
  }

  .headsculpture {
    width: 500px;
    margin-left: 110px;
    margin-top: 10px;
  }

  .remark {
    width: 500px;
    height: 186px;
    padding: 5px 15px;
    resize: vertical;
    min-height: 32px;
    border-radius: 5px;
    border: 1px solid #409eff;
  }

  .buttonsave {
    margin-left: 260px;
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    text-align: center;
  }
</style>
