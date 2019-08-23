<template>
  <div class="container-fluid layout">
    <div class="row">
      <div class="col-md-4" v-for="(item,index) in currentList" :key="index">
        <router-link :to="{name:'coursemap',query:{id:item.ID}}" class="box">
          <div class="inside" @mouseover="show(index)" @mouseleave="hidden(index)">
            <img class="img" :style="style" :src="item.COVER">
            <div class="details" :style="style1" v-show="index==i">
              <div class="detail_item">
                <img class="icon" :src=classImg>
                <span>开课进度: {{item.status.haveStarted}} / {{item.status.chaptersNum}}</span>
              </div>
              <div class="detail_item">
                <img class="icon" :src=learnImg>
                <span>学习进度: {{item.status.haveLearned}} / {{item.status.chaptersNum}}</span>
              </div>
              <div class="detail_item">
                <img class="icon" :src=starImg>
                <span>总星数: {{item.status.homeworkStars}}</span>
              </div>
              <div class="detail_item">
                <img class="icon" :src=hwkImg>
                <span>作业提交次数: {{item.status.homeworkNum}}</span>
              </div>
              <div class="detail_item">
                <img class="icon" :src=createImg>
                <span>自由创作次数: {{item.status.creationNums}}</span>
              </div>
            </div>
          </div>
          <div class="outside">
            <h4>{{item.COURESE_NAME}}</h4>
            <button :class="(index==i)?btnh:btn">开始学习</button>
          </div>
        </router-link>
      </div>
    </div>
    <pagination :num="tableData.length" :limit="limit" @getNew="getNew"></pagination>
  </div>
</template>


<script>
  import pagination from '../pagination.vue'
  import globalAxios from 'axios'

  export default {
    name: "courseCard",
    components: {
      pagination,
    },
    data() {
      return {
        currentPage: 0,
        btn: "btn",
        btnh: "btnhover",
        classImg: '../../../' + this.$store.state.url + 'dashboard/class.png',
        learnImg: '../../../' + this.$store.state.url + 'dashboard/learn.png',
        hwkImg: '../../../' + this.$store.state.url + 'dashboard/homework.png',
        starImg: '../../../' + this.$store.state.url + 'dashboard/star_active.png',
        createImg: '../../../' + this.$store.state.url + 'dashboard/create.png',
        isShow: false,
        inside_detail: [],
        calleft: 0,
        i: -1,
      };
    },
    methods: {
      show(index) {
        this.i = index;
        this.isShow = true;
      },
      hidden(index) {
        this.i = -1;
        this.isShow = false;
      },
      //换页
      getNew(value) {
        var currentPage = value / this.limit;
        this.currentPage = currentPage;
        this.$store.commit("changeMsgCurrentList", this.currentPage * this.limit)
      },
    },
    created: function () {
      this.style = 'height:' + (document.documentElement.clientWidth * 0.17) + 'px;'
      this.style1 = 'height:' + (document.documentElement.clientWidth * 0.17) + 'px;margin-top:-' + (document.documentElement.clientWidth * 0.17) + 'px;'
      this.$store.commit('updateLoading', true)
      this.$store.dispatch('getCourse')
    },
    computed: {
      currentList() {
        return this.$store.state.courseCurrentList
      },
      tableData() {
        return this.$store.state.courseList
      },
      limit() {
        return this.$store.state.limit
      }
    },
  }
</script>


<style scoped>
  .layout {
    margin: 0;
  }

  .row {
    width: 100%;
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    float: left;
  }

  .col-md-4 {
    margin-top: 10px;
    margin-bottom: 10px;
    text-decoration: none;
  }

  .img {
    border-radius: 20px;
    width: 100%;
  }

  .inside {
    border-radius: 20px;
    color: #fff;
    text-decoration: none;
  }

  .inside:hover {
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
    box-shadow: 0px -10px 10px 2px #457e72
      /*上边阴影*/
      -2px 0px 10px 2px #457e72,
      /*左边阴影*/
      2px 0px 10px 2px #457e72,
      /*右边阴影*/
      0px 10px 10px 2px #457e72;
    /*下边阴影*/
  }

  .btn {
    color: #fff;
    background: #457e72;
    border: 1px solid #51c79f;
    height: 35px;
    width: 90px;
    font-size: 13px;
    text-align: center;
    margin-right: 10px;
    margin-top: 10px;
    font-weight: bold;
  }

  .btnhover {
    height: 35px;
    width: 90px;
    color: #51c79f;
    background: #fff;
    font-size: 15px;
    text-align: center;
    margin-right: 10px;
    margin-top: 10px;
    font-weight: bold;
    border-radius: 8px;
    text-decoration: none;
  }

  .details {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.55);
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    border-radius: 20px;
    padding-top: 20px;
  }

  .detail_item {
    margin-left: 40px;
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    position: relative;
    border-radius: 20px;
  }

  .outside {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    font-size: 12px;
    justify-content: space-between;
  }

  h4 {
    margin-top: 15px;
    margin-left: 10px;
    color: #25293a;
  }

  .icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
</style>