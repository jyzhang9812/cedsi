<template>
    <div id='allCourse' class="container-fluid layout">
        <!-- 模态框（Modal） -->
        <!-- <div class="modal fade" id="courseModal" data-backdrop='false' tabindex="-1" role="dialog"
            aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog courseModal-dialog">
                <div class="modal-content courseModal-content">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×
                    </button>
                    <div class="modal-body courseModal-body">
                        <div class='courseModal_left'>
                            <div class="img" id="bigImg">
                                <img :src="superurl[clickNum].url" alt="">
                                <p>{{superurl[clickNum].text}}</p>
                            </div>
                            <div class="imgList_bg">
                                <ul id="imgList">
                                    <li class="imgItem" v-for="(item,index) in superurl" :key="index"
                                        @click='changeClickNum(index)'>
                                        <img class="img" :src="item.url">
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class='courseModal_right'>
                            <div class="courseInfo">
                                <img :src="currentList[courseNum].COVER" alt="">
                                <div>
                                    <h3>{{currentList[courseNum].COURSE_NAME}}</h3>
                                    <p>drtykurgvhttvhtvrtydkacbwdhcevbehv ehc hevbfhwbqklebcqhebqh vq vq vqe
                                        vqehwebihcbweruvbrwihvbwreivbwirvbwrvbwhbvwrhbwrivbrhv</p>
                                </div>
                            </div>
                            <button type="button" class="btn btn-default" data-toggle="modal" data-target="#myVideo">
                                试听
                            </button>
                            <button type="button" class="btn btn-primary" @click='jmpPay'>
                                解锁课程
                            </button>
                        </div>
                    </div>
                </div>  /.modal-content
            </div>  /.modal-dialog
        </div>-->
        <!-- /.modal -->
        <!-- 视频播放 -->
        <div class="modal fade" id="myVideo" data-backdrop='false' tabindex="-1" role="dialog"
            aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content video-bck">
                    <div class="modal-header header-height">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"
                            @click="deletevideo">&times;</button>
                    </div>
                    <div class="modal-box">
                        <Media :autoplay="false" :kind="'video'" :controls="true" :src="videosrc"
                            style="height: 400px;width: 700px;" @pause="handle()"></Media>
                    </div>
                </div>
            </div>
        </div>

        <div class="menu">
            <button @click="tab(index)" v-for="(item,index) in items" class="tag" :key="index"
                :class="{active : index===curId}">{{item.item}}</button>
        </div>
        <div class="row">
            <div class="col-md-4" v-for="(item,index) in currentList" :key="index" data-toggle="modal"
                data-target="#myVideo" @click='changeCourseNum(index)'>
                <!-- <router-link :to="{name:'coursemap',params:{id:item.ID}}" class="box"> -->
                <div class="inside" @mouseover="show(index)" @mouseleave="hidden(index)">
                    <img class="img" :style="style" :src="item.COVER">
                    <div :style="style1" style='display: flex;' v-show="item.PRICE!=0">
                        <div class="lock_circle">
                            <i class="fa fa-lock fa-5x" style='position:relative;top:10px' aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="details" :style="style1" v-show="index==i">
                        <h5>课程简介</h5>
                        <p>{{item.INTRO}}</p>
                    </div>
                </div>
                <div class="outside">
                    <h4>{{item.COURSE_NAME}}</h4>
                    <div class="right">
                        <button :class="(index==i)?'btnh btn_green':'btn'">试听</button>
                        <button :class="(index==i)?'btnh':'btn'" @click='jmpPay(index)'>学习课程</button>
                    </div>
                </div>
                <!-- </router-link> -->
            </div>
        </div>
        <pagination :num="tableData.length" :limit="limit" @getNew="getNew"></pagination>
    </div>
</template>


<script>
    import pagination from '../pagination.vue'
    import Media from "@dongido/vue-viaudio";
    import { mapState } from 'vuex'
    export default {
        name: "courseCard",
        components: {
            pagination,
        },
        data() {
            return {
                clickNum: 0,
                courseNum: 0,
                videosrc: "",
                items: [
                    { item: '热门课程' },
                    { item: '人工智能' },
                    { item: '超维数学' },
                    { item: '编程类' },
                ],
                curId: 0,
                isShow: false,
                i: -1,
                superurl: [
                    {
                        url: 'https://www.tynker.com/image/dashboard/student/learn/tutorials/nasa-design-a-mission-patch.png?width=600&height=400&mode=cover&format=jpg&quality=75&cache=1m&v=1',
                        text: 'Carve a path through the Arctic',
                    },
                    {
                        url: 'https://www.tynker.com/image/hour-of-code/2017/mod-minecraft.png?width=600&height=400&mode=cover&format=jpg&quality=75&cache=1m&v=1',
                        text: 'Carve a path through the Arctic',
                        img: '',
                    },
                    {
                        url: 'https://www.tynker.com/image/hour-of-code/2018/crystal-clash/crystal-clash.png?width=600&height=400&mode=cover&format=jpg&quality=75&cache=1m&v=1',
                        img: '',
                        text: 'Carve a path through the Arctic',
                    },
                    {
                        url: 'https://www.tynker.com/image/hour-of-code/2016/spin-draw/spin-draw-1.png?width=600&height=400&mode=cover&format=jpg&quality=75&cache=1m&v=1',
                        text: 'Carve a path through the Arctic',
                        img: '',
                    },
                    {
                        url: 'https://www.tynker.com/ide/imgs/templates/new.png?width=600&height=400&mode=cover&format=jpg&quality=75&cache=1m&v=1',
                        text: 'Carve a path through the Arctic',
                        img: '',
                    },
                    {
                        url: 'https://www.tynker.com/image/hour-of-code/2017/dragon-blast/dragon-blast-1.png?width=600&height=400&mode=cover&format=jpg&quality=85&cache=1m&v=1',
                        text: 'Carve a path through the Arctic',
                        img: '',
                    },
                ],
            };
        },
        methods: {
            show(index) {
                this.i = index;
                this.isShow = true;
            },
            hidden(index) {
                this.i = -1;
                this.isShow = false;
            },
            changeClickNum(index) {
                this.clickNum = index;
            },
            changeCourseNum(index) {
                this.courseNum = index;
                this.$store.dispatch('getCourseDetail',this.currentList[index].ID).then(()=>{
                    this.videosrc = this.$store.state.pointList[0].videoSrc
                })
            },
            jmpPay(index) {
                if(this.currentList[index].PRICE!=0){
                this.$router.push({path:'/payment',query: { id: this.currentList[index].ID,type:1} })
                }else{
                this.$router.push({path:'/dashboard/coursemap',query: { id: this.currentList[index].ID} })
                }
            },
            handle() {
                console.log("Video paused!, playing in 2 sec...");
                setTimeout(() => {
                    this.$refs.coursevideo.play();
                }, 2000);
            },
            deletevideo() {
                this.videosrc = "";
            },
            //换页
            getNew(value) {
                var currentPage = value / this.limit;
                this.currentPage = currentPage;
                this.$store.commit("changeAllCurrentList", this.currentPage * this.limit)
            },
            tab(index) {
                this.curId = index;
            },
        },
        created: function () {
            // let _this = this.$router;
            this.style = 'height:' + (document.documentElement.clientWidth * 0.17) + 'px;'
            this.style1 = 'height:' + (document.documentElement.clientWidth * 0.17) + 'px;margin-top:-' + (document.documentElement.clientWidth * 0.17) + 'px;'

            //模态框遮罩层手动开闭
            // $(document).on("show.bs.modal", ".modal", function () {
            //     $(this).css("overflow-y", "scroll");
            //     $("#courseModal").append("<div class='modal-backdrop fade in' id='courseBackdrop'> </div>");
            // })
            // $(document).on("hide.bs.modal", ".modal", function () {
            //     $('#courseBackdrop').remove();
            // })

            this.$store.commit('updateLoading', true)
            this.$store.dispatch('getCourse').then(()=>{
                this.$store.dispatch('getAllCourse')
            })
        },
        computed: {
            ...mapState({
                tableData: state => state.allCourseList,
                currentList: state => state.allCourseCurrentList,
                limit: state => state.limit,
            }),
        }
    }
</script>


<style scoped>
    #allCourse .layout {
        margin: 0;
    }

    #allCourse .menu {
        background-color: #f4f9fa;
        height: auto;
        padding-top: 10px;
        padding-left: 40px;
        padding-right: 40px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    #allCourse .tag {
        background-color: #f4f9fa;
        color: #575757;
        padding: 15px 32px;
        margin: 10px 4px 0px;
        text-align: center;
        text-decoration: none;
        padding: 4px 10px;
        font-size: 16px;
        border: none;
        font-weight: 550;
    }

    #allCourse .tag:hover,
    #allCourse .active {
        color: #00bcd4;
    }

    #allCourse .row {
        width: 100%;
        padding-top: 20px;
        display: flex;
        flex-wrap: wrap;
        float: left;
    }

    #allCourse .col-md-4 {
        margin-top: 10px;
        margin-bottom: 10px;
        text-decoration: none;
    }

    #allCourse .img {
        border-radius: 20px;
        width: 100%;
    }

    #allCourse .inside {
        border-radius: 20px;
        color: #fff;
        text-decoration: none;
    }

    #allCourse .inside:hover {
        -webkit-transform: scale(1.05);
        -moz-transform: scale(1.05);
        -ms-transform: scale(1.05);
        -o-transform: scale(1.05);
        transform: scale(1.05);
        box-shadow: 0px -10px 10px 2px #457e72
            /*上边阴影*/
            -2px 0px 10px 2px #457e72,
            /*左边阴影*/
            2px 0px 10px 2px #457e72,
            /*右边阴影*/
            0px 10px 10px 2px #457e72;
        /*下边阴影*/
    }

    #allCourse .btn {
        color: #50b8ee;
        background: #fff;
        border: 1px solid #50b8ee;
        height: 35px;
        width: 90px;
        font-size: 13px;
        text-align: center;
        margin-right: 10px;
        margin-top: 10px;
        font-weight: bold;
    }

    #allCourse .btnh,
    #allCourse .btn:hover {
        height: 35px;
        width: 90px;
        color: #fff;
        background: #50b8ee;
        font-size: 15px;
        text-align: center;
        margin-right: 10px;
        margin-top: 10px;
        font-weight: bold;
        border-radius: 8px;
        text-decoration: none;
    }

    #allCourse .right .btn:first-child {
        background: #fff;
        color: #94d183;
        border: 1px solid #94d183;
    }

    #allCourse .btn_green,
    #allCourse .right .btn:first-child:hover {
        color: #fff;
        background: #94d183;
    }

    #allCourse .details {
        width: 100%;
        background-color: rgba(0, 0, 0, 0.55);
        z-index: 999;
        text-align: center;
        position: relative;
        border-radius: 20px;
        padding-top: 20px;
    }

    #allCourse .details p {
        width: 80%;
        height: 80%;
        text-align: center;
        margin: 0 auto;
    }

    #allCourse .lock_circle {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.55);
        border: 3px solid #fff;
        z-index: 999;
        margin: 0 auto;
        text-align: center;
        position: relative;
        top: 30%;
    }

    #allCourse .outside {
        margin-top: 8px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        font-size: 12px;
        justify-content: space-between;
    }

    #allCourse h4 {
        margin-top: 15px;
        margin-left: 10px;
        color: #25293a;
    }

    #allCourse .icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    #allCourse .courseModal-dialog {
        width: 100%;
        z-index: 1050;
    }

    #courseModal p,
    #courseModal {
        color: #000;
        word-wrap: break-word;
        margin-bottom: 1rem;
        line-height: 1.6;
        text-rendering: optimizeLegibility;
    }

    #allCourse .courseModal-content .close {
        position: relative;
        top: 10px;
        right: 20px;
        z-index: 1051;
    }

    #allCourse .courseModal-content {
        width: 85%;
        height: auto;
        margin: 0 auto;
        position: relative;
    }

    #allCourse .courseModal-body {
        padding: 20px;
        display: flex;
        flex-direction: row;
    }

    #allCourse .courseModal_left {
        width: 68%;
        height: 100%;
        padding: 20px;
        background-color: #fbfbfb;
        border-radius: 4px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    }

    #allCourse .courseModal_right {
        padding: 20px;
        width: 32%;
        height: 100%;
    }

    #allCourse .courseModal_right .courseInfo {
        width: 100%;
        height: auto;
        border-bottom: 1px solid #e7e7e7;
    }

    #allCourse .courseModal_right img {
        max-width: 100%;
        height: auto;
    }

    #bigImg {
        width: 100%;
        height: auto;
    }

    #bigImg img {
        width: 100%;
        object-fit: cover;
    }

    #bigImg p {
        color: #fff;
        background-color: #2e3347;
        padding: 10px;
    }

    #allCourse .imgList_bg {
        min-height: 150px;
        overflow-x: scroll;
        overflow-y: hidden;
    }

    #allCourse ul#imgList {
        margin: 0;
        list-style-type: none;
        width: 100%;
        height: 100%;
        display: -webkit-box;
        padding: 15px 0 10px 0;
    }

    ul#imgList li {
        width: 25%;
        height: 100%;
        margin-right: 10px;
    }

    ul#imgList li img {
        border-radius: 0;
        width: 100%;
        min-height: 100%;
        object-fit: cover;
    }

    /*视频*/
    #allCourse .video-js {
        height: 600px;
        width: 800px;
    }

    #allCourse .vjs-tech {
        height: auto;
        width: 100%;
    }

    #allCourse .video-bck {
        height: 400px;
        width: 700px;
    }

    #allCourse .video-name {
        margin-bottom: 10px;
        display: inline-block;
    }
</style>