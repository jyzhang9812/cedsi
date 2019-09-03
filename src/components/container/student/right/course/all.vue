<template>
    <div id='allCourse' class="container-fluid layout">
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="courseModal" data-backdrop='false' tabindex="-1" role="dialog"
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
                                    <h3>course name</h3>
                                    <p>drtykurgvhttvhtvrtydkacbwdhcevbehv ehc hevbfhwbqklebcqhebqh vq vq vqe
                                        vqehwebihcbweruvbrwihvbwreivbwirvbwrvbwhbvwrhbwrivbrhv</p>
                                </div>
                            </div>
                            <button type="button" class="btn btn-default" data-dismiss="modal">
                                试听
                            </button>
                            <button type="button" class="btn btn-primary">
                                购买课程
                            </button>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <div class="menu">
            <button @click="tab(index)" v-for="(item,index) in items" class="tag"
                :class="{active : index===curId}">{{item.item}}</button>
        </div>
        <div class="row">
            <div class="col-md-4" v-for="(item,index) in currentList" :key="index" data-toggle="modal"
                data-target="#courseModal" @click='changeCourseNum(index)'>
                <!-- <router-link :to="{name:'coursemap',params:{id:item.ID}}" class="box"> -->
                <div class="inside" @mouseover="show(index)" @mouseleave="hidden(index)">
                    <img class="img" :style="style" :src="item.COVER">
                    <div :style="style1" style='display: flex;' v-show="index!=i">
                        <div class="lock_circle">
                            <i class="fa fa-lock fa-5x" style='position:relative;top:10px' aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="details" :style="style1" v-show="index==i">
                        <h5>课程简介</h5>
                        <p>asdvtebtrdntfsdfsd vfrvffvd</p>
                    </div>
                </div>
                <div class="outside">
                    <h4>{{item.NAME}}</h4>
                    <div class="right">
                        <button :class="(index==i)?'btnh btn_green':'btn'">试听</button>
                        <button :class="(index==i)?'btnh':'btn'">开始学习</button>
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
    import globalAxios from 'axios'
    export default {
        name: "courseCard",
        components: {
            pagination,
        },
        data() {
            return {
                clickNum: 0,
                courseNum:0,
                items: [
                    { item: '热门课程' },
                    { item: '人工智能' },
                    { item: '超维数学' },
                    { item: '编程类' },
                ],
                curId: 0,
                limit: 6,
                currentList: [],
                tableData: [],
                isShow: false,
                inside_detail: [],
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
            },
            getNew(value) {
                this.currentList = this.tableData.slice(value, value + this.limit);
            },
            tab(index) {
                this.curId = index;
            },
        },
        created: function () {
            // let _this = this.$router;
            this.style = 'height:' + (document.documentElement.clientWidth * 0.17) + 'px;'
            this.style1 = 'height:' + (document.documentElement.clientWidth * 0.17) + 'px;margin-top:-' + (document.documentElement.clientWidth * 0.17) + 'px;'

            $(document).on("show.bs.modal", ".modal", function () {
                // $(this).draggable({
                //     handle: ".modal-header"
                // });
                $(this).css("overflow-y", "scroll");
                $("#courseModal").append("<div class='modal-backdrop fade in' id='courseBackdrop'> </div>");
            })
            $(document).on("hide.bs.modal", ".modal", function () {
                $('#courseBackdrop').remove();
            })
            var token = window.localStorage.getItem('idToken')
            globalAxios.get('https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/student/courses',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }
            ).then(response => {
                var arr = [];
                console.log(response);
                for (var i = 0; i < response.data.length; i++) {
                    arr.push(response.data[i])
                }
                this.inside_detail = arr;
                this.tableData = this.inside_detail;
                this.getNew(0);
                // return response.json();
            },
                error => {
                    // this.$router.push({path:'/404'})
                    console.log(error);
                })
        },

        mounted() {
            this.tableData = this.inside_detail;
            this.getNew(0);
        }
    }
</script>


<style scoped>
    .layout {
        margin: 0;
    }

    .menu {
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

    .tag {
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

    .tag:hover,
    .active {
        color: #00bcd4;
    }

    .row {
        width: 100%;
        padding-top: 20px;
        display: flex;
        flex-wrap: wrap;
        float: left;
    }

    .col-md-4 {
        margin-top: 10px;
        margin-bottom: 10px;
        text-decoration: none;
    }

    .img {
        border-radius: 20px;
        width: 100%;
    }

    .inside {
        border-radius: 20px;
        color: #fff;
        text-decoration: none;
    }

    .inside:hover {
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

    .btn {
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

    .btnh,
    .btn:hover {
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

    .right .btn:first-child {
        background: #fff;
        color: #94d183;
        border: 1px solid #94d183;
    }

    .btn_green,
    .right .btn:first-child:hover {
        color: #fff;
        background: #94d183;
    }

    .details {
        width: 100%;
        background-color: rgba(0, 0, 0, 0.55);
        z-index: 999;
        text-align: center;
        position: relative;
        border-radius: 20px;
        padding-top: 20px;
    }

    .details p {
        width: 80%;
        height: 80%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin: 0;
    }

    .lock_circle {
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

    .outside {
        margin-top: 8px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        font-size: 12px;
        justify-content: space-between;
    }

    h4 {
        margin-top: 15px;
        margin-left: 10px;
        color: #25293a;
    }

    .icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    .courseModal-dialog {
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

    .courseModal-content .close {
        position: relative;
        top: 10px;
        right: 20px;
        z-index: 1051;
    }

    .courseModal-content {
        width: 85%;
        height: auto;
        margin: 0 auto;
        position: relative;
    }

    .courseModal-body {
        padding: 20px;
        display: flex;
        flex-direction: row;
    }

    .courseModal_left {
        width: 68%;
        height: 100%;
        padding: 20px;
        background-color: #fbfbfb;
        border-radius: 4px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    }

    .courseModal_right {
        padding: 20px;
        width: 32%;
        height: 100%;
    }

    .courseModal_right .courseInfo {
        width: 100%;
        height: auto;
        border-bottom: 1px solid #e7e7e7;
    }

    .courseModal_right img {
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

    .imgList_bg {
        min-height: 150px;
        overflow-x: scroll;
        overflow-y: hidden;
    }

    ul#imgList {
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
</style>