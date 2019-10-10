<template>
  <div id="payreceipt">
    <div v-if='txt==true'>
      <h4>还没有购买任何课程或活动哦~</h4>
    </div>
    <div class="payreceipt-card" v-if='txt==false' v-for="(item,index) in currentList" :key="index">
      <div class="card-title">
        <span>订单：{{item.ORDER_ID}}</span>
        <span>交易时间：{{item.COMMIT_TIME}}</span>
      </div>
      <div class="card-content">
        <img :src="item.COVER" class="card-img" />
        <div class="order-title">{{item.PRODUCT_NAME}}</div>
        <div class="order-price">
          实付金额:
          <span>{{item.FEE/100}}</span>
        </div>
      </div>
    </div>
    <pagination :num="tableData.length" :limit="limit" @getNew="getNew"></pagination>
  </div>
</template>

<script>
  import pagination from "../pagination.vue";
  import { mapState } from "vuex";
  export default {
    components: {
      pagination
    },
    data() {
      return {
        txt: false,
        currentPage: 0,
        i: -1
      };
    },
    methods: {
      //换页
      getNew(value) {
        var currentPage = value / this.limit;
        this.currentPage = currentPage;
        this.$store.commit("changeOrderCurrentList", this.currentPage * this.limit);
      },
      timestampToTime(timestamp) {
        timestamp = String(timestamp);
        timestamp = timestamp.length == 10 ? timestamp * 1000 : timestamp * 1;
        var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + "-";
        var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
        var D = (date.getDate() <10 ? "0"+ date.getDate() :date.getDate())+ " ";
        var h = (date.getHours() <10 ? "0"+ date.getHours() :date.getHours() )+':';
        var m = (date.getMinutes() <10 ? "0"+date.getMinutes() :date.getMinutes() )+ ":";
        var s = date.getSeconds() <10 ? "0"+date.getSeconds() :date.getSeconds();
        return Y + M + D + h + m + s;
      },
    },
    created: function () {
      this.$store.commit("updateLoading", true);
      this.$store.dispatch("getOrder").then(() => {
        if (this.tableData.length == 0) {
          this.txt = true;
        }else{
          for (let i = 0; i <= this.currentList.length; i++) {
            this.currentList[i].COMMIT_TIME = this.timestampToTime(this.currentList[i].COMMIT_TIME)
          }
        }
      });
    },
    computed: {
      ...mapState({
        tableData: state => state.orderList,
        currentList: state => state.orderCurrentList,
        limit: state => state.limit
      })
    }
  };
</script>

<style>
  #payreceipt {
    min-width: 1200px;
  }

  #payreceipt .payreceipt-card {
    height: auto;
    padding-bottom: 20px;
    width: 80%;
    margin: 10PX auto;
    box-shadow: 0 8px 16px 0 rgba(7, 17, 27, 0.1);
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.5);
  }

  #payreceipt .card-title {
    margin: 0 auto;
    width: 90%;
    padding: 40px 0;
    font-size: 16px;
    color: #07111b;
    display: flex;
    justify-content: space-between;
  }

  #payreceipt .card-content {
    margin: 0 auto;
    width: 90%;
    background-color: #fff;
    padding: 24px;
    height: 140px;
    margin-bottom: 20px;
  }

  #payreceipt .card-img {
    width: 160px;
    height: 90px;
    margin-right: 24px;
    float: left;
  }

  #payreceipt .order-title {
    float: left;
    font-size: 16px;
    width: 400px;
  }

  #payreceipt .order-price {
    display: inline-block;
    line-height: 95px;
    color: #93999f;
  }

  #payreceipt .order-price span {
    color: #f01414;
  }
</style>