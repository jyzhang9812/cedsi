<template>
    <div id="rollPic" class="container-fluid">
        <!-- 模态框（Modal） -->
        <div class="modal fade" v-if='tableData!=0' id="myHomework" data-backdrop='false' tabindex="-1" role="dialog"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body head">
                        <div class="left">
                            <iframe :src="'https://s3.cn-northwest-1.amazonaws.com.cn/ced.cedsie.com/cedScratch/player.html?projectUrl=' + currentList[num].url"></iframe>
                        </div>
                        <div class="right">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                &times;
                            </button>
                            <h3>作品名</h3>
                            <p>{{currentList[num].name}}</p>
                            <!-- <h3>作品描述</h3>
                            <p>dwqenwrehgnruy</p> -->
                            <h3>操作说明</h3>
                            <p>{{currentList[num].guide}}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <p>老师点评：{{currentList[num].teacher_remark}}</p>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
        <div class="menu">
            <button @click="tab(index)" v-for="(item,index) in items" class="tag"
                :class="{active : index==curId}">{{item.COURSE_NAME}}</button>
        </div>
        <!-- <div id="selectMenu">
            <div>
                <button @click="selectTab(index)" v-for="(item,index) in selectItems" class="tag"
                    :class="{active : index==selectId}">{{item}}</button>
            </div>
            <div style="padding-right: 20px;" @click='changeDirection'>
                <i class="fa fa-2x fa-long-arrow-up" :style="isUpload?'color:#00bcd4':'color:#ccc'"
                    aria-hidden="true"></i>
                <i class="fa fa-2x fa-long-arrow-down" :style="isUpload?'color:#ccc':'color:#00bcd4'"
                    aria-hidden="true"></i>
            </div>
        </div> -->
        <div class="row" style="margin-top: 10px">
            <div v-if='txt==true'>
                <h4>还没有做作业哦~</h4>
            </div>
            <div class="col-md-4" v-if='txt==false' v-for="(item,index) in currentList" :key="index"
                @mouseover="show(index)" @mouseleave="hidden(index)" @click='show(index)'>
                <div class="inside" data-toggle="modal" data-target="#myHomework" data-index="index">
                    <img class="img" :style="style" :src="item.img_url" />
                    <div class='details' v-show="index==i">
                        <div class="detail_item">
                            <i class="fa fa-star fa-lg" aria-hidden="true" style="color: #ffbf35"
                                v-for='j in parseInt(item.rank)'></i>
                            <i class="fa fa-star-o fa-lg" aria-hidden="true" style="color: #ffbf35"
                                v-for='j in 5-parseInt(item.rank)'></i>
                            <span>{{item.teacher_remark}}</span>
                        </div>
                    </div>
                </div>
                <div class="outside">
                    <div class="left">
                        <div class="up">
                            <img class="work_type" :src='zuopin' />
                            <h5>{{item.name}}</h5>
                        </div>
                        <div class="down">
                            <i class="fa fa-clock-o fa-lg" aria-hidden="true" style="color: #50b8ee"></i>
                            <span>{{item.time}}</span>
                        </div>
                    </div>
                    <div class="right">
                        <button v-if='item.flag==0' class="edit" data-toggle="modal" data-target="#myHomework"
                            data-index="index">查看</button>
                        <button v-if='item.flag==1' class="edit" @click='download(index)'>
                            查看
                        </button>
                        <button class="delete" @click='del(index)'>删除</button>
                    </div>
                </div>
            </div>
        </div>
        <pagination :num="tableData.length" :limit="limit" @getNew="getNew"></pagination>
    </div>
</template>


<script>
    import pagination from '../pagination.vue'
    import { mapState } from 'vuex'
    export default {
        name: 'rollPic',
        components: {
            pagination,
        },
        data() {
            return {
                txt: false,
                curId: 0,
                num: 0,
                btn: 'btn',
                btnh: 'btnhover',
                zuopin: '../' + this.$store.state.url + 'dashboard/zuopin.png',
                products: '../' + this.$store.state.url + 'dashboard/xiangmu.png',
                i: -1,
                selectItems: ['未提交', '已提交'],
                selectId: 0,
                isUpload: true,
            }
        },
        methods: {
            //下载
            download(index) {
                console.log("download")
                window.open('https://' + this.currentList[index].url);
            },
            show(index) {
                this.num = index;
                this.i = index;
                this.isShow = true;
            },
            hidden(index) {
                this.i = -1;
                this.isShow = false;
            },
            tab(index) {
                this.curId = index
                this.$store.dispatch('getWork', this.$store.state.courseList[index].ID)
                    .then(() => {
                        if (this.tableData.length == 0) {
                            this.txt = true;
                        } else {
                            this.txt = false;
                            for (let i = 0; i <= this.currentList.length; i++) {
                                this.currentList[i].time = this.timestampToTime(this.currentList[i].time)
                            }
                        }
                    })
                    .then(() => {
                        if (this.tableData.length == 0) {
                            this.txt = true
                        } else {
                            this.txt = false
                        }
                    })
            },
            selectTab(index) {
                this.selectId = index
                this.currentList = []
            },
            changeDirection() {
                this.isUpload = !this.isUpload
            },
            //换页
            getNew(value) {
                var currentPage = value / this.limit;
                this.currentPage = currentPage;
                this.$store.commit("changeWorkCurrentList", this.currentPage * this.limit)
                if (this.tableData.length == 0) {
                    this.txt = true;
                } else {
                    for (let i = 0; i <= this.currentList.length; i++) {
                        this.currentList[i].time = this.timestampToTime(this.currentList[i].time)
                    }
                }
            },
            del(index) {

            },
            timestampToTime(timestamp) {
                timestamp = String(timestamp);
                timestamp = timestamp.length == 10 ? timestamp * 1000 : timestamp * 1;
                var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + "-";
                var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
                var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
                var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
                var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
                return Y + M + D + h + m + s;
            },
        },
        created: function () {
            //let that = this.$router;
            this.style = 'height:' + (document.documentElement.clientWidth * 0.17) + 'px;'
            this.style1 = 'height:' + (document.documentElement.clientWidth * 0.17) + 'px;margin-top:-' + (document.documentElement.clientWidth * 0.17) + 'px;'
            this.$store.commit('updateLoading', true)
            this.$store.dispatch('getCourse').then(() => {
                this.$store.dispatch('getWork', this.$store.state.courseList[0].ID)
                    .then(() => {
                        if (this.tableData.length == 0) {
                            this.txt = true;
                        } else {
                            for (let i = 0; i <= this.currentList.length; i++) {
                                this.currentList[i].time = this.timestampToTime(this.currentList[i].time)
                            }
                        }
                    })
            })
        },
        computed: {
            ...mapState({
                items: state => state.courseList,
                tableData: state => state.workList,
                currentList: state => state.workCurrentList,
                limit: state => state.limit,
            }),
        },
    }
</script>


<style scoped>
    #rollPic {
        min-height: 100%;
    }

    #rollPic .menu {
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

    #rollPic .tag {
        background-color: inherit;
        color: #575757;
        padding: 15px 32px;
        margin: 10px 4px 0px;
        text-align: center;
        text-decoration: none;
        padding: 4px 10px;
        font-size: 18px;
        border: none;
        font-weight: 550;
    }

    #rollPic .tag:hover,
    #rollPic .active {
        color: #00bcd4;
    }

    #selectMenu {
        height: auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    #selectMenu .tag {
        background-color: #ccc;
        color: #fff;
        display: inline-block;
        margin: 10px;
        padding: 7px 20px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 600;
        border: none;
    }

    #selectMenu .tag:hover,
    #selectMenu button.active {
        background-color: #00bcd4;
        color: #fff;
    }

    #rollPic .col-md-4 {
        margin-top: 10px;
        margin-bottom: 10px;
        text-decoration: none;
    }

    #rollPic .img {
        border-radius: 20px;
        width: 100%;
    }

    #rollPic .inside {
        border-radius: 20px;
    }

    #rollPic .inside:hover {
        -webkit-transform: scale(1.05);
        -moz-transform: scale(1.05);
        -ms-transform: scale(1.05);
        -o-transform: scale(1.05);
        transform: scale(1.05);
        box-shadow: 0px -10px 10px 0px #ccc,
            /*上边阴影*/
            -2px 0px 10px 0px #ccc,
            /*左边阴影*/
            2px 0px 10px 0px #ccc,
            /*右边阴影*/
            0px 10px 10px 0px #ccc;
        /*下边阴影*/
    }

    #rollPic .btn {
        background: #f4f9fa;
        height: 30px;
        width: 70px;
        font-size: 12px;
        text-align: center;
        margin-right: 10px;
        margin-top: 10px;
        font-weight: bold;
    }

    #rollPic .edit {
        background: #f4f9fa;
        height: 30px;
        width: 60px;
        font-size: 12px;
        text-align: center;
        margin-right: 10px;
        margin-top: 10px;
        font-weight: bold;
        color: #50b8ee;
        border: 1px solid #50b8ee;
        border-radius: 8px;
    }

    #rollPic .edit:hover,
    #rollPic .edit:focus {
        background: #50b8ee;
        color: #f4f9fa;
    }

    #rollPic .delete {
        background: #f4f9fa;
        height: 30px;
        width: 60px;
        font-size: 12px;
        text-align: center;
        margin-right: 10px;
        margin-top: 10px;
        font-weight: bold;
        color: red;
        border: 1px solid red;
        border-radius: 8px;
    }

    #rollPic .delete:hover,
    #rollPic .delete:focus {
        background: red;
        color: #f4f9fa;
    }

    #rollPic .details {
        width: 100%;
        height: 50px;
        background-color: rgba(0, 0, 0, 0.35);
        z-index: 999;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-top: -50px;
        position: relative;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        padding-top: 20px;
    }

    #rollPic .detail_item {
        margin-left: 40px;
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        position: relative;
        border-radius: 20px;
        color: #fff;
    }

    #rollPic .outside {
        margin-top: 8px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        font-size: 12px;
        justify-content: space-between;
    }

    #rollPic .up {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 150px;
    }

    #rollPic h5 {
        margin-left: 10px;
        margin-top: 5px;
        font-weight: bold;
        color: #777;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    #rollPic span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    #rollPic .down {
        display: flex;
        flex-direction: row;
        color: #777;
    }

    #rollPic .icon {
        width: 16px;
        height: 16px;
        margin-right: 5px;
    }

    #rollPic .work_type {
        width: 34.7px;
        height: 20px;
    }

    #myHomework {
        width: 100%;
        height: auto;
        background: (255, 255, 255, .5)
    }

    #myHomework .modal-dialog {
        width: 60%;
        height: auto;
        background: (255, 255, 255, .5)
    }

    #myHomework iframe {
        width: 100%;
        height: 441px;
        margin: -25px 0 0 0;
        background-color: #fff;
        border: none;
        border-radius: inherit;
    }

    #myHomework .head {
        display: flex;
        flex-direction: row;
    }

    #myHomework .left {
        width: 65%;
        height: auto;
        margin: 20px auto;
        border-radius: 20px;
        overflow: hidden;
        border: 2px solid #ccc;
    }

    #myHomework .right {
        width: 30%;
        height: 441px;
        overflow-x: scroll;
        margin-left: 5%;
    }

    #myHomework .right .close {
        position: relative;
        top: 0;
        right: 0;
    }

    #myHomework .right p {
        color: #777;
        font-size: 16px;
    }

    #myHomework .right h3 {
        color: #50b8ee;
    }
</style>