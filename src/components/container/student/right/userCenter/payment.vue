<template>
  <div id="payreceipt">
    <h4 v-if="!currentList.length" style="padding:20px 0 0 50px">还没有产生订单哦~</h4>
    <div v-else class="payreceipt-card" v-for="(item,index) in currentList" :key="index">
      <div class="card-title">
        <span>订单：{{item.ORDER_ID}}</span>
        <span>交易时间：{{item.COMMIT_TIME}}</span>
      </div>
      <div class="card-content">
        <img :src="item.COVER" class="card-img" />
        <div class="order-title">{{item.PRODUCT_NAME}}</div>
        <div class="order-price">
          实付金额:
          <span>￥{{item.FEE/100}}</span>
        </div>
      </div>
    </div>
    <el-pagination
      class="pagination"
      :page-size="limit"
      v-if="tableData.length"
      background
      layout="prev, pager, next"
      :total="tableData.length"
      @current-change="handlePageChange"
      @prev-click="handlePageChange"
      @next-click="handlePageChange"
    ></el-pagination>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      // tableData: [
      //   {
      //     ORDER_ID: "00001",
      //     COMMIT_TIME: "1580280099309",
      //     COVER: "https://www.henrenx.cn/f92839.jpg",
      //     PRODUCT_NAME: "青春有你2报名费",
      //     FEE: 2000
      //   },
      //   {
      //     ORDER_ID: "00002",
      //     COMMIT_TIME: "1580280099309",
      //     COVER: "https://www.henrenx.cn/f92839.jpg",
      //     PRODUCT_NAME: "青春有你2报名费",
      //     FEE: 2000
      //   },
      //   {
      //     ORDER_ID: "00003",
      //     COMMIT_TIME: "1580280099309",
      //     COVER: "https://www.henrenx.cn/f92839.jpg",
      //     PRODUCT_NAME: "青春有你2报名费",
      //     FEE: 2000
      //   }
      // ],
      currentList: [],
      limit: 2
    };
  },
  methods: {
    handlePageChange(pageIndex) {
      let start = (pageIndex - 1) * this.limit;
      let end = start + this.limit;
      this.currentList = this.tableData.slice(start, end);
    },
    timestampToTime(timestamp) {
      timestamp = String(timestamp);
      timestamp = timestamp.length == 10 ? timestamp * 1000 : timestamp * 1;
      let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      let h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      let m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    }
  },
  // mounted() {
  //   this.handlePageChange(1);
  // },
  created: function() {
    this.$store.commit("updateLoading", true);
    this.$store.dispatch("getOrder").then(() => {
      if (this.tableData.length != 0) {
        console.log(this.tableData)
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].COMMIT_TIME = this.timestampToTime(
            this.tableData[i].COMMIT_TIME
          );
        }
        this.handlePageChange(1);
      }
    });
  },
  computed: {
    ...mapState({
      tableData: state => state.orderList,
      // currentList: state => state.orderCurrentList,
    })
  }
};
</script>

<style scoped>
.pagination {
  margin-top: 20px;
  margin-left: 120px;
}

.payreceipt-card {
  height: auto;
  padding-bottom: 20px;
  width: 80%;
  margin: 10px auto;
  box-shadow: 0 8px 16px 0 rgba(7, 17, 27, 0.1);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.5);
}

.card-title {
  margin: 0 auto;
  width: 90%;
  padding: 25px 0;
  font-size: 16px;
  color: #07111b;
  display: flex;
  justify-content: space-between;
}

.card-content {
  margin: 0 auto;
  width: 90%;
  background-color: #fff;
  padding: 20px;
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
  margin-top: 35px;
}

.order-price {
  display: inline-block;
  line-height: 95px;
  color: #93999f;
}

.order-price span {
  color: #f01414;
}
</style>