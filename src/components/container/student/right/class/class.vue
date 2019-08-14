<template>
    <div class="limiter">
        <div class="class_header">
            <button class="nameOfClass">{{name_of_class}}</button>
        </div>
        <div class="container-table100">
            <div class="wrap-table100">
                <div>
                    <img class="avastimg" alt="" :src="myteacher.avatar">
                    代课老师：{{myteacher.teacher_name}}
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
                                <td class="column100"><img class="avastimg" :src="item.AVATAR"></td>
                                <td class="column100">{{item.STUDENT_NAME}}</td>
                                <td class="column100">{{item.GENDER}}</td>
                                <td class="column100">{{item.AGE}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import globalAxios from 'axios'
  export default {
        name: 'class',
        data() {
            return {
                name_of_class:'',
                myclassmate: [],
                myteacher: {},
            }
        },
        created: function() {      
            var token = window.localStorage.getItem('idToken')
            globalAxios.get('https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/student/class',
                {headers: {
                    'Content-Type':'application/json',
                    'Authorization': token
                }}
            ).then(response => {
                console.log(response);
                var arr=[];
                this.name_of_class = response.data.className;
                this.myteacher = response.data.teacher;
                for(var i = 0;i<response.data.classmates.length;i++){
                    arr.push(response.data.classmates[i])
                }
                this.myclassmate = arr;
                },
                error => {
                    console.log(error);
                }
            );
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
    padding: 0 10px;
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