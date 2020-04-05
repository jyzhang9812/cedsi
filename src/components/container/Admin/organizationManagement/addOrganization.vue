<template>
  <div id="addOrganization">
    <el-form ref="form" :model="form" label-width="105px">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="机构名称">
            <el-input v-model="form.organizationName" placeholder="请输入机构名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="机构负责人">
            <el-input v-model="form.organizationPrin" placeholder="请输入机构负责人"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="机构类型">
            <el-select v-model="form.inputData.option" placeholder="请选择机构类型" style="width: 300px">
              <el-option
                v-for="item in form.inputData.org.list"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="机构地区" style="margin-left:-12px">
            <v-distpicker 
              class="address-input"
              @province="onChangeProvince"
              @city="onChangeCity"
              @area="onChangeArea"
            ></v-distpicker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="机构描述" >
        <el-input type="textarea" :autosize="{ minRows:6, maxRows: 10}" placeholder="请输入机构描述" v-model="form.organizationIntro" style="width: 420px" ></el-input>
      </el-form-item>
      <el-form-item label="上传营业执照"  style="margin-left:28px">
        <div class="upload-cover-btn">
          上传图片
          <input type="file" @change="getLicenseFile($event)" style="opacity: 0" />
        </div>
      </el-form-item>
      <el-form-item label="预览">
        <div class="upload-cover-img">
          <img
            id="headimage"
            :src="form.businessLicense"
            class="cover-image"
            alt=""
          />
        </div>
      </el-form-item>
    </el-form>
    <div class="upload-footer">
      <el-button  type="primary" @click="submit">确定</el-button>
      <el-button  type="primary" @click="cancle">取消</el-button>
    </div>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import AWS from "aws-sdk";
import globalAxios from "axios";
import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";
export default {
  name: "addorganization",
  components: { VDistpicker },
  data() {
    return {
      form: {
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
                name: "学校",
                id: "0"
              },
              {
                name: "企业",
                id: "1"
              }
            ]
          }
        },
        organizationName: "",
        organizationPrin: "",
        businessLicense: "",
        fileName: "",
        organizationAddress: "",
        organizationIntro: "",
        licenseFile:"",
        licenseFileName:"",
        licenseType:"",
        licenseSize:"",
      }
    };
  },
  methods: {
    onChangeProvince(data) {
      this.form.organization.province = data.value;
      this.form.organization.provinceCode = data.code;
    },
    onChangeCity(data) {
      this.form.organization.city = data.value;
      this.form.organization.cityCode = data.code;
    },
    onChangeArea(data) {
      this.form.organization.area = data.value;
      this.form.organization.areaCode = data.code;
    },
    getLicenseFile(event) {
      this.form.licenseFile = event.target.files[0];
      console.log(this.form.licenseFile);
      this.form.licenseFileName = this.form.licenseFile.name;
      this.form.licenseType = this.form.licenseFile.type.split("/")[1];
      this.form.licenseSize = this.form.licenseFile.size;
      var reader = new FileReader();
      var that = this;
      reader.readAsDataURL(this.form.licenseFile);
      reader.onload = function(e) {
        that.form.businessLicense = this.result;
      };
    },
    submit() {
    console.log(this.form);
      var that = this;
      var token = window.localStorage.getItem("idToken");
      this.form.organizationAddress =
        this.form.organization.province +
        this.form.organization.city +
        this.form.organization.area;
      this.code = this.form.organization.areaCode;
      var newOrg = {};
      newOrg.organizationName = this.form.organizationName;
      newOrg.organizationPrin = this.form.organizationPrin;
      newOrg.organizationAddress = this.form.organizationAddress;
      newOrg.organizationIntro = this.form.organizationIntro;
      newOrg.code = this.code;
      newOrg.organizationType = this.form.inputData.option;
      newOrg.type = this.form.licenseType;
      console.log(newOrg)
      globalAxios
        .post(
          "https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/admin/org",
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
            this.$toast.success({ title: "机构管理", message: "操作成功" });
            this.$router.push({ path: "/Admin/organizationManagement" });
            AWS.config = new AWS.Config({
              accessKeyId: response.data.AccessKeyId,
              secretAccessKey: response.data.SecretAccessKey,
              sessionToken: response.data.SessionToken,
              region: "cn-northwest-1"
            });
            var s3 = new AWS.S3();
            let formData = new FormData();

            formData.append("content", this.form.licenseFile);
            console.log(window.localStorage.getItem("user"));
            const reader = new FileReader();
            var content = reader.readAsArrayBuffer(this.form.licenseFile);
            var params = {
              ACL: "public-read",
              Bucket: "cedsi",
              Body: formData.get("content"),
              Key: "license/" + response.data.id + "." + this.form.licenseType,
              ContentType: this.form.licenseType,
              Metadata: {
                uploader: window.localStorage.getItem("userId")
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
    },
    cancle() {
        this.$router.replace({
          path: "/Admin/organizationManagement/"
        });
      }
  }
};
</script>

<style scoped>
#addOrganization {
  width: 98%;
  margin: 0 auto;
  padding-top: 30px;
}
#addOrganization .upload-footer {
  width: 100%;
  text-align: center;
  margin-top: 35px;
}
#addOrganization .upload-cover-btn {
  margin-left: 15px;
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
#addOrganization .upload-cover-img {
  display: inline-block;
  border: 1px dashed #dcdfe6;
  width: 290px;
  height: 150px;
  margin-left: 10px;
  border-radius: 5px;
  background-color: #f5f7fa;
}
#addOrganization .cover-image {
  width: 100%;
  height: 100%;
}
</style>


