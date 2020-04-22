<template>
  <div id="teacher-postJob">
    <div class="body" v-show="!addShown">
      <p>发布作业</p>
      <div class="filter">
        <div class="option">
          <el-button type="primary" @click="newHomeWork">新增作业</el-button>
        </div>
      </div>
      <div class="panels">
        <el-table v-if="tableData" :data="tableData" style="width: 100%">
          <el-table-column
            align="center"
            type="index"
            label="序号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="CP_NAME"
            label="作业名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="DEADLINE"
            label="截止时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="CLASS_NAME"
            label="班级"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="COURSE_NAME"
            label="课程名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="CP_NAME"
            label="章节名称"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="280">
            <template slot-scope="scope">
              <!-- <el-button size="mini" type="primary" @click="editWork(scope.row)">编辑</el-button> -->
              <el-button
                size="mini"
                type="success"
                :disabled="scope.row.IS_PUBLISH"
                @click="postJob(scope.row)"
                >发布</el-button
              >
              <el-button
                size="mini"
                slot="reference"
                type="danger"
                @click="dialogVisible = true"
                >删除</el-button
              >
              <el-dialog title :visible.sync="dialogVisible" width="20%">
                <i class="el-icon-info"></i>
                <span>确定要删除此作业吗?</span>
                <span slot="footer" class="dialog-footer">
                  <el-button
                    type="success"
                    size="mini"
                    @click="dialogVisible = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="danger"
                    size="mini"
                    @click="handleDelete(scope.row)"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="!tableData">您还没有发布任何数据</div>
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
      >
      </el-pagination>
      <!-- <pagination :num="tableData.length" :limit="limit" @getNew="changeTablePages"></pagination> -->
    </div>
    <div class="add" v-show="addShown">
      <div class="form-size">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="作业名称">
            <el-input v-model="form.homeworkName" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="班级名称">
            <el-select
              v-model="form.classId"
              clearable
              placeholder="请选择班级"
              @change="searchChapter(form.classId)"
            >
              <el-option
                v-for="(item, index) in classNameList"
                :key="index"
                :label="item.name"
                :value="item.Id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="章节名称">
            <el-select
              v-model="form.chapterId"
              clearable
              placeholder="请选择班级"
            >
              <el-option
                v-for="(chapterName, index) in chapterNameList"
                :key="index"
                :label="chapterName.CP_NAME"
                :value="chapterName.CP_ID"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="截止时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker
                placeholder="选择时间"
                v-model="form.date2"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 100%;"
              ></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="上传附件">
            <el-upload
              class="upload-demo"
              drag
              action="#"
              :http-request="loadHomework"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传zip文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="作业封面">
            <el-upload
              class="avatar-uploader"
              :http-request="loadHomeworkCover"
              action="#"
              :show-file-list="true"
              :limit="1"
            >
              <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i
                v-else="!imageUrl"
                class="el-icon-plus avatar-uploader-icon"
              ></i> -->
              <el-button size="small" plain>选择文件</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传PNG/JPG，且不超过1 M
              </div>
            </el-upload>
          </el-form-item>

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
      imageUrl: "",
      classNameList: [], //
      chapterNameList: [], //
      className: "",
      chapterName: "",
      homeworkList: [],
      dialogVisible: false,
      form: {
        homeworkName: "",
        chapterId: "",
        classId: "",
        date1: "",
        date2: "",
        zipFile: "",
        zip: "",
        coverFile: "",
        cover: "",
        currentCourseId: ""
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
      this.tableData = this.tableData.slice(start, end);
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
      console.log("caonimalegebi");
      console.log(this.tableData);
      if (this.tableData != undefined) {
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
      }
    },
    /**
     * 编辑作业, 需要把相应的数据进行填充
     *
     * @param {Object} item
     */
    // editWork(item) {
    //   let work = this.searchForWorkId(item);
    //   this.newHomeWork();
    //   this.changeOption2(work.CLASS_NAME, "classes2");
    //   this.inputData.homework = {
    //     CONTENT: work.CONTENT,
    //     DEADLINE: work.DEADLINE,
    //     HW_NAME: work.HW_NAME
    //   };
    //   this.inputData.classes2.option = work.CLASS_NAME;
    //   this.inputData.chapter2.option = work.CP_NAME;
    //   console.log(work);
    //   this.operation = "put";
    //   this.currentWorkId = work.HOMEWORK_ID;
    // },
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
    changeChapters(classId) {
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
    searchChapter(classId) {
      let tempList = [...this.originalInputData];
      tempList.forEach(element => {
        if (element.CLASS_ID == classId) {
          this.chapterNameList = element.CHAPTERS;
          this.form.currentCourseId = element.COURSE_ID;
        }
      });
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
      console.log(line);
      console.log("line---------");
      let config = {
        headers: { Authorization: localStorage.getItem("idToken") }
      };
      let workId = line.HOMEWORK_ID;
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
        if (item.CLASS_NAME + item.HW_NAME === line.classes + line.hwName) {
          return item;
        }
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

      let mimeType = "";
      const fileType = file.name.split(".").pop();
      if (fileType == "jpg") {
        mimeType = "image/" + fileType;
      } else {
        mimeType = mime.getType(fileType);
      }

      let params = {
        ACL: "public-read",
        Bucket: "cedsi",
        Body: file,
        Key: `preHomework/${config.path}/${config.id}.${fix[fix.length - 1]}`,
        ContentType: mimeType,
        Metadata: { uploader: window.localStorage.getItem("userId") }
      };
      return new Promise((resolve, reject) => {
        s3.putObject(params, (err, data) => {
          err ? reject(err) : resolve(data);
        });
      });
    },

    loadHomework(event) {
      this.form.zipFile = event.file;
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(event.file);
      reader.onload = function() {
        that.form.zip = this.result;
      };
    },
    loadHomeworkCover(event) {
      this.form.coverFile = event.file;
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(event.file);
      reader.onload = function() {
        that.form.cover = this.result;
        this.imageUrl = this.result;
      };
    },

    onSubmit(event) {
      const headerData = {
        headers: { Authorization: localStorage.getItem("idToken") }
      };
      let zipType = this.form.zipFile.name.split(".").pop();
      let coverType = this.form.coverFile.name.split(".").pop();
      let homeworkData = {
        HW_NAME: this.form.homeworkName,
        COURSE_ID: this.form.currentCourseId,
        CLASS_ID: this.form.classId,
        CP_ID: this.form.chapterId,
        DEADLINE: this.dateValue,
        FILE_TYPE: "." + zipType,
        CONTENT_TYPE: "." + coverType
        // zipFileName:this.form.zipFile.name,
        // coverFileName:this.form.coverFile.name,
      };
      console.log(homeworkData);
      instance
        .post("teacher/homework", homeworkData, headerData)
        .then(res => {
          console.log("插入数据库成功");
          console.log(res);
          let config = res.data.data;
          config.path = "content";
          this.uploadToBucket(config, this.form.coverFile)
            .then(res => {
              console.log(res);
              config.path = "attachedFile";
              return this.uploadToBucket(config, this.form.zipFile);
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
    handleDelete(row) {
      console.log(row);
      let config = {
        headers: { Authorization: localStorage.getItem("idToken") }
      };
      let pa = "/teacher/homework/" + row.HOMEWORK_ID;
      instance
        .delete(pa, config)
        .then(res => {
          console.log(res);
          if ((res.data.status = "200")) {
            this.dialogVisible = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogVisible = false;
    }
  },
  computed: {
    deletePromptId() {
      return "postJob_deletePrompt";
    },
    dateValue() {
      if (this.form.date1 && this.form.date2) {
        let d = this.form.date1.slice(0, 9) + " " + this.form.date2.slice(11);
        // console.log(d)
        let date = new Date(d).getTime();
        // let date = new Date(d.replace(/-/g, '/'));
        // console.log(date)
        return date;
      } else {
        return "";
      }
    }
  },
  mounted() {
    let config = {
      headers: { Authorization: localStorage.getItem("idToken") }
    };

    instance
      .get("/teacher/class", config)
      .then(res => {
        console.log(res.data);
        this.originalInputData = res.data;
        this.classNameList = res.data.map(item => {
          let temp = {};
          temp.name = item.CLASS_NAME;
          temp.Id = item.CLASS_ID;
          return temp;
        });

        // this.inputData.classes2.list = res.data.map(item => {
        //   return item.CLASS_NAME;
        // });
      })
      .catch(err => {
        console.log(err);
      });
  },
  created() {
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
