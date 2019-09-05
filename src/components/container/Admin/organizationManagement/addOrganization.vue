<template>
  <div id="add-organization">
    <div class="upload">
      <span class="upload-title">机构名称:</span>
      <input class="upload-input" placeholder="请输入机构名称" v-model="organizationName" />
    </div>
    <div class="upload">
      <span class="upload-title">机构地区:</span>
      <v-distpicker
        class="address-input"
        @province="onChangeProvince"
        @city="onChangeCity"
        @area="onChangeArea"
      ></v-distpicker>
    </div>
    <div class="upload">
      <span class="upload-title">机构类型:</span>
      <select-input
        class="upload-select"
        id="org"
        tips="请选章节"
        :option="inputData.org.option.name"
        @option="changeOption"
        :drop-down-list="inputData.org.list"
      ></select-input>
    </div>
    <div class="upload upload-height">
      <span class="upload-title">机构描述:</span>
      <textarea
        class="upload-textarea"
        rows="8"
        cols="70"
        placeholder="请输入机构描述"
        v-model="organizationIntro"
      />
    </div>
    <div class="upload">
      <span class="upload-title">机构负责人:</span>
      <input class="upload-input" placeholder="请输入机构负责人" v-model="organizationPrin" />
    </div>
    <!-- <div class="upload">
      <span class="upload-title">教师人数:</span>
      <input class="upload-input" placeholder="请输入教师人数" v-model="organizationTeacherNum" />
    </div>-->
    <div class="upload">
      <span class="upload-title">上传营业执照:</span>
      <div class="upload-cover-btn">
        上传文件
        <input type="file" @change="getLicenseFile($event)" style="opacity: 0" />
      </div>
    </div>
    <div class="upload upload-height">
      <span class="upload-title">预览:</span>
      <div class="upload-cover-img">
        <img
          id="headimage"
          :src="businessLicense"
          class="cover-image"
          alt
          v-show="businessLicense!==''"
        />
      </div>
    </div>
    <!-- <div class="upload">
      <span class="upload-title">上传相关文件:</span>
      <div class="upload-cover-btn">
        上传文件
        <input type="file" class @change="getFile($event)" style="opacity: 0" />
      </div>
    </div>
    <div class="upload upload-height">
      <span class="upload-title">文件名称:</span>
      <input class="upload-input" :value="fileName" disabled />
    </div>-->
    <div class="upload-footer">
      <button class="btn upload-btn" @click="submit">确定</button>
      <button class="btn upload-btn">取消</button>
    </div>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
import SelectInput from "../utils/selectInput";
import AWS from "aws-sdk";
import globalAxios from "axios";
export default {
  name: "addorganization",
  components: { VDistpicker, SelectInput },
  data() {
    return {
      organization: {
        province: "",
        provinceCode: "",
        city: "",
        cityCode: "",
        area: "",
        areaCode: ""
      },
      inputData: {
        org: {
          option: "",
          list: [
            {
              name:"学校",
              id:"0"
          },
                      {
              name:"企业",
              id:"1"
          },
          ]
        }
      },
      organizationName: "",
      organizationPrin: "",
      //organizationTeacherNum: "",
      businessLicense: "",
      fileName: "",
      organizationAddress: "",
      organizationIntro: ""
      //机构教师人数、营业执照、合同扫描件、机构地区、机构名称、负责人
    };
  },
  methods: {
    changeOption(item, id) {
      Object.keys(this.inputData).forEach(res => {
        if (res === id) {
          this.inputData[res].option = item;
        }
      });
    },
    onChangeProvince(data) {
      this.organization.province = data.value;
      this.organization.provinceCode = data.code;
    },
    onChangeCity(data) {
      this.organization.city = data.value;
      this.organization.cityCode = data.code;
    },
    onChangeArea(data) {
      this.organization.area = data.value;
      this.organization.areaCode = data.code;
    },
    getLicenseFile(event) {
      this.licenseFile = event.target.files[0];
      console.log(this.licenseFile);
      this.licenseFileName = this.licenseFile.name;
      this.licenseType = this.licenseFile.type.split("/")[1];
      this.licenseSize = this.licenseFile.size;
      var reader = new FileReader();
      var that = this;
      reader.readAsDataURL(this.licenseFile);
      reader.onload = function(e) {
        that.businessLicense = this.result;
      };
    },
    // getFile(event) {
    //   this.file = event.target.files[0];
    //   console.log(this.file);
    //   this.fileName = this.file.name;
    //   this.type = this.file.type.split("/")[1];
    //   this.size = this.file.size;
    // },
    submit() {
      var token = window.localStorage.getItem("idToken");
      // var neworganization = {};
      // neworganization.organizationName = this.organizationName;
      // neworganization.organizationDesc = this.organizationDesc;
      // neworganization.courseId = this.courseId;
      this.organizationAddress =this.organization.province +this.organization.city +this.organization.area;
      this.code = this.organization.areaCode;
      var newOrg = {};
      newOrg.organizationName = this.organizationName;
      newOrg.organizationPrin = this.organizationPrin;
      newOrg.organizationAddress = this.organizationAddress;
      newOrg.organizationIntro = this.organizationIntro;
      newOrg.code=this.code;
      newOrg.organizationType = this.inputData.org.option.name;
      newOrg.type=this.licenseType;
      console.log(newOrg);
      console.log(this.organization);
       globalAxios
        .post(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/admin/org" ,
            newOrg,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            }
          }
        )
        .then(
          response => {
            console.log(response);
            this.$router.push({path:"/Admin/organizationManagement"})
            AWS.config = new AWS.Config({
              accessKeyId: response.data.AccessKeyId,
              secretAccessKey: response.data.SecretAccessKey,
              sessionToken:response.data.SessionToken,
              region: "cn-northwest-1"
            });
            var s3 = new AWS.S3();
            let formData = new FormData();

            formData.append("content", this.licenseFile);
            console.log(window.localStorage.getItem("user"));
            const reader = new FileReader();
            var content = reader.readAsArrayBuffer(this.licenseFile);
            var params = {
              ACL: "public-read",
              Bucket: "cedsi",
              Body: formData.get("content"),
              Key: "license/" + response.data.id + "." + this.licenseType,
              ContentType: this.licenseType,
              Metadata: {
                uploader: window.localStorage.getItem("user")
              }
            };
            s3.putObject(params, function(err, data) {
              if (err) {
                console.log(err, err.stack);
              } else {
                console.log(data);
              }
            });
          },
          error => {
            console.log(error);
          }
        );
    }
  }
};
</script>

<style scoped>
#add-organization {
  width: 98%;
  margin: 0 auto;
  padding-top: 30px;
}
.upload {
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
}
#add-organization .upload-title {
  color: #606266;
  display: block;
  text-align: right;
  width: 100px;
  height: 40px;
  float: left;
  line-height: 40px;
}
.upload-input {
  width: 300px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #409eff;
  margin-left: 10px;
  padding-left: 10px;
}
.upload-input:hover {
  border: 1px solid #66b1ff;
}
.upload-input:focus {
  outline: none;
}
.upload-textarea {
  border: 1px solid #409eff;
  border-radius: 5px;
  margin-left: 10px;
  padding: 10px;
}
.upload-height {
  height: 190px;
}
.upload-textarea:hover {
  border: 1px solid #66b1ff;
}
.upload-textarea:focus {
  outline: none;
}
.outside[data-v-d899aefc] {
  width: 300px !important;
  height: 40px !important;
  margin-left: 10px !important;
}
.inputBox[data-v-d899aefc] {
  height: 35px !important;
  font-size: 14px !important;
  width: 230px !important;
}
.dropdown-menu {
  left: 100px !important;
}
.upload-footer {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}
.upload-btn {
  background-color: #409eff;
  color: #fff;
  margin-left: 10px;
}
.upload-btn:hover {
  color: #fff;
}
.upload-btn:focus {
  outline: none;
  color: #fff;
}
/**/
.address-input select {
  margin-left: 10px;
  font-size: 14px;
}
.upload-cover-btn {
  margin-left: 10px;
  width: 80px;
  height: 35px;
  display: inline-block;
  background-color: #409eff;
  color: #fff;
  border-radius: 5px;
  line-height: 35px;
  text-align: center;
}
input[type="file"] {
  width: 80px;
  height: 35px;
  position: relative;
  top: -35px;
}
.upload-cover-img {
  display: inline-block;
  border: 1px dashed #dcdfe6;
  width: 290px;
  height: 150px;
  margin-left: 10px;
  border-radius: 5px;
  background-color: #f5f7fa;
}
.cover-image {
  width: 100%;
  height: 100%;
}
.upload-height {
  height: 190px;
}
</style>


