<template>
    <div class="body">
        <div class="course-nav">
            <button v-for="(course,index) in courseList" :key="index" :class="course.isActive==true?'course-active-btn course-btn':'course-inactive-btn course-btn'" @click="changeCourse(index)">{{course.name,}}</button>
        </div>
        <div>
            <button class="btn btn-clear" @click='gotoUpload'>上传视频</button>
        </div>
        <div class="outside">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th v-for="(th, index) in tableTitle" :key="index" class="title">{{th}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(video, seq) in currentList" :key="seq" class="content">
                        <td>{{seq + 1}}</td>
                        <td>{{video.chapterName}}</td>
                        <td style="width:400px">{{video.introduction}}</td>
                        <td>{{video.date}}</td>
                        <td>{{video.uploadAdmin}}</td>
                        <td>
                            <button class="btn btn-clear">编辑</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <pagination :num="videoData.length" @getNew="changeTablePages" :limit="limit">
            </pagination>
        </div>
    </div>
</template>

<script>
    import Pagination from "../utils/pagination";
    import globalAxios from 'axios';
    import fs from 'fs';
    import AWS from 'aws-sdk'

    export default {
        name: "videos",
        components: { Pagination },
        data() {
            return {
                courseList:[
                    {
                        name:"第一节课",
                        isActive:false
                    },
                    {
                        name:"第二节课",
                        isActive:false
                    },
                    {
                        name:"第三节课",
                        isActive:false
                    }
                ],
                file: null,
                limit: 10,
                fileName: '',
                videoData: [
                    {
                        chapterName:"大炮打僵尸--僵尸移动",
                        introduction:"本节课主要是控制一个僵尸进行移动，其中会学到【移动10步】、【面向90度】、【移到x：0 y：0】、【重复执行10】、【等待1秒】和【下一个造型】等6个程序模块。通过这6个程序模块的组合使用，模拟单个僵尸入侵我们的小木屋的过程。",
                        date:"2019-01-10 13:42:46",
                        uploadAdmin:"超级管理员"
                    },
                    {
                        chapterName:"大炮打僵尸--僵尸移动",
                        introduction:"本节课主要是控制一个僵尸进行移动，其中会学到【移动10步】、【面向90度】、【移到x：0 y：0】、【重复执行10】、【等待1秒】和【下一个造型】等6个程序模块。通过这6个程序模块的组合使用，模拟单个僵尸入侵我们的小木屋的过程。",
                        date:"2019-01-10 13:42:46",
                        uploadAdmin:"超级管理员"
                    },
                    {
                        chapterName:"大炮打僵尸--僵尸移动",
                        introduction:"本节课主要是控制一个僵尸进行移动，其中会学到【移动10步】、【面向90度】、【移到x：0 y：0】、【重复执行10】、【等待1秒】和【下一个造型】等6个程序模块。通过这6个程序模块的组合使用，模拟单个僵尸入侵我们的小木屋的过程。",
                        date:"2019-01-10 13:42:46",
                        uploadAdmin:"超级管理员",
                    }
                    
                ],
                tableTitle: [
                    "序号",
                    "课程名称",
                    "操作说明",
                    "上传时间",
                    "创建人",
                    "操作"
                ],
                currentList: []
            }
        },
        methods: {
            popModal(option) {
                console.log(option);
                if (option === "view") {
                    // 预览
                } else if (option === "choose") {
                    // 选择题目
                } else if (option === "insert") {
                    // 插入题目
                }
            },
            changeTablePages(value) {
                this.currentList = this.videoData.slice(value, value + this.limit);
            },
            gotoUpload(){
                this.$router.replace({ path: '/Admin/uploadVideo' })
            },
            changeCourse(index){
                console.log(index);
                for(var i=0;i<this.courseList.length;i++){
                    this.courseList[i].isActive=false
                }
                this.courseList[index].isActive=true
            },
            
        },
        mounted() {
            this.changeTablePages(0);
        },
    }
</script>

<style scoped>
    .body {
        font-size: 12px;
        color: #606266;
        width: 98%;
        margin: 0 auto;
    }
    .course-nav{
        width: 100%;
        height: 50px;
        text-align: center;
    }
    .course-btn{
        font-size: 14px;
        margin-right:10px;
        width: 100px;
        height: 40px;
        line-height: 35px;
        border-radius: 30px;
        color: #fff
    }
    .course-btn:focus{
        outline: none;
    }
    .course-inactive-btn{
        background-color: #eee;
        border: 1px solid #eee;
        color: #666;
    }
    .course-active-btn{
        background-color: #409eff;
        border: 1px solid #409eff;
    }

    .title {
        text-align: center;
    }

    .content td {
        line-height: 23px;
    }

    table tr {
        text-align: center !important;
    }

    table td {
        vertical-align: middle !important;
    }

    .outside {
        margin-top: 20px;
    }

    .operation {
        color: #409eff;
        margin: 0 3px;
        cursor: pointer;
    }

    .btn {
        background: #409eff;
        color: #fff;
        height: 30px;
        border-radius: 5px;
        font-size: 12px;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    .btn:focus {
        outline: none;
    }

    .btn:hover {
        background: #66b1ff;
    }

    .btn-search {
        width: 54px;
    }

    .btn-clear {
        width: 88px;
    }
</style>