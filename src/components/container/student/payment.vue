<template>
  <div id="payment">
      <!-- 模态框（Modal） -->
    <div class="modal fade" id="myPay" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myToggleModalLabel" aria-hidden="true">
	<div class="modal-dialog mypay">
		<div class="modal-content mypay-height">
			<div class="modal-header mypay-title">
				<h4 class="modal-title" id="myModalLabel">
					微信支付{{orderPrice}}
				</h4>
			</div>
            <div class="modal-body mypay-qrcode">
				<img src="../../../../static/images/payment/qrcode.png" />
                <span>使用微信扫描二维码进行支付</span>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
    <div
      class="payment-header"
      :style="{backgroundImage:'url('+require('../../../../static/images/payment/headerbg.jpg')+')'}"
    >
      <div class="payment-title">支付中心</div>
    </div>
    <div class="payment-card">
      <div class="card-title">
        <span>订单：{{orderNum}}</span>
      </div>
      <div class="card-content">
        <img src="https://www.tynker.com/image/course-card/vertical/minecraft-starter.png" class="card-img" />
        <div class="order-title">{{orderName}}</div>
        <div class="order-price">
          实付金额:
          <span>{{orderPrice}}</span>
        </div>
      </div>
      <div class="pay-method">
        <span>支付方式</span>
        <div class="pay-img">
          <img src="../../../../static/images/payment/WePayLogo.png" />
        </div>
      </div>
      <div class="summary">
            应付金额:
          <span>{{orderPrice}}</span>
          <button class="pay" data-toggle="modal" data-target="#myPay" @click="closeModal">立即支付</button>
      </div>
    </div>

  </div>
</template>
<script>
export default {
    data(){
        return{
            orderName:"玩转算法系列--图论精讲 面试升职必备（Java版）",
            orderPrice:"￥ 348.00",
            orderNum:"66666666666"
        }
    },
    methods:{
        closeModal(){
            setTimeout("$('#myPay').modal('hide')",5000);//5s延时自动关闭
        }																					
    }

};
</script>
<style>
#payment {
  background-color: #f8fafc;
  min-width: 1200px;
}
.payment-header {
  width: 100%;
  height: 160px;
  background-color: #e3e6e9;
  margin: 0 auto;
  position: relative;
}
.payment-title {
  font-size: 32px;
  line-height: 115px;
  color: #07111b;
  font-weight: 200;
  position: relative;
  width: 65%;
  margin: 0 auto;
}
.payment-card {
  height: 660px;
  width: 70%;
  margin: 0 auto;
  position: relative;
  top: -40px;
  box-shadow: 0 8px 16px 0 rgba(7, 17, 27, 0.1);
  border-radius: 8px;
  background-color: #fff;
}
.card-title {
  margin: 0 auto;
  width: 90%;
  padding: 40px 0;
  font-size: 16px;
  color: #07111b;
}
.card-content {
  margin: 0 auto;
  width: 90%;
  background-color: #f3f5f7;
  padding: 24px;
  height: 140px;
  margin-bottom: 20px;
}
.card-img {
  width: 160px;
  height: 90px;
  margin-right: 24px;
  float: left;
}
.order-title {
  float: left;
  font-size: 16px;
  width: 400px;
}
.order-price {
  display: inline-block;
  line-height: 95px;
  color: #93999f;
}
.order-price span {
  color: #f01414;
}
.pay-method {
  width: 90%;
  margin: 0 auto;
  padding: 30px 20px;
  border-top: 2px solid #d9dde1;
  border-bottom: 2px solid #d9dde1;
  height: 216px;
}
.pay-method span {
  font-size: 16px;
  display: block;
  margin-bottom: 30px;
}
.pay-img {
  width: 196px;
  height: 90px;
  background-color: #f3f5f7;
  padding: 20px 10px;
}
.pay-img img {
  width: 100%;
  height: 100%;
}
.summary {
  width: 206px;
  height: 176px;
  float: right;
  padding-top: 36px;
}
.summary span{
    font-size: 18px;
    color: #f01414
}
.pay{
    width: 140px;
    height: 40px;
    background-color: #f01414;
    color: #fff;
    line-height: 38px;
    border: 1px solid #f01414;
    margin-top: 40px;
    font-size: 16px;
}
.mypay{
    top:100px;
    width: 25%;
    height: 364px;
}
.mypay-height{
    height: 100%;
}
.mypay-title{
    text-align: center;
    border-bottom: 1px solid #fff;
    margin-top: 30px;
}
.mypay-qrcode{
    text-align: center
}
.mypay-qrcode img{
    display: block;
    margin: 10px auto;
}
</style>