<template>
    <div class="word">
        <!-- <div class="worddetail"> -->
        <div class="worddetail" :style="bg">
            <h2>被更多人信赖</h2>
            <div class="wordcontainer">
                <div class="trisection" v-for="item in word">
                    <div class="tricard">
                        <blockquote :style="douhao">
                            <p>
                                {{item.sentence}}
                            </p>
                        </blockquote>
                        <div class="triperson">
                            <span>
                                <b>{{item.name}}</b><br>
                                {{item.identity}} | {{item.address}}
                            </span>
                            <img :src="item.img" class="tripic">
                        </div>
                    </div>
                </div>
            </div>
            <div class="join">
                <a class="wordjoin">
                    <img :src="video" class="joinpic" alt="">
                    加入赛迪思
                </a>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: 'Word',
        data() {
            return {
                word: [
                    {
                        sentence: "I thought a game was going to be extremely hard to make, but Tynker made it really easy.",
                        name: "Tynker Featured Maker",
                        description: "",
                        identity:"student",
                        address:"Melbourne, Australia",
                        img: this.$store.state.url + "index/testimonial-student-cropped.png",
                    },
                    {
                        sentence: "There's so much opportunity once they understand how coding works.It's amazing to see them create incredible things themselves.",
                        name: "Charlotte R.",
                        description: "Parent | Melbourne, Australia",
                        identity:"Parent",
                        address:"Melbourne, Australia",
                        img: this.$store.state.url + "index/testimonial-parent-cropped.png",
                    },
                    {
                        sentence: "Tynker has made programming fun, exciting, and simple and will help lead kids into their future.",
                        name: "Tynker Featured Maker",
                        description: "5th Grade Teacher | California, US",
                        identity:"5th Grade Teacher",
                        address:"California, US",
                        img: this.$store.state.url + "index/testimonial-teacher-cropped.png",
                    },
                ],
                // student: this.$store.state.url + 'index/testimonial-student-cropped.png',
                // parent: this.$store.state.url + 'index/testimonial-parent-cropped.png',
                // teacher: this.$store.state.url + 'index/testimonial-teacher-cropped.png',
                video: this.$store.state.url + 'index/img-video-thumb.png',
                // play:this.$store.state.url + 'index/play.png',
                bg: {
                    backgroundImage: "url(" + require("../../../../static/images/index/bg.png") + ")",
                    backgroundRepeat: "no-repeat"
                },
                douhao: {
                    backgroundImage: "url(" + require("../../../../static/images/index/douhao.png") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "-1.5% -1%",
                    content: "",
                }
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    .worddetail {
        margin: 30px auto;
        width: 100%;
        height: 750px;
        /* border: 5px solid #000; */
        background-repeat: no-repeat;
        background-position: 0px 30px;
        background-size: cover;
    }

    h2 {
        font-weight: bold;
        text-align: center;
        margin-bottom: 10px;
    }

    .wordcontainer {
        display: flex;
        padding: 20px;
        width: 90%;
        height: 650px;
        margin: 0 auto;
        align-items: center;
        /* border: 5px solid #000; */
    }

    .trisection {
        flex: 1;
        text-align: center;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 50px;
        /* border: 5px solid #000; */
    }

    .tricard {
        margin-bottom: 50px;
        min-height: 450px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
        padding: 30px 45px 20px;
        position: relative;
        width: 90%;
        /* border: 5px solid #000; */
    }

    blockquote {
        border-left: 0px solid #eee;
        font-size: 17.5px;
        /* border: 5px solid #000; */
        margin-bottom: 30px;
    }

    blockquote p {
        color: #2f2f2f;
        font-size: 150%;
        font-style: italic;
        font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
        /* font-family: "montserrat", sans-serif; */
    }

    .triperson {
        display: table;
        margin-left: auto;
        margin-top: 30px;
    }

    span {
        display: table-cell;
        text-align: right;
        vertical-align: middle;
        font-size: 20px;
    }

    b {
        font-size: 20px;
    }

    .tripic {
        border-radius: 50%;
        margin-left: 1.5rem;
        width: 80px;
    }

    .join {
        margin: -60px auto;
        width: 100%;
        height: 120px;
        /* border: 5px solid #000; */
        text-align: center;
        padding: 20px 0;
        background-color: #edfcff;
        box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
    }

    .wordjoin {
        font-size: 24px;
        font-weight: bold;
    }
</style>