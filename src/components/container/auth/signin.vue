<template>
  <div id="signin">
    <div class="signin-form">
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">Mail</label>
          <input
                  type="email"
                  id="email"
                  v-model="email">
        </div>
        <div class="input">
          <label for="username">Username</label>
          <input
                  type="username"
                  id="username"
                  v-model="username">
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  v-model="password">
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  // import axios from '../../axios-auth';

  export default {
    data () {
      return {
        email: '',
        password: '',
        username:''
      }
    },
    methods: {
      onSubmit () {
        var idToken = ''
        const formData = {
          password: this.password,
          username: this.username
        }
        console.log(formData);
        this.$http.post("https://aogtavn4ul.execute-api.cn-northwest-1.amazonaws.com.cn/prod/user/login",  {"username":this.username,"password":this.password}).then(
          response => {
            console.log(response);
            idToken = response.body.token;
            localStorage.setItem('idToken', idToken);
            this.$router.push({path:'/dashboard'})
          },
          error => {
            console.log(error);
          }
        );
        
        // this.$store.dispatch('login',{email:formData.email,password:formData.password});
        // this.$store.dispatch('',{email:formData.email,password:formData.password,username: formData.username});
        // this.$store.dispatch('resetPassword',{email:formData.email,password:formData.password,username: formData.username});    
      }
    }
  }
</script>

<style scoped>
  #signin{
    min-height: 100%;
  }
  .signin-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #eee;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #50b8ee;
    background-color: #f4f9fa;
  }

  .submit button {
    border: 1px solid #50b8ee;
    color: #50b8ee;
    padding: 10px 20px;
    font: inherit;
    background: #f4f9fa;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #50b8ee;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #f4f9fa;
    background-color: #f4f9fa;
    color: #f4f9fa;
    cursor: not-allowed;
  }
</style>