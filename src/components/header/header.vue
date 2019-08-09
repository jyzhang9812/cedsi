<template>
  <header id="header">
    <div class="logo">
      <router-link to="/">Home - Cedsi</router-link>
    </div>
    <nav>
      <ul>
        <li v-if="!auth">
          <router-link to="/signup">Sign Up</router-link>
        </li>
        <li v-if="!auth">
          <router-link to="/signin">Sign In</router-link>
        </li>
        <li v-if="auth">
          <button @click="role">Dashboard</button>
        </li>
        <li v-if="auth">
          <button @click="signout">Sign out</button>
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
        this.$router.replace(this.$store.getters.whichRole)
      }
    },
    created:function(){
      this.Authenticated = this.$store.getters.isAuthenticated
    }  
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

  li a ,
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
