<template>
  <div id="payment">
    <!-- 模态框（Modal） -->
    <div class="modal fade" id="myPay" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"
      aria-labelledby="myToggleModalLabel" aria-hidden="true">
      <div class="modal-dialog mypay">
        <div class="modal-content mypay-height">
          <div class="modal-header mypay-title">
            <h4 class="modal-title" id="myModalLabel">微信支付{{price}}</h4>
          </div>
          <div class="modal-body mypay-qrcode">
            <div id="query">
              <canvas id="canvas"></canvas>
            </div>
            <span>使用微信扫描二维码进行支付</span>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
    <div class="payment-header" :style="{backgroundImage:'url('+$store.state.url+'payment/headerbg.jpg)'}">
      <div class="payment-title">支付中心</div>
    </div>
    <div class="payment-card">
      <div class="card-title">
        <span>订单：{{orderNum}}</span>
      </div>
      <div class="card-content">
        <img :src="cover" class="card-img" />
        <div class="order-title">{{title}}</div>
        <div class="order-price">
          实付金额:
          <span>{{price}}</span>
        </div>
      </div>
      <div class="pay-method">
        <span>支付方式</span>
        <div class="pay-img">
          <img :src="wechatImage" />
        </div>
      </div>
      <div class="summary">
        应付金额:
        <span>{{price}}</span>
        <button class="pay" data-toggle="modal" data-target="#myPay" @click="closeModal">立即支付</button>
      </div>
    </div>
  </div>
</template>
<script>
  import QRCode from "qrcode";
  import { mapState } from "vuex";
  import globalAxios from "axios";
  import random from "string-random";
  export default {
    data() {
      return {
        cover: "",
        price: 0,
        title: "",
        orderNum: "66666666666",
        qrcodeImage: this.$store.state.url + "payment/qrcode.png",
        wechatImage: this.$store.state.url + "payment/WePayLogo.png"
      };
    },
    methods: {
      closeModal() {
        var payment = {};
        payment.orderId = random(6) + Date.now();
        payment.productId = "222222";
        payment.productName = "hhhhh";
        payment.userId = "43d4b60bc84cafdac72db222548f4200509e3a3ef855a1f30789795e56655fc8";
        payment.fee = "1";
        globalAxios
          .post(
            "http://wx.cedsie.com:12345/pay",
            payment,
          )
          .then(
            response => {
              console.log(response.data);
              this.qrCode(response.data, payment.orderId);
            },
            error => {
              console.error(error);
            }
          )
      },
      qrCode(url, orderId) {
        var that = this;
        var url = url;
        QRCode.toCanvas(canvas, url, function (error) {
          if (error) console.error(error);
          var timer = setInterval(function () {
            that.query(timer, orderId)
          }, 2000)
        });
      },
      query(timer, orderId) {
        globalAxios
          .get(
            "http://wx.cedsie.com:12345/query?orderId=" + orderId
          )
          .then(
            response => {
              console.log(response.data)
              if (response.data == "SUCCESS") {
                clearInterval(timer)
                this.$router.push({ path: '/payOK' });
              }
            },
            error => {

            }
          )
      },
      // payReasult() {
      //   this.$router.push({ path: '/payOK' });
      // }
    },
    created: function () {
      this.title = this.$route.query.title;
      this.price = this.$route.query.price;
      this.cover = this.$route.query.cover;
    }
  };
</script>

<style scoped>
  #payment {
    background-color: #f8fafc;
    min-width: 1200px;
  }

  #payment .payment-header {
    width: 100%;
    height: 160px;
    background-color: #e3e6e9;
    margin: 0 auto;
    position: relative;
  }

  #payment .payment-title {
    font-size: 32px;
    line-height: 115px;
    color: #07111b;
    font-weight: 200;
    position: relative;
    width: 65%;
    margin: 0 auto;
  }

  #payment .payment-card {
    height: 660px;
    width: 70%;
    margin: 0 auto;
    position: relative;
    top: -40px;
    box-shadow: 0 8px 16px 0 rgba(7, 17, 27, 0.1);
    border-radius: 8px;
    background-color: #fff;
  }

  #payment .card-title {
    margin: 0 auto;
    width: 90%;
    padding: 40px 0;
    font-size: 16px;
    color: #07111b;
  }

  #payment .card-content {
    margin: 0 auto;
    width: 90%;
    background-color: #f3f5f7;
    padding: 24px;
    height: 140px;
    margin-bottom: 20px;
  }

  #payment .card-img {
    width: 160px;
    height: 90px;
    margin-right: 24px;
    float: left;
  }

  #payment .order-title {
    float: left;
    font-size: 16px;
    width: 400px;
  }

  #payment .order-price {
    display: inline-block;
    line-height: 95px;
    color: #93999f;
  }

  #payment .order-price span {
    color: #f01414;
  }

  #payment .pay-method {
    width: 90%;
    margin: 0 auto;
    padding: 30px 20px;
    border-top: 2px solid #d9dde1;
    border-bottom: 2px solid #d9dde1;
    height: 216px;
  }

  #payment .pay-method span {
    font-size: 16px;
    display: block;
    margin-bottom: 30px;
  }

  #payment .pay-img {
    width: 196px;
    height: 90px;
    background-color: #f3f5f7;
    padding: 20px 10px;
  }

  #payment .pay-img img {
    width: 100%;
    height: 100%;
  }

  #payment .summary {
    width: 206px;
    height: 176px;
    float: right;
    padding-top: 36px;
  }

  #payment .summary span {
    font-size: 18px;
    color: #f01414;
  }

  #payment .pay {
    width: 140px;
    height: 40px;
    background-color: #f01414;
    color: #fff;
    line-height: 38px;
    border: 1px solid #f01414;
    margin-top: 40px;
    font-size: 16px;
  }

  #payment .mypay {
    top: 100px;
    width: 25%;
    height: 364px;
  }

  #payment .mypay-height {
    height: 100%;
  }

  #payment .mypay-title {
    text-align: center;
    border-bottom: 1px solid #fff;
    margin-top: 30px;
  }

  #payment .mypay-qrcode {
    text-align: center;
  }

  #payment .mypay-qrcode img {
    display: block;
    margin: 10px auto;
  }
</style>