<template>
  <div class="container-fluid">
    <strong>学情分析</strong>

    <div class="row">
      <div class="col-md-2">
          <div class="input-group input-group-sm">
              <!-- 复合输入框 -->
               <!-- <span class="input-group-addon" id="sizing-addon3">@</span> -->
        <input
          type="text"
          class="form-control"
          placeholder="请输入学生姓名或手机号"
          aria-describedby="basic-addon2"
        />
          </div>
 

      </div>

      <div class="col-md-2">
        <button
          class="btn btn-default btn-sm btn-group-justified dropdown-toggle"
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          请选择学校
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li>
            <a href="#">Action</a>
          </li>
          <li>
            <a href="#">Another action</a>
          </li>
          <li>
            <a href="#">Something else here</a>
          </li>
          <li role="separator" class="divider"></li>
          <li>
            <a href="#">Separated link</a>
          </li>
        </ul>
      </div>

      <div class="col-md-2">
        <button
          class="btn btn-default btn-sm btn-group-justified dropdown-toggle"
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          请选择班级
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li>
            <a href="#">Action</a>
          </li>
          <li>
            <a href="#">Another action</a>
          </li>
          <li>
            <a href="#">Something else here</a>
          </li>
          <li role="separator" class="divider"></li>
          <li>
            <a href="#">Separated link</a>
          </li>
        </ul>
      </div>

      <div class="col-md-2">
        <button
          class="btn btn-default btn-sm btn-group-justified dropdown-toggle"
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          请选择课程
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li>
            <a href="#">Action</a>
          </li>
          <li>
            <a href="#">Another action</a>
          </li>
          <li>
            <a href="#">Something else here</a>
          </li>
          <li role="separator" class="divider"></li>
          <li>
            <a href="#">Separated link</a>
          </li>
        </ul>
      </div>

      <div class="col-md-2">
        <button
          class="btn btn-default btn-sm btn-group-justified dropdown-toggle"
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          请选择课程等级
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li>
            <a href="#">Action</a>
          </li>
          <li>
            <a href="#">Another action</a>
          </li>
          <li>
            <a href="#">Something else here</a>
          </li>
          <li role="separator" class="divider"></li>
          <li>
            <a href="#">Separated link</a>
          </li>
        </ul>
      </div>

      <div class="col-md-2">
        <button
          class="btn btn-default btn-sm btn-group-justified dropdown-toggle"
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          请选择课次
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li>
            <a href="#">Action</a>
          </li>
          <li>
            <a href="#">Another action</a>
          </li>
          <li>
            <a href="#">Something else here</a>
          </li>
          <li role="separator" class="divider"></li>
          <li>
            <a href="#">Separated link</a>
          </li>
        </ul>
      </div>
    </div>

    <br />

    <div class="row">
      <div class="col-md-2">
          <div class="input-group input-group-sm">
        <input type="text" id="test12" class="form-control" placeholder="选择开始日期" />
        </div>
      </div>

      <div class="col-md-2">
          <div class="input-group input-group-sm">
        <input type="text" id="test13" class="form-control" placeholder="选择结束日期" />
          </div>
      </div>

      <div class="col-md-2">
        <span>是否做作业:</span> 
        <div class="btn-group" role="group" aria-label="...">
          <button type="button" class="btn btn-default btn-sm">是</button>
          <button type="button" class="btn btn-default btn-sm">否</button>
        </div>
      </div>

      <div class="col-md-2">
       <span>是否学习:</span> 
        <div class="btn-group" role="group" aria-label="...">
          <button type="button" class="btn btn-default btn-sm">是</button>
          <button type="button" class="btn btn-default btn-sm">否</button>
        </div>
      </div>

<div class="col-md-4">
      <button type="button" class="btn btn-primary btn-sm">清空筛选</button>
      <span>&nbsp;&nbsp;</span>
      <button type="button" class="btn btn-primary btn-sm" >搜索</button>
    </div>
    </div>

    <table class="table table-hover">
      <thead>
        <th>
          <strong>
            <span>序号</span>
          </strong>
        </th>
        <th>
          <strong>
            <span>学校</span>
          </strong>
        </th>
        <th>
          <strong>
            <span>线上班级</span>
          </strong>
        </th>
        <th>
          <strong>
            <span>学生</span>
          </strong>
        </th>
        <th>
          <strong>
            <span>课程</span>
          </strong>
        </th>
        <th>
          <strong>
            <span>等级</span>
          </strong>
        </th>
        <th>
          <strong>
            <span>课次</span>
          </strong>
        </th>
        <th>
          <strong>
            <span>是否开课</span>
          </strong>
        </th>
        <th>
          <strong>
            <span>开课时间</span>
          </strong>
        </th>
        <th>
          <strong>
            <span>学习时间</span>
          </strong>
        </th>
        <th >
          <strong>
            <span>学习视频次数</span>
          </strong>
        </th>
        <th>
          <strong>
            <span>观看讲义次数</span>
          </strong>
        </th>
        <th>
          <strong>
            <span>首次作业提交时间</span>
          </strong>
        </th>
        <th>
          <strong>
            <span>最新作业得星</span>
          </strong>
        </th>
        <th>
          <strong>
            <span>提交作业次数</span>
          </strong>
        </th>
      </thead>

      <tbody>
        <tr v-for="(list,index) in activityList" :key="index">
            <td>{{index+1}}</td>
            <td>{{list.organName}}</td>
            <td>{{list.className}}</td>
            <td>{{list.studentName}}</td>
            <td>{{list.objName}}</td>
            <td>{{list.levelName}}</td>
            <td>{{list.videoName}}</td>
            <td>{{list.isStart}}</td>
            <td>{{list.startTime}}</td>
            <td>{{list.learnTime}}</td>
            <td>{{list.learnNmm}}</td>
            <td>{{list.learnNoteNmm}}</td>
            <td>{{list.commitTime}}</td>
            <td>{{list.homeworkStar}}</td>
            <td>{{list.commitNmm}}</td>
        </tr>
      </tbody>
    </table>
    <hr />

    <ul class="pagination modal-2">
      <li>
        <a href="#" class="prev">&laquo;</a>
      </li>
      <li>
        <a href="#" class="active">1</a>
      </li>
      <li>
        <a href="#">2</a>
      </li>
      <li>
        <a href="#">3</a>
      </li>
      <li>
        <a href="#">4</a>
      </li>
      <li>
        <a href="#">5</a>
      </li>
      <li>
        <a href="#">6</a>
      </li>
      <li>
        <a href="#">7</a>
      </li>
      <li>
        <a href="#">8</a>
      </li>
      <li>
        <a href="#">9</a>
      </li>
      <li>
        <a href="#" class="next">&raquo;</a>
      </li>
    </ul>
    <br />
  </div>
</template>


<style scoped>

.container-fluid{
    font-size:12px;
}

.ul {
  padding: 0;
  min-height: 0;
  margin: auto;
}

/* .panel {
  min-height: 620px;
  width: 100%;
  margin: 0;
  border-radius: 0;
  border: none;
} */

.avastimg {
  vertical-align: middle;
  width: 20px;
}

.col-md-8 {
  padding: 0;
}

.teacherimg {
  vertical-align: middle;
  width: 40px;
}

strong {
  color: rgb(68, 153, 206);
}

.modal-2 li:first-child a {
  -moz-border-radius: 50px 0 0 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px 0 0 50px;
}

.modal-2 li:last-child a {
  -moz-border-radius: 0 50px 50px 0;
  -webkit-border-radius: 0;
  border-radius: 0 50px 50px 0;
}

.modal-2 a {
  border-color: #f4f4f5;
  color: #c2c4cc;
  background: #f4f4f5;
}

.modal-2 a:hover {
  color: #fff;
  background-color: #409eff;
}

.modal-2 a.active,
.modal-2 a:active {
  border-color: #409eff;
  background: #409eff;
  color: #fff;
}
</style>


<script>
export default {
  name: "statistics",
  data(){
     return{
         activityList: [{
            organName:"snnu",
            className:"1702",
            studentName: "王晓瀑",
            objName: "入门到放弃",
            levelName: "赛迪思",
            videoName: "java",
            isStart: "是",
            startTime:"2019-01-01 ",
            learnTime:"2019-01-01 ",
            learnNmm:"5",
            learnNoteNmm:"3",
            commitTime:"2019-05-17 15:31:55",
            homeworkStar:"5",
            commitNmm:"4"
          },
          {
             organName:"snnu",
            className:"1703",
            studentName: "李斌斌",
            objName: "入门到放弃",
            levelName: "赛迪思",
            videoName: "java",
            isStart: "是",
            startTime:"2019-01-01 ",
            learnTime:"2019-01-01 ",
            learnNmm:"5",
            learnNoteNmm:"3",
            commitTime:"2019-05-17 15:31:55",
            homeworkStar:"5",
            commitNmm:"4"
          }
         ]
     } 
  },
  mounted() {
    laydate.render({
      elem: "#test12",
      format: "dd/MM/yyyy"
    });
    laydate.render({
      elem: "#test13",
      format: "dd/MM/yyyy"
    });
  }
};
</script>
