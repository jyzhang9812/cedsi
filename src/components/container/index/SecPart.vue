<template>
   <div class="second">
      <section class="section-control padding-top-0">
      <div class="zf-row zf-column">
        <header class="text-center margin-bottom-2">
          <h2 class="margin-bottom-0">赛迪斯使孩子们成为制造者</h2>
          <p>他们所需要的只是互联网和电脑。</p>
        </header>
        <div class="highlights margin-bottom-2 swiper-container">
          <button
            class="highlight-card --button" :style="amoeba_teal"
            open-modal="modalHighlight"
            title="Design the NASA Moon2Mars mission patch"
            body="Team up with Tynker to take on coding challenges based on NASA missions. Kids get to combine coding and creativity to design an animated mission patch for the NASA Moon 2 Mars mission."
            modal-class="highlight-card --modal --nasa"
            action-text="Sign up to create"
            action-state="sjoin"
            action-url="/#/join"
            square-logo="true" >
            <span class="highlight-card__content">
              <span class="highlight-card__logo --square">
                <img :src="logo_moon" alt="Moon to Mars logo">
              </span>
              <h2 class="highlight-card__title">NASA Moon2Mars 挑战赛</h2>
              <p class="highlight-card__summary">看看这个</p>
            </span>
            <img class="highlight-card__media" :src="hero_moon">
          </button>
          <button
            class="highlight-card --button" :style="amoeba_purple"
            open-modal="modalHighlight"
            title="Program the micro:bit with our new Micro Python and block coding courses"
            body="Beginners and advanced coders learn to code with Micro:bit, a programmable computer that lets you bridge the digital and physical worlds, and create amazing projects such as a pedometer, a 2-way communication radio, and more."
            action-text="Explore courses"
            action-url="/parents/#robotics-ar"
            modal-class="highlight-card --modal --microbit"
            logo-src=""
          >
            <span class="highlight-card__content">
              <span class="highlight-card__logo">
                <img :src="logo_microbit" alt="MicroBit logo">
              </span>
              <h2 class="highlight-card__title">bit 新课程<br>开始啦</h2>
              <p class="highlight-card__summary">快来!</p>
            </span>
            <img
              class="highlight-card__media"
              :src="hero_microbit"
            >
          </button>
          <button
            class="highlight-card --button" :style="amoeba_blue"
            
          >
            <span class="highlight-card__content">
              <span class="highlight-card__logo">
                <img :src="logo_jr" alt="Tynker Junior logo">
              </span>
              <h2 class="highlight-card__title">新的赛迪斯Junior 移动应用程序</h2>
              <p class="highlight-card__summary">现在有空!</p>
            </span>
            <img
              class="highlight-card__media"
              :src="hero_junior"
            >
          </button>
        </div>
      </div>
      <div class="zf-row" style="height:300px; margin-top:50px; width: 80%;">
        <div
          class="zf-column small-10 small-offset-1 medium-8 medium-offset-2 large-5 large-offset-0"
        >
          <ul class="zf-row homepage-parent-circles text-center margin-bottom-4">
            <li class="zf-column small-4">
              <a
                href="/parents/"
                onclick="ga('send', 'event', 'Home Page', 'Image Click', 'Our Mission: Control Toys')"
              >
                <img :src="circle_drone" alt="Code Drones" width="80" height="80">
                控制玩具
              </a>
            </li>
            <li class="zf-column small-4">
              <a
                href="/parents/"
                onclick="ga('send', 'event', 'Home Page', 'Image Click', 'Our Mission: Create Apps')"
              >
                <img :src="circle_app" alt="Create Apps" width="80" height="80">
                创建应用
              </a>
            </li>
            <li class="zf-column small-4">
              <a
                href="/parents/"
                onclick="ga('send', 'event', 'Home Page', 'Image Click', 'Our Mission: Mod Minecraft')"
              >
                <img :src="circle_mc" alt="Mod Minecraft" width="80" height="80">
                我的世界
              </a>
            </li> 
            <li class="zf-column small-4">
              <a
                href="/parents/"
                onclick="ga('send', 'event', 'Home Page', 'Image Click', 'Our Mission: Build Games')"
              >
                <img :src="circle_game" alt="Build Games" width="80" height="80">
                打造游戏
              </a>
            </li>
            <li class="zf-column small-4">
              <a
                href="/parents/"
                onclick="ga('send', 'event', 'Home Page', 'Image Click', 'Our Mission: Make Websites')"
              >
                <img :src="circle_web" alt="Make Websites" width="80" height="80">
                制作网站
              </a>
            </li>
            <li class="zf-column small-4">
              <a
                href="/parents/"
                onclick="ga('send', 'event', 'Home Page', 'Image Click', 'Our Mission: Learn Coding Languages')"
              >
                <img :src="circle_text" alt="Program Robots" width="80" height="80">
                学习编程语言
              </a>
            </li>
          </ul>
        </div>
        <div
          class="zf-column small-10 small-offset-1 medium-8 medium-offset-2 large-6 large-offset-1 end large-margin-top-4"
        >
          <h2>儿童排名第一的编码平台</h2>
          <p>
            赛迪斯为提供学习资源
            <strong>87,000 schools</strong> and powers the imagination of
            <strong>60 million kids</strong> worldwide.
          </p>
          <p>通过赛迪斯，孩子们学习使用代表真实编程概念的革命性可视代码块来编写有趣而简单的方法。</p>
        </div>
      </div>
    </section>
   </div>
</template>

<script>
// import 'swiper/dist/css/swiper.css'
//  import Swiper from 'swiper';
export default {
  data(){
    return {
      amoeba_teal:{
        
        backgroundColor: "#27c0c9",
        backgroundImage: "url(" + require("../../../../static/images/index/amoeba-teal.png") + ") ",
        
      },
      amoeba_purple:{
        backgroundColor: "#903edb",
        backgroundImage: "url(" + require("../../../../static/images/index/amoeba-purple.png") + ") ",
      },
      amoeba_blue:{
        backgroundColor: "#5076ff",
        backgroundImage: "url(" + require("../../../../static/images/index/amoeba-blue.png") + ") ",
      },

      logo_moon:this.$store.state.url+"index/logo-moon2mars.png",
      hero_moon:this.$store.state.url+"index/hero-moon2mars.png",
      logo_microbit:this.$store.state.url+"index/logo-microbit.png",
      hero_microbit:this.$store.state.url+"index/hero-microbit.png",
      logo_jr:this.$store.state.url+"index/logo-jr.png",
      hero_junior:this.$store.state.url+"index/hero-junior.png",
      circle_drone:this.$store.state.url+"index/circle-drone.png",
      circle_app:this.$store.state.url+"index/circle-app.png",
      circle_mc:this.$store.state.url+"index/circle-mc.png",
      circle_web:this.$store.state.url+"index/circle-web.png",
      circle_game:this.$store.state.url+"index/circle-game.png",
      circle_text:this.$store.state.url+"index/circle-text.png",
    }
  }
}
</script>


<style scoped>
.second {
  /* margin-top: 10px; */
  transform: none;
  transition: transform 0.5s ease;
  backface-visibility: hidden;
  
}
section {
  padding-bottom: 2rem;
  padding-top: 2rem;
  display: block;
}
@media print, screen and (min-width: 64em) {
  .section-control {
    text-align: left;
  }
}
.section-control {
  background-color: #fff;
  color: #0a0a0a;
  font-weight: 400;
  margin: 0 auto;
  position: relative;
}
*,
:after {
  box-sizing: inherit;
}
.zf-row.zf-column {
  float: none;
  width: 80%;
}
.section-control .zf-row {
  position: relative;
}
@media print, screen and (min-width: 40em) {
  .zf-column {
    padding-right: 0.9375rem;
    padding-left: 0.9375rem;
  }
}
.zf-row {
  margin-right: auto;
  margin-left: auto;
}
div,h2,p {
  margin: 0;
  padding: 0;
}
.zf-row:before {
  display: table;
  content: " ";
}

header {
  flex-shrink: 0;
  display: block;
  width: 100%;
}
h2.margin-bottom-0 {
  padding-bottom: 20px;
  font-family: Roboto Slab, Open Sans, Helvetica, Arial, sans-serif;
  line-height: 1.3;
  color: #25293a;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-style: normal;
  font-weight: 300;
  text-rendering: optimizeLegibility;
}
.section-control h2 + p {
  margin-top: 0 !important;
}
.section-control p {
  color: inherit;
}
.section-control p {
  margin-bottom: 2rem;
}

p {
  font-family: Open Sans, Helvetica, Arial, sans-serif;
  font-size: 20px;
  line-height: 1.6;
}

@media print, screen and (min-width: 64em) {
  .highlights {
    justify-content: space-between;
  }
}
.highlights {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
  height: 240px;
}
.highlight-card.\--button {
  margin-bottom: 2rem;
  min-width: 18.75rem;
  min-height: 8rem;
  transition: all 0.1s ease-in-out;
}

.highlight-card {
  background-repeat: no-repeat;
  background-position: 100%;
  background-size: cover;
  border-radius: 8px;
  box-shadow: 0 10px 1rem rgba(0, 0, 0, 0.16);
  color: #fff;
  padding: 1rem 2rem 2rem;
  position: relative;
  text-align: left;
}
 @media print, screen and (min-width: 64em) {
  .highlights > * {
    max-width: 31%;
  }
} 
.highlights > * {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
}
button {
  font-family: inherit;
  border: 0;
  background: 0 0;
  line-height: 1;
  cursor: auto;
  text-transform: none;
  overflow: visible;
  font-size: 100%;
  margin-left: 5px;
  transition: all 0.3s;
}
button:hover{
  transform:scale(1.1);
}
.highlight-card__content {
  display: block;
  width: 50%;
  height: 100%;
  min-height: inherit;
}
.highlight-card__logo.\--square {
  height: 1.875rem;
  margin-bottom: 0.3125rem;
}
.highlight-card__logo {
  display: block;
}
.highlight-card__logo img {
  height: inherit;
}
img {
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  border-style: none;
}

.highlight-card__title {
  color: inherit;
  display: block;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25em;
  padding-bottom: 0;
  font-family: Roboto Slab, Open Sans, Helvetica, Arial, sans-serif;
  line-height: 1.3;
  margin-top: 0;
  font-style: normal;
  text-rendering: optimizeLegibility;
}
.highlight-card__summary {
  display: block;
  font-size: 0.8125rem;
  margin-bottom: 0;
  padding-right: 14%;
  /* font-size: 15px; */
}
.highlight-card__media {
  position: absolute;
  top: 50%;
  right: -0.5rem;
  pointer-events: none;
  transform: translateY(-50%);
  width: 48%;
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  border-style: none;
}
.zf-row:after {
  clear: both;
  display: table;
  box-sizing: inherit;
}

@media print, screen and (min-width: 64em) {
  .large-5 {
    width: 46.66667%;
  }
}
@media print, screen and (min-width: 64em) {
  .large-offset-0 {
    margin-left: 0;
  }
}
.zf-row .zf-column:first-child {
  float: left;

}
.zf-row:not(.expanded) .zf-row {
  max-width: none;
}
@media screen and (min-width: 75em) {
  .zf-row .zf-row {
    margin-right: 0.9375rem;
    margin-left: 0.9375rem;
  }
}
.homepage-parent-circles {
  font-weight: 700;
  font-size: 0.9rem;
  color: inherit;
  text-transform: uppercase;
  word-spacing: 99rem;
  line-height: 1.2rem;
  margin-top: 1rem;
  margin-bottom: 5rem;
}
ul {
  list-style-type: none;
  list-style-position: outside;
}
.section-control li {
  color: inherit;
}
.small-4 {
  width: 33.3333%;
}
li.zf-column {
  float: left;
  font-size: inherit;
}
.section-control a {
  font-size: inherit;
}
.homepage-parent-circles a {
  font-weight: 700;
  color: inherit;
}
a {
  text-decoration: none;
  background-color: transparent;
  line-height: inherit;
  cursor: pointer;
}
.homepage-parent-circles img {
  display: block;
  margin: 1rem auto;
}
a img {
  border: 0;
  vertical-align: middle;
  max-width: 100%;
  height: auto;
}

.zf-row .zf-column:last-child {
  float: right;
}

@media print, screen and (min-width: 64em) {
  .large-6 {
    width: 40%;
    margin-top:25px;
  }
}
@media print, screen and (min-width: 64em) {
  .large-offset-1 {
    margin-left: 8.33333%;
  }
}
h2.text {
  color: #25293a;
  padding-bottom: 20px;
  font-family: Roboto Slab, Open Sans, Helvetica, Arial, sans-serif;
  line-height: 1.3;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-style: normal;
  font-weight: 300;
}
</style>

