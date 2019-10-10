<template>
    <div id='msg' class="container">
        <searchBar></searchBar>
        <div class="menu">
            <button @click="tab(index)" v-for="(item,index) in items" class="tag"
                :class="{active : index===curId}">{{item.item}}</button>
        </div>
        <div class="main">
            <div class="cardbox" v-for="(item,index) in currentList">
                <div class="card_content">
                    {{item.MESSAGE_CONTENT}}{{item.MESSAGE_TYPE}}
                </div>
                <div class="card_footer">
                    <span>
                        <b>{{item.teacher_name}}</b><br>
                        {{item.DISPATCH_DATE}}
                    </span>
                    <img class="avast" :src="item.avatar">
                </div>
            </div>
        </div>
        <pagination :num="tableData.length" :limit="limit" @getNew="getNew"></pagination>
    </div>
</template>


<style scoped>
    #msg {
        width: 100%;
        min-height: 100%;
        background: #f4f9fa;
        padding: 0;
    }

    #msg .menu {
        width: auto;
        height: auto;
        padding-top: 10px;
        padding-left: 40px;
        padding-right: 40px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    #msg .tag {
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

    #msg .tag:hover,
    #msg .active {
        color: #00bcd4;
    }

    #msg .main {
        width: inherit;
        min-height: inherit;
        padding: 20px 0 0 0;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-start;
    }

    #msg .cardbox {
        width: 45%;
        margin: 20px 0 0 3%;
        background-color: white;
        border-radius: 10px;
        border: 1px solid #e7e7e7;
    }

    #msg .cardbox:hover {
        box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
        transform: scale(1.03);
        -ms-transform: scale(1.03);
        /* IE 9 */
        -webkit-transform: scale(1.03);
        /* Safari and Chrome */
        -o-transform: scale(1.03);
        /* Opera */
        -moz-transform: scale(1.03);
        /* Firefox */
    }

    #msg .card_header {
        text-align: left
    }

    #msg .card_header img {
        width: 16px;
        height: 16px;
        padding-right: 5px;
    }

    #msg .card_content {
        padding: 20px 20px 0 20px;
        height: auto;
        color: #2f2f2f;
        text-align: justify;
        font-size: 110%;
        font-style: initial;
    }


    #msg .card_content::before {
        content: "\201C";
        font-family: MS PGothic;
        font-size: 30px;
        font-weight: bold;
        color: #06AFA6;
        box-sizing: inherit;
    }

    #msg .card_footer {
        padding: 0px 40px 10px 40px;
        margin-left: auto;
        text-align: end;
    }


    #msg .avast {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
    }

    #msg .card_footer span {
        color: black;
        vertical-align: middle;
        display: inline-block;
    }

    #msg .footer {
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

    #msg .modal-6 {
        -moz-box-shadow: 0 2px 2px #333;
        -webkit-box-shadow: 0 2px 2px #333;
        box-shadow: 0 2px 2px #333;
        -moz-border-radius: 50px;
        -webkit-border-radius: 50px;
        border-radius: 50px;
    }

    #msg .modal-6 a {
        border-color: #ddd;
        color: #999;
        background: #fff;
        padding: 10px 15px;
    }

    #msg .modal-6 a:hover {
        color: #E34E48;
        background-color: #eee;
    }

    #msg .modal-6 a.prev {
        -moz-border-radius: 50px 0 0 50px;
        -webkit-border-radius: 50px;
        border-radius: 50px 0 0 50px;
        width: 50px;
        position: relative;
    }

    #msg .modal-6 a.prev:after {
        content: '';
        position: absolute;
        width: 10px;
        height: 100%;
        top: 0;
        right: 0;
        background-image: -moz-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);
        background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);
    }

    #msg .modal-6 a.next {
        -moz-border-radius: 0 50px 50px 0;
        -webkit-border-radius: 0;
        border-radius: 0 50px 50px 0;
        width: 50px;
        position: relative;
    }

    #msg .modal-6 a.next:after {
        content: '';
        position: absolute;
        width: 10px;
        height: 100%;
        top: 0;
        left: 0;
        background-image: -moz-linear-gradient(left, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
        background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
    }

    #msg .modal-6 a.active {
        border-color: #bbb;
        background: #fff;
        color: #E34E48;
        -moz-box-shadow: 0 0 3px rgba(0, 0, 0, 0.25) inset;
        -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.25) inset;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.25) inset;
    }
</style>

<script>
    import searchBar from '../searchBar.vue'
    import pagination from '../pagination.vue'
    import { mapState } from 'vuex'

    export default {
        name: 'message',
        components: {
            searchBar,
            pagination,
        },
        data() {
            return {
                curId: 0,
                //当前页码
                currentPage: 0,
                currentList: [],
                items: [
                    { item: '系统消息' },
                    { item: '通知公告' },
                    { item: '活动安排' },
                    { item: '辅导答疑' },
                    { item: '我的作业' },
                ],
            }
        },
        methods: {
            tab(index) {
                this.curId = index;
                this.$store.dispatch('getMsg', this.curId).then(() => {
                    this.currentList = this.$store.state.msgCurrentList
                    if (this.currentList.length!=0) {
                        for (let i = 0; i <= this.currentList.length; i++) {
                            this.currentList[i].DISPATCH_DATE = this.timestampToTime(this.currentList[i].DISPATCH_DATE)
                        }
                    }
                })
            },
            //换页
            getNew(value) {
                var currentPage = value / this.limit;
                this.currentPage = currentPage;
                this.$store.commit("changeMsgCurrentList", this.currentPage * this.limit)
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
            this.$store.dispatch('getMsg', this.curId).then(() => {
                this.currentList = this.$store.state.msgCurrentList
                if (this.currentList.length!=0) {
                    for (let i = 0; i <= this.currentList.length; i++) {
                        this.currentList[i].DISPATCH_DATE = this.timestampToTime(this.currentList[i].DISPATCH_DATE)
                    }
                }
            })
            this.$store.commit('updateLoading', true)
        },
        computed: {
            ...mapState({
                tableData: state => state.msgList,
                // currentList: state => state.msgCurrentList,
                limit: state => state.limit,
            }),
        },
    }
</script>