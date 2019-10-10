<template>
  <div id="payreceipt">
    <div class="payreceipt-card" v-for="(item,index) in currentList" :key="index">
      <div class="card-title">
        <span>订单：{{item.ORDER_ID}}</span>
      </div>
      <div class="card-content">
        <img
          src="https://www.tynker.com/image/course-card/vertical/minecraft-starter.png"
          class="card-img"
        />
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
    }
  },
  created: function() {
    this.$store.commit("updateLoading", true);
    this.$store.dispatch("getOrder");
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