<template>
    <div class="pathway">
        <section class="hp-control">
            <div class="zf-row zf-column  text-center">
                <h2>增强编码信心的途径</h2>
                <p>我们采取自定进度学习模式，使孩子们能够提高自己的技能，并无缝过渡到JavaScript和Python等文本语言的学习中。</p>
            </div>
            <div class=" testtest">
                <a style="display: block;" class="test test1s small-12 medium-6 large-4">
                    <div class="hp-control-level hp-control-level-beginner">
                        <picture>
                                <img :src="begin" alt="Beginner path"
                                class="hp-control-level-thumbnail">
                        </picture>
                        <h3 style="font-weight:700;font-size:20pt;">4-7岁</h3>
                        <h4>语音教学</h4>
                        <ul class="no-bullet hp-control-level-list">
                            <li>开始使用代码！</li>
                            <li>解决逻辑问题</li>
                            <li>创建简单的应用</li>
                            <li>掌握编程基础知识</li>
                        </ul>
                    </div>
                </a>
                <a style="display: block;" class="test test2 n small-12 medium-6 large-4">
                    <div class="hp-control-level hp-control-level-intermediate">
                        <picture>
                            <img :src="intermediate" alt="Intermediate path"
                                class="hp-control-level-thumbnail">
                        </picture>
                        <h3 style="font-weight:700;font-size:20pt;">7-13岁</h3>
                        <h4>拖放代码</h4>
                        <ul class="no-bullet hp-control-level-list">
                            <li text-align="center">构建应用和游戏</li>
                            <li text-align="center">探索STEM科目</li>
                            <li text-align="center">设计Minecraft mods</li>
                            <li text-align="center">控制机器人及无人机</li>
                        </ul>
                    </div>
                </a>
                <a style="display: block;"
                    class="test test3  small-12 medium-6 medium-offset-3 large-4 large-offset-0 end">
                    <div class="hp-control-level hp-control-level-advanced">
                        <picture>
                            <img :src="advance" alt="Advanced path"
                                class="hp-control-level-thumbnail">
                        </picture>
                        <h3 style="font-weight:700;font-size:20pt;">13岁以上</h3>
                        <h4>真实的编码</h4>
                        <ul class="no-bullet hp-control-level-list">
                            <li>JavaScript和Python</li>
                            <li>Web开发中使用HTML和CSS</li>
                            <li>学习数据结构</li>
                            <li>准备AP Comp Sc.</li>
                        </ul>
                    </div>
                </a>
            </div>
            <div class="zf-row">
                <div class="zf-column text-center">
                    <a href="/parents/" class="button primary homepage-parent-hero-button"
                        onclick="ga('send', 'event', 'Home Page', 'Button Click', 'Learn More')"
                        style="margin-top: 36px;">
                        了解更多
                    </a>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
    export default {
        name: 'Pathway',
        data() {
            return {
                begin:this.$store.state.url + 'index/path-beginner.png',
                intermediate:this.$store.state.url + 'index/path-intermediate.png',
                advance:this.$store.state.url + 'index/path-advanced.png',
            }
        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .zf-row {
        max-width: 95rem;
        margin-right: auto;
        margin-left: auto;
    }

    .zf-column {
        width: 100%;
        float: left;
        padding-right: .625rem;
        padding-left: .625rem;
    }

    .hp-control {
        font-weight: 400;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
    }

    h2 {
        padding-bottom: 20px;
    }

    h2+p {
        margin-top: -20px;
        font-size: 20px;
    }

    section {
        display: block;
    }

    *,
    :after,
    :before {
        box-sizing: inherit;
    }

    .zf-column.zf-row.zf-row {
        float: none;
    }

    .text-center {
        text-align: center;
    }

    .zf-column {
        padding-right: .9375rem;
        padding-left: .9375rem;
    }

    .testtest {
        max-width: 130rem;
        margin: 30px auto;
        /* display: flex;
        float: left; */
        display: inline-block;
        /* Firefox */

        display: -moz-box;

        -moz-box-orient: horizontal;

        /* Safari, Opera, and Chrome */

        display: -webkit-box;

        -webkit-box-orient: horizontal;

        /* W3C */

        display: box;

        box-orient: horizontal;
    }

    .test {
        /* flex: 1; */
        padding-left: 50px;
        float: left;
        width: 33%;
        -webkit-box-flex: 1.0;

        -moz-box-flex: 1.0;

        box-flex: 1.0;

    }


    .hp-control {
        font-weight: 400;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
    }

    .zf-row:after,
    .zf-row:before {
        display: table;
        content: " ";
    }

    *,
    :after,
    :before {
        box-sizing: inherit;
    }

    h2,
    h3,
    h4,
    p {
        color: #25293a;
    }

    h4{
        font-size: 24px;
    }

    p {
        font-family: Open Sans, Helvetica, Arial, sans-serif;
        margin: 0;
    }

    .zf-row:after {
        clear: both;
    }

    *,
    :after,
    :before {
        box-sizing: inherit;
    }


    element.style {
        display: block;
    }

    .large-4 {
        width: 33.33333%;
    }

    .medium-6 {
        width: 50%;
    }

    .small-12 {
        width: 100%;
    }

    .zf-column {
        padding-right: .9375rem;
        padding-left: .9375rem;
    }

    .zf-column {
        width: 100%;
        float: left;
        padding-right: .625rem;
        padding-left: .625rem;
    }

    a {
        color: #fff;
        font-weight: 500;
        line-height: inherit;
        cursor: pointer;
    }

    a,
    p {
        font-size: 20px;
        cursor: pointer;
    }

    a:hover {
        outline-width: 0;
        cursor: pointer;
    }

    .hp-control-level {
        background-color: #fff;
        border-radius: 20px;
        border-top: 170px solid transparent;
        box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
        position: relative;
        margin: 2rem auto 0;
        max-width: 100%;
        padding-bottom: 20px;
        text-align: center;
        width: 400px;
    }

    .hp-control-level-beginner {
        border-color: #7561a7;
    }

    .hp-control-level-thumbnail {
        display: inline-block;
        height: 170px;
        margin: -130px 0 30px;
    }

    a img {
        border: 0;
        cursor: pointer;
    }

    img {
        display: inline-block;
        vertical-align: middle;
        max-width: 100%;
        height: auto;
        -ms-interpolation-mode: bicubic;
    }



    h4 {
        font-family: Roboto Slab, Open Sans, Helvetica, Arial, sans-serif;
        line-height: 1.3;
        padding-bottom: 10px;
    }

    .hp-control a .hp-control-level .hp-control-level-list {
        color: #0a0a0a;
    }



    li {
        display: list-item;
        text-align: center;
        cursor: pointer;
    }

    .hp-control-level-list {
        line-height: 2;
        cursor: pointer;
    }

    .hp-control-level-intermediate {
        border-color: #62b14c;
        cursor: pointer;
    }

    .hp-control-level-thumbnail {
        display: inline-block;
        height: 170px;
        margin: -130px 0 30px;
        cursor: pointer;
    }

    .hp-control a .hp-control-level .hp-control-level-list {
        color: #0a0a0a;
        cursor: pointer;
    }


    ul.no-bullet {
        margin-left: -40px;
        list-style: none;
        cursor: pointer;
    }


    .hp-control-level-advanced {
        border-color: #de6f46;
    }

    .hp-control-level-thumbnail {
        display: inline-block;
        height: 170px;
        margin: -130px 0 30px;
    }

    .button.primary,
    .button.primary:focus,
    .button.primary:hover {
        color: #fefefe;
        margin-top: 36px;
        height: 50px;
    }

    .button.primary {
        background-color: #ff8d1a;
    }

    .homepage-parent-hero-button {
        min-width: 20rem;
        margin-top: 1.5rem;
    }

    .button {
        font-weight: 15000;
    }

    .button {
        display: inline-block;
        vertical-align: middle;
        margin: 0 0 1rem;
        font-family: inherit;
        padding: .65em 0.5em;
        -webkit-appearance: none;
        border: 1px solid transparent;
        border-radius: 5px;
        transition: background-color .25s ease-out, color .25s ease-out;
        /* font-size: .100rem; */
        line-height: 1;
        text-align: center;
        cursor: pointer;
    }
</style>