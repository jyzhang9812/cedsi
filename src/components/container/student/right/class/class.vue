<template>
    <div class="limiter">
        <div class="class_header">
            <button class="nameOfClass">{{name_of_class}}</button>
        </div>
        <div class="container-table100">
            <div class="wrap-table100">
                <div v-for="(item,index) in myteacher" :key="index">
                    <img class="avastimg" alt="" :src="item.headpicture">
                    代课老师：{{item.teachername}}
                    <hr />
                </div>
                <div class="table100 ver1 m-b-110">
                    <table data-vertable="ver1">
                        <thead>
                            <tr class="row100 head">
                                <th class="column100">序号</th>
                                <th class="column100">头像</th>
                                <th class="column100">我的同学</th>
                                <th class="column100">性别</th>
                                <th class="column100">年龄</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="row100" v-for="(item,index) in myclassmate" :key="index">
                                <td class="column100">{{index+1}}</td>
                                <td class="column100"><img class="avastimg" :src="item.headpicture"></td>
                                <td class="column100">{{item.name}}</td>
                                <td class="column100">{{item.sex}}</td>
                                <td class="column100">{{item.age}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
        name: 'class',
        data() {
            return {
                name_of_class:'赛迪思',
                myclassmate: [
                    {

                        headpicture: 'https://public-change-online.oss-cn-beijing.aliyuncs.com/xlsx/icon.png',
                        name: '小赛',
                        sex: '男',
                        age: '0',
                    },
                    {

                        headpicture: 'https://public-change-online.oss-cn-beijing.aliyuncs.com/xlsx/icon.png',
                        name: '小迪',
                        sex: '男',
                        age: '0',
                    },
                    {

                        headpicture: 'https://public-change-online.oss-cn-beijing.aliyuncs.com/xlsx/icon.png',
                        name: '小斯',
                        sex: '男',
                        age: '0',
                    },
                    {

                        headpicture: 'https://public-change-online.oss-cn-beijing.aliyuncs.com/xlsx/icon.png',
                        name: '小艾',
                        sex: '男',
                        age: '0',
                    },

                ],
                myteacher: [
                    {
                        teachername: "程老师",
                        headpicture: 'data:image/png;base64,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',
                    }

                ],
            }
        },

    }
</script>

<style>
.class_header{
    background-color: #00bcd4;
    color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100px;  
}
.nameOfClass{
    width:auto;
    min-width: 100px;
    background: #ff8d1a;
    height: 40px;
    font-size: 15px;
    text-align: center;
    margin: 10px 10px 0 30px;
    font-weight: bold;
    color: #fff;
    border: 1px solid #50b8ee;
    border-radius: 12px;
}
.nameOfClass:hover{
    color: #50b8ee;
    background: #fff;
}
.avastimg {
    vertical-align: middle;
    width: 40px;
}
/*[ RESTYLE TAG ]*/
* {
	margin: 0px; 
	padding: 0px; 
	box-sizing: border-box;
}

body, html {
	height: 100%;
	font-family: sans-serif;
}

/* ------------------------------------ */
a {
	margin: 0px;
	transition: all 0.4s;
	-webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
	outline: none !important;
}

a:hover {
	text-decoration: none;
}

/* ------------------------------------ */
h1,h2,h3,h4,h5,h6 {margin: 0px;}

p {margin: 0px;}

ul, li {
	margin: 0px;
	list-style-type: none;
}

/* ------------------------------------ */
button {
	outline: none !important;
	border: none;
	background: transparent;
}

button:hover {
	cursor: pointer;
}

iframe {
	border: none !important;
}



/*//////////////////////////////////////////////////////////////////
[ Table ]*/

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-table100 {
  width: 100%;
  min-height: 100vh;
  background: #f4f9fa;
  /* display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  flex-wrap: wrap; */
  padding: 10px 30px;
}

.wrap-table100 {
  width: 100%;
  margin-top: 20px;
}

/*//////////////////////////////////////////////////////////////////
[ Table ]*/
table {
  width: 100%;
  background-color: #fff;
}

th, td {
  font-weight: unset;
  padding-right: 10px;
}

.column100 {
  width: 130px;
  padding-left: 25px;
  text-align: center;
}

/* .column100.column {
  width: auto;
  padding-left: 42px;
} */

.row100.head th {
  padding-top: 24px;
  padding-bottom: 20px;
}

.row100 td {
  padding-top: 10px;
  padding-bottom: 8px;
}

/*==================================================================
[ Ver1 ]*/
.table100.ver1 td {
  font-family: Montserrat-Regular;
  font-size: 14px;
  color: #808080;
  line-height: 1.4;
}

.table100.ver1 th {
  font-family: Montserrat-Medium;
  font-size: 15px;
  color: #fff;
  line-height: 1.4;
  text-transform: uppercase;

  background-color: #36304a;
}

.table100.ver1 .row100:hover {
  background-color: #f2f2f2;
}

.table100.ver1 .hov-column-ver1 {
  background-color: #f2f2f2;
}

.table100.ver1 .hov-column-head-ver1 {
  background-color: #484848 !important;
}

.table100.ver1 .row100 td:hover {
  background-color: #6c7ae0;
  color: #fff;
}

</style>