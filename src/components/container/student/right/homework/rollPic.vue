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
                btn: 'btn',
                btnh: 'btnhover',
                clock: '../' + this.$store.state.url + 'dashboard/clock.png',
                zuopin: '../' + this.$store.state.url + 'dashboard/zuopin.png',
                products: '../' + this.$store.state.url + 'dashboard/xiangmu.png',
                star_active: '../' + this.$store.state.url + 'dashboard/star_active.png',
                star: '../' + this.$store.state.url + 'dashboard/star.png',
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
            tab(index) {
                this.curId = index;
                this.$store.dispatch('getWork', this.curId)
            },
            //换页
            getNew(value) {
                var currentPage = value / this.limit;
                this.currentPage = currentPage;
                this.$store.commit("changeWorkCurrentList", this.currentPage * this.limit)
            },
        },
        created: function () {
            //let that = this.$router;
            this.style = 'height:' + (document.documentElement.clientWidth * 0.17) + 'px;'
            this.style1 = 'height:' + (document.documentElement.clientWidth * 0.17) + 'px;margin-top:-' + (document.documentElement.clientWidth * 0.17) + 'px;'
            this.$store.dispatch('getWork', this.curId)
        },
        computed: {
            currentList() {
                return this.$store.state.workCurrentList
            },
            tableData() {
                return this.$store.state.workList
            },
            limit() {
                return this.$store.state.limit
            }
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