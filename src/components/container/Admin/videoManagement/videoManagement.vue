<template>
    <div class="body">
        <div>
            <button class="btn btn-clear" @click='gotoUpload'>上传视频</button>
        </div>
        <div class="outside">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th v-for="(th, index) in tableTitle" :key="index" class="title">{{th}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(line, seq) in currentList" :key="seq" class="content">
                        <td :style="{'width': tableWidth[0] + 'px'}">{{seq + 1}}</td>
                        <td v-for="(item, index) in line" :key="index" :style="{'width': tableWidth[index + 1] + 'px'}">
                            {{item}}
                        </td>
                        <td>
                            <button class="btn btn-clear">编辑</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <pagination :num="videoData.length" @getNew="changeTablePages" :limit="limit">
            </pagination>
        </div>
    </div>
</template>

<script>
    import Pagination from "../utils/pagination";
    import globalAxios from 'axios';
    import fs from 'fs';
    import AWS from 'aws-sdk'

    export default {
        name: "videos",
        components: { Pagination },
        data() {
            return {
                file: null,
                limit: 10,
                fileName: '',
                videoData: [
                    [
                        "Scratch入门课 | 第1节课 | 大炮打僵尸--僵尸移动",
                        "本节课主要是控制一个僵尸进行移动，其中会学到【移动10步】、【面向90度】、【移到x：0 y：0】、【重复执行10】、【等待1秒】和【下一个造型】等6个程序模块。通过这6个程序模块的组合使用，模拟单个僵尸入侵我们的小木屋的过程。",
                        "2019-01-10 13:42:46",
                        "超级管理员"
                    ],
                    [
                        "Scratch入门课 | 第2节课 | 大炮打僵尸--成群僵尸",
                        "上一节课，我们学到了单个小僵尸入侵我们的小木屋，本节课我们来实现成群的僵尸入侵我们的小木屋。期间我们会复习旧知识，并且学习【当我被克隆】、【克隆一个】、【如果…那么… ]、【重复执行】、【碰到】和【停止全部】等新知识。",
                        "2019-01-10 13:43:11",
                        "超级管理员"
                    ],
                    [
                        "Scratch入门课 | 第3课 | 大炮打僵尸--发射炮弹",
                        "前面的课程一直是僵尸来入侵我们的小木屋，我们只能眼睁睁看着，显得非常无力。本节课我们终于能够进行反击了，而且是大炮！我们利用前面所学知识，实现炮弹的不断发射。虽然没有增加新模块的学习，但是温故而知新，只有学会的知识才是自己的！",
                        "2019-01-10 13:43:48",
                        "超级管理员"
                    ],
                    [
                        "Scratch入门课 | 第4节课 | 大炮打僵尸--控制炮台",
                        "前面的课程一直是僵尸来入侵我们的小木屋，我们只能眼睁睁看着，显得非常无力。本节课我们终于能够进行反击了，而且是大炮！我们利用前面所学知识，实现炮弹的不断发射。虽然没有增加新模块的学习，但是温故而知新，只有学会的知识才是自己的！",
                        "2019-01-10 13:43:48",
                        "超级管理员"
                    ],
                    [
                        "Scratch入门课 | 第5节课 | 大炮打僵尸--毕业设计",
                        "经过前面的学习，我们已经成功掌握了基本的软件使用方法，和简单的游戏小制作。我们何不成热打铁，小试牛刀一番。最好的学习方式是记忆+练习+拓展。前面的学习，我们已经做到了记忆+练习，本节课就开始你的拓展之旅吧",
                        "2019-01-10 13:45:13",
                        "超级管理员"
                    ]
                ],
                tableTitle: [
                    "序号",
                    "课程名称",
                    "操作说明",
                    "上传时间",
                    "创建人",
                    "操作"
                ],
                tableWidth: [48, 290, 300, 210, 210, 180],
                currentList: []
            }
        },
        methods: {
            popModal(option) {
                console.log(option);
                if (option === "view") {
                    // 预览
                } else if (option === "choose") {
                    // 选择题目
                } else if (option === "insert") {
                    // 插入题目
                }
            },
            changeTablePages(value) {
                this.currentList = this.videoData.slice(value, value + this.limit);
            },
            gotoUpload(){
                this.$router.replace({ path: '/Admin/uploadVideo' })
            },
            submit(event) {
                console.log(event)
                if (this.fileName == '') {
                    this.$notify({
                        title: '警告',
                        message: '请选择要上传的文件',
                        type: 'warning'
                    })
                    return false
                } else if (this.particulars == '') {
                    this.$notify({
                        title: '警告',
                        message: '请输入课程详情',
                        type: 'warning'
                    })
                } else if (this.caption == '') {
                    this.$notify({
                        title: '警告',
                        message: '请输入课程标题',
                        type: 'warning'
                    })
                } else if (this.hour == '') {
                    this.$notify({
                        title: '警告',
                        message: '请输入课时',
                        type: 'warning'
                    })
                } else {
                    event.preventDefault()
                    let formData = new FormData()
                    //var formData = new URLSearchParams()
                    // let data = window.URL.createObjectURL(new Blob([event.target.result]))

                    formData.append('caption', this.caption)
                    formData.append('hour', this.hour)
                    formData.append('particulars', this.particulars)
                    formData.append('content', this.file)
                    console.log(formData.get('content'))
                    // let config = {
                    // headers: {
                    //     'Content-Type': 'multipart/form-data'
                    //     }
                    // }
                    var token = window.localStorage.getItem('idToken')
                    globalAxios({
                        url: 'https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod/admin/video',
                        method: 'POST',
                        headers: {
                            // 'Content-Type': 'multipart/form-data',
                            'Authorization': token
                        },
                        data: formData,
                        // processData: false,
                        // contentType: false
                    }).then(response => {
                        // this.$notify({
                        // title: '成功',
                        // message: '上穿成功等待审核',
                        // type: 'success'
                        // })
                        console.log(response)
                    }, error => {
                        // this.$notify({
                        // title: '警告',
                        // message: '对不起服务器繁忙上传失败请稍后重试！',
                        // type: 'warning'
                        // })
                        console.log(error)
                    }
                    )
                }
            }
        },
        mounted() {
            this.changeTablePages(0);
        },
    }
</script>

<style scoped>
    .body {
        font-size: 12px;
        color: #606266;
    }

    .title {
        text-align: center;
    }

    .content td {
        line-height: 23px;
    }

    table tr {
        text-align: center !important;
    }

    table td {
        vertical-align: middle !important;
    }

    .outside {
        margin-top: 20px;
    }

    .operation {
        color: #409eff;
        margin: 0 3px;
        cursor: pointer;
    }

    .btn {
        background: #409eff;
        color: #fff;
        height: 30px;
        border-radius: 5px;
        font-size: 12px;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    .btn:focus {
        outline: none;
    }

    .btn:hover {
        background: #66b1ff;
    }

    .btn-search {
        width: 54px;
    }

    .btn-clear {
        width: 88px;
    }
</style>