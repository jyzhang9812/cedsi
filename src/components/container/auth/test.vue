<template>
        <div id="errorpage" >
            <!-- <div class="form">
            <form>
                <div class="font">
                    <h1>404</h1>
                    <p>找不到页面啦╥﹏╥...</p>
                </div>
                <div class="submit">
                    <button @click='jmp'>返回主页</button>
                </div>
            </form>
            </div> -->
            <!-- <div >  -->
                
            <!-- <img v-on:mousemove="updateCoordinates" src="https://cedsi.s3.cn-northwest-1.amazonaws.com.cn/lu-liu-10.jpg"> -->
             <div class="outerR">
    
              <div class="inner1" v-for="" :top="100" :left="100" @click="zuoye">
                <img src="https://cedsi.s3.cn-northwest-1.amazonaws.com.cn/icon.png">
              </div>
    
              <div class="inner2">
                <canvas id="canvas" ref="canvas"   :height="h" :width="w">
                
                </canvas>
              </div>
              
             </div> 
            
            
    
            
    <p id="output">
        Coordinates: {{ x }} / {{ y }}
        <br>{{ r }}/{{ g }}/{{ b }} /{{a}}
    </p>
    <button @click="debug">debug</button>
        </div>
    </template>
        
    <script>
    export default {
        data () {
          return {
            x: 0, y: 0, r: 0, g: 0, b: 0, a: 0, 
            h:null, w:null,
            index: 0,
        imgData: [],
        buttonList:[{bx:100,by:187,url:''},{bx:600,by:300,url:''},{bx:700,by:300,url:''}]
          }
        },
        created() {
            // buttonList:[]
        },
        mounted() {
            var cts = this.$refs.canvas;
        // this.imgData = ctx.getImageData(0, 0, this.w, this.h);
        // console.log('------')
        var ctx = this.$refs.canvas.getContext("2d");
            var image = new Image();
            // var image=[];
    
            // var index=0
            // this.buttonList.forEach(item => {
            //   var temp =new Image();
            //   temp.crossOrigin = 'Anonymous';
            //   temp.id ='icon'+index;
            //   index++;
            //   temp.src = 'https://cedsi.s3.cn-northwest-1.amazonaws.com.cn/icon.png';
            //   temp.addEventListener("load",function(event){
            //     ctx.drawImage(temp,item.bx,item.by);
            // });
            // temp.addEventListener("click",function(event){
            //     alert('你好')
            // });
            // });
            // index=0;
    
            
            var image1 = new Image();
            image.crossOrigin = 'Anonymous';
            // image1.crossOrigin = 'Anonymous';
            image.src = 'https://cedsi.s3.cn-northwest-1.amazonaws.com.cn/lu-liu-10.png';
            // image1.src = 'https://cedsi.s3.cn-northwest-1.amazonaws.com.cn/icon.png';
            image.addEventListener("load",function(){
                ctx.drawImage(image,0,0);
                    },false);
            this.w=image.width;
            this.h=image.height;
    
            // image1.addEventListener("load",function(event){
            //     ctx.drawImage(image1,100,140);
            // });
    
            // var tempCo = this.$refs.fuck;
    
            var that = this;
            cts.addEventListener("mousemove",function(event){
              that.r=ctx.getImageData(event.clientX,event.clientY,1,1).data[0];
              that.g=ctx.getImageData(event.clientX,event.clientY,1,1).data[1];
              that.b=ctx.getImageData(event.clientX,event.clientY,1,1).data[2];
              that.a=ctx.getImageData(event.clientX,event.clientY,1,1).data[3];
              that.x = event.clientX;
          that.y = event.clientY;
                    },false);
        },
        watch: {
          imgData: function() {
            var ctx = this.$refs.canvas.getContext("2d");
          ctx.putImageData(this.imgData, 0, 0);
        }
      },
        methods: {
          updateCoordinates(event){
          },
          debug: function() {
          var data = this.imgData.data
                data[this.index] = 255;
                data[this.index+1] = 0;
          data[this.index+2] = 0;
          data[this.index+3] = 255;
          this.imgData = new ImageData(data, this.w, this.h) 
          this.index+=4;
        },
        zuoye(){
          alert('优秀')
        }
        
        }
      }
    </script>
        
    <style scoped>
        #errorpage{
            min-height: 100%;
        }
        #canvas {
      border: 1px solid #d3d3d3;
    }
    .inner1{
      /* background-color: red;  */
      border: #d3d3d3 solid 1px;
      top: 100px;
      left: 100px;
      height: 50px;
      width: 50px;
      z-index:100;
      position: absolute;
    }
    .inner2{
      /* background-color: red;  */
      border: #d3d3d3 solid 1px;
      top: 0px;
      left: 0px;
      z-index:80;
      /* height: 200px;
      width: 100px; */
      position: absolute;
    }
    .outerR{
      position: relative;
    }
    </style>