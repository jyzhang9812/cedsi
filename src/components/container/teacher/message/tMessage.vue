<template>
<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
    <strong>我的消息</strong>
  <div v-for="(card,index) in cards" :key="index"  class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title">
        <div role="button" data-toggle="collapse" data-parent="#accordion" :href="card.href" aria-expanded="true" aria-controls="collapseOne">
        {{card.title}}
            <span>  {{card.date}} </span>
        </div>
      </h4>
    </div>
    <div :id="card.id" class="panel-collapse collapse " role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">
        {{card.content}}
      </div>
    </div>
  </div>



</div>
</template>


<script>
    import pagination from "../utils/pagination.vue";
    

    export default {
        name: 'message',
        components: {
            pagination,
        },
        data() {
            return {
              identity:[
                  {
                      href:"#coll"
                  }
              ],  
              cards:[
              { 
                  
                  title:"小程序广告组件能力升级",
                  date:"2019-4-25",
                  content:"小程序广告组件新增激励式视频广告与插屏广告，进一步丰富开发者的广告变现方式，开发者可到流量主模块进行开通，具体规则见《小程序激励式视频广告开通指引》，《小程序插屏广告开通指引》。"
              },
               {
                    date:"2019-4-25",
                  title:"小程序简称功能上线通知",
                  content:"小程序简称功能已上线，设置后可让小程序在客户端的任务栏中有更直接的展示。简称规则：可从当前名称中按顺序选取4-10个字符创建简称。设置入口：在小程序管理后台设置界面，简称设置入口进行设置。简称审核与名称审核周期一致，将在2019年春节期间2月4日（除夕）至2月10日（初六）暂停审核。请开发者按各自需求，安排好提审计划，进行简称设置。 "
              },
              {
                   date:"2019-4-25",
                  title:"第三个消息",
                  content:"这是第三个消息的内容部分，卢本伟牛逼"
              },
          {
                   date:"2019-9-11",
                  title:"第四个消息",
                  content:"这是第四个消息的内容部分，卢本伟牛逼"
              },
              ]
            }
        },
        methods: {

            //换页
            getNew(value) {
                var currentPage = value / this.limit;
                this.currentPage = currentPage;
                this.$store.commit("changeMsgCurrentList", this.currentPage * this.limit)
            },
        },
        created: function () {
            //为实现正确绑定，创建时在数组中添加href,id属性
             this.cards.forEach((element,index) => {
                 element.id="collapse"+String(index);
                 element.href="#collapse"+String(index);
                 console.log(element);
             });
          
        },
        computed: {
           
        },
    }
</script>



<style scoped>
strong{
margin-left: 5%;
font-size: 26px;
}
  .panel-default{
      margin-top: 20px;
      margin-left: 5%;
      margin-right:5%;
     
  }

  .panel-heading{
       padding: 20px;
  }

  .panel-body{
          color: #9a9a9a;
           padding: 20px;
  }

  span{
      float:right;
     /* margin-left: 5%; */
  }
</style>