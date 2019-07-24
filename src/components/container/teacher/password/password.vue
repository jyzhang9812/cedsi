<template>
  <div class="body">
    <form action="">
      <div class="item">
        <p>账号：</p><input type="text" disabled="disabled" placeholder="account">
      </div>
      <div class="item">
        <p>旧密码：</p><input type="password" placeholder="请输入您的旧密码">
      </div>
      <div class="item">
        <p>新密码：</p><input type="password" placeholder="请输入您的新密码">
      </div>
      <div class="item">
        <p>新密码：</p><input type="password" placeholder="请再次确定您的新密码">
      </div>
      <div class="but">
        <button class="btn-my">保存</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: "password",
    data() {
      return {
        account: '',
        oldpassword: '',
        newpassword: '',
        newpasswordagain: '',
      }
    },
    methods: {
      onSubmit() {
        const formData = {
          account: this.account,
          oldpassword: this.oldpassword,
          newpassword: this.newpassword,
          newpasswordagain: this.newpasswordagain,
        }
        console.log(formData)
      }
    }
  }

</script>

<style scoped>
  .body {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 20px;
    margin-left: 10px;
  }

  .item {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 13px;
  }

  .item p {
    line-height: 32px;
    height: 32px;
    width: 60px;
  }

  .item input {
    width: 600px;
    display: block;
    height: 32px;
    padding: 6px 12px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }

  .but {
    margin-left: 310px;
  }

  .btn-my {
    height: 32px;
    border-radius: 4px;
    font-size: 13px;
    color: #ffffff;
    background-color: #409eff;
    border: 1px solid #409eff;
  }

</style>
