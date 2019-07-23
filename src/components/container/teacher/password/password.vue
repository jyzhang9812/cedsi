<template>
    <div class="updatepassword">
        <div class="updatepassworddetail">
            <div class="word">
                <span>修改密码</span>
            </div>
            <div class="personal">
                <div class="personalcontent">
                    <div class="contentdetail">
                        <form class="form" @submit.prevent="onSubmit">
                            <div class="formdetail">
                                <label class="formlabel" for="account">账号</label>
                                <input class="input account disabledinput" type="text" name="account"
                                    placeholder="account" disabled="disabled" v-model="account">
                            </div>
                            <div class="formdetail">
                                <label class="formlabel" for="oldpassword">旧密码</label>
                                <input class="input inputfocus oldpassword" type="password" name="oldpassword"
                                    id="oldpassword" placeholder="请输入旧密码" v-model="oldpassword">
                            </div>
                            <div class="formdetail">
                                <label class="formlabel" for="newpassword">新密码</label>
                                <input class="input inputfocus newpassword" type="password" name="newpassword"
                                    id="newpassword" placeholder="请输入新密码" v-model="newpassword">
                            </div>
                            <div class="formdetail">
                                <label class="formlabel" for="newpasswordagain">新密码</label>
                                <input class="input inputfocus newpasswordagain" type="password" name="newpasswordagain"
                                    id="newpasswordagain" placeholder="请重新输入新密码" v-model="newpasswordagain">
                            </div>
                            <div class="formdetail">
                                <button type="submit" class="buttonsubmit">
                                    提交
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "password",
        data() {
            return {
                account: '',
                oldpassword: '',
                newpassword: '',
                newpasswordagain: '',
            }
        },
        methods: {
            onSubmit() {
                const formData = {
                    account: this.account,
                    oldpassword: this.oldpassword,
                    newpassword:this.newpassword,
                    newpasswordagain:this.newpasswordagain,
                }
                console.log(formData)
            }
        }
    }
</script>

<style scoped>
      * {
        box-sizing: border-box;
        border: 0;
        outline: 0;
        font-size: 12px;
        font-family: Helvetica, Arial, sans-serif;
    }

    .updatepassworddetail {
        display: block;
        width: 80%;
        flex: 1;
        padding: 20px;
        /* border: 5px solid #000; */
    }

    .word span {
        margin-bottom: 5px;
        margin-left: 6px;
    }

    .personalcontent {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        border: 1px solid #ebeef5;
        background-color: #fff;
        color: #303133;
        border-radius: 4px;
        margin: 15px 0;
    }

    .contentdetail {
        padding: 20px;
        margin-bottom: 12px;
    }

    .personal {
        width: 1000px;
        margin: 10px 10px;
    }

    .formdetail {
        margin-left: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .formlabel {
        width: 80px;
        font-size: 12px;
        line-height: 32px;
        margin-left: 10px;
        text-align: right;
        margin-right: 20px;
        float: left;
    }

    .input {
        width: 500px;
        line-height: 15px;
        color: #000;
        padding: 5px 15px;
        border-radius: 5px;
        font-size: 12px;
        border: 1px solid #67c23a;
    }

    .disabledinput {
        border-color: #e4e7ed;
        background-color: #f5f7fa;
        color: #c0c4cc;
    }

    .inputfocus:focus {
        border-color: #f56c6c;
    }

    .buttonsubmit {
        margin-left: 260px;
        padding: 9px 15px;
        font-size: 12px;
        border-radius: 3px;
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        text-align: center;
    }
</style>
