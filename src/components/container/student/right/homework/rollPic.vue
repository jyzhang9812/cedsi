<template>
    <div class="container-fluid">
        <div class="menu">
            <button @click="tab(index)" v-for="(item,index) in items" class="tag"
                :class="{active : index==curId}">{{item.item}}</button>
        </div>
        <div class="row" style="margin-top: 10px">
            <div class="col-md-4" v-for="(item,index) in currentList" :key="index"
                @mouseover="show(index)" @mouseleave="hidden(index)">
                <div class="inside">
                    <img class="img" :style="style" :src="item.img_url" />
                    <div class='details' v-show="index==i">
                        <div class="detail_item">
                            <img class="icon" v-for='j in parseInt(item.rank)' :src=star_active />
                            <img class="icon" v-for='j in 5-parseInt(item.rank)' :src=star />
                            <span> {{item.teacher_remark}}</span>
                        </div>
                    </div>
                </div>
                <div class="outside">
                    <div class="left">
                        <div class="up">
                            <img class="work_type" :src='curId==0?zuopin:products' />
                            <h5>{{item.name}}</h5>
                        </div>
                        <div class="down">
                            <img class="icon" :src=clock />
                            <span>{{item.time}}</span>
                        </div>
                    </div>
                    <div class="right">
                        <button class="edit">编辑</button>
                        <button class="delete" v-on:click='del(index)'>删除</button>
                    </div>
                </div>
            </div>
        </div>
        <pagination :num="tableData.length" :limit="limit" @getNew="getNew"></pagination>
    </div>
</template>


<script>
    import pagination from '../pagination.vue'
    import globalAxios from 'axios'
    export default {
        name: 'rollPic',
        components: {
            pagination,
        },
        data() {
            return {
                curId: 0,
                items: [{ item: '作业' }, { item: '项目' },],
                limit: 6,
                currentList: [],
                tableData: [],
                btn: 'btn',
                btnh: 'btnhover',
                clock: '../' + this.$store.state.url + 'dashboard/clock.png',
                zuopin: '../' + this.$store.state.url + 'dashboard/zuopin.png',
                products: '../' + this.$store.state.url + 'dashboard/xiangmu.png',
                star_active: '../' + this.$store.state.url + 'dashboard/star_active.png',
                star: '../' + this.$store.state.url + 'dashboard/star.png',
                content: [{
                    name: '',
                    rank: '',
                    time: '',
                    img_url: '',
                    teacher_remark: '',
                }],
                i: -1,
            }
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
            getNew(value) {
                this.currentList = this.tableData.slice(value, value + this.limit);
            },
            tab(index) {
                this.curId = index;
                var token = window.localStorage.getItem('idToken')
                var arr = 'https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/student/works?type=' + this.curId
                globalAxios.get(arr,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    }
                ).then(
                    response => {
                        var arr = [];
                        if (this.curId == 0) {
                            for (var i = 0; i < response.data.homework.length; i++) {
                                arr.push(response.data.homework[i])
                            }
                            for (var i = 0; i < arr.length; i++) {
                                this.content[i].name = arr[i].HW_NAME;
                                this.content[i].img_url = arr[i].HW_COVER;
                                this.content[i].teacher_remark = arr[i].TEACHER_REMARK;
                                this.content[i].rank = arr[i].HW_RANK;
                                this.content[i].time = arr[i].SUBMIT_TIME;
                            }
                        }
                        else {
                            for (var i = 0; i < response.data.product.length; i++) {
                                arr.push(response.data.product[i])
                            }
                            for (var i = 0; i < arr.length; i++) {
                                this.content[i].name = arr[i].PRODUCT_NAME;
                                this.content[i].img_url = arr[i].COVER_URL;
                                this.content[i].teacher_remark = arr[i].TEACHER_REMARK;
                                this.content[i].rank = arr[i].PRODUCT_RANK;
                                this.content[i].time = arr[i].CREATE_TIME;
                            }
                        }
                        console.log(this.content)
                        this.tableData = this.content;
                        this.getNew(0);
                    },
                    error => {
                        console.log(error);
                    }
                );
            },
        },
        created: function () {
            //let that = this.$router;
            this.style = 'height:' + (document.documentElement.clientWidth * 0.17) + 'px;'
            this.style1 = 'height:' + (document.documentElement.clientWidth * 0.17) + 'px;margin-top:-' + (document.documentElement.clientWidth * 0.17) + 'px;'

            var token = window.localStorage.getItem('idToken')
            globalAxios.get('https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/student/works?type=' + this.curId,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }
            ).then(response => {
                var arr = [];
                console.log(response);
                for (var i = 0; i < response.data.homework.length; i++) {
                    arr.push(response.data.homework[i])
                }
                console.log(arr)
                for (var i = 0; i < arr.length; i++) {
                    this.content[i].name = arr[i].HW_NAME;
                    this.content[i].img_url = arr[i].HW_COVER;
                    this.content[i].teacher_remark = arr[i].TEACHER_REMARK;
                    this.content[i].rank = arr[i].HW_RANK;
                    this.content[i].time = arr[i].SUBMIT_TIME;
                }

                this.tableData = this.content;
                this.getNew(0);
            },
                error => {
                    console.log(error);
                }
            );
        },
    }
</script>


<style scoped>
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
        background-color: #fff;
        color: #9196a1;
        padding: 15px 32px;
        margin: 10px 4px 0px;
        text-align: center;
        text-decoration: none;
        padding: 4px 10px;
        font-size: 15px;
        border-radius: 20px;
        border: none;
    }

    .tag:hover,
    .active {
        background-color: #9196a1;
        text-align: center;
        text-decoration: none;
        padding: 4px 10px;
        margin: 10px 4px 0px;
        font-size: 15px;
        border-radius: 20px;
        border: none;
        color: #fff;
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
    }

    .inside:hover {
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

    .btn {
        background: #f4f9fa;
        height: 30px;
        width: 70px;
        font-size: 12px;
        text-align: center;
        margin-right: 10px;
        margin-top: 10px;
        font-weight: bold;
    }

    .edit {
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

    .edit:hover,
    .edit:focus {
        background: #50b8ee;
        color: #f4f9fa;
    }

    .delete {
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

    .delete:hover,
    .delete:focus {
        background: red;
        color: #f4f9fa;
    }

    .details {
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

    .detail_item {
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

    .outside {
        margin-top: 8px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        font-size: 12px;
        justify-content: space-between;
    }

    .up {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 150px;
    }

    h5 {
        margin-left: 10px;
        margin-top: 5px;
        font-weight: bold;
        color: #777;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .down {
        display: flex;
        flex-direction: row;
        color: #777;
    }

    .icon {
        width: 16px;
        height: 16px;
        margin-right: 5px;
    }

    .work_type {
        width: 34.7px;
        height: 20px;
    }
</style>