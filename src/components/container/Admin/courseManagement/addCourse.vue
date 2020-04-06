<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="课程名称：">
        <el-input v-model="form.name" placeholder="请输入课程名称"></el-input>
      </el-form-item>
      <el-form-item label="是否付费：">
        <el-radio-group v-model="form.isFree">
          <el-radio label="0">免费</el-radio>
          <el-radio label="1">付费</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="form.isFree==='1'">
        <el-form-item label="付费金额：">
          <el-input v-model="form.price" placeholder="请输入付费金额"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="课程描述：">
        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 6}" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="封面：" prop="cover">
        <el-upload
          class="avatar-uploader"
          action="#"
          :http-request="loadActivityCover"
          :show-file-list="false"
        >
          <img v-if="form.cover" :src="form.cover" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit1($event)" :disabled="!form.isPrice">确定</el-button>
        <el-button @click="calcelUpload">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AWS from "aws-sdk";
import instance from "../../../../axios-auth.js";

export default {
  name: "uploadVideo",
  data() {
    return {
      form: {
        name: "",
        price: 0,
        isFree: "0",
        description: "",
        cover: "",
        isPrice: true
      },
      file: null,
      fileName: "",
      ispay: 0,
    };
  },
  watch: {
    price(val, oldVal) {
      var regPos = /^\d+(\.\d+)?$/;
      if (regPos.test(val)) {
        this.form.isPrice = true;
      } else {
        this.form.isPrice = false;
      }
    }
  },
  methods: {
    loadActivityCover(event) {
      this.file = event.file;
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(event.file);
      reader.onload = function() {
        that.form.cover = this.result;
      };
    },
    calcelUpload() {
      this.file = null;
      this.fileName = "";
      this.form.name = "";
      this.form.price = null;
      this.form.description = "";
      this.$router.replace({ path: "/Admin" });
    },
    submit1(event) {     
      console.log(this.file);
      let data=  {
          name: this.form.name,
          ispay: this.ispay,
          price: this.form.price * 100,
          introduction: this.form.description,
          type: this.file.type.split("/")[1]
        };
        this.postFormData(data);        
    },

    postImgToS3(config, file) {
        const that = this;
        AWS.config = new AWS.Config({
          accessKeyId: config.AccessKeyId,
          secretAccessKey: config.SecretAccessKey,
          sessionToken: config.SessionToken,
          region: 'cn-northwest-1'
        });
        let s3 = new AWS.S3();
        let params = {
          ACL: 'public-read',
          Bucket: "cedsi",
          Body: file,
          Key: "course/" + config.id + "." + file.type.split("/")[1],
          ContentType: file.type,
          Metadata: { 'uploader': window.localStorage.getItem('user') }
        };
        s3.putObject(params, function (err, data) {
          console.log(err);
          console.log(data);
          that.screenLoading = false;
          if (data.ETag) {
            that.$message({ message: '课程增加成功', type: 'success' });
          } else {
            that.$message({ message: '课程增加失败', type: 'error' });
          }
        });
      },

    postFormData(formData) {
      let file = this.file;
      instance
        .post("/admin/course", formData, {
          headers: { Authorization: localStorage.getItem("idToken") }
        })
        .then(res => {
          console.log(res);
          this.postImgToS3(res.data, file);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 290px;
  height: 150px;
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 290px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}

.avatar {
  width: 290px;
  height: 150px;
  display: block;
}

.el-form-item {
  width: 400px;
}
</style>