<template>
    <div id="errorpage">
        <div class="form">
        <form>
            <div class="font">
                <h1>404</h1>
                <p>找不到页面啦╥﹏╥...</p>
            </div>
            <div class="submit">
                <button @click='jmp'>返回主页</button>
            </div>
        </form>
        </div>
    </div>
</template>
    
<script>
export default {
    data () {
      return {
      }
    },
    methods: {
      jmp(){
        this.$router.push({path:'/'})
      }
    }
  }
</script>
    
<style scoped>
    #errorpage{
        min-height: 100%;
    }
    .form {
        width: 400px;
        margin: 30px auto;
        border: 1px solid #eee;
        padding: 20px;
        box-shadow: 0 2px 3px #ccc;
    }
    
    .font{
        text-align: center;
        font-size: 1.5rem;
        color: #6e6e6e;
    }
    
    .submit{
        text-align: center;
    }

    .submit button {
        border: 1px solid #50b8ee;
        font-weight: bolder;
        border-radius:12px;
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