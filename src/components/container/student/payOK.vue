<template>
  <div id="pay-OK">
    <div class="pay-header">
      <div class="wechat-pay">
        <img :src="wechatImage" class="pay-img" />
      </div>
      <span class="pay-mes">支付结果</span>
    </div>
    <div class="pay-content">
      <div class="pay-face">
        <img :src="faceImage" />
        <h4>
          支付成功，前往
          <a class="myorder" @click="goMyOrder()">我的订单</a>查看
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wechatImage: this.$store.state.url + "payment/WePayLogo.png",
      faceImage: this.$store.state.url + "payment/payOK.png"
    };
  },
  methods: {
    goMyOrder() {
      this.$router.push({ path: "/dashboard/class" });
    }
  }
};
</script>

<style scoped>
#pay-OK {
  background-color: #fafbfc;
	height: calc(100% - 113px);
}
.pay-header {
  height: 88px;
  padding-left: 88px;
  background-color: #fff;
  border-top: 1px solid #fafbfc;
  border-bottom: 1px solid #fafbfc;
  margin-bottom: 30px;
}
.wechat-pay {
  width: 114px;
  height: 40px;
  padding: 20px 10px;
  display: inline-block;
}
.pay-img {
  width: 100%;
  height: 100%;
}
.pay-mes {
  line-height: 33px;
  width: 100px;
  display: inline-block;
  margin-left: 20px;
  font-size: 16px;
  font-weight: bolder;
}
.pay-content {
  text-align: center;
  width: 80%;
  background-color: #fff;
  margin: 0 auto;
  border: 1px solid #e7eaf0;
}
.pay-face {
  padding: 150px 0;
}
.myorder {
  cursor: pointer;
}
</style>