<template>
    <div id="addCourse">
        <div class="upload">
            <span class="upload-title">作业名称:</span>
            <input class="upload-input right" v-model="name" placeholder="请输入课程名称" />
        </div>
        <div class="upload upload-height">
            <span class="upload-title">作业描述:</span>
            <textarea class="upload-textarea" rows="8" cols="70" v-model="description" placeholder="请输入课程描述" />
            </div>
        <div class="upload">
            <span class="upload-title">请选择作业:</span>
            <div class="upload-cover-btn">
                上传
                <input type="file" class @change="getFile($event,1)" style="opacity: 0" />
            </div>
            <span>{{this.fileName}}</span>
        </div>
        <div class="upload">
                <span class="upload-title">请选择封面:</span>
                <div class="upload-cover-btn">
                    上传
                    <input type="file" class @change="getFile($event,0)" style="opacity: 0" />
                </div>
            </div>
            <div class="upload upload-height">
                <span class="upload-title">预览:</span>
                <div class="upload-cover-img">
                    <img
                    id="headimage"
                    :src="headsculpture"
                    class="cover-image"
                    alt
                    v-show="headsculpture!==''"
                    />
                </div>
            </div>
        <div class="upload-footer">
            <button class="btn upload-btn" @click="submit1($event)">确定</button>
            <button class="btn upload-btn" @click="calcelUpload">取消</button>
        </div>
    </div>
</template>
      
<script>
    import AWS from "aws-sdk";
    import instance from "../../../../../axios-auth.js";
    import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'

    export default {
        name: "addHomework",
        data() {
            return {
                file: null,
                fileName: "",
                coverName:'',
                cover: null,
                headsculpture: "",
                name: "",
                description: "",
                courseId: '',
                chapterId: '',
            };
        },
        methods: {
            calcelUpload() {
                this.headsculpture = "";
                this.file = null;
                this.fileName = "";
                this.coverName = "";
                this.cover = null;
                this.name = "";
                this.description = "";
                this.$router.replace({ path: "/dashboard/addHomework?chapterId=" + this.chapterId + "&courseId=" + this.courseId });
            },
            getFile(event, index) {
                if (index == 1) {
                    this.file = event.target.files[0];
                    console.log(this.file);
                    this.fileName = this.file.name;
                } else {
                    this.cover = event.target.files[0];
                    console.log(this.cover);
                    this.coverName = this.cover.name;
                    var reader = new FileReader();
                    var that = this;
                    reader.readAsDataURL(this.cover);
                    reader.onload = function (e) {
                        that.headsculpture = this.result;
                    };
                }
            },
            submit1(event) {
                var that = this;
                let postImgToS3 = function (config, file) {
                    AWS.config = new AWS.Config({
                        accessKeyId: config.AccessKeyId,
                        secretAccessKey: config.SecretAccessKey,
                        sessionToken: config.SessionToken,
                        region: "cn-northwest-1"
                    });
                    var s3 = new AWS.S3();
                    let formData = new FormData();
                    formData.append("content", file);
                    const reader = new FileReader();
                    var content = reader.readAsArrayBuffer(file);
                    var params = {
                        ACL: "public-read",
                        Bucket: "cedsi",
                        Body: formData.get("content"),
                        Key: "course/" + config.id + "." + file.type.split("/")[1],
                        ContentType: file.type,
                        Metadata: { uploader: window.localStorage.getItem("user") }
                    };
                    s3.putObject(params, function (err, data) {
                        if (err) {
                            console.log(err, err.stack);
                        } else {
                            console.log(data);
                            if (data.hasOwnProperty("ETag")) {
                                that.$toast.success({ message: '上传成功' })
                                setTimeout(function () {
                                    that.$router.push({ path: "/dashboard" });
                                }, 1000);
                            } else {
                                alert("上传失败!");
                            }
                        }
                    });
                };
                this.postFormData(
                    {
                        name: this.name,
                        introduction: this.description,
                        type: this.file.type.split("/")[1]
                    },
                    postImgToS3
                );
            },
            postFormData(formData, postImgToS3) {
                let file = this.file;
                instance
                    .post("", formData, {
                        headers: { Authorization: localStorage.getItem("idToken") }
                    })
                    .then(res => {
                        console.log(res);
                        postImgToS3(res.data, file);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        created: function () {
            this.courseId = this.$route.query.courseId
            this.chapterId = this.$route.query.chapterId
        }
    };
</script>
      
<style scoped>
    #addCourse {
    width: 98%;
    margin: 0 auto;
    padding-top: 30px;
    }
    #addCourse .upload {
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    }
    #addCourse .upload-title {
    color: #606266;
    display: block;
    text-align: right;
    width: 80px;
    height: 40px;
    float: left;
    line-height: 40px;
    }
    #addCourse .upload-input {
    width: 300px;
    height: 40px;
    border-radius: 5px;
    margin-left: 10px;
    padding-left: 10px;
    }
    #addCourse .upload-input:hover {
    border: 1px solid #66b1ff;
    }
    #addCourse .upload-input:focus {
    outline: none;
    }
    #addCourse .upload-textarea {
    border: 1px solid #409eff;
    border-radius: 5px;
    margin-left: 10px;
    padding: 10px;
    }
    #addCourse .upload-height {
    height: 190px;
    }
    #addCourse .upload-textarea:hover {
    border: 1px solid #66b1ff;
    }
    #addCourse .upload-textarea:focus {
    outline: none;
    }
    #addCourse .outside[data-v-5567b275] {
    width: 300px !important;
    height: 40px !important;
    margin-left: 10px !important;
    }
    #addCourse .inputBox[data-v-5567b275] {
    height: 35px !important;
    font-size: 14px !important;
    width: 230px !important;
    }
    #addCourse .dropdown-menu {
    left: 100px !important;
    }
    #addCourse .upload-footer {
    width: 100%;
    text-align: center;
    }
    #addCourse .upload-btn {
    background-color: #409eff;
    color: #fff;
    margin-left: 10px;
    }
    #addCourse .upload-btn:hover {
    color: #fff;
    }
    #addCourse .upload-btn:focus {
    outline: none;
    color: #fff;
    }
    #addCourse .upload-cover-btn {
    margin-left: 10px;
    width: 80px;
    height: 35px;
    display: inline-block;
    background-color: #409eff;
    color: #fff;
    border-radius: 5px;
    line-height: 35px;
    text-align: center;
    }
    #addCourse input[type="file"] {
    width: 80px;
    height: 35px;
    position: relative;
    top: -35px;
    }
    #addCourse .upload-cover-img {
    display: inline-block;
    border: 1px dashed #dcdfe6;
    width: 290px;
    height: 150px;
    margin-left: 10px;
    border-radius: 5px;
    background-color: #f5f7fa;
    }
    #addCourse .cover-image {
    width: 100%;
    height: 100%;
    }
    .right{
    border: 1px solid #409eff;
    }
    .err{
    border: 1px solid red;
    }
</style>