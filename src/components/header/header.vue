<template>
  <header id="header">
    <div class="logo">
      <router-link to="/">赛迪思人工智能</router-link>
    </div>
    <nav>
      <ul>
        <li v-if="!auth">
          <router-link to="/signup">注册</router-link>
        </li>
        <li v-if="!auth">
          <router-link to="/signin">登录</router-link>
        </li>
        <li v-if="auth">
          <button @click="role">我的主页</button>
        </li>
        <li v-if="auth">
          <button @click="signout">退出登录</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
  export default {
    computed:{
      auth(){
        return this.$store.getters.isAuthenticated
      }
    },
    methods:{
      signout(){
        this.$store.dispatch('logout');
      },
      role(){
        var roldId = window.localStorage.getItem('roleId')
        this.$router.replace(this.$store.state.roles[roldId-1])
      }
    },
  }
</script>

<style scoped>
  #header {
    height: 56px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 0 20px;
  }

  .logo {
    font-weight: bold;
    color: #50b8ee;
  }

  .logo a {
    text-decoration: none;
    color: #50b8ee;
  }

  nav {
    height: 100%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  li {
    margin: 0 16px;
  }

  li router-link ,li a,
  li button{
    text-decoration: none;
    color: #50b8ee;
    background: none;
    border: none;
  }

  li a:hover,
  li a:active,
  li a.router-link-active,
  li button:hover,
  li button:active{
    color: #fa923f;
  }
</style>
