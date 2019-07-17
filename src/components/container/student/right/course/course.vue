<template>
    <div class="container">
            <!-- <div>
                <div class="threeImg">
                    <div class="Containt">
                        <div class="iconleft">
                            <img class="el-icon-arrow" src="../../../../static/images/dashboard/left.png"></img>
                        </div>
                        <ul :style="{'left':calleft + 'px'}">
                            <li v-for="(item,index) in superurl" :key="index">
                                <img class="img" :src="item.url"/>
                            </li>
                        </ul>
                        <div class="iconright">
                            <img class="el-icon-arrow" src="../../../../static/images/dashboard/right.png"></img>
                        </div>
                        
                    </div>
                </div>
                
            </div> -->
        <courseCard></courseCard>
    </div>
</template>

<script>
    import courseCard from'./courseCard.vue'
    export default {
        name: 'dashboard',
        components:{
            courseCard,
        },
        data() {
        return {
        //     superurl: [
        //         {
        //             url: 'https://www.tynker.com/image/dashboard/student/learn/tutorials/nasa-design-a-mission-patch.png?width=600&height=400&mode=cover&format=jpg&quality=75&cache=1m&v=1',
        //             img: '',
        //         },
        //         {
        //             url: 'https://www.tynker.com/image/hour-of-code/2017/mod-minecraft.png?width=600&height=400&mode=cover&format=jpg&quality=75&cache=1m&v=1',
        //             img: '',
        //         },
        //         {
        //             url: 'https://www.tynker.com/image/hour-of-code/2018/crystal-clash/crystal-clash.png?width=600&height=400&mode=cover&format=jpg&quality=75&cache=1m&v=1',
        //             img: '',
        //         },
        //         {
        //             url: 'https://www.tynker.com/image/hour-of-code/2016/spin-draw/spin-draw-1.png?width=600&height=400&mode=cover&format=jpg&quality=75&cache=1m&v=1',
        //             img: '',
        //         },
        //         {
        //             url: 'https://www.tynker.com/ide/imgs/templates/new.png?width=600&height=400&mode=cover&format=jpg&quality=75&cache=1m&v=1',
        //             img: '',
        //         },
        //         {
        //             url: 'https://www.tynker.com/image/hour-of-code/2017/dragon-blast/dragon-blast-1.png?width=600&height=400&mode=cover&format=jpg&quality=85&cache=1m&v=1',
        //             img: '',
        //         },
        //     ],
        //     calleft:0
            }
        },
        // methods: {
        //     //移动
        //     move() {
        //         this.timer = setInterval(this.starmove, 2500)
        //     },
        //     //开始移动
        //     starmove() {
        //         this.calleft -= 340;
        //         if (this.calleft < -1200) {
        //             this.calleft = 0
        //         }
        //     },
        //     //鼠标悬停时停止移动
        //     stopmove() {
        //         clearInterval(this.timer)
        //     },
        //     //点击按钮左移
        //     zuohua() {
        //         this.calleft -= 340;
        //         if (this.calleft < -1200) {
        //             this.calleft = 0
        //         }
        //     },
        //     //点击按钮右移
        //     youhua() {
        //         this.calleft += 340;
        //         if (this.calleft > 0) {
        //             this.calleft = -1020
        //         }
        //     },
        // },
}   
</script>

<style>
    .container{
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #f4f9fa;
        color: #fff;
        padding: 0;
    }
    /* .threeImg {
        min-height: 280px;
        min-width: 1000px;
        background-color: #23527c;
    }
        
    .threeImg .Containt ul {
        margin: 10px auto;
        width: 2400px;
        position: absolute;
        left: 0px;
        cursor: pointer;
        height: 100%
    }
        
    .threeImg .Containt ul li {
        width: 300px;
        margin-right: 40px;
        margin-top: 10px;
        float: left;
    }
        
    .threeImg .Containt ul li img {
        height: 200px;
        width: 100%;
    }
        
    .Containt {
        position: relative;
        min-height: 250px;
        overflow: hidden;
        margin: 0 auto;
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
        left: 1050px;
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
    /* ul{
        list-style-type: none;
    }
    .img{
        border-radius:20px; 
    }
    .img:hover{
        -webkit-transform: scale(1.15);
        -moz-transform: scale(1.15);
        -ms-transform: scale(1.15);
        -o-transform: scale(1.15);
        transform: scale(1.15);
        box-shadow:0px -10px 20px 0px #23527c,   /*上边阴影*/
                   /* -2px 0px 20px 0px #23527c,   左边阴影
                   2px 0px 20px 0px #23527c,    右边阴影
                   0px 10px 20px 0px #23527c;    下边阴影
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
    }  */
</style>