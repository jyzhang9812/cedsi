<template>
  <div id="teacher-postJob">
    <div class="body" v-show="!addShown">
      <p>发布作业</p>
      <div class="filter">
        <div class="option">
          <el-select v-model="className" clearable placeholder="请选择班级">
            <el-option
              v-for="className in classNameList"
              :key="className.value"
              :label="className.label"
              :value="className.value"
            ></el-option>
          </el-select>
          <el-select v-model="chapterName" clearable placeholder="请选择章节">
            <el-option
              v-for="chapterName in chapterNameList"
              :key="chapterName.value"
              :label="chapterName.label"
              :value="chapterName.value"
            ></el-option>
          </el-select>
          <el-button type="primary" @click="newHomeWork">新增作业</el-button>
        </div>
      </div>
      <div class="panels">
        <!--
        <table class="table table-hover" rules="rows" frame="below">
          <thead>
            <tr>
              <th v-for="(title, index) in tableTitle" :key="index">{{title}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(line, seq) in currentList" :key="seq">
              <td>{{seq + 1}}</td>
              <td v-for="(value, key, index) in line" :key="index">{{value}}</td>
              <td>
                <span class="blue" @click="editWork(line)">编辑</span>&nbsp;&nbsp;
                <span class="blue" @click="postJob(line)">发布</span>&nbsp;&nbsp;
                 <span class="red" @click="popModal('delete')">删除</span> 
              </td>
            </tr>
          </tbody>
        </table>
        <delete-prompt :id="deletePromptId" @deleteWork="deleteWork" :work-id="currentWorkId"></delete-prompt>
        -->
        <el-table :data="homeworkList" style="width: 100%">
          <el-table-column align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="center" prop="chapterName" label="作业名称"></el-table-column>
          <el-table-column align="center" prop="date" label="截止时间"></el-table-column>
          <el-table-column align="center" prop="className" label="班级"></el-table-column>
          <el-table-column align="center" prop="courseName" label="课程名称"></el-table-column>
          <el-table-column align="center" prop="chapterName" label="章节名称"></el-table-column>
          <el-table-column align="center" label="操作" width="280">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="editWork(scope.row)">编辑</el-button>
              <el-button size="mini" type="success" @click="postJob(scope.row)">发布</el-button>
              <el-button size="mini" slot="reference" type="danger" @click="dialogVisible=true">删除</el-button>
              <el-dialog title :visible.sync="dialogVisible" width="20%">
                <i class="el-icon-info"></i>
                <span>确定要删除此作业吗?</span>
                <span slot="footer" class="dialog-footer">
                  <el-button type="success" size="mini" @click="dialogVisible=false">取 消</el-button>
                  <el-button type="danger" size="mini" @click="handleDelete(scope.row)">确 定</el-button>
                </span>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="spaceLine"></div>
      <el-pagination
        :page-size="limit"
        background
        layout="prev, pager, next"
        :total="homeworkList.length"
        @current-change="handlePageChange"
        @prev-click="handlePageChange"
        @next-click="handlePageChange"
      ></el-pagination>
      <!-- <pagination :num="tableData.length" :limit="limit" @getNew="changeTablePages"></pagination> -->
    </div>
    <div class="add" v-show="addShown">
      <div class="form-size">
        <el-form ref="form" :model="form" label-width="80px">
          <!-- <div class="item">
          <p>作业名称：</p>
          <input
            type="text"
            class="title"
            placeholder="请输入作业名称"
            v-model="inputData.homework.HW_NAME"
          />
          </div>-->
          <el-form-item label="作业名称">
            <el-input v-model="form.homeworkName" size="medium"></el-input>
          </el-form-item>
          <!-- <div class="item">
          <p>选择班级：</p>
          <select-input
            :option="inputData.classes2.option"
            :dropDownList="inputData.classes2.list"
            tips="选择班级"
            id="classes2"
            @option="changeOption2"
          ></select-input>-->
          <el-form-item label="班级名称">
            <el-select v-model="form.className" clearable placeholder="请选择班级">
              <el-option
                v-for="className in classNameList"
                :key="className.value"
                :label="className.label"
                :value="className.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <p>章节名称：</p>
        <select-input
          :option="inputData.chapter2.option"
          :dropDownList="inputData.chapter2.list"
          tips="选择章节"
          id="chapter2"
          @option="changeOption2"
          ></select-input>-->
          <el-form-item label="章节名称">
            <el-select v-model="form.chapterName" clearable placeholder="请选择班级">
              <el-option
                v-for="chapterName in chapterNameList"
                :key="chapterName.value"
                :label="chapterName.label"
                :value="chapterName.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <p>截止时间：</p>
        <date-picker
          tips="选择截止时间"
          class="datePicker"
          id="postJob_deadline"
          :date="inputData.homework.DEADLINE"
          @changeDate="changeDate"
          ></date-picker>-->
          <el-form-item label="截止时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <!-- </div> -->
          <!-- <div class="item">
          <p>作业内容：</p>
          <textarea class="form-control" rows="10" v-model="inputData.homework.CONTENT"></textarea>
          </div>-->
          <!-- <div class="item">
            <p class="upload-title">上传附件：</p>
            <div class="upload-cover-btn">
              上传文件
              <input type="file" @change="getAttachedFile" style="opacity: 0" />
            </div>
            <span>&nbsp;&nbsp;{{attachedFile.name}}</span>
          </div>-->
          <el-form-item label="上传附件">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传zip文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <!-- <div class="item">
            <p class="upload-title">作业图片：</p>
            <div class="upload-cover-btn">
              作业图片
              <input type="file" @change="getCoverFile" style="opacity: 0" />
            </div>
          </div>
          <div class="item">
            <p class="upload-title">图片预览:</p>
            <div class="upload-cover-img">
              <img id="headimage" :src="coverImageDisplay" class="cover-image" alt />
            </div>
          </div>-->
          <el-form-item label="作业封面">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- <div class="item1">
            <button type="button" class="btn-my" @click="saveAsDraft">保存草稿</button>
            <button type="button" class="btn-my" @click="newHomeWork">取消编辑</button>
          </div>-->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import instance from "../../../../axios-auth.js";
import AWS from "aws-sdk";
import mime from "mime";

export default {
  name: "postJob",
  data() {
    return {
      //elment改的
      classNameList: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      chapterNameList: [
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      className: "",
      chapterName: "",
      homeworkList: [
        {
          chapterName: "第一章",
          date: "2020-2-10",
          className: "一班",
          courseName: "数据库",
          chapterName: "第一章"
        },
        {
          chapterName: "第一章",
          date: "2020-2-10",
          className: "一班",
          courseName: "数据库",
          chapterName: "第一章"
        }
      ],
      dialogVisible: false,
      form: {
        homeworkName: "",
        chapterName: "",
        className: "",
        date1: "",
        date2: ""
      },
      //
      limit: 10,
      operation: "post",
      addShown: false,
      currentWorkId: "",
      tableTitle: [
        "序号",
        "作业名称",
        "截止时间",
        "班级",
        "课程名称",
        "章节名称",
        "操作"
      ],
      currentList: [],
      inputData: {
        homework: { CONTENT: "null ", DEADLINE: "", HW_NAME: "" },
        classes1: { option: "", list: [], id: [] },
        chapter1: { option: "", list: [], id: [] },
        classes2: { option: "", list: [], id: [] },
        chapter2: { option: "", list: [], id: [] }
      },
      originalInputData: [],
      tableData: [],
      originalTableData: [],
      coverImageDisplay: "",
      coverImage: {},
      attachedFile: {}
    };
  },
  methods: {
    //修改上下翻页
    handlePageChange(pageIndex) {
      let start = (pageIndex - 1) * this.limit;
      let end = start + this.limit;
      this.homeworkList = this.homeworkData.slice(start, end);
    },

    /**
     * 获取此教师的所有作业 (仅仅是自己布置的, 其他老师的看不到)
     */
    pullHomeworkData() {
      let config = {
        headers: { Authorization: localStorage.getItem("idToken") }
      };
      return new Promise((resolve, reject) => {
        instance
          .get("teacher/homework", config)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    /**
     * 列表界面做筛选功能的 Select-Input 输入选择框绑定函数
     */
    changeOption1(item, id) {
      this.inputData[id].option = item;
      if (id === "classes1") {
        this.tableData = this.selectInputFilter(item, "CLASS_NAME");
        this.changeChapters(item);
      } else {
        this.tableData = this.selectInputFilter(item, "CP_NAME");
      }
      this.changeTablePages(0);
    },
    /**
     * 新增界面做选择功能的 Select-Input 输入选择框绑定函数
     *
     * @param {String} item
     * @param {String} id
     */
    changeOption2(item, id) {
      this.inputData[id].option = item;
      if (id === "classes2") {
        this.getChaptersOfClass(this.searchForCourseId(item))
          .then(chapters => {
            this.inputData.chapter2.option = "";
            console.log(chapters);
            this.inputData.chapter2.list = chapters.map(item => {
              return item.CP_NAME;
            });
            this.inputData.chapter2.id = chapters.map(item => {
              return item.CP_ID;
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    /**
     * 改变页码的 pagination 翻页绑定函数
     *
     * @param {Number} value
     */
    changeTablePages(value) {
      this.currentList = this.tableData
        .slice(value, value + this.limit)
        .map(item => {
          return {
            hwName: item.HW_NAME,
            deadline: item.DEADLINE,
            classes: item.CLASS_NAME,
            course: item.COURSE_NAME,
            chapter: item.CP_NAME
          };
        });
    },
    /**
     * 编辑作业, 需要把相应的数据进行填充
     *
     * @param {Object} item
     */
    editWork(item) {
      let work = this.searchForWorkId(item);
      this.newHomeWork();
      this.changeOption2(work.CLASS_NAME, "classes2");
      this.inputData.homework = {
        CONTENT: work.CONTENT,
        DEADLINE: work.DEADLINE,
        HW_NAME: work.HW_NAME
      };
      this.inputData.classes2.option = work.CLASS_NAME;
      this.inputData.chapter2.option = work.CP_NAME;
      console.log(work);
      this.operation = "put";
      this.currentWorkId = work.HOMEWORK_ID;
    },
    /**
     * 删除作业的绑定函数
     */
    deleteWork() {},
    /**
     * 新建作业与取消编辑的绑定函数
     */
    newHomeWork() {
      this.addShown = !this.addShown;
      this.operation = "post";
    },
    /**
     * 更改日期, 是 datePicker 组件绑定的事件处理函数
     *
     * @param {String} value
     * @param {String} id
     */
    changeDate(value, id) {
      this.inputData.homework.DEADLINE = value;
    },
    /**
     * 保存草稿 是新增页面的保存草稿按钮
     */
    saveAsDraft() {
      let config = {
        headers: { Authorization: localStorage.getItem("idToken") }
      };
      let chapter2 = this.inputData.chapter2;
      let homework = this.inputData.homework;
      let fix = this.attachedFile.name.split(".");
      let postData = {
        CLASS_ID: this.searchForClassId(this.inputData.classes2.option),
        COURSE_ID: this.searchForCourseId(this.inputData.classes2.option),
        CONTENT_TYPE: "." + this.coverImage.type.split("/")[1],
        CP_ID:
          chapter2.id[
            chapter2.list.findIndex(item => item === chapter2.option)
          ],
        DEADLINE: homework.DEADLINE,
        HW_NAME: homework.HW_NAME,
        FILE_TYPE: "." + fix[fix.length - 1]
      };
      if (this.operation === "PUT") {
        postData.HW_ID = this.currentWorkId;
      }
      console.log(postData);
      instance[this.operation]("teacher/homework", postData, config)
        .then(res => {
          console.log(res);
          console.log(res.data);
          let config = res.data.data;
          config.path = "content";
          this.uploadToBucket(config, this.coverImage)
            .then(res => {
              console.log(res);
              config.path = "attachedFile";
              return this.uploadToBucket(config, this.attachedFile);
            })
            .then(res => {
              console.log(res);
              if (res.ETag) {
                alert("保存成功!");
                this.newHomeWork();
              } else {
                console.log("保存失败!");
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 弹出模态框, 提示用户是否进一步删除作品
     *
     * @param {String} type
     * @param {String} workId
     */
    popModal(type, workId) {
      this.currentWorkId = workId;
      if (type === "delete") {
        $("#" + this.deletePromptId).modal("show");
      }
    },
    /**
     * 拉取选择框的选项数据
     */
    pullClassAndCourseData() {
      let config = {
        headers: { Authorization: localStorage.getItem("idToken") }
      };
      instance
        .get("/teacher/class", config)
        .then(res => {
          console.log(res.data);
          this.originalInputData = res.data;
          this.inputData.classes2.list = res.data.map(item => {
            return item.CLASS_NAME;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 班级选择输入框的过滤器
     *
     * @param {String} tagName
     * @param {String} attributeName
     * @return {Array<Object>}
     */
    selectInputFilter(tagName, attributeName) {
      return tagName === ""
        ? this.originalTableData
        : this.originalTableData.filter(item => {
            return item[attributeName] === tagName;
          });
    },
    /**
     * 章节选择输入框的过滤器
     *
     * @param {String} className
     */
    changeChapters(className) {
      let result = this.tableData
        .filter(item => {
          return item.CLASS_NAME === className;
        })
        .map(item => {
          return item.CP_NAME;
        });
      this.inputData.chapter1.list = Array.from(new Set(result));
      this.inputData.chapter1.option = "";
    },
    /**
     * 获取某个课程(班级) 的所有章节
     *
     * @param {String} classId
     */
    getChaptersOfClass(classId) {
      console.log(classId);
      let config = {
        headers: { Authorization: localStorage.getItem("idToken") }
      };
      return new Promise((resolve, reject) => {
        instance
          .get(`teacher/course/${classId}/chapters`, config)
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    /**
     * 通过班级名称寻找课程 ID
     *
     * @param {String} className
     * @return {String}
     */
    searchForCourseId(className) {
      return this.originalInputData.find(item => {
        return item.CLASS_NAME === className;
      }).COURSE_ID;
    },
    /**
     * 通过班级名称寻找班级 ID
     *
     * @param {String} className
     * @return {String}
     */
    searchForClassId(className) {
      return this.originalInputData.find(item => {
        return item.CLASS_NAME === className;
      }).CLASS_ID;
    },
    /**
     * 发布作业(给学生发送通知)
     */
    postJob(line) {
      let config = {
        headers: { Authorization: localStorage.getItem("idToken") }
      };
      let workId = this.searchForWorkId(line).HOMEWORK_ID;
      instance
        .post(`teacher/homework/${workId}`, { homework_id: workId }, config)
        .then(res => {
          console.log(res);
          alert(res.status === 200 ? "发布成功!" : "发布失败!");
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 寻找某条作业的 ID
     *
     * @param {Object} line
     * @return {String}
     */
    searchForWorkId(line) {
      return this.originalTableData.find(item => {
        return item.CLASS_NAME + item.HW_NAME === line.classes + line.hwName;
      });
    },
    /**
     * 上传图片的绑定函数
     *
     * @param {Object} event
     */
    getCoverFile(event) {
      this.coverImage = event.target.files[0];
      console.log(this.coverImage);
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(this.coverImage);
      reader.onload = function(e) {
        that.coverImageDisplay = this.result;
      };
    },
    /**
     * 上传附件的绑定函数
     *
     * @param {Object} event
     */
    getAttachedFile(event) {
      this.attachedFile = event.target.files[0];
    },
    /**
     * 上传附件的绑定函数
     *
     * @param {Object} config
     * @param {Object} file
     */
    uploadToBucket(config, file) {
      AWS.config = new AWS.Config({
        accessKeyId: config.AccessKeyId,
        secretAccessKey: config.SecretAccessKey,
        sessionToken: config.SessionToken,
        region: "cn-northwest-1"
      });
      let s3 = new AWS.S3();
      let fix = file.name.split(".");
      let params = {
        ACL: "public-read",
        Bucket: "cedsi",
        Body: file,
        Key: `preHomework/${config.path}/${config.id}.${fix[fix.length - 1]}`,
        ContentType: file.type,
        Metadata: { uploader: window.localStorage.getItem("userId") }
      };
      return new Promise((resolve, reject) => {
        s3.putObject(params, (err, data) => {
          err ? reject(err) : resolve(data);
        });
      });
    }
  },
  computed: {
    deletePromptId() {
      return "postJob_deletePrompt";
    }
  },
  created() {
    this.pullClassAndCourseData();
    this.pullHomeworkData()
      .then(res => {
        console.log(res);
        this.originalTableData = res.data || [];
        this.tableData = res.data || [];
        this.changeTablePages(0);
        this.inputData.classes1.list = Array.from(
          new Set(res.data.map(item => item.CLASS_NAME))
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
#teacher-postJob .body {
  width: 95%;
  margin: 0 auto;
}
#teacher-postJob .spaceLine {
  height: 20px;
}
.form-size {
  width: 40%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>