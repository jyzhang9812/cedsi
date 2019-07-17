<!--
 * @Email: rumosky@163.com
 * @Author: rumosky
 * @Github: https://github.com/rumosky
 * @Date: 2019-06-05 17:55:28
 * @LastEditors: rumosky
 * @LastEditTime: 2019-06-20 23:34:44
 -->
<template>
    <div class="container">
        <!-- 模态框（Modal） -->
        <div class="modal fade" data-backdrop="false" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            请教老师
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div ref="editor" style="text-align:left"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消
                        </button>
                        <button v-on:click="getContent" type="button" class="btn btn-primary">
                            提交
                        </button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->


        <div class="menu">
            <!-- 按钮触发模态框 -->
            <button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
                请教老师
            </button>
        </div>

        
        <div class="main">
            <div class="cardbox" v-for="card in cards">
                <div class="card_content">
                    {{card.message}}
                </div>
                <div class="card_footer">
                    <img class="avast" src="">
                    <span>{{card.teacher}}</span>
                    <span>{{card.date}}</span>


                </div>
            </div>
        </div>
        <div class="footer">
            <ul class="pagination">
                <li><a href="#">&laquo;</a></li>
                <li class="active"><a href="#">1</a></li>
                <li class="disabled"><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">&raquo;</a></li>
            </ul>
        </div>
    </div>
</template>


<style scoped>
    .container{
        background: #f4f9fa;
    }

    .menu {
        background-color: #f4f9fa;
        height: auto;
        padding-top: 10px;
        padding-right: 40px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-end;
    }

    .main {
        background-color: #f4f9fa;
        min-width: 400px;
        padding: 20px 40px;
    }

    .cardbox {
        margin-bottom: 40px;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        height: auto;
        background-color: white;
        border-radius: 10px;
    }

    .cardbox:hover {
        box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
        transform: scale(1.03);
        -ms-transform: scale(1.03);
        /* IE 9 */
        -webkit-transform: scale(1.03);
        /* Safari and Chrome */
        -o-transform: scale(1.03);
        /* Opera */
        -moz-transform: scale(1.03);
        /* Firefox */
    }

    .card_content {
        padding: 10px 40px;
        height: auto;
        color: #2f2f2f;
        text-align: justify;
        font-size: 125%;
        font-style: initial;
    }


    .card_content::before {
        content: "\201C";
        font-family: MS PGothic;
        font-size: 60px;
        font-weight: bold;
        color: #06AFA6;
        box-sizing: inherit;
    }

    .card_footer {
        padding: 0px 40px 10px 40px;
        margin-left: auto;
    }


    .avast {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
    }

    .card_footer span {
        color: black;
        vertical-align: middle;
        display: inline-block;
    }

    .footer {
        background-color: #f4f9fa;
        height: auto;
        padding-top: 10px;
        padding-left: 40px;
        padding-right: 40px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .modal-dialog{
        width: 750px; 
    }
</style>

<script>
    import E from 'wangeditor'
    export default {
        name: 'question',
        data() {
            return {
                cards: [
                    { message: "这是question", teacher: "小赛", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "继续努力，相信你！", teacher: "小思", date: "2019-6-6", avast: "../assets/avast/avast2.png" },
                    { message: "富强民主文明和谐", teacher: "晓得", date: "2019-6-5", avast: "../assets/avast/avast3.png" },
                    { message: "自由平等公正法治", teacher: "小张", date: "2019-6-8", avast: "../assets/avast/avast1.png" },
                    { message: "爱国敬业诚信友善", teacher: "小李", date: "2019-6-9", avast: "../assets/avast/avast2.png" }
                ],
                editorContent: ''
            }
        },
        methods: {
            delcard() {
                this.cards.splice(0, 1);
            },
            getContent: function () {
                alert(this.editorContent)
            }
        },
        mounted() {
            var editor = new E(this.$refs.editor)
            editor.customConfig.onchange = (html) => {
                this.editorContent = html
            }
            editor.create()
        }
    }
</script>