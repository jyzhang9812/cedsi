<template>
    <div class="pathway">
        <div class="pathwaydetail">
            <h2>增强编码信心的途径</h2>
            <div class="pathwayword">
                <p>我们采取自定进度学习模式，使孩子们能够提高自己的技能，并无缝过渡到JavaScript和Python等文本语言的学习中。</p>
            </div>
            <div class="pathwaycontainer">
                <a style="display: block;" class="trisection left">
                    <div class="tri begin">
                        <picture>
                            <img :src="begin" alt="Beginner path" class="tripic">
                        </picture>
                        <h3>4-7岁</h3>
                        <h4>语音教学</h4>
                        <ul>
                            <li>开始使用代码！</li>
                            <li>解决逻辑问题</li>
                            <li>创建简单的应用</li>
                            <li>掌握编程基础知识</li>
                        </ul>
                    </div>
                </a>
                <a style="display: block;" class="trisection middle">
                    <div class="tri intermediate">
                        <picture>
                            <img :src="intermediate" alt="Intermediate path" class="tripic">
                        </picture>
                        <h3>7-13岁</h3>
                        <h4>拖放代码</h4>
                        <ul>
                            <li>构建应用和游戏</li>
                            <li>探索STEM科目</li>
                            <li>设计Minecraft mods</li>
                            <li>控制机器人及无人机</li>
                        </ul>
                    </div>
                </a>
                <a style="display: block;" class="trisection right">
                    <div class="tri advance">
                        <picture>
                            <img :src="advance" alt="Advanced path" class="tripic">
                        </picture>
                        <h3>13岁以上</h3>
                        <h4>真实的编码</h4>
                        <ul>
                            <li>JavaScript和Python</li>
                            <li>Web开发中使用HTML和CSS</li>
                            <li>学习数据结构</li>
                            <li>准备AP Comp Sc.</li>
                        </ul>
                    </div>
                </a>
            </div>
            <div class="explore">
                <a class="exploredetail">
                    探索课程
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Pathway',
        data() {
            return {
                begin: this.$store.state.url + 'index/path-beginner.png',
                intermediate: this.$store.state.url + 'index/path-intermediate.png',
                advance: this.$store.state.url + 'index/path-advanced.png',
            }
        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    .pathwaydetail {
        margin: 0 auto;
        width: 90%;
    }

    h2 {
        font-weight: bold;
        text-align: center;
        margin-bottom: 10px;
    }

    .pathwayword {
        margin-left: auto;
        margin-right: auto;
        width: 90%;
        /* background-color: #b0e0e6; */
        text-align: center;
        font-size: 20px;
        margin-bottom: 10px;
    }

    .pathwaycontainer {
        display: flex;
        padding: 20px;
        width: 97%;
        height: 630px;
        /* border: 5px solid #000; */
        margin: 0 auto;
    }

    .trisection {
        flex: 1;
        text-align: center;
        padding-top: 5px;
        padding-left: 10px;
        padding-right: 10px;
    }

    .tri {
        border-radius: 20px;
        box-shadow: 0 1px 10px rgba(0, 0, 0, .16);
        border-top: 200px solid transparent;
        padding-bottom: 60px;
        color: black;
    }

    .tripic {
        display: inline-block;
        height: 200px;
        margin: -130px 0 30px;
    }

    .begin {
        border-color: #7561a7;
    }

    .intermediate {
        border-color: #62b14c;
    }

    .advance {
        border-color: #de6f46;
    }

    .pathwaycontainer .trisection+.trisection {
        margin-left: 50px;
    }

    h3 {
        font-weight: bold;
        font-size: 30px;
        padding-bottom: 10px;
    }

    h4 {
        font-size: 23px;
        padding-bottom: 10px;
    }

    a {
        text-decoration: none;
    }

    .tri ul li {
        font-size: 20px;
        padding-bottom: 7px;
        list-style: none;
    }

    .explore {
        margin: 20px auto 10px;
        width: 90%;
        /* background-color: #b0e0e6; */
        text-align: center;
        font-size: 20px;
    }

    .exploredetail {
        display: inline-block;
        background-color: #e67400;
        color: #fefefe;
        font-weight: bold;
        padding: .65em 1.2em;
        border: 1px solid transparent;
        border-radius: 5px;
    }
</style>