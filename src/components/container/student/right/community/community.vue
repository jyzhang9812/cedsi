<template>
    <div class="body">
        <searchBar></searchBar>
        <div class="menu">
            <button @click="tab(index)" v-for="(item,index) in items" class="tag"
                :class="{active : index===curId}">{{item.item}}</button>
        </div>
        <div class="row main">
            <div class="col-md-3" v-show="curId==0" v-for="(item,index1) in user_url" :key="index1">
                <div class="community_card">
                    <div class="inside">
                        <img class="img" :src="item.url">
                        <div class="details">
                            <img :src="item.url" class="img_avatar">
                            <div class="detail_item">
                                <div class="left">
                                    <h5><strong>作品名{{item.course_name}}</strong></h5>
                                    <p>by <a>作者姓名</a></p>
                                </div>
                                <div class="right">
                                    <div>
                                        <i class="fa fa-heart-o fa-lg" style="color: #fff" aria-hidden="true"></i>
                                        <!-- <i class="fa fa-heart fa-lg" style="color: #ff808b" aria-hidden="true"></i> -->
                                        <p>99</p>
                                    </div>
                                    <div>
                                        <i class="fa fa-eye fa-lg" style="color: #50b8ee" aria-hidden="true"></i>
                                        <p>99</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3" v-show="curId==1" v-for="(item,index) in user_url" :key="index">
                <div class="user_card">
                    <div class="details">
                        <div class="detail_item">
                            <img :src='item.url' class="img_avatar">
                        </div>
                        <h5><strong>作者姓名{{item.user_name}}</strong></h5>
                        <div class="detail_item">
                            <div>
                                <i class="fa fa-gamepad fa-lg" style="color: #ffbf35" aria-hidden="true"></i>
                                <p>作品</p>
                                <p>99</p>
                            </div>
                            <div>
                                <i class="fa fa-heart fa-lg" style="color: #ff808b" aria-hidden="true"></i>
                                <p>点赞</p>
                                <p>99</p>
                            </div>
                            <div>
                                <i class="fa fa-eye fa-lg" style="color: #50b8ee" aria-hidden="true"></i>
                                <p>浏览</p>
                                <p>99</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--  v-show="index===curId" v-for="(content, index) in contents"-->
        <!-- <div class="cardbox" v-for="(item,index) in currentList">
                <div class="card_header">
                    <img style="cursor: pointer" src="" alt="">
                </div>
                <div class="card_content">
                    {{item.message_content}}
                </div>
                <div class="card_footer">
                    <span>
                        <b>{{item.teacher_name}}</b><br>
                        {{item.dispatch_date}}
                    </span>
                    <img class="avast" :src="item.avatar">
                </div>
            </div> -->
        <!-- <pagination :num="tableData.length" :limit="limit" @getNew="getNew"></pagination> -->
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

    .tag:hover,
    .active {
        color: #00bcd4;
    }

    .main {
        background-color: #f4f9fa;
        min-width: 400px;
        min-height: 500px;
        padding-top: 20px;
        padding-right: 20px;
        padding-left: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    /* 优秀作者 */
    .user_card {
        width: 100%;
        height: 180px;
        background: #fff;
        border-radius: 10px;
        position: relative;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .1);
    }

    .user_card:hover {
        -webkit-transform: scale(1.05);
        -moz-transform: scale(1.05);
        -ms-transform: scale(1.05);
        -o-transform: scale(1.05);
        transform: scale(1.05);
        -moz-box-shadow: 5px 10px 10px #25293a;
        -webkit-box-shadow: 5px 10px 10px #25293a;
        box-shadow: 5px 10px 10px #25293a;
    }

    .user_card .img_avatar {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-top: 10px;
    }

    .user_card .details {
        width: 100%;
        height: 100%;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background: none;
    }

    .user_card .detail_item {
        width: 100%;
        height: auto;
        margin: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .user_card h5 {
        text-align: center
    }
    .user_card .detail_item p {
        font-size: 12px;
        margin-right: 10px;
        margin-bottom: 5px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #868686;
    }

    /* 社区 */
    .inside {
        border-radius: 8px;
    }

    .inside:hover {
        -webkit-transform: scale(1.05);
        -moz-transform: scale(1.05);
        -ms-transform: scale(1.05);
        -o-transform: scale(1.05);
        transform: scale(1.05);
        -moz-box-shadow: 5px 10px 10px #25293a;
        -webkit-box-shadow: 5px 10px 10px #25293a;
        box-shadow: 5px 10px 10px #25293a;
    }

    .details {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        position: relative;
    }

    .detail_item {
        margin: 30px 10px 0 10px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: relative;
        color: #fff;
    }

    /* 社区 */
    .community_card {
        border-radius: 8px;
        width: 100%;
        height: auto;
        background: #fff;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-background-size: cover;
        -o-background-size: cover;
        background-position: center 0;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .1);
    }

    .community_card li {
        margin-right: 5px;
    }

    a,
    a:hover {
        text-decoration: none;
    }

    .community_card .inside:hover {
        -webkit-transform: none;
        -moz-transform: none;
        -ms-transform: none;
        -o-transform: none;
        transform: none;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    .community_card:hover {
        -webkit-transform: scale(1.05);
        -moz-transform: scale(1.05);
        -ms-transform: scale(1.05);
        -o-transform: scale(1.05);
        transform: scale(1.05);
        -moz-box-shadow: 5px 10px 10px #25293a;
        -webkit-box-shadow: 5px 10px 10px #25293a;
        box-shadow: 5px 10px 10px #25293a;
    }

    .community_card .img {
        width: 100%;
        height: 80%;
    }
    .community_card .img_avatar {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin: -30px 0 0 10px;
        border: 5px solid #50b8ee;
        z-index: 999;
    }

    .community_card .details{
        border-top:1px solid #ccc; 
    }
    .community_card .detail_item {
        margin: 0px 10px 0 10px;
        color:#868686;
    }

    .community_card .detail_item .left {
        width: 60%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .community_card .detail_item .right {
        margin-top: 10px;
        width: 40%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .community_card .detail_item .right div {
        margin-right: 10px;
    }

    .community_card .detail_item .right p {
        margin-top: 5px;
    }

    /* .cardbox {
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
        
        -webkit-transform: scale(1.03);
        
        -o-transform: scale(1.03);
        
        -moz-transform: scale(1.03);
        
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
    } */
</style>

<script>
    import searchBar from '../searchBar.vue'
    import pagination from '../pagination.vue'
    import userCard from '../showPage/userCard.vue'
    import globalAxios from 'axios'

    export default {
        name: 'message',
        components: {
            searchBar,
            pagination,
            userCard
        },
        data() {
            return {
                i: -1,
                curId: 0,
                items: [
                    { item: '精彩作品' },
                    { item: '优秀作者' },
                    { item: '人工智能' },
                    { item: '超维数学' },
                    { item: '编程类' },
                ],
                user_url: [
                    {
                        url: 'https://www.tynker.com/image/course-card/vertical/minecraft-starter.png',
                        img: '',
                    },
                    {
                        url: 'https://www.tynker.com/image/course-card/vertical/turings-tower.png',
                        img: '',
                    },
                    {
                        url: 'https://www.tynker.com/image/course-card/vertical/cannon-crasher-physics-game.png',
                        img: '',
                    },
                    {
                        url: 'https://www.tynker.com/image/course-card/vertical/the-drone-menace-arcade-game.png',
                        img: '',
                    },
                    {
                        url: 'https://www.tynker.com/image/course-card/vertical/gravity-sling-advanced-projectile-physics.png',
                        img: '',
                    },
                ],
                contents: [],
                limit: 6,
                currentList: [],
                tableData: [],
            }
        },
        methods: {
            getNew(value) {
                this.currentList = this.tableData.slice(value, value + this.limit);
            },
            tab(index) {
                this.curId = index;

                // var token = window.localStorage.getItem('idToken')
                // var arr = 'https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/student/message/' + (this.curId + 1)
                // console.log(arr)
                // globalAxios.get(arr,
                //     {
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Authorization': token
                //         }
                //     }
                // ).then(
                //     response => {
                //         console.log(response);
                //         var arr = [];
                //         for (var i = 0; i < response.data.length; i++) {
                //             arr.push(response.data[i])
                //         }
                //         this.contents = arr;
                //         this.tableData = this.contents;
                //         // return response.json();
                //     },
                //     error => {
                //         console.log(error);
                //     }
                // );
                // this.getNew(0);
            },

        },

        // created: function () {
        //     // this.tableData = this.contents[0];
        //     var token = window.localStorage.getItem('idToken')
        //     var arr = 'https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/student/message/' + (this.curId + 1)
        //     console.log(arr)
        //     globalAxios.get(arr,
        //         {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': token
        //             }
        //         }
        //     ).then(
        //         response => {
        //             console.log(response);
        //             var arr = [];
        //             for (var i = 0; i < response.data.length; i++) {
        //                 arr.push(response.data[i])
        //             }
        //             this.contents = arr;
        //             this.tableData = this.contents;
        //             this.getNew(0);
        //             // return response.json();
        //         },
        //         error => {
        //             console.log(error);
        //         }
        //     );
        // },

        // mounted() {
        //     this.tableData = this.contents;
        //     this.getNew(0);
        // }
    }
</script>