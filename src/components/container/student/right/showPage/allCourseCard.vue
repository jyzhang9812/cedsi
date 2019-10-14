<template>
    <ul :style="{'left':mycalleft + 'px'}">
        <li class="all_course" v-for="(item,index) in currentList" :key="index" @mouseover="show(index)"
            @mouseleave="hidden(index)" @click="jmpPay(index)">
            <div class="inside">
                <img class="img" :src="item.COVER">
                <div class="details" v-show="index==i">
                    <div class="detail_item" style="display: block">
                        <h5><strong>{{item.COURSE_NAME}}</strong></h5>
                        <p>{{item.INTRO}}</p>
                    </div>
                </div>
            </div>
        </li>
        <li class="all_course">
            <router-link :to="{path: '/dashboard/course'}">查看更多</router-link>
        </li>
    </ul>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'allCourseCard',
        props: {
            calleft: Number  //接收父组件传过来的值，这是稍微高级一点的写法，也可以props:[' message']
        },
        data() {
            return {
                mycalleft: 0,
                i: -1,
                curId: 0,
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
            jmpPay(index) {
                if(this.currentList[index].PRICE!=0){
                this.$router.push({path:'/payment',query: { id: this.currentList[index].ID,type:1} })
                }else{
                this.$router.push({path:'/dashboard/coursemap',query: { id: this.currentList[index].ID} })
                }
            },
        },
        created() {
            this.mycalleft = this.calleft
            console.log(this.calleft)
            this.$store.commit('updateLoading', true)
            this.$store.dispatch('getCourse').then(()=>{
                this.$store.dispatch('getAllCourse')
            })
        },
        computed: {
            ...mapState({
                currentList: state => state.allCourseCurrentList
            }),
        },
        //这里用watch方法来监听父组件传过来的值，来实现实时更新
        watch: {
            calleft(val) {  
                console.log(val)  //message即为父组件的值，val参数为值
                this.mycalleft = val *1.2  //将父组件的值赋给childrenMessage 子组件的值
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
        width: 350px;
        position: relative;
        bottom: 0;
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