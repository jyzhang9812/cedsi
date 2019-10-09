<template>
    <div id="personalcontent">
        <div class="contentdetail">
            <form class="form" @submit.prevent="submit">
                <div class="formdetail">
                    <label class="formlabel" for="name">昵称</label>
                    <input class="input" placeholder="请输入用户名" v-model="user.username">
                </div>
                <div class="formdetail">
                    <label class="formlabel" for="gender">性别</label>
                    <span style='margin-right: 50px' v-for="(item,index) in radiolist" :key=index>
                        <input type="radio" :value='item.value' :checked="item.isCheck" v-model="user.gender"
                            @change="changeInput(index)">
                        {{item.name}}
                    </span>
                </div>
                <!-- <div class="formdetail">
                    <label class="formlabel" for="time">加入时间</label>
                    <input class="input disabledinput" value='user.time' disabled="disabled" v-model="user.time">
                </div> -->
                <div class="formdetail">
                    <label class="formlabel" for="headsculpture">头像</label>
                    <img id="headimage" :src="headsculpture" class="cover-image" alt="" v-show="headsculpture!==''">
                    <div class="upload">
                        <div class="upload-cover-btn">
                            上传文件
                            <input type="file" class="" @change="getFile($event)" style="opacity: 0">
                        </div>
                    </div>
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
                    <button class="buttonsave" @click='submit($event)'>
                        保存
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import AWS from 'aws-sdk';
    import instance from '../../../../../axios-auth.js';
    export default {
        name: 'updateUser',
        data() {
            return {
                file: null,
                fileName: '',
                headsculpture: '',
                radiolist: [{ name: '男', value: 1, isCheck: false }, { name: '女', value: 2, isCheck: false }],
            }
        },
        methods: {
            changeInput(index) {
                this.radiolist.map((v, i) => {
                    if (i == index) {
                        v.isCheck = true
                    } else {
                        v.isCheck = false
                    }
                })
            },
            getFile(event) {
                this.file = event.target.files[0]
                console.log(this.file)
                this.fileName = this.file.name
                var reader = new FileReader();
                var that = this;
                reader.readAsDataURL(this.file);
                reader.onload = function (e) {
                    that.headsculpture = this.result
                }
            },
            submit(event) {
                let postImgToS3 = function (config, file) {
                    AWS.config = new AWS.Config({
                        accessKeyId: config.AccessKeyId,
                        secretAccessKey: config.SecretAccessKey,
                        sessionToken: config.SessionToken,
                        region: 'cn-northwest-1'
                    })
                    var s3 = new AWS.S3();
                    let formData = new FormData();
                    formData.append('content', file);
                    const reader = new FileReader();
                    var content = reader.readAsArrayBuffer(file);
                    var params = {
                        ACL: 'public-read',
                        Bucket: "cedsi",
                        Body: formData.get('content'),
                        Key: "user/avatar/" + config.id + "." + file.type.split('/')[1],
                        ContentType: file.type,
                        Metadata: { 'uploader': window.localStorage.getItem('user') }
                    };
                    s3.putObject(params, function (err, data) {
                        if (err) {
                            console.log(err, err.stack);
                        } else {
                            console.log(data);
                            if (data.hasOwnProperty('ETag')) {
                                alert("上传成功!");
                                // this.$router.replace({ path: '/Admin/courseManagement/' });
                            } else {
                                alert("上传失败!");
                            }
                        }
                    });
                }
                this.radiolist.map((v, i) => {
                    if (v.isCheck) {
                        console.log('被选中的值为:' + v.value)
                        this.user.gender = v.value
                    }
                })
                this.postFormData({
                    nickName: this.user.username,
                    email: this.user.email,
                    gender: this.user.gender,
                    mobile: this.user.mobile,
                    phone: this.user.phone,
                    time: this.user.time,
                    type: this.file?this.file.type.split('/')[1]:''
                }, postImgToS3);
            },
            postFormData(formData, postImgToS3) {
                let file = this.file;
                instance.put('/student/studentinfo', formData, {
                    headers: { 
                        Authorization: localStorage.getItem('idToken'),
                        'Content-Type': 'application/json'}
                })
                    .then((res) => {
                        console.log(res);
                        if(res.data.AccessKeyId){
                        postImgToS3(res.data, file);}
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
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
  
    #personalcontent {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        border: 1px solid #ebeef5;
        background-color: #fff;
        color: #303133;
        border-radius: 12px;
        width: 80%;
        margin: 15px auto;
    }

    #personalcontent .contentdetail {
        padding: 20px;
        margin-bottom: 12px;
    }

    #personalcontent .personal {
        width: 1000px;
        margin: 10px 10px;
    }

    #personalcontent .formdetail {
        margin: 20px 0 0 10px;
    }

    /* 清除浮动 */
    #personalcontent .formdetail::after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }

    #personalcontent .formlabel {
        width: 80px;
        line-height: 15px;
        margin-left: 10px;
        text-align: right;
        margin-right: 20px;
        float: left;
    }

    #personalcontent .input {
        width: 500px;
        line-height: 15px;
        color: #000;
        padding: 5px 15px;
        border-radius: 5px;
        border: 1px solid #e7e7e7;
    }

    #personalcontent .disabledinput {
        border-color: #e4e7ed;
        background-color: #f5f7fa;
        color: #c0c4cc;
    }

    #personalcontent .input:focus {
        border-color: #67c23a;
    }

    #personalcontent input[type=radio] {
        padding-right: 50px;
    }

    #personalcontent .image {
        width: 150px;
        height: 150px;
    }

    #personalcontent .headsculpture {
        width: 500px;
        margin-left: 110px;
        margin-top: 10px;
    }

    #personalcontent .remark {
        width: 500px;
        height: 186px;
        padding: 5px 15px;
        resize: vertical;
        min-height: 32px;
        border-radius: 5px;
        border: 1px solid #409eff;
    }

    #personalcontent .buttonsave {
        margin-left: 260px;
        padding: 9px 15px;
        border-radius: 3px;
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        text-align: center;
    }

    #personalcontent .upload-cover-btn {
        margin-left: 10px;
        width: 80px;
        height: 35px;
        display: inline-block;
        background-color: #409eff;
        color: #fff;
        border-radius: 5px;
        line-height: 35px;
        text-align: center
    }

    #personalcontent input[type=file] {
        width: 80px;
        height: 35px;
        position: relative;
        top: -35px;
    }

    #personalcontent .cover-image {
        width: 200px;
        height: 200px;
    }
</style>