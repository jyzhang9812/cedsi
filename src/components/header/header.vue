<template>
  <header id="header">
    <div class="logo">
      <router-link to="/">Vue - Complete Guide</router-link>
    </div>
    <nav>
      <ul>
        <li>
          <router-link to="/signup">Sign Up</router-link>
        </li>
        <li>
          <router-link to="/signin">Sign In</router-link>
        </li>
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/console">Console</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

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

  li a {
    text-decoration: none;
    color: #50b8ee;
  }

  li a:hover,
  li a:active,
  li a.router-link-active {
    color: #fa923f;
  }
</style>
