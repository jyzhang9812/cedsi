<!--
 * @Email: rumosky@163.com
 * @Author: rumosky
 * @Github: https://github.com/rumosky
 * @Date: 2019-11-12 20:08:53
 * @Description: 管理员角色发布活动页面
 -->
<template>
    <div id="edit-activity">
        <div class="upload">
            <span class="upload-title">活动名称:</span>
            <input class="upload-input" placeholder="请输入活动名称" v-model="activityName" />
        </div>
        <div class="upload">
            <span class="upload-title">活动地点:</span>
            <input class="upload-input" placeholder="请输入活动地点" v-model="activityAddress" />
        </div>
        <div class="upload">
            <span class="upload-title">活动时间:</span>
            <date-picker class="activity-time" tips="选择开始时间" id="datePicker" :date="startDate" @changeDate="changeDate">
            </date-picker>
        </div>
        <div class="upload">
            <span class="upload-title">活动价格:</span>
            <input class="upload-input" placeholder="请输入活动价格" v-model="activityPrice" />
        </div>
        <div class="upload">
            <span class="upload-title">上传活动封面:</span>
            <div class="upload-cover-btn">
                上传文件
                <input type="file" @change="getCoverFile($event)" style="opacity: 0" />
            </div>
        </div>
        <div class="upload upload-height">
            <span class="upload-title">预览:</span>
            <div class="upload-cover-img">
                <img id="headimage" :src="coverImageDisplay" class="cover-image" alt="" />
            </div>
        </div>
        <div class="upload">
            <span class="upload-title">上传内容图片:</span>
            <div class="upload-cover-btn">
                上传图片
                <input type="file" @change="getActivityImg($event)" style="opacity: 0" />
            </div>
        </div>
        <div class="upload upload-height">
            <span class="upload-title">预览:</span>
            <div class="upload-cover-img">
                <img id="headimage" :src="activityContentImageDisplay" class="cover-image" alt="" />
            </div>
        </div>
        <div class="upload">
            <span class="upload-title">请选择视频:</span>
            <div class="upload-cover-btn">
                选择文件
                <input type="file" @change="getVideoFile($event)" style="opacity: 0" />
            </div>
        </div>
        <div class="upload">
            <span class="upload-title">上传进度:</span>
            <div class="progress upload-process">
                <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                    :style="{width:progressWidth}">{{progressWidth}}</div>
            </div>
        </div>
        <div class="upload upload-height">
            <span class="upload-title">文件名称:</span>
            <input class="upload-input" :value="videoName" disabled />
        </div>
        <div class="upload-footer">
            <button class="btn upload-btn" @click="submit">更改</button>
            <button class="btn upload-btn" @click="cancel">取消</button>
        </div>
    </div>
</template>

<script>
    import DatePicker from "../utils/datePicker";
    import SelectInput from "../../Admin/utils/selectInput";
    import AWS from "aws-sdk";
    import globalAxios from "axios";
    import instance from "../../../../axios-auth.js";

    export default {
        name: "editactivity",
        components: {
            SelectInput,
            DatePicker
        },
        data() {
            return {
                startDate: "",
                inputData: {
                    activity: {
                        option: {},
                        list: []
                    }
                },
                activityID: "",
                activityName: "",
                activityPrice: "",
                coverImage: "",
                coverImageDisplay: "",
                coverType: "",
                activityContentImage: "",
                activityContentImageDisplay: "",
                activityContentImageType: "",
                activityAddress: "",
                progressWidth: "0%",
                videoFile: {},
                videoName: "暂未上传",
                videoType: ""
            };
        },
        methods: {
            changeDate(value) {
                this.startDate = value;
            },
            changeOption(item, id) {
                Object.keys(this.inputData).forEach(res => {
                    if (res === id) {
                        this.inputData[res].option = item;
                    }
                });
            },
            getVideoFile(event) {
                this.videoFile = event.target.files[0];
                console.log(this.videoFile);
                this.videoName = this.videoFile.name;
                this.videoType = this.videoFile.type.split("/")[1];
                this.videoSize = this.videoFile.size;
            },
            getCoverFile(event) {
                this.coverImage = event.target.files[0];
                console.log(this.coverImage);
                this.coverType = "." + this.coverImage.type.split("/")[1];
                let reader = new FileReader();
                let that = this;
                reader.readAsDataURL(this.coverImage);
                reader.onload = function (e) {
                    that.coverImageDisplay = this.result;
                };
            },
            getActivityImg(event) {
                this.activityContentImage = event.target.files[0];
                console.log(this.activityContentImage);
                this.activityContentImageType =
                    "." + this.activityContentImage.type.split("/")[1];
                let reader = new FileReader();
                let that = this;
                reader.readAsDataURL(this.activityContentImage);
                reader.onload = function (e) {
                    that.activityContentImageDisplay = this.result;
                };
            },
            cancel() {
                this.$router.replace({
                    path: "/Admin/activityManagement/"
                });
            },
            uploadTwoImages(config) {
                let missions = [];
                let rawId = config.id;
                config.id = `${rawId}1`;
                missions.push(this.uploadFileToBucket(config, this.coverImage));
                config.id = `${rawId}2`;
                missions.push(this.uploadFileToBucket(config, this.activityContentImage));
                return Promise.all(missions);
            },
            uploadVideoFile(config, file) {
                AWS.config = new AWS.Config({
                    accessKeyId: config.AccessKeyId,
                    secretAccessKey: config.SecretAccessKey,
                    sessionToken: config.SessionToken,
                    region: "cn-northwest-1"
                });
                let that = this;
                let s3 = new AWS.S3();
                let rawId = config.id;
                config.id = `${rawId}3`;
                let params = {
                    ACL: "public-read",
                    Bucket: "cedsi",
                    Body: file,
                    Key: "activity/" + config.id + "." + file.type.split("/")[1],
                    ContentType: file.type,
                    Metadata: { uploader: window.localStorage.getItem("user") }
                };
                return new Promise((resolve, reject) => {
                    s3.putObject(params, (err, data) => {
                        err ? reject(err) : resolve(data);
                    }).on("httpUploadProgress", event => {
                        let process = Number((event.loaded * 100) / event.total);
                        that.progressWidth = parseInt(process) + "%";
                    });
                });
            },
            submit() {
                let types = [this.coverType, this.activityContentImageType];
                let config = {};
                this.insertActivity(types)
                    .then(res => {
                        console.log(res);
                        config = res.data.data;
                        return this.uploadTwoImages(config);
                    })
                    .then(res => {
                        console.log(res);
                        if (this.videoFile) {
                            return this.uploadVideoFile(config, this.videoFile);
                        }
                        return Promise.resolve("activity with no video!");
                    })
                    .then(res => {
                        console.log(res);
                        this.$router.replace({ path: "/Admin/activityManagement/", query: { alert: "1" } });
                    })
                    .catch(err => { console.log(err) });
            },
            uploadFileToBucket(config, file) {
                AWS.config = new AWS.Config({
                    accessKeyId: config.AccessKeyId,
                    secretAccessKey: config.SecretAccessKey,
                    sessionToken: config.SessionToken,
                    region: "cn-northwest-1"
                });
                let s3 = new AWS.S3();
                let params = {
                    ACL: "public-read",
                    Bucket: "cedsi",
                    Body: file,
                    Key: "activity/" + config.id + "." + file.type.split("/")[1],
                    ContentType: file.type,
                    Metadata: { uploader: window.localStorage.getItem("user") }
                };
                return new Promise((resolve, reject) => {
                    s3.putObject(params, (err, data) => {
                        err ? reject(err) : resolve(data);
                    });
                });
            },
            insertActivity(types) {
                let config = {
                    headers: { Authorization: localStorage.getItem("idToken") }
                };
                let data = {
                    activityTime: this.startDate,
                    activityPlace: this.activityAddress,
                    activityTitle: this.activityName,
                    activityPrice: this.activityPrice,
                    coverType: types[0],
                    imgType: types[1],
                    videoType: this.videoType || 'null'
                };
                console.log(data);
                return instance.post("/admin/activity", data, config);
            }
        },
        computed: {
            currentPrincipal() {
                let name = this.inputData.activity.option;
                return this.inputData.activity.list.find(item => {
                    console.log(item.name);
                    console.log(name);
                    return item.name === name;
                });
            }
        },
        created: function () {
            this.activityID = this.$route.query.id;
            this.activityName=this.$route.query.title;
            this.activityAddress=this.$route.query.place;
            this.activityPrice=this.$route.query.price;
            this.coverImageDisplay=this.$route.query.cover;
            this.activityContentImageDisplay=this.$route.query.contentImg;
            this.startDate=this.$route.query.time;
            console.log(this.activityID)
        },
        mounted() { }
    };
</script>

<style>
    #edit-activity {
        width: 98%;
        margin: 0 auto;
        padding-top: 30px;
    }

    #edit-activity .upload {
        width: 100%;
        height: 50px;
        margin-bottom: 20px;
    }

    #edit-activity .upload>.outside>img {
        width: 18px;
        height: 18px;
    }

    #edit-activity .upload-title {
        color: #606266;
        display: block;
        text-align: right;
        width: 100px;
        height: 40px;
        float: left;
        line-height: 40px;
    }

    #edit-activity .upload-input {
        width: 300px;
        height: 40px;
        border-radius: 5px;
        border: 1px solid #409eff;
        margin-left: 10px;
        padding-left: 10px;
    }

    #edit-activity .upload-input:hover {
        border: 1px solid #66b1ff;
    }

    #edit-activity .upload-input:focus {
        outline: none;
    }

    #edit-activity .activity-time {
        margin-left: 10px !important;
        height: 40px !important;
        width: 300px !important;
        line-height: 40px;
    }

    #edit-activity .upload-textarea {
        border: 1px solid #409eff;
        border-radius: 5px;
        margin-left: 10px;
        padding: 10px;
    }

    #edit-activity .upload-height {
        height: 190px;
    }

    #edit-activity .upload-textarea:hover {
        border: 1px solid #66b1ff;
    }

    #edit-activity .upload-textarea:focus {
        outline: none;
    }

    #edit-activity .outside {
        width: 300px !important;
        height: 40px !important;
        margin-left: 10px !important;
    }

    #edit-activity .inputBox,
    #edit-activity .inputbox {
        height: 35px !important;
        font-size: 14px !important;
        width: 230px !important;
        text-align: inherit !important;
    }

    #edit-activity .dropdown-menu {
        left: 100px !important;
    }

    #edit-activity .upload-footer {
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
    }

    #edit-activity .upload-btn {
        background-color: #409eff;
        color: #fff;
        margin-left: 10px;
    }

    #edit-activity .upload-btn:hover {
        color: #fff;
    }

    #edit-activity .upload-btn:focus {
        outline: none;
        color: #fff;
    }

    /**/
    #edit-activity .address-input select {
        margin-left: 10px;
        font-size: 14px;
    }

    #edit-activity .upload-cover-btn {
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

    #edit-activity input[type="file"] {
        width: 80px;
        height: 35px;
        position: relative;
        top: -35px;
    }

    #edit-activity .upload-cover-img {
        display: inline-block;
        border: 1px dashed #dcdfe6;
        width: 290px;
        height: 150px;
        margin-left: 10px;
        border-radius: 5px;
        background-color: #f5f7fa;
    }

    #edit-activity .cover-image {
        width: 100%;
        height: 100%;
    }

    #edit-activity .upload-height {
        height: 190px;
    }

    #edit-activity .upload-process {
        width: 30%;
        margin-left: 10px;
        display: inline-block;
        position: relative;
        top: 10px;
    }

    #edit-activity .btn-upload-file {
        position: relative;
        top: -35px;
        margin-left: 10px;
        background-color: #2fc27e;
        border: none;
        width: 80px;
        height: 35px;
        font-size: 14px;
    }

    #edit-activity .btn-upload-file:hover {
        background-color: #2fc27ddc;
    }

    #edit-activity .editor {
        width: 800px;
        position: relative;
    }

    #edit-activity .w-e-toolbar {
        position: relative;
        left: 10px;
    }

    #edit-activity .w-e-text-container {
        position: relative;
        left: 110px;
        width: 700px;
    }

    #edit-activity .w-e-text {
        position: relative;
        top: -10px;
        background-color: #fff;
    }

    #edit-activity .upload-height2 {
        height: 350px;
    }

    #edit-activity .upload-width {
        width: 200px;
    }
</style>