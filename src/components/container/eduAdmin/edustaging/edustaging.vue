<template>
  <div id="edustaging">
    <div class="right">
      <h4 class="title">总览</h4>
      <div class="card">
        <div class="childcard" v-for="(sum,index) in lists" :key="index">
          <div class="card_img">
            <img :src="sum.img" class="image" />
          </div>
          <div class="card_msg">
            <h4 class="num">{{sum.num}}</h4>
            <h6 class="card_title">{{sum.title}}</h6>
          </div>
        </div>
      </div>
      <h4 class="title">学校信息详情</h4>
      <div class="chart">
        <ve-histogram :data="chartData" style="width:700px; margin:0 auto;"></ve-histogram>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "edustaging",
  data() {
    return {
      lists: [
        {
          img: this.$store.state.url + "eduAdmin/teach.png",
          num: 1,
          title: "开课班级数量"
        },
        {
          img: this.$store.state.url + "eduAdmin/teacher.png",
          num: 2,
          title: "指导教师数量"
        },
        {
          img: this.$store.state.url + "eduAdmin/student.png",
          num: 3,
          title: "学生数量"
        }
      ],
      school: [
        {
          id:"school1",
          schoolname: "aaa",
          ischecked: false
        },
        {
          id:"school2",
          schoolname: "bbb",
          schecked: false
        },
        {
          id:"school3",
          schoolname: "ccc",
          ischecked: false
        },
        {
          id:"school4",
          schoolname: "ddd",
          ischecked: false
        }
      ],
      chartData: {
        columns: ["学校名称", "学生数量", "老师数量"],
        rows: [
          { 学校名称: "赛迪思", 学生数量: 3, 老师数量: 2 }
        ]
      },
      checkedschool:[]
    };
  },
  methods: {
    checkall() {
      var checkedschool=[]
      if (document.getElementById("isall").checked == false) {
        for (var i = 0; i < this.school.length; i++) {
          this.school[i].ischecked = false;
          checkedschool=[]
        }
      } else {
        for (var i = 0; i < this.school.length; i++) {
          this.school[i].ischecked = true;
          checkedschool.push(this.school[i].schoolname)
        }
      }
      this.checkedschool=checkedschool
      //console.log('全选'+this.checkedschool)
    },
    getchecked(index){
      var checkedschool=[]
      if(this.school[index].ischecked==false)
        this.school[index].ischecked=true
      else
        this.school[index].ischecked=false
      //console.log(index,tshis.school[index].ischecked)
      for(var i=0;i<this.school.length;i++){
        if(this.school[i].ischecked==true){
          checkedschool.push(this.school[i].schoolname)
          //console.log(this.school[i].schoolname)
        }
      }
      this.checkedschool=checkedschool
      //console.log(checkedschool)
    }
  }
};
</script>
<style scoped>
#edustaging .right {
  margin-top: 10px;
  margin-left: 20px;
}
#edustaging .title {
  font-weight: bolder;
}
#edustaging .card {
  margin: 20px auto;
  width: 80%;
  height: 142px;
}
#edustaging .childcard {
  width: 30%;
  float: left;
  height: 142px;
  box-shadow: 0 0 10px #ccc;
  border-radius: 6px;
  margin-right: 2%;
}
#edustaging .card_img {
  padding-top: 20px;
  width: 50%;
  float: left;
  height: 100%;
  text-align: center;
  line-height: 100%;
}
#edustaging .card_msg {
  float: left;
  width: 50%;
  text-align: center;
  margin-top: 40px;
}
#edustaging .num {
  font-weight: bold;
  color: #409eff;
}
#edustaging .selectschool {
  width: 100%;
  height: 40px;
  color: #606266;
}
#edustaging .schoolname {
  display: inline-block;
}
#edustaging input[type="checkbox"] {
  margin: 0 4px;
}
</style>