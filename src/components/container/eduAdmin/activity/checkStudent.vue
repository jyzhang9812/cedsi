<template>
  <div id="checkStudent">
    <div class="classroute">
      <ol class="breadcrumb">
        <li>学生名单</li>
      </ol>
    </div>
    <div class="second-floor">
      <table class="table table-hover">
        <thead>
          <tr>
            <th v-for="(title,index) in tableTitle" class="title" :key="index">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, seq) in tableData" :key="seq" class="content">
            <td><input type="checkbox" v-model="checkedId" :value="student.name"></td>
            <td>{{student.name}}</td>
            <td>{{student.gender}}</td>
            <td>{{student.age}}</td>
            <td>{{student.school}}</td>           
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :num="tableData.length" @getNew="changeTablePages" :limit="limit"></pagination>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog addwidth">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" 
						aria-hidden="true">×
				</button>
				<h4 class="modal-title" id="myModalLabel">
					新增班级
				</h4>
			</div>
			<div class="modal-body">
				  <div class="content">
              <div class="add">
                <span class="keypoint">*</span>
                <span class="addtitle">班级名称</span>
                <input
                  :class="isName==false?'addcon':'addcon err'"
                  placeholder="请输入班级名称"
                  v-model="addClassName"
                />
                <span :class="isName==true?'inputtips':'inputerr'">不超过10个字符</span>
              </div>
              <div class="add">
                <span class="keypoint">*</span>
                <span class="addtitle">指定教师</span>
                <select-input
                  class="modal-select-input"
                  id="teacher"
                  tips="请选择教师"
                  :option="addClassData.teacher.option.name"
                  @option="changeOption"
                  :drop-down-list="addClassData.teacher.list"
                ></select-input>
              </div>

            </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" 
						data-dismiss="modal">关闭
				</button>
				<button type="button" class="btn btn-primary">
					确定
				</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
    <div class="upload-footer">
      <button class="btn upload-btn" data-toggle="modal" data-target="#myModal">创建班级</button>
      <button class="btn upload-btn" @click="calcelUpload">取消</button>
    </div>
  </div>

</template>

<script>
import pagination from "../../teacher/utils/pagination.vue";
import SelectInput from "../../Admin/utils/selectInput";
import globalAxios from "axios";
export default {
  name: "adminManagement",
  components: { pagination,SelectInput },
  data() {
    return {
      addClassName: "",
      isName: true,
       addClassData: {
        addClassName: "",
        teacher: {
          option: "",
          list: []
        },
        course: {
          option: "",
          list: []
        }
      },
      limit: 20,
      currentList: [],
      inputData: {
        organizationUserName: ""
      },
      tableTitle: [
        "选择",
        "学生姓名",
        "性别",
        "年龄",
        "所属学校"
      ],
      tableData: [{
          name:'小明1',
          gender:'男',
          age:'15',
          school:'师大附中'
      },
      {
          name:'小明2',
          gender:'男',
          age:'15',
          school:'师大附中'
      },
      {
          name:'小明3',
          gender:'男',
          age:'15',
          school:'师大附中'
      },
      {
          name:'小明4',
          gender:'男',
          age:'15',
          school:'师大附中'
      },
       {
          name:'小明5',
          gender:'男',
          age:'15',
          school:'师大附中'
      },
       {
          name:'小明6',
          gender:'男',
          age:'15',
          school:'师大附中'
      },
       {
          name:'小明7',
          gender:'男',
          age:'15',
          school:'师大附中'
      }
      ], //页面表格内容
      //提示框
      alterimg: this.$store.state.url + "organization/alter.png",
      alterMes: "",
      //当前页码
      currentPage: 0,
      index: 0,
      checkedId:[],
      checkedStudent:[],
    };
  },
   watch: {
     checkedId(val, oldVal) {
      this.checkedStudent=val
      //console.log(this.checkedStudent)
    },
    addClassName(val, oldVal) {
      if (val.length <= 10 && val.length > 0) {
        this.isName = false;
      } else {
        this.isName = true;
      }
    }
  },
  methods: {
     changeOption(item, id) {
      Object.keys(this.addClassData).forEach(res => {
        if (res === id) {
          this.addClassData[res].option = item;
        }
      });
    },
   calcelUpload() {
      this.$router.push({
        path: "/eduAdmin/activity"
      });
    },
    addOrganization() {
      this.$router.push({
        path: "/Admin/organizationManagement/addOrganization"
      });
    },
    //换页
    changeTablePages(value) {
      //console.log(value)
      var currentPage = value / this.limit;
      this.currentPage = currentPage;
      //console.log(currentPage)
      this.currentList = this.tableData.slice(value, value + this.limit);
    },
    getNew(value) {
      this.currentList = this.tableData.slice(value, value + this.limit);
      //console.log(this.currentList)
    }
  },
  mounted() {
    this.changeTablePages(0);
  },
};
</script>

<style scoped>
#checkStudent .breadcrumb {
  background-color: #fff;
  color: #606266;
  margin-bottom: 0;
}
#checkStudent {
  font-size: 12px;
  color: #606266;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
}

#checkStudent .first-floor {
  margin-top: 20px;
}
#checkStudent .second-floor {
  font-size: 12px;
  color: #606266;
  margin-top: 20px;
}
#checkStudent .select-input {
  display: inline-block;
}
#checkStudent label {
  display: inline;
}

#checkStudent .content td {
  line-height: 30px;
}

#checkStudent .textBox {
  width: 180px;
  height: 32px;
  font-size: 12px;
  padding-left: 15px;
  border: 1px solid #409eff;
  border-radius: 5px;
  margin-left: 5px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#checkStudent .textBox:focus {
  outline: none;
}

#checkStudent .textBox:hover {
  border-color: #409eff;
}

/* .choose 此项真实有效， 可能编辑器不完全识别vue语法*/

#checkStudent .btn {
  background: #409eff;
  color: #fff;
  height: 30px;
  border-radius: 5px;
  font-size: 12px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#checkStudent .btn:focus {
  outline: none;
}

#checkStudent .btn:hover {
  background: #66b1ff;
}

#checkStudent .btn-search {
  width: 54px;
}

#checkStudent .btn-clear {
  width: 88px;
}

#checkStudent .blue {
  cursor: pointer;
  color: #409eff;
}

#checkStudent .red {
  cursor: pointer;
  color: red;
}

#checkStudent table {
  border: #eeeeee;
}

#checkStudent table tr {
  text-align: center !important;
}

#checkStudent table td {
  vertical-align: middle !important;
}

#checkStudent .title {
  text-align: center;
}

#checkStudent .select-input {
  margin-right: 8px;
}

#checkStudent .btnactive {
  border-radius: 5px;
  line-height: 20px;
  height: 22px;
}
#checkStudent .btnactive:focus {
  outline: none;
}

/*添加教师模态框*/

#checkStudent .modal-dialog {
  top: 100px;
  position: relative;
}

#checkStudent .modal-header {
  background-color: #409eff;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
#checkStudent .add {
  width: 100%;
}

#checkStudent .keypoint {
  color: red;
}
#checkStudent .keypointwhite {
  color: #fff;
}
#checkStudent .addtitle {
  color: #606266;
  display: inline-block;
  width: 50px;
}

#checkStudent .addcon {
  width: 180px;
  border: 1px solid #409eff;
  border-radius: 5px;
  height: 32px;
  line-height: 32px;
  margin-left: 5px;
  padding: 0 20px;
}

#checkStudent .addcon:hover {
  border: 1px solid #dcdfe6;
}

#checkStudent .addcon:focus {
  outline: none;
}

#checkStudent .content {
  margin: 0 auto;
  width: 60%;
  height: 100%;
}
#checkStudent .modal-footer {
  border: none;
  text-align: center;
}
#checkStudent .modal-select-input {
  display: inline-block;
  margin-left: 5px;
}
#checkStudent .inputBox {
  padding: 0;
}
#checkStudent .dropdown {
  margin-left: 20px;
}
#checkStudent #school .outside {
  width: 300px !important;
  height: 40px !important;
  margin-left: 10px !important;
}
/*正则表达式*/
#checkStudent .err {
  border: 1px solid red;
}
#checkStudent .inputtips {
  display: block;
  font-size: 10px;
  color: red;
  margin-left: 110px;
  margin-bottom: 5px;
  margin-top: 5px;
}
#checkStudent .inputerr {
  display: block;
  font-size: 10px;
  color: red;
  margin-left: 60px;
  visibility: hidden;
  height: 20px;
  margin-bottom: 10px;
}
#checkStudent .alterwidth {
  width: 30%;
}
#checkStudent .altercontent {
  width: 300px;
  margin: 0 auto;
}
#checkStudent .alterimg {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
#checkStudent .upload-footer{
    width: 100%;
    text-align: center
}
#checkStudent .upload-btn{
    background-color: #409eff;
    color: #fff;
    margin-left: 10px;
}
#checkStudent .modal-select-input {
  display: inline-block;
  margin-left: 5px;
}
#checkStudent .modal-dialog {
  top: 100px;
  position: relative;
}
#checkStudent .modal-header {
  background-color: #409eff;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
#checkStudent .addwidth {
  width: 500px;
}
</style>
