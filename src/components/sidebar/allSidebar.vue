<template>
  <el-container>
    <el-aside width="220px">
      <el-menu
        default-active="0"
        class="el-menu-vertical-demo"
        background-color="#3766A6"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <el-submenu v-for="item in submenu" :key="item.name" :index="item.name">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-for="(_item, _index) in item.children" :key="_index" :index="_item.name">
            <span>{{_item.name}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-for="item in menuItems" :key="item.name" :index="item.name">
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "asiders",
  props: { allside: Array },
  data() {
    return {
      aside: this.allside
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      const subMenu = this.aside.find(item => {
        return item.name === keyPath[0];
      });
      if (subMenu.children.length) {
        const menuItem = subMenu.children.find(item => {
          return item.name === key;
        });
        this.$router.push(menuItem.route);
      } else {
        this.$router.push(subMenu.route);
      }
    }
  },
  computed: {
    submenu() {
      const callback = item => item.children.length;
      return this.aside.filter(callback);
    },
    menuItems() {
      const callback = item => !item.children.length;
      return this.aside.filter(callback);
    }
  }
};
</script>

<style scoped>
.el-aside {
  width: 100%;
  height: 100%;
  background-color: #3766a6;
}
.el-menu-item i,
.el-submenu__title i {
  color: #fff;
}
.el-container {
  overflow: hidden;
}
</style>