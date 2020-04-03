<template>
  <div id="new" class="limiter">
    <h4 v-if="!myClass.length" style="padding:20px 0 0 50px">还没有加入任何班级哦~</h4>
    <div class="container-table100" v-if="myClass.length">
      <div style="margin-bottom: 10px;">
        <button
          class="nameOfClass"
          v-for="(item,index) in myClass"
          @click="currentId = index"
          :key="index"
          :class="{active : index===currentId}"
        >{{item.name}}</button>
      </div>
      <div class="wrap-table100">
        <div style="margin-bottom: 10px;">
          <img class="avastimg" :src="nowClass.teacher.avatar" />
          <span>代课老师：{{nowClass.teacher.name}}</span>
          <span style="margin-left: 20px">班级人数：{{nowClass.count}}</span>
        </div>
        <div class="table100 ver1">
          <table data-vertable="ver1">
            <thead>
              <tr class="row100 head">
                <th class="column100">序号</th>
                <th class="column100">头像</th>
                <th class="column100">我的同学</th>
                <th class="column100">性别</th>
                <th class="column100">年龄</th>
              </tr>
            </thead>
            <tbody>
              <tr class="row100" v-for="(item,index) in nowClass.classmates" :key="index">
                <td class="column100">{{index+1}}</td>
                <td class="column100">
                  <img class="avastimg" :src="item.AVATAR" />
                </td>
                <td class="column100">{{item.STUDENT_NAME}}</td>
                <td class="column100">{{item.GENDER}}</td>
                <td class="column100">{{item.AGE}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "class",
  data() {
    return {
      currentId: 0,
      myClass: [
        {
          name: "青你1班",
          classmates: [
            {
              AVATAR: "https://henrenx.cn/avatar.jpg",
              STUDENT_NAME: "虞书欣",
              GENDER: "女",
              AGE: 18
            },
            {
              AVATAR: "https://henrenx.cn/avatar.jpg",
              STUDENT_NAME: "虞书欣",
              GENDER: "女",
              AGE: 18
            },
            {
              AVATAR: "https://henrenx.cn/avatar.jpg",
              STUDENT_NAME: "虞书欣",
              GENDER: "女",
              AGE: 18
            },
            {
              AVATAR: "https://henrenx.cn/avatar.jpg",
              STUDENT_NAME: "虞书欣",
              GENDER: "女",
              AGE: 18
            },
            {
              AVATAR: "https://henrenx.cn/avatar.jpg",
              STUDENT_NAME: "申洁",
              GENDER: "女",
              AGE: 18
            },
            {
              AVATAR: "https://henrenx.cn/avatar.jpg",
              STUDENT_NAME: "宋昭艺",
              GENDER: "女",
              AGE: 18
            },
            {
              AVATAR: "https://henrenx.cn/avatar.jpg",
              STUDENT_NAME: "刘雨欣",
              GENDER: "女",
              AGE: 18
            }
          ],
          count: 100,
          teacher: {
            avatar: "https://henrenx.cn/avatar.jpg",
            name: "蔡徐坤"
          }
        }
      ]
    };
  },
  computed: {
    nowClass: () => this.myClass[this.currentId]
  },
  created: function() {
    // this.$store.commit("updateLoading", true);
    // this.$store.dispatch("getClass").then(() => {
    //   if (this.myClass.length != 0) {
    //     this.txt = false;
    //     this.nowClass = this.myClass[this.currentId];
    //   }
    // });
    this.nowClass = this.myClass[0];
  },
  computed: {
    // ...mapState({
    //   myClass: state => state.myClass
    // })
  }
};
</script>

<style scoped>
#new .nameOfClass {
  width: auto;
  min-width: 100px;
  background: #51c79f;
  height: 40px;
  font-size: 15px;
  text-align: center;
  margin: 10px 10px 0 0;
  padding: 0 10px;
  font-weight: bold;
  color: #fff;
  border-radius: 12px;
}

#new button.nameOfClass:hover,
#new button.active {
  color: #75b598;
  background: #fff;
}

#new .avastimg {
  vertical-align: middle;
  width: 40px;
}

/*[ RESTYLE TAG ]*/
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  border-radius: 5px;
}

/* ------------------------------------ */
#new button {
  outline: none !important;
  border: none;
  background: transparent;
  cursor: pointer;
}

#new .container-table100 {
  width: 100%;
  padding: 10px 50px;
}

#new .wrap-table100 {
  width: 100%;
  margin-top: 20px;
}

#new table {
  width: 100%;
  background-color: #fff;
}

#new table tbody {
  display: block;
  height: 350px;
  overflow-y: scroll;
}

#new table thead,
#new tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

#new th,
#new td {
  font-weight: unset;
  padding-right: 10px;
}

#new .column100 {
  width: 130px;
  padding-left: 25px;
  text-align: center;
}

#new .row100.head th {
  padding-top: 24px;
  padding-bottom: 20px;
}

#new .row100 td {
  padding-top: 10px;
  padding-bottom: 8px;
}

/*==================================================================
    [ Ver1 ]*/
#new .table100.ver1 td {
  font-family: Montserrat-Regular;
  font-size: 14px;
  color: #808080;
  line-height: 1.4;
}

#new .table100.ver1 th {
  font-family: Montserrat-Medium;
  font-size: 15px;
  color: #fff;
  line-height: 1.4;
  text-transform: uppercase;
  background-color: #3d857a;
}

#new .table100.ver1 .row100:hover {
  background-color: #eff4e7;
}

#new .table100.ver1 .hov-column-ver1 {
  background-color: #eff4e7;
}

#new .table100.ver1 .hov-column-head-ver1 {
  background-color: #484848 !important;
}

#new .table100.ver1 .row100 td:hover {
  background-color: #51c79f;
  color: #fff;
}
</style>