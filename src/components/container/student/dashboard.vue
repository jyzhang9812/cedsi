<template>
  <el-container id="student">
    <el-aside width="254px">
      <el-row>
        <div class="card-square" @click="routeToPath({route:'/class'})">
          <el-avatar :size="70" :src="user.avatar"></el-avatar>
          <div class="user-name">{{user.username}}</div>
        </div>
      </el-row>
      <el-row class="card-rect" v-for="item in asideData" :key="item.name">
        <div @click="routeToPath(item)" style="width:100%;height:100%">
          <div class="icon-name">
            <i :class="item.icon"></i>
            <span>&nbsp;&nbsp;{{item.name}}</span>
          </div>
        </div>
      </el-row>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import VueElementLoading from "vue-element-loading";
import { mapState } from "vuex";

export default {
  name: "dashboard",
  components: { VueElementLoading },
  data() {
    return {
      asideData: [
        {
          name: "我的首页",
          icon: "el-icon-s-promotion",
          state: true,
          route: "/showPage"
        },
        {
          name: "全部课程",
          icon: "el-icon-s-opportunity",
          state: false,
          route: "/course"
        },
        {
          name: "我的作业",
          icon: "el-icon-s-management",
          state: false,
          route: "/homework"
        },
        {
          name: "我的消息",
          icon: "el-icon-s-comment",
          state: false,
          route: "/message"
        }
      ]
    };
  },
  methods: {
    routeToPath(item) {
      console.log(item);
      let path = `/dashboard${item.route}`;
      this.$router.push({ path: path });
    }
  },
  created() {
    this.$store.commit("updateLoading", true);
    this.$store.dispatch("getUser");
  },
  computed: {
    ...mapState({
      user: state => state.userInfo
    })
  }
};
</script>

<style scoped>
#student {
  height: 100%;
}

#student .el-main {
  overflow-x: hidden;
  height: calc(100vh - 113px);
}

#student .el-aside {
  background-color: #252937;
}

#student .user-name {
  font-size: 14px;
  margin-top: 10px;
}

#student .card-square {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  color: #fff;
  cursor: pointer;
  transition: all 0.25s;
}

#student .card-rect {
  display: flex;
  cursor: pointer;
  height: 60px;
  color: #7580b3;
  transition: all 0.25s;
}

#student .icon-name {
  margin-left: 40px;
  margin-top: 15px;
}

#student .card-rect:hover,
#student .card-square:hover {
  border-left: 5px solid #fff;
  color: #fff;
  background: #2e3347;
}

#student .router-tag {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#student .card-rect i {
  font-size: 1.33333em;
}

#student .card-rect span {
  font-size: 14px;
}
</style>