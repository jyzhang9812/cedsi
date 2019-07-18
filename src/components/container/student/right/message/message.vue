<template>
    <div class="body">
        <searchBar></searchBar>
        <div class="menu">
            <button class="tag" @click="change('message_system', 1)">系统消息</button>
            <button class="tag" @click="change('message_inform', 1)">通知公告</button>
            <button class="tag" @click="change('message_activity', 1)">活动安排</button>
            <button class="tag" @click="change('message_question', 1)">辅导答疑</button>
            <button class="tag" @click="change('message_homework', 1)">我的作业</button>
        </div>
        <div class="main">
            <div class="cardbox" v-for="card in currentData">
                <div class="card_header">
                    <img @click="delcard" style="cursor: pointer" src="" alt="">
                </div>
                <div class="card_content">
                    {{card.message}}
                </div>
                <div class="card_footer">
                    <span>
                        <b>{{card.teacher}}</b><br>
                        {{card.date}}
                    </span>
                    <img class="avast" src="">
                </div>
            </div>
        </div>
        <div class="footer">
            <ul class="pagination modal-6">
                <li><a href="#" class="prev">&laquo</a></li>
                <li v-for="item in pagination" @click="change(currentType, item.num)">
                    <a href="#" :class="item.cls">{{item.num}}</a>
                </li>
                <li><a href="#" class="next">&raquo;</a></li>
            </ul>
        </div>
    </div>
</template>


<style scoped>
    .body {
        background-color: #f4f9fa;
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

    .tag:hover, .tag:active {
        color: #00bcd4;
    }

    .main {
        background-color: #f4f9fa;
        min-width: 400px;
        min-height: 600px;
        padding-top: 20px;
        padding-right: 20px;
        padding-left: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .cardbox {
        width: 48%;
        height: 220px;
        margin-left: 20px;
        margin-bottom: 40px;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        background-color: white;
        border-radius: 10px;
        border: 1px solid #e7e7e7;
        min-width: 400px;

    }

    .cardbox:hover {
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

    .card_header {
        display: flex;
        display: -webkit-flex;
        flex-direction: row-reverse;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 10px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
    }

    .card_header img {
        width: 16px;
        height: 16px;
        padding-right: 5px;
    }

    .card_content {
        padding: 10px 40px;
        height: auto;
        color: #2f2f2f;
        text-align: justify;
        font-size: 125%;
        font-style: initial;
    }


    .card_content::before {
        content: "\201C";
        font-family: MS PGothic;
        font-size: 60px;
        font-weight: bold;
        color: #06AFA6;
        box-sizing: inherit;
    }

    .card_footer {
        padding: 0px 40px 10px 40px;
        margin-left: auto;
    }


    .avast {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
    }

    .card_footer span {
        color: black;
        vertical-align: middle;
        display: inline-block;
    }

    .footer {
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

    .modal-6 {
        -moz-box-shadow: 0 2px 2px #333;
        -webkit-box-shadow: 0 2px 2px #333;
        box-shadow: 0 2px 2px #333;
        -moz-border-radius: 50px;
        -webkit-border-radius: 50px;
        border-radius: 50px;
    }

    .modal-6 a {
        border-color: #ddd;
        color: #999;
        background: #fff;
        padding: 10px 15px;
    }

    .modal-6 a:hover {
        color: #E34E48;
        background-color: #eee;
    }

    .modal-6 a.prev {
        -moz-border-radius: 50px 0 0 50px;
        -webkit-border-radius: 50px;
        border-radius: 50px 0 0 50px;
        width: 50px;
        position: relative;
    }

    .modal-6 a.prev:after {
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

    .modal-6 a.next {
        -moz-border-radius: 0 50px 50px 0;
        -webkit-border-radius: 0;
        border-radius: 0 50px 50px 0;
        width: 50px;
        position: relative;
    }

    .modal-6 a.next:after {
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

    .modal-6 a.active {
        border-color: #bbb;
        background: #fff;
        color: #E34E48;
        -moz-box-shadow: 0 0 3px rgba(0, 0, 0, 0.25) inset;
        -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.25) inset;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.25) inset;
    }
</style>

<script>
    import searchBar from'../searchBar.vue'
    export default {
        name: 'message',
        components:{
            searchBar,
        },
        data() {
            return {
                message_system: [
                    { message: "系统消息1", teacher: "李老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "系统消息2", teacher: "王老师", date: "2019-6-6", avast: "../assets/avast/avast2.png" },
                    { message: "系统消息3", teacher: "赵老师", date: "2019-6-5", avast: "../assets/avast/avast3.png" },
                    { message: "系统消息4", teacher: "刘老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "系统消息5", teacher: "孙老师", date: "2019-6-9", avast: "../assets/avast/avast2.png" },
                    { message: "系统消息6", teacher: "李老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "系统消息7", teacher: "王老师", date: "2019-6-6", avast: "../assets/avast/avast2.png" },
                    { message: "系统消息8", teacher: "赵老师", date: "2019-6-5", avast: "../assets/avast/avast3.png" },
                    { message: "系统消息9", teacher: "刘老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "系统消息10", teacher: "孙老师", date: "2019-6-9", avast: "../assets/avast/avast2.png" },
                    { message: "系统消息11", teacher: "李老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "系统消息12", teacher: "王老师", date: "2019-6-6", avast: "../assets/avast/avast2.png" },
                    { message: "系统消息13", teacher: "赵老师", date: "2019-6-5", avast: "../assets/avast/avast3.png" },
                    { message: "系统消息14", teacher: "刘老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "系统消息15", teacher: "孙老师", date: "2019-6-9", avast: "../assets/avast/avast2.png" },
                    { message: "系统消息16", teacher: "李老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "系统消息17", teacher: "王老师", date: "2019-6-6", avast: "../assets/avast/avast2.png" },
                    { message: "系统消息18", teacher: "赵老师", date: "2019-6-5", avast: "../assets/avast/avast3.png" },
                    { message: "系统消息19", teacher: "刘老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "系统消息20", teacher: "孙老师", date: "2019-6-9", avast: "../assets/avast/avast2.png" }
                ],
                message_inform: [
                    { message: "通知公告1", teacher: "李老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "通知公告2", teacher: "王老师", date: "2019-6-6", avast: "../assets/avast/avast2.png" },
                    { message: "通知公告3", teacher: "赵老师", date: "2019-6-5", avast: "../assets/avast/avast3.png" },
                    { message: "通知公告4", teacher: "刘老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "通知公告5", teacher: "孙老师", date: "2019-6-9", avast: "../assets/avast/avast2.png" },
                    { message: "通知公告6", teacher: "李老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "通知公告7", teacher: "王老师", date: "2019-6-6", avast: "../assets/avast/avast2.png" },
                    { message: "通知公告8", teacher: "赵老师", date: "2019-6-5", avast: "../assets/avast/avast3.png" },
                    { message: "通知公告9", teacher: "刘老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "通知公告10", teacher: "孙老师", date: "2019-6-9", avast: "../assets/avast/avast2.png" },
                    { message: "通知公告11", teacher: "李老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "通知公告12", teacher: "王老师", date: "2019-6-6", avast: "../assets/avast/avast2.png" },
                    { message: "通知公告13", teacher: "赵老师", date: "2019-6-5", avast: "../assets/avast/avast3.png" },
                    { message: "通知公告14", teacher: "刘老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "通知公告15", teacher: "孙老师", date: "2019-6-9", avast: "../assets/avast/avast2.png" },
                    { message: "通知公告16", teacher: "李老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "通知公告17", teacher: "王老师", date: "2019-6-6", avast: "../assets/avast/avast2.png" },
                    { message: "通知公告18", teacher: "赵老师", date: "2019-6-5", avast: "../assets/avast/avast3.png" },
                    { message: "通知公告19", teacher: "刘老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "通知公告20", teacher: "孙老师", date: "2019-6-9", avast: "../assets/avast/avast2.png" }
                ],
                message_activity: [
                    { message: "活动1", teacher: "李老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "活动2", teacher: "王老师", date: "2019-6-6", avast: "../assets/avast/avast2.png" },
                    { message: "活动3", teacher: "赵老师", date: "2019-6-5", avast: "../assets/avast/avast3.png" },
                    { message: "活动4", teacher: "孙老师", date: "2019-6-9", avast: "../assets/avast/avast2.png" }
                ],
                message_question: [
                    { message: "问题1", teacher: "李老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "问题2", teacher: "王老师", date: "2019-6-6", avast: "../assets/avast/avast2.png" },
                    { message: "问题3", teacher: "赵老师", date: "2019-6-5", avast: "../assets/avast/avast3.png" },
                ],
                message_homework: [
                    { message: "作业1", teacher: "李老师", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "作业2", teacher: "王老师", date: "2019-6-6", avast: "../assets/avast/avast2.png" },
                ],
                currentData: [],
                pagination: [],
                currentType: "message_system"
            }
        },
        methods: {
            delcard() {
                this.currentData.splice(0, 1);
            },
            change(message_type, currentPage) {
                this.currentType = message_type;
                let mes_sys_len = this.message_system.length;
                let mes_info_len = this.message_inform.length;
                let mes_act_len = this.message_activity.length;
                let mes_qus_len = this.message_question.length;
                let mes_hwk_len = this.message_homework.length;
                let per_page = 6;
                if (message_type === "message_system") {
                    if (mes_info_len === 0) {
                        console.log("您还没有系统消息！");
                    } else {
                        this.pagination = new Array(Math.ceil(mes_sys_len / per_page));
                        for (let i = 0; i < this.pagination.length; i += 1) {
                            this.pagination[i] = (i + 1) === currentPage ? { cls: "active", num: i + 1 } : { cls: "better", num: i + 1 };
                        }
                        this.currentData = this.message_system.slice((currentPage - 1) * per_page, currentPage * per_page);
                    }
                }else if (message_type === "message_activity") {
                    if (mes_act_len === 0) {
                        console.log("您还没有活动消息！");
                    } else {
                        this.pagination = new Array(Math.ceil(mes_act_len / per_page));
                        for (let i = 0; i < this.pagination.length; i += 1) {
                            this.pagination[i] = (i + 1) === currentPage ? { cls: "active", num: i + 1 } : { cls: "better", num: i + 1 };
                        }
                        this.currentData = this.message_activity.slice((currentPage - 1) * per_page, currentPage * per_page);
                    }
                }else if (message_type === "message_question") {
                    if (mes_qus_len === 0) {
                        console.log("您还没有收到辅导答疑！");
                    } else {
                        this.pagination = new Array(Math.ceil(mes_qus_len / per_page));
                        for (let i = 0; i < this.pagination.length; i += 1) {
                            this.pagination[i] = (i + 1) === currentPage ? { cls: "active", num: i + 1 } : { cls: "better", num: i + 1 };
                        }
                        this.currentData = this.message_question.slice((currentPage - 1) * per_page, currentPage * per_page);
                    }
                }else if (message_type === "message_homework") {
                    if (mes_hwk_len === 0) {
                        console.log("您还没有作业消息！");
                    } else {
                        this.pagination = new Array(Math.ceil(mes_hwk_len / per_page));
                        for (let i = 0; i < this.pagination.length; i += 1) {
                            this.pagination[i] = (i + 1) === currentPage ? { cls: "active", num: i + 1 } : { cls: "better", num: i + 1 };
                        }
                        this.currentData = this.message_homework.slice((currentPage - 1) * per_page, currentPage * per_page);
                    }
                }else{
                    if (mes_info_len === 0) {
                        console.log("您还没有通知消息！");
                    } else {
                        this.pagination = new Array(Math.ceil(mes_sys_len / per_page));
                        for (let i = 0; i < this.pagination.length; i += 1) {
                            this.pagination[i] = (i + 1) === currentPage ? { cls: "active", num: i + 1 } : { cls: "better", num: i + 1 };
                        }
                        this.currentData = this.message_inform.slice((currentPage - 1) * per_page, currentPage * per_page);
                    }
                }
            }

        },
        created() {
            this.change('message_system', 2);
        }
    }
</script>