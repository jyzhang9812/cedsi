<template>
    <div class="signup">
        <div class="signupdetail">
            <h2>成为赛迪斯的一员</h2>
            <div class="btn">
                <button class="btnsingup">
                    免费注册
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Signup',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .singupdetail {
        margin: 0 auto;
        width: 100%;
    }

    h2 {
        font-weight: bold;
        text-align: center;
        margin-bottom: 10px;
    }

    .btn {
        text-align: center;
        margin: 0 auto;
        width: 100%;
        height: 80px;
    }

    .btnsingup {
        background-color: #00bcd4;
        color: #fefefe;
        border: 5px solid #000;
        display: inline-block;
        border: 1px solid transparent;
        border-radius: 5px;
        font-size: 24px;
        font-weight: bold;
    }
</style>