<template>
  <div class="word">
    <div class="hp-control hp-control-testimonials" :style="bg">
      <div class="zf-row zf-column  text-center">
        <h2>被更多人信赖</h2>
      </div>
      <div class="zf-row">
        <div class="zf-column small-12 medium-8 medium-offset-2 large-4 large-offset-0">
          <div class="hp-control-testimonial">
            <blockquote :style="douhao">
              <p>
                I thought a game was going to be extremely hard to make, but Tynker made it really easy.
              </p>
            </blockquote>
            <div class="hp-control-testimonial-meta">
              <span>
                <b>Tynker Featured Maker</b>
              </span>
              <img :src="student" class="hp-control-testimonial-avatar" alt="">
            </div>
          </div>
        </div>
        <div class="zf-column small-12 medium-8 medium-offset-2 large-4 large-offset-0">
          <div class="hp-control-testimonial">
            <blockquote  :style="douhao">
              <p>
                There's so much opportunity once they understand how coding works.
                It's amazing to see them create incredible things themselves.
              </p>
            </blockquote>
            <div class="hp-control-testimonial-meta">
              <span>
                <b>Charlotte R.</b><br>
                Parent | Melbourne, Australia
              </span>
              <img :src="parent" class="hp-control-testimonial-avatar" alt="">
            </div>
          </div>
        </div>
        <div class="zf-column small-12 medium-8 medium-offset-2 large-4 large-offset-0 end">
          <div class="hp-control-testimonial">
            <blockquote  :style="douhao">
              <p>
                Tynker has made programming fun, exciting, and simple and will help lead kids into their future.
              </p>
            </blockquote>
            <div class="hp-control-testimonial-meta">
              <span>
                <b>Valerie S.</b><br>
                5th Grade Teacher | California, US
              </span>
              <img :src="teacher" class="hp-control-testimonial-avatar" alt="">
            </div>
          </div>
        </div>
      </div>
      <a class="hp-control-ribbon" open-modal="modalVideo" video-url="//www.youtube.com/embed/dHVcRgh-n8U">
        <img :src="video" class="hp-control-ribbon-thumbnail  show-for-medium" alt="">
        <!-- <b class="icon-play-2 hp-control-ribbon-icon"></b> -->
        <!-- <img :src="play" /> -->
        Find out why everyone loves <b>Tynker</b>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Word',
    data() {
      return {
        student:this.$store.state.url + 'index/testimonial-student-cropped.png',
        parent:this.$store.state.url + 'index/testimonial-parent-cropped.png',
        teacher:this.$store.state.url + 'index/testimonial-teacher-cropped.png',
        video:this.$store.state.url + 'index/img-video-thumb.png',
        // play:this.$store.state.url + 'index/play.png',
        bg:{
          backgroundImage:"url("+require("../../../static/images/index/bg.png")+")",
          backgroundRepeat:"no-repeat"
        },
        douhao:{
          backgroundImage:"url("+require("../../../static/images/index/douhao.png")+")",
          backgroundRepeat:"no-repeat"
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  section {
    padding-bottom: 2rem;
    padding-top: 2rem;
  }

  .hp-control-testimonials {
    background-position: bottom 0 left 50%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .hp-control {
    padding-bottom: 4rem !important;
  }

  .hp-control {
    font-weight: 400;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }

  section {
    display: block;
  }

  *,
  :after,
  :before {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    background: #fefefe;
    font-family: Open Sans, Helvetica, Arial, sans-serif;
    font-size: 18px;
    /* font-weight: 500; */
    line-height: 1.5;
    color: #0a0a0a;
  }

  .zf-column.zf-row.zf-row {
    float: none;
  }

  .text-center {
    margin: 50px;
    text-align: center;
  }

  .zf-column {
    padding-right: .9375rem;
    padding-left: .9375rem;
  }

  .zf-row {
    max-width: 75em;
    margin-right: auto;
    margin-left: auto;
  }

  blockquote,
  dd,
  div,
  dl,
  dt,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  li,
  ol,
  p,
  pre,
  td,
  th,
  ul {
    margin: 0;
    padding: 0;
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

  h2 {
    padding-bottom: 20px;
  }


  .zf-row:after {
    clear: both;
  }

  .zf-row:after,
  .zf-row:before {
    display: table;
    content: " ";
  }

  .zf-row {
    max-width: 110rem;
    margin-right: auto;
    margin-left: auto;
  }

  .large-4 {
    width: 33.33333%;
  }

  .large-offset-0 {
    margin-left: 0;
  }

  .medium-8 {
    width: 66.66667%;
  }

  .medium-offset-2 {
    margin-left: 16.66667%;
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

  .hp-control-testimonial {
    margin-bottom: 2.5rem;
    min-height: 270px;
  }

  .hp-control-testimonial {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
    margin-bottom: 1rem;
    padding: 50px 50px 20px;
    position: relative;
    width: 100%;
  }

  .hp-control-testimonial blockquote {
    min-height: 105px;
  }

  .hp-control-testimonial blockquote {
    border: 0;
  }

  blockquote,
  blockquote p {
    line-height: 1.6;
    color: #8a8a8a;
  }

  blockquote {
    margin: 0 0 1rem;
    padding: .5625rem 1.25rem 0 1.1875rem;
    border-left: 1px solid #cacaca;
  }

  blockquote {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 40px;
    margin-inline-end: 40px;
  }

  .hp-control-testimonial blockquote:before {
    /* background-image: url("../assets/pathway/douhao.png"); */
    content: "";
    float: left;
    margin-left: -2rem;
    width: 20px;
    height: 13px;
  }

  .hp-control-testimonial blockquote p {
    color: #2f2f2f;
    font-size: 155%;
    font-style: italic;
  }

  .hp-control-testimonial-meta {
    display: table;
    margin-left: auto;
  }

  .hp-control-testimonial-meta>img,
  .hp-control-testimonial-meta>span {
    display: table-cell;
    text-align: right;
    vertical-align: middle;
  }

  b,
  strong {
    font-weight: 1000;
  }

  b,
  em,
  i,
  strong {
    line-height: inherit;
  }

  .hp-control-testimonial-meta>img,
  .hp-control-testimonial-meta>span {
    display: table-cell;
    text-align: right;
    vertical-align: middle;
  }

  .hp-control-testimonial-avatar {
    border-radius: 50%;
    margin-left: 1.5rem;
    width: 130px;
  }

  img {
    display: inline-block;
    vertical-align: middle;
    max-width: 100%;
    height: auto;
    -ms-interpolation-mode: bicubic;
  }

  .hp-control-testimonial-meta {
    display: table;
    margin-left: auto;
  }

  .hp-control-testimonial-meta>img,
  .hp-control-testimonial-meta>span {
    display: table-cell;
    text-align: right;
    vertical-align: middle;
  }

  .zf-column.end:last-child:last-child {
    float: left;
  }


  .zf-row:after {
    clear: both;
  }

  .hp-control-ribbon {
    font-size: 155%;
    padding: 5px 0;
  }

  .hp-control-ribbon {
    background-color: #edfcff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
    color: inherit;
    display: block;
    padding: 15px 0;
    text-align: center;
    width: 100%;
  }

  a {
    /* color: #00bcd4; */
    font-weight: 500;
    line-height: inherit;
    cursor: pointer;
  }

  .hp-control-ribbon-thumbnail {
    height: 72px;
  }

  .hp-control-ribbon-thumbnail {
    height: 50px;
    margin-right: 1rem;
  }

  a img {
    border: 0;
  }

  .icon-play-2:before {
    content: "\E08A";
  }

  .hp-control-ribbon b {
    color: #00bcd4;
    font-weight: inherit;
  }

  .icon-play-2 {
    font-family: icomoon;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    vertical-align: middle;
  }

  img {
    display: inline-block;
    vertical-align: middle;
    max-width: 100%;
    height: auto;
    -ms-interpolation-mode: bicubic;
  }

  .hp-control-ribbon b {
    color: #00bcd4;
    font-weight: inherit;
  }
</style>