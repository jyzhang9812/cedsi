<template>
    <div class="col-md-8 col-md-offset-2">

        <div class="panel panel-primary">

            <ul class="nav nav-tabs" role="tablist">

                <li role="presentation"><a href="#"><strong>赛迪斯</strong></a></li>
                
            </ul>

            

            <div class="panel-body">

                <div v-for="(item,index) in myteacher" :key="index">
                    <img class="teacherimg" alt="" :src="item.headpicture">

                    代课老师：{{item.teachername}}
                    <hr />
                </div>

                <table class="table table-hover  ">

                    <thead>
                        <th width="10%"><strong><span>序号</span></strong>
                        </th>
                        <th width="10%"><strong><span>头像</span></strong>
                        </th>
                        <th width="10%"><strong><span>我的同学</span></strong>
                        </th>
                        <th width="10%"><strong><span>性别</span></strong>
                        </th>
                        <th width="10%"><strong><span>年龄</span></strong>
                        </th>
                    </thead>

                    <tbody>
                        <tr v-for="(item,index) in myclassmate" :key="index">
                            <td width="10%">{{index+1}}</td>
                            <td width="10%"><img class="avastimg" :src="item.headpicture">
                            </td>
                            <td width="10%">{{item.name}}</td>
                            <td width="10%">{{item.sex}}</td>
                            <td width="10%">{{item.age}}</td>
                        </tr>

                    </tbody>

                    </tbody>
                </table>
                <hr />
                <ul class="pagination">
                    <li><a href="#">&laquo;</a></li>
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li><a href="#">&raquo;</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>


<style>
    .col-md-offset-2 {
        width: 100%;
        min-height: 620px;
    }

    ul{
        padding: 0;
        min-height: 0;
    }

    .panel {
        min-height: 620px;
        width: 100%;
        margin: 0;
        border-radius: 0;
    }

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
        color:
            rgb(68, 153, 206)
    }
</style>

<script>

    export default {
        name: 'myclass',
        data() {
            return {
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