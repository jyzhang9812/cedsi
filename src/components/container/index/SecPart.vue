<template>
  <div class="second">
     <div class="zf-row zf-column">
       <header class="text-center">
         <h2>{{header_h2}}</h2>
         <p>{{header_p}}</p>
       </header>
       <div class="highlights" >
         <button class="highlight-card --button" v-for="item in highlights" :key="item" :style=item.amoeba > 
           <span class="highlight-card__content">
             <span class="highlight-card__logo --square">
               <img :src="item.logo" alt="Moon to Mars logo">
             </span>
             <h2 class="highlight-card__title">{{item.title}}</h2>
             <p class="highlight-card__summary">{{item.summary}}</p>
           </span>
           <img class="highlight-card__media" :src="item.hero">
         </button>
       </div>
    <div class="zf-row bottom">
       <div class="zf-column large-5 large-offset-0">
         <ul class="zf-row homepage-parent-circles text-center">
           <li class="zf-column small-4" v-for="item in circles" :key="item">
             <a href="">
               <img :src="item.circle" alt="Code Drones">
               {{item.name}}
             </a>
           </li>
         </ul>
       </div>
       <div class="zf-column large-6 large-offset-1">
         <h2>{{message.h2}}</h2>
         <p>
           {{message.p1}}
           <strong>{{message.ps1}}</strong> {{message.p11}}
           <strong>{{message.ps2}}</strong>{{message.p12}}
         </p>
         <p>{{message.p2}}</p>
       </div>
     </div>
  </div>
  </div>
</template>

<script>

export default {
 data(){
   return {
     highlights:[
       {
         amoeba:{  
           backgroundColor: "#27c0c9",
           backgroundImage: "url(" + require("../../../../static/images/index/amoeba-teal.png") + ") ",   
         },
         logo:this.$store.state.url+"index/logo-moon2mars.png",
         title:"NASA Moon2Mars 挑战赛",
         summary:"看看这个",
         hero:this.$store.state.url+"index/hero-moon2mars.png",
       },
       {
         amoeba:{
           backgroundColor: "#903edb",
           backgroundImage: "url(" + require("../../../../static/images/index/amoeba-purple.png") + ") ",
         },
         logo:this.$store.state.url+"index/logo-microbit.png",
         title:"bit 新课程   开始啦",
         summary:"快来！",
         hero:this.$store.state.url+"index/hero-microbit.png",
       },
       {
         amoeba:{
           backgroundColor: "#5076ff",
           backgroundImage: "url(" + require("../../../../static/images/index/amoeba-blue.png") + ") ",
         },
         logo:this.$store.state.url+"index/logo-jr.png",
         title:"新的赛迪斯Junior 移动应用程序",
         summary:"现在有空",
         hero:this.$store.state.url+"index/hero-junior.png",
       }
     ],
     circles:[
       {circle:this.$store.state.url+"index/circle-drone.png",
       name:"控制玩具",
       },
       {
       circle:this.$store.state.url+"index/circle-app.png",
       name:"创造应用",
       },
       {
       circle:this.$store.state.url+"index/circle-mc.png",
       name:"我的世界",
       },
       {
       circle:this.$store.state.url+"index/circle-web.png",
       name:"打造游戏",
       },
       {
       circle:this.$store.state.url+"index/circle-game.png",
       name:"制作网站",
       },
       {
       circle:this.$store.state.url+"index/circle-text.png",
       name:"学习编程语言",
       },
     ],
       header_h2:"赛迪斯使孩子们成为制造者",
       header_p:"他们所需要的只是互联网和电脑。",
     message:{
     h2:"儿童排名第一的编码平台",
     p1:"赛迪斯为提供学习资源",
     ps1:"87,000 schools",
     ps2:"60 million kids",
     p11:"and powers the imagination of",
     p12:" worldwide.",
     p2:"通过赛迪斯，孩子们学习使用代表真实编程概念的革命性可视代码块来编写有趣而简单的方法。"
   },
   }
 },  
}

</script>


<style scoped>
.second{
 padding-bottom: 2rem;
 padding-top: 2rem;
} 
.zf-row.zf-column {
 float: none;
 width: 80%;
} 

.zf-row {
 margin-right: auto;
 margin-left: auto;
} 
header.h2{
 padding-bottom: 20px;
 font-family: Roboto Slab, Open Sans, Helvetica, Arial, sans-serif;
 margin-bottom: 0.5rem;
 font-weight: 300;
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
 width: 100%;
 height: 240px;
}
.highlight-card.\--button {
 margin-bottom: 2rem;
 min-width: 18.75rem;
 min-height: 8rem;
}

.highlight-card.\--button {
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
 border: 0;
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
}
.highlight-card__logo.\--square {
 height:45px;
 margin-bottom: 20px;
}
.highlight-card__logo {
 display: block;
}
.highlight-card__logo img {
 height: inherit;
}
img {
 display: inline-block;
 max-width: 100%;
 border-style: none;
}

.highlight-card__title {
 color: inherit;
 display: block;
 font-size: 19px;
 font-weight: 600;
 margin-bottom: 0.25em;
 padding-bottom: 0;
 font-family: Roboto Slab, Open Sans, Helvetica, Arial, sans-serif;
 line-height: 1.3;
 margin-top: 0;
 font-style: normal;
}
.highlight-card__summary {
 display: block;
 font-size: 12px;
 margin-bottom: 0;
 padding-right: 14%;
}
.highlight-card__media {
 position: absolute;
 top: 50%;
 right: -0.5rem;
 transform: translateY(-50%);
 width: 48%;
 max-width: 100%;
}
.bottom{
  height:300px; 
  margin-top:50px; 
  width: 100%;
}
@media print, screen and (min-width: 64em) {
 .large-5 {
   width: 46.66667%;
 }
}
.zf-row .zf-column:first-child {
 float: left;
}
.homepage-parent-circles {
 font-weight: 700;
 font-size: 0.9rem;
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
.homepage-parent-circles a {
 font-weight: 700;
 color: inherit;
 font-size: 16px;
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
 width: 80px;
 height: 80px;
}

.zf-row .zf-column:last-child {
 float: right;
}

@media print, screen and (min-width: 64em) {
 .large-6 {
   width: 40%;
 }
}
@media print, screen and (min-width: 64em) {
 .large-offset-1 {
   margin-left: 8.33333%;
 }
}
h2.text {
 color: #25293a;
 font-family: Roboto Slab, Open Sans, Helvetica, Arial, sans-serif;
 font-weight: 300;
}
</style>

