<template>
    <ul :style="{'left': mycalleft + 'px'}">
        <li class="community_card" v-for="(item,index) in community_url" :key="index" @mouseover="show(index)"
            @mouseleave="hidden(index)" :style="{backgroundImage: 'url(' + item.url + ')' }">
            <div class="inside">
                <!-- <img class="img" :src="item.url"> -->
                <div class="details" v-show="index==i">
                    <div class="detail_item" style="display: block">
                        <img src='' class="img_avatar">
                    </div>
                    <div class="detail_item">
                        <div class="left">
                            <h5><strong>作品名{{item.course_name}}</strong></h5>
                            <p>by <a>作者姓名</a></p>
                        </div>
                        <div class="right">
                            <div>
                                <i class="fa fa-lg" :class="item.islike?'fa-heart':'fa-heart-o'" style="color:#ff808b"
                                    aria-hidden="true" @mouseover='like(index)' @mouseleave="unlike(index)"></i>
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
        </li>
        <li class="community_card">
            <a>查看更多</a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'communityCard',
        props: {
            calleft: Number  //接收父组件传过来的值，这是稍微高级一点的写法，也可以props:[' message']
        },
        data() {
            return {
                i: -1,
                mycalleft: 0,
                leftImg: '../../../' + this.$store.state.url + 'dashboard/left.png',
                rightImg: '../../../' + this.$store.state.url + 'dashboard/right.png',
                community_url: [
                    {
                        url: 'https://www.tynker.com/assets/pscreenshot/5d5189c1ff13b70a1041ee4e.png?width=560&height=320&mode=cover&format=jpg&quality=75&cache=1m&v=1565650898',
                        img: '',
                        islike: false,
                    },
                    {
                        url: 'https://www.tynker.com/api/v2/mccommunityresources/snapshot?resourceId=5d515f4b60ba6f0f331fdac2&width=560&height=320&mode=cover&format=png&quality=75&cache=1m&v=1565613899',
                        img: '',
                        islike: false,
                    },
                    {
                        url: 'https://www.tynker.com/assets/pscreenshot/5d50b25fb7ccdd5d7b4bf8dd.png?width=560&height=320&mode=cover&format=jpg&quality=75&cache=1m&v=1565641792',
                        img: '',
                        islike: false,
                    },
                    {
                        url: 'https://www.tynker.com/assets/pscreenshot/5d273c69cebfbd0ca923fb9a.png?width=560&height=320&mode=cover&format=jpg&quality=75&cache=1m&v=1565530778',
                        img: '',
                        islike: false,
                    },
                    {
                        url: 'https://www.tynker.com/assets/pscreenshot/5d519316745044317e6fc81c.png?width=560&height=320&mode=cover&format=jpg&quality=75&cache=1m&v=1565627169',
                        img: '',
                        islike: false,
                    },
                ],
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
            like(index) {
                this.community_url[index].islike = true
            },
            unlike(index) {
                this.community_url[index].islike = false
            },
            // //点击按钮左移
            // zuohua() {
            //     this.calleft -= 340;
            //     if (this.calleft < -1200) {
            //         this.calleft = 0
            //     }
            // },
            // //点击按钮右移
            // youhua() {
            //     this.calleft += 300;
            //     if (this.calleft > 0) {
            //         this.calleft = -1020;
            //     }
            // },
        },
        created() {
            this.mycalleft = this.calleft
            console.log(this.calleft)
        },
        
        //这里用watch方法来监听父组件传过来的值，来实现实时更新
        watch: {
            calleft(val) {    //message即为父组件的值，val参数为值
                this.mycalleft = val    //将父组件的值赋给childrenMessage 子组件的值
            }
        }
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

    p {
        margin-right: 10px;
        color: #fff;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    /* 推荐课程 */
    ul {
        min-height: 250px;
        list-style-type: none;
        padding-bottom: 20px;
    }

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
        width: 300px;
        height: 100px;
        background: linear-gradient(to bottom, rgba(69, 72, 77, 0) 0%, #232427 50%, #000000 100%);
        z-index: 999;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-top: -100px;
        position: relative;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
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
        width: 220px;
        height: 150px;
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

    .community_card:first-child {
        margin-left: 20px;
    }

    .community_card:last-child,
    .community_card:last-child:hover {
        box-shadow: none;
        border: none;
        transform: none;
        text-align: center;
        font-size: 18px;
        padding-top: 70px;
        background: none;
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

    .community_card .img_avatar {
        width: 45px;
        height: 45px;
        border-radius: 50%;
    }

    .community_card .details {
        width: 220px;
        height: 100px;
        z-index: 999;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-top: 50px;
    }

    .community_card .detail_item {
        margin: 0px 10px 0 10px;
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
</style>