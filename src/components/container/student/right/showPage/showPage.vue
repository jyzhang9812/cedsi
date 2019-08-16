<template>
    <div class="container">
        <!-- 推荐课程 -->
        <div class="threeImg"
            style="background: url('https://www.tynker.com/image/dashboard/student/launchpad/bg-space.jpg')">
            <div class="Containt">
                <div class="recommend_title">
                    <h3 style="color: #fff">Projects & Puzzles</h3>
                    <p>
                        <button class="button">TRY EVERYTHING</button>
                        <i class="fa fa-trophy fa-2x" style="color: #ffbf35" aria-hidden="true"></i>
                        <i class="fa fa-cog fa-2x" style="color: #fff" aria-hidden="true"></i>
                    </p>
                </div>
                <div class="iconleft" v-on:click="zuohua(0)" v-show='calleft[0]!=0'>
                    <img class="el-icon-arrow" :src=leftImg></img>
                </div>
                <ul :style="{'left':calleft[0] + 'px'}">
                    <li class="course_card" v-for="(item,index) in superurl" :key="index" @mouseover="show(index)"
                        @mouseleave="hidden(index)">
                        <div class="inside">
                            <img class="img" :src="item.url">
                            <div class="details" v-show="index==i">
                                <div class="detail_item">
                                    <h4><strong>课程名{{item.course_name}}</strong></h4>
                                    <button class="btn">Level 1</button>
                                </div>
                                <p style="margin-left: 10px;">课程介绍啥的asdfghjklreitohitbbdwdwicw</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="iconright" v-on:click="youhua(0)" v-show='!calleft[0]>0'>
                    <img class="el-icon-arrow" :src=rightImg></img>
                </div>
            </div>
        </div>

        <div class="threeImg">
            <div class='Containt' v-for="(item,index) in arrComponent" :key="index">
                <div class="iconleft" v-on:click="zuohua(index+1)" v-show='calleft[index+1]!=0'>
                    <img class="el-icon-arrow" :src=leftImg></img>
                </div>
                <div class="recommend_title">
                    <h3>{{item.title}}</h3>
                </div>
                <component v-bind:is="item.componentName" :calleft="calleft[index+1]"></component>
                <div class="iconright" v-on:click="youhua(index+1)" v-show='!calleft[index+1]>0'>
                    <img class="el-icon-arrow" :src=rightImg></img>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import pagination from '../pagination.vue'
    import userCard from './userCard.vue'
    import communityCard from './communityCard.vue'
    import allCourseCard from './allCourseCard.vue'


    export default {
        name: 'presentation',
        components: {
            pagination,
            userCard,
            communityCard,
            allCourseCard
        },
        data() {
            return {
                leftImg: '../../../' + this.$store.state.url + 'dashboard/left.png',
                rightImg: '../../../' + this.$store.state.url + 'dashboard/right.png',
                arrComponent: [
                    {
                        componentName: 'allCourseCard',
                        title: '全部课程'
                    },
                    {
                        componentName: 'communityCard',
                        title: '社区'
                    },
                    {
                        componentName: 'userCard',
                        title: '优秀作者'
                    },],
                superurl: [
                    {
                        url: 'https://www.tynker.com/image/dashboard/student/learn/tutorials/nasa-design-a-mission-patch.png?width=600&height=400&mode=cover&format=jpg&quality=75&cache=1m&v=1',
                        img: '',
                    },
                    {
                        url: 'https://www.tynker.com/image/hour-of-code/2017/mod-minecraft.png?width=600&height=400&mode=cover&format=jpg&quality=75&cache=1m&v=1',
                        img: '',
                    },
                    {
                        url: 'https://www.tynker.com/image/hour-of-code/2018/crystal-clash/crystal-clash.png?width=600&height=400&mode=cover&format=jpg&quality=75&cache=1m&v=1',
                        img: '',
                    },
                    {
                        url: 'https://www.tynker.com/image/hour-of-code/2016/spin-draw/spin-draw-1.png?width=600&height=400&mode=cover&format=jpg&quality=75&cache=1m&v=1',
                        img: '',
                    },
                    {
                        url: 'https://www.tynker.com/ide/imgs/templates/new.png?width=600&height=400&mode=cover&format=jpg&quality=75&cache=1m&v=1',
                        img: '',
                    },
                    {
                        url: 'https://www.tynker.com/image/hour-of-code/2017/dragon-blast/dragon-blast-1.png?width=600&height=400&mode=cover&format=jpg&quality=85&cache=1m&v=1',
                        img: '',
                    },
                ],
                calleft: [0,0,0,0],
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
            //点击按钮左移
            zuohua(index) {
                this.calleft[index] -= 340;
                if (this.calleft[index] < -1200) {
                    this.calleft[index] = 0
                }
            },
            //点击按钮右移
            youhua(index) {   
                this.calleft[index] += 340;
                if (this.calleft[index] > 0) {
                    this.calleft[index] = -1020
                }
            },
        },
        // created() {
        //     this.change('video_res', 2);
        // }
    }
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #f4f9fa;
        min-height: 620px;
        padding: 0;
    }

    .threeImg {
        min-width: 1000px;
        height: 100%;
        color: black;
    }

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

    .Containt {
        position: relative;
        min-height: 300px;
        height: 100%;
        overflow: hidden;
        margin: 0 auto;
    }

    .recommend_title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .iconleft {
        position: absolute;
        width: 50px;
        height: 50px;
        top: 80px;
        z-index: 99999;
        background-color: #fff;
        vertical-align: middle;
        border-radius: 50%;
        opacity: 0.5;
    }

    .iconright {
        position: relative;
        left: 1080px;
        top: 80px;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        z-index: 99999;
        background-color: #fff;
        vertical-align: middle;
        opacity: 0.5;
        justify-content: center;
    }

    .recommend_title i {
        width: 50px;
        height: 55px;
        margin: 0 10px 2px 0;
        padding-top: 10px;
        background: #333;
        border-bottom-left-radius: 40px;
        border-bottom-right-radius: 40px;
        text-align: center;
    }

    .recommend_title i:hover {
        -webkit-transform: scale(1.05);
        -moz-transform: scale(1.05);
        -ms-transform: scale(1.05);
        -o-transform: scale(1.05);
        transform: scale(1.05);
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

    .course {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .course_card {
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 20px;
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

    .el-icon-arrow {
        margin-top: 12px;
        margin-left: 12px;
        width: 25px;
        height: 25px;
        opacity: 0.5;
    }

    .el-icon-arrow:hover {
        opacity: 1;
    }

    .iconright:hover {
        opacity: 1;
        box-shadow: 2px 2px 10px #23527c
    }

    .iconleft:hover {
        opacity: 1;
        box-shadow: 5px 10px 10px #25293a
    }

    .details {
        width: 300px;
        height: 100px;
        /* background-color: rgba(0, 0, 0, 0.35); */
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

    .icon {
        width: 16px;
        height: 16px;
        margin-right: 5px;
    }

    .work_type {
        width: 34.7px;
        height: 20px;
    }

    .btn {
        background: #51c79f;
        color: #fff;
        height: 35px;
        width: 75px;
        font-size: 12px;
        text-align: center;
        margin-right: 20px;
        font-weight: bold;
        border-radius: 8px;
    }

    .button {
        display: inline-block;
        vertical-align: middle;
        margin: 2px 30px 0 0;
        font-family: inherit;
        padding: .8em 1em;
        -webkit-appearance: none;
        border: 1px solid transparent;
        border-radius: 5px;
        transition: background-color .25s ease-out, color .25s ease-out;
        font-size: 1.5rem;
        line-height: 1;
        text-align: center;
        cursor: pointer;
        background: #ff8d1a;
        color: #fff;
    }

    h3 {
        margin-top: 15px;
        margin-left: 20px;
    }
</style>