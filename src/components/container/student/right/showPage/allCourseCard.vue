<template>
    <ul :style="{'left':calleft + 'px'}">
        <li class="all_course" v-for="(item,index) in all_url" :key="index" @mouseover="show(index)"
            @mouseleave="hidden(index)">
            <div class="inside">
                <img class="img" :src="item.url">
                <div class="details" v-show="index==i">
                    <div class="detail_item" style="display: block">
                        <h5><strong>课程名{{item.course_name}}</strong></h5>
                        <p>课程介绍啥的asdfghjklreitohitbbdwdwicwesrdfygujreytiosreyfios54efgyi</p>
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
        name: 'allCourseCard',
        data() {
            return {
                all_url: [
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
                calleft: 0,
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
        // created() {
        //     this.change('video_res', 2);
        // }
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

    /* .all_course {
            width: 350px;
            height: 200px;
        } */

    .all_course .img {
        width: 350px;
        height: 200px;
        border-radius: 8px;
    }

    .all_course .inside:hover {
        box-shadow: none;
    }

    .all_course .details {
        width: 315px;
        margin-left: 18px;
        margin-top: -115px;
    }

    .all_course:first-child {
        margin-left: 10px;
    }

    .all_course:last-child,
    .all_course:last-child:hover {
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