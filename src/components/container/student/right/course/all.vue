<template>
    <div class="container-fluid layout">
        <div class="row">
            <div class="col-md-4" v-for="(item,index) in currentList" :key="index">
                <router-link :to="{name:'coursemap',params:{id:item.ID}}" class="box">
                    <div class="inside" @mouseover="show(index)" @mouseleave="hidden(index)">
                        <img class="img" :style="style" :src="item.COVER">
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
                </router-link>
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
                limit: 6,
                currentList: [],
                tableData: [],
                isShow: false,
                inside_detail: [],
                calleft: 0,
                i: -1,
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
            getNew(value) {
                this.currentList = this.tableData.slice(value, value + this.limit);
            },
        },
        created: function () {
            // let _this = this.$router;
            this.style = 'height:' + (document.documentElement.clientWidth * 0.17) + 'px;'
            this.style1 = 'height:' + (document.documentElement.clientWidth * 0.17) + 'px;margin-top:-' + (document.documentElement.clientWidth * 0.17) + 'px;'

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
    .right .btn:first-child{
        background: #fff;
        color: #94d183; 
        border: 1px solid #94d183;
    }
    .btn_green,.right .btn:first-child:hover{
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
    .details p{
        width: 80%;
        height: 80%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin:0;
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
</style>