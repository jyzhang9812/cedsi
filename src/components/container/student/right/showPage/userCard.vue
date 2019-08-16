<template>
    <ul :style="{'left':calleft + 'px'}">
        <li class="user_card" v-for="(item,index) in user_url" :key="index">
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
        </li>
        <li class="user_card">
            <a>查看更多</a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'userCard',
        data() {
            return {
                leftImg: '../../../' + this.$store.state.url + 'dashboard/left.png',
                rightImg: '../../../' + this.$store.state.url + 'dashboard/right.png',
                calleft: 0,
                i: -1,
                curId: 0,
                limit: 12,
                currentList: [],
                tableData: [],
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
            }
        },
        methods: {
            tab(index) {
                this.curId = index;
            },
            show(index) {
                this.i = index;
                this.isShow = true;
            },
            hidden(index) {
                this.i = -1;
                this.isShow = false;
            },
            //点击按钮左移
            zuohua() {
                this.calleft -= 340;
                if (this.calleft < -1200) {
                    this.calleft = 0
                }
            },
            //点击按钮右移
            youhua() {
                this.calleft += 340;
                if (this.calleft > 0) {
                    this.calleft = -1020
                }
            },
        },
    }
</script>

<style scoped>
    .threeImg .Containt ul {
        margin: 0 auto;
        width: 2400px;
        position: absolute;
        left: 0px;
        cursor: pointer;
        min-height: 100%
    }

    .threeImg .Containt ul li {
        margin-right: 20px;
        margin-top: 10px;
        float: left;
    }

    /* 推荐课程 */
    ul {
        min-height: 250px;
        list-style-type: none;
        padding-bottom: 20px;
    }

    /* 优秀作者 */
    .user_card {
        width: 180px;
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

    .user_card .details h5 {
        text-align: center;
    }

    .user_card .detail_item {
        width: 100%;
        height: auto;
        margin: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .user_card .detail_item p {
        font-size: 12px;
        margin-right: 10px;
        margin-bottom: 5px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .user_card:first-child {
        margin-left: 20px;
    }

    .user_card:last-child,
    .user_card:last-child:hover {
        background: none;
        box-shadow: none;
        border: none;
        transform: none;
        text-align: center;
        font-size: 18px;
        padding-top: 70px;
    }

    a,
    a:hover {
        text-decoration: none;
    }
</style>