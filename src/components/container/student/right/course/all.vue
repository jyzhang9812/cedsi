<template>
    <div id='allCourse'>
        <dialog @click="myVideo = true">
            <video width="320" height="240" controls>
                <source :src="videosrc" type="video/mp4" media="screen and (min-width:320px)">
            </video>
        </dialog>
        <div class="searchBar">
            <el-row type="flex" justify="space-between">
                <!-- 搜索框 -->
                <el-col :span="10">
                    <el-input class="searchBox" placeholder="课程名..." v-model="input" @keyup.enter.native="searchEnterFun">
                        <i slot="suffix" class="el-input__icon el-icon-search" @click="searchData"></i>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="warning"><a :href='scratch'>开始创作</a></el-button>
                </el-col>
            </el-row>
        </div>
        <!-- <el-row type="flex" justify="center">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="item.item" :name="item.name" v-for="(item,index) in items" :key="index">用户管理
                </el-tab-pane>
            </el-tabs>
        </el-row> -->
        <div class="courseCard">
            <el-row :gutter="30">
                <el-col :span="8" v-for="(item,index) in currentList" :key="index">
                    <div class="inside">
                        <img :src="item.COVER" alt="" />
                        <div class="hide">
                            <h3>课程简介</h3>
                            <p>{{item.INTRO}}</p>
                        </div>
                    </div>
                    <el-row type="flex" justify="space-between" style="margin-top: 5px;">
                        <el-col :offset="1"><span class="title">{{item.COURSE_NAME}}</span></el-col>
                        <el-col>
                            <el-row>
                                <el-col :span="10">
                                    <el-button type="success" plain size="small" data-toggle="modal"
                                        data-target="#myVideo" @click='changeCourseNum(index)'>试听
                                    </el-button>
                                </el-col>
                                <el-col :span="12">
                                    <el-button type="primary" plain size="small" @click='jmpPay(index)'>
                                        {{item.PRICE!=0?'购买':'学习'}}课程</el-button>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <el-pagination class="pagination" :page-size="limit" background layout="prev, pager, next"
            :total="tableData.length" @current-change="handlePageChange" @prev-click="handlePageChange"
            @next-click="handlePageChange">
        </el-pagination>
    </div>
</template>


<script>
    import { mapState } from 'vuex'
    export default {
        name: "courseCard",
        data() {
            return {
                input:'',
                currentList: [],
                limit: 6,
                courseNum: 0,
                myVideo: false,
                videosrc: "",
                activeName: '',
                // items: [
                //     { item: '热门课程', name: 'hot' },
                //     { item: '人工智能', name: 'AI' },
                //     { item: '超维数学', name: 'math' },
                //     { item: '编程类', name: 'programme' },
                // ],
            };
        },
        methods: {
            searchEnterFun:function(e){
                 var keyCode = window.event? e.keyCode:e.which;
                 if(keyCode == 13){
                     this.searchData();
                 }

            },
            searchData() {
                let value = this.input;
                let tableList = this.tableData;
                if (value === "") return tableList;
                let restTableList = tableList.slice(0);
                for (let i = 0, j = restTableList.length; i < j; i++) {
                    if (!new RegExp(value).test(restTableList[i]["COURSE_NAME"])) {
                        restTableList.splice(i, 1);
                        j -= 1;
                        i -= 1;
                    }
                }
                this.currentList = restTableList;
            },
            handlePageChange(pageIndex) {
                console.log(this.tableData)
                let start = (pageIndex - 1) * this.limit;
                let end = start + this.limit;
                this.currentList = this.tableData.slice(start, end);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            changeCourseNum(index) {
                this.courseNum = index;
                this.$store.dispatch('getCourseDetail', this.currentList[index].ID).then(() => {
                    this.videosrc = this.$store.state.pointList[0].videoSrc
                    console.log(this.videosrc)
                })
                this.myVideo = true;
            },
            jmpPay(index) {
                if (this.currentList[index].PRICE != 0) {
                    this.$router.push({ path: '/payment', query: { id: this.currentList[index].ID, type: 2 } })
                } else {
                    let allid = {
                        id: this.currentList[index].ID,
                        // orderId: '000',
                        // cover: this.currentList[index].COVER
                    }
                    this.$store.dispatch('postCourseId', allid).then(() => {
                        this.$router.push({ path: '/dashboard/coursemap', query: { id: this.currentList[index].ID } })
                    })
                }
            },

        },
        computed: {
            ...mapState({
                tableData: state => state.allCourseList,
                scratch: state => state.scratch,
            }),
        },
        created() {
            this.$store.commit('updateLoading', true)
            this.$store.dispatch('getCourse').then(() => {
                this.$store.dispatch('getAllCourse')
            });
            console.log(this.tableData)
        },
        mounted() { this.handlePageChange(1); },
    }
</script>
<style>
    .searchBar {
        background-color: #00bcd4;
        color: #fff;
        width: 100%;
        padding: 30px
    }

    .searchBox input.el-input__inner {
        background: #17788e;
        border: none;
        color: #fff;
    }

    a {
        text-decoration: none;
        color: #fff;
    }

    .courseCard {
        padding-left: 20px;
    }

    img {
        width: 100%;
        border-radius: 8%;
        height: 100%;
    }

    .title {
        line-height: 2;
        color: #000000;
    }

    .inside {
        width: 100%;
        height: 220px;
        position: relative;
        border-radius: 8%;
        box-shadow: 1px 1px 6px #5C5C5C;
        margin-top: 30px;
        margin-bottom: 10px;
    }

    .hide {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(46, 45, 45, 0.6);
        top: 0;
        left: 0;
        border-radius: 8%;
        opacity: 0;
        text-align: center;
        font-size: 13px;
        overflow: auto;
    }

    .hide::-webkit-scrollbar {
        width: 0px;
    }

    .hide p {
        display: inline-block;
        padding: 0 25px 0 25px;
        line-height: 1.5;
    }

    .inside:hover {
        transform: scale(1.02);
    }

    .inside:hover .hide {
        opacity: 1;
        transform: scale(1.02);
    }
</style>