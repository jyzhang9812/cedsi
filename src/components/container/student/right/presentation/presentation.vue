<template>
    <div class="container">
        <div class="threeImg">
            <div class="Containt">
                <div class="iconleft" v-on:click="zuohua">
                    <img class="el-icon-arrow" :src=leftImg></img>
                </div>
                <ul :style="{'left':calleft + 'px'}">
                    <li class="course_card" v-for="(item,index) in superurl" :key="index" @mouseover="show(index)" @mouseleave="hidden(index)">
                        <div class="inside">
                            <img class="img" :src="item.url">
                            <div class="details" v-show="index==i">
                                <div class="detail_item">
                                    <h4>课程名{{item.course_name}}</h4>
                                    <button class="btn">查看资料</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="iconright" v-on:click="youhua">
                    <img class="el-icon-arrow" :src=rightImg></img>
                </div> 
            </div>
        </div>
        <div>
            <div class="menu">
                <button  @click="tab(index)"
                v-for="(item,index) in items" class="tag"
                :class="{active : index===curId}">{{item.item}}</button>
            </div>
            <div class="presentation" v-show="index===curId" v-for="(content, index) in contents">
                <div class="presentation_item"v-for="(content, index) in contents[index]">
                    <img class="item_img" :src="content.src"></img>
                    <span>{{content.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
    
    
<script>
    import pagination from'../pagination.vue'

    export default{
        name:'presentation',
        components:{
            pagination,
        },
        data() {
            return {
                leftImg:'../../../' + this.$store.state.url + 'dashboard/left.png',
                rightImg:'../../../' + this.$store.state.url + 'dashboard/right.png',
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
                calleft:0,
                i:-1,
                curId: 0,
                items: [
                    {item: '视频'},
                    {item: 'PPT'},
                    {item: '文档'},
                ],
                contents:[
                    [
                        { name:"video1", src:"../../../../../../static/images/presentation/mp4.png" },
                        { name:"video2", src:"../../../../../../static/images/presentation/mp4.png" },
                    ],
                    [
                        { name:"ppt1", src:"../../../../../../static/images/presentation/ppt.png" },
                        { name:"ppt2", src:"../../../../../../static/images/presentation/ppt.png" },
                    ],
                    [
                        { name:"word1", src:"../../../../../../static/images/presentation/word.png" },
                        { name:"word2", src:"../../../../../../static/images/presentation/word.png" },
                        { name:"word2", src:"../../../../../../static/images/presentation/word.png" },
                    ],
                ],
                limit: 12,
                currentList: [],
                tableData:[],
            }
        },
        methods: {
            tab (index) {
                this.curId = index;
            },
            show(index){
                this.i = index;
                this.isShow = true;
            },
            hidden(index){
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
    .container{
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #f4f9fa;
        min-height: 620px;
        padding: 0;
    }    
    .threeImg {
        min-width: 1000px;
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
        width: 300px;
        margin-right: 40px;
        margin-top: 10px;
        float: left;
    }

    .Containt {
        position: relative;
        min-height: 250px;
        overflow: hidden;
        margin: 0 auto;
        background: linear-gradient(to right, #134a68, #006c9b);
    }
        
    .iconleft {
        position: absolute;
        width: 50px;
        height: 50px;
        top: 80px;
        z-index: 99999;
        background-color: #fff;
        vertical-align: middle;
        border-radius:50%; 
        opacity: 0.5;
    }
        
    .iconright {
        position: relative;
        left: 1080px;
        top: 80px;
        border-radius:50%; 
        width: 50px;
        height: 50px;
        z-index: 99999;
        background-color: #fff;
        vertical-align: middle;
        opacity: 0.5;
        justify-content: center;
    }

    /* 修改 */
    ul{
        min-height: 250px;
        list-style-type: none;
        padding-top:16px; 
        padding-bottom: 20px;
    }
    .course{
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .course_card{
        margin-top:10px; 
        margin-bottom: 10px;
        margin-left: 20px;
    }
    .img{
        width: 300px;
        height: 200px;
        border-radius:20px; 
    }
    .inside{
        border-radius:20px;
    }
    .inside:hover{
        -webkit-transform: scale(1.05);
        -moz-transform: scale(1.05);
        -ms-transform: scale(1.05);
        -o-transform: scale(1.05);
        transform: scale(1.05);
        -moz-box-shadow: 5px 10px 10px #25293a;
        -webkit-box-shadow: 5px 10px 10px #25293a;
        box-shadow: 5px 10px 10px #25293a;
    }
    .el-icon-arrow{
        margin-top: 12px;
        margin-left: 12px;
        width: 25px;
        height: 25px;
        opacity: 0.5;
    }
    .el-icon-arrow:hover{
        opacity: 1;
    }
    .iconright:hover{
        opacity: 1;
        box-shadow:2px 2px 10px #23527c
    }
    .iconleft:hover{
        opacity: 1;
        box-shadow:5px 10px 10px #25293a
    }
    
    .details{
        width: 300px;
        height: 50px;
        background-color: rgba(0, 0, 0, 0.35);
        z-index: 999;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-top: -50px;
        position: relative;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }
    .detail_item{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: relative;
        color:#fff;
    }
    .icon{
        width: 16px;
        height: 16px;
        margin-right: 5px;
    }
    .work_type{
        width: 34.7px;
        height: 20px;
    }
    .btn{
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
    h4{
        margin-left: 20px;
    }

    /* 下半部分 */
    .menu {
        background-color: #f4f9fa;
        height: auto;
        padding-top: 10px;
        padding-left: 40px;
        padding-right: 40px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: left;
    }
    .presentation{
        margin-top: 30px;
        margin-left: 40px;
        display: flex;
        flex-direction: row;
    }
    .presentation_item{
        margin-right: 20px;
        display: flex;
        flex-direction: column;
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

    .tag:hover,.active{
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
    .item_img{
        width: 80px;
        height: 80px;
    }
    span{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: center;
        color: #9196a1;
    }
</style>