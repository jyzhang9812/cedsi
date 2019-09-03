<template>
    <div class="personalcontent">
        <div class="contentdetail">
            <form class="form" @submit.prevent="onSubmit">
                <div class="formdetail">
                    <label class="formlabel" for="name">昵称</label>
                    <input class="input" placeholder="请输入用户名" v-model="user.username">
                </div>
                <div class="formdetail">
                    <label class="formlabel" for="gender">性别</label>
                    <span class="modal-update-radio" v-for="(item,index) in radiolist">
                        <input class="modal-update-radio" type="radio" :value='item.value' :checked="item.isCheck"
                            v-model="user.gender" @change="changeInput(index)">
                        {{item.name}}
                    </span>
                </div>
                <div class="formdetail">
                    <label class="formlabel" for="time">加入时间</label>
                    <input class="input disabledinput" value='user.time' disabled="disabled" v-model="user.time">
                </div>
                <div class="formdetail">
                    <label class="formlabel" for="headsculpture">头像</label>
                    <img id="headimage" :src="user.avatar" class="image" alt="">
                    <input class="input headsculpture" type="file" name="headsculpture" id="headsculpture"
                        accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event)">
                </div>
                <div class="formdetail">
                    <label class="formlabel" for="email">邮箱</label>
                    <input class="input" placeholder="请输入邮箱" v-model="user.email">
                </div>
                <div class="formdetail">
                    <label class="formlabel" for="mobile">移动电话</label>
                    <input class="input" placeholder="请输入手机号码" v-model="user.mobile">
                </div>
                <div class="formdetail">
                    <label class="formlabel" for="phone">固定电话</label>
                    <input class="input" placeholder="请输入手机号码" v-model="user.phone">
                </div>
                <div class="formdetail">
                    <button class="buttonsave" @click='submit'>
                        保存
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'updateUser',
        data() {
            return {
                radiolist: [{ name: '男', value: 1, isCheck: false }, { name: '女', value: 2, isCheck: false }],
            }
        },
        methods: {
            changeImage(e) {
                var file = e.target.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    this.user.avatar = this.result
                }
            },
            changeInput(index) {
                this.radiolist.map((v, i) => {
                    if (i == index) {
                        v.isCheck = true
                    } else {
                        v.isCheck = false
                    }
                })
            },
            submit() {
                this.radiolist.map((v, i) => {
                    if (v.isCheck) {
                        console.log('被选中的值为:' + v.value)
                        this.user.gender = v.value
                    }
                })
                const formData = {
                    avatar: this.user.avatar,
                    nickName: this.user.username,
                    email: this.user.email,
                    gender: this.user.gender,
                    mobile: this.user.mobile,
                    phone: this.user.phone,
                    time: this.user.time
                }
                console.log(formData);
                this.$store.dispatch('updateUser', formData)
            }
        },
        created: function () {
            this.$store.commit('updateLoading', true)
            this.$store.dispatch('getUser')
        },
        computed: {
            user: function (state) {
                return this.$store.state.userInfo
            },
        },
    }

</script>

<style scoped>
    * {
        box-sizing: border-box;
        border: 0;
        outline: 0;
        font-size: 16px;
        font-family: Helvetica, Arial, sans-serif;
    }

    .personalcontent {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        border: 1px solid #ebeef5;
        background-color: #fff;
        color: #303133;
        border-radius: 12px;
        width: 80%;
        margin: 15px auto;
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
        margin: 20px 0 0 10px; 
    }

    /* 清除浮动 */
    .formdetail::after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }

    .formlabel {
        width: 80px;
        line-height: 15px;
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
        border: 1px solid #e7e7e7;
    }

    .disabledinput {
        border-color: #e4e7ed;
        background-color: #f5f7fa;
        color: #c0c4cc;
    }

    .input:focus {
        border-color: #67c23a;
    }

    .image {
        width: 150px;
        height: 150px;
    }

    .headsculpture {
        width: 500px;
        margin-left: 110px;
        margin-top: 10px;
    }

    .remark {
        width: 500px;
        height: 186px;
        padding: 5px 15px;
        resize: vertical;
        min-height: 32px;
        border-radius: 5px;
        border: 1px solid #409eff;
    }

    .buttonsave {
        margin-left: 260px;
        padding: 9px 15px;
        border-radius: 3px;
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        text-align: center;
    }
</style>