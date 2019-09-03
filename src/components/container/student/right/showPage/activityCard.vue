<template>
    <ul :style="{'left':mycalleft + 'px'}">
        <li class="all_course" v-for="(item,index) in all_url" :key="index" @mouseover="show(index)"
            @mouseleave="hidden(index)" @click="gotoDetail">
            <div class="inside">
                <img class="img" :src="item.url">
                <div class="details" v-show="index==i">
                    <div class="detail_item" style="display: block">
                        <p>{{item.detail}}</p>
                    </div>
                </div>
            </div>
        </li>
        <li class="all_course">
            <a>查看更多</a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'activityCard',
        props: {
            calleft: Number  //接收父组件传过来的值，这是稍微高级一点的写法，也可以props:[' message']
        },
        data() {
            return {
                all_url: [
                    {
                        url: this.$store.state.url+"activity/pic1.jpg",
                        detail: "校党委举行不忘初心、牢记使命暑期专题读书班开班暨理论学习中心组学习会"
                    },
                    {
                        url: this.$store.state.url+"activity/pic2.png",
                        detail: "hhhhhh组学习会"
                    },
                    {
                        url: "http://219.244.70.82:9009/storage/5A798D16306EDF794ABEE844D2C873B8",
                        detail: "校hht书班开班暨理论学习中心组学习会"
                    },
                    {
                        url: "http://219.244.70.82:9009/storage/5A798D16306EDF794ABEE844D2C873B8",
                        detail: "校党委举行不忘初心、牢记使命暑期专题读书班开班暨理论学习中心组学习会"
                    },
                    {
                        url: "http://219.244.70.82:9009/storage/5A798D16306EDF794ABEE844D2C873B8",
                        detail: "校党委举行不忘初心、牢记使命暑期专题读书班开班暨理论学习中心组学习会"
                    },
                    {
                        url: "http://219.244.70.82:9009/storage/5A798D16306EDF794ABEE844D2C873B8",
                        detail: "校党委举行不忘初心、牢记使命暑期专题读书班开班暨理论学习中心组学习会"
                    },
                ],
                mycalleft: 0,
                i: -1,
                curId: 0,
                limit: 12,
                currentList: [],
                tableData: [],
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
            gotoDetail(){
                this.$router.push('/dashboard/showPage/activedetailCard');
            }
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

    .img {
        width: 300px;
        height: 200px;
        border-radius: 8px;
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

    /* 全部课程 */
    .img {
        width: 300px;
        height: 200px;
        border-radius: 8px;
    }

    a,
    a:hover {
        text-decoration: none;
    }
</style>