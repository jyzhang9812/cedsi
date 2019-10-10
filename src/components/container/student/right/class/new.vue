<template>
    <div id="new" class="limiter">
        <div v-if='txt==true'>
            <h4>还没有加入任何班级哦~</h4>
        </div>
        <div class="container-table100" v-if='txt==false'>
            <div style="margin-bottom: 10px;">
                <button class="nameOfClass" v-for='(item,index) in myClass' @click='changeClass(index)'
                    :class="{active : index===curId}">{{item.name}}</button>
            </div>
            <div class="wrap-table100">
                <div style="margin-bottom: 10px;">
                    <img class="avastimg" :src="nowClass.teacher.avatar">
                    <span>代课老师：{{nowClass.teacher.teacher_name}}</span>
                    <span style="margin-left: 20px">班级人数：{{nowClass.memberCount}}</span>
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
                            <tr class="row100" v-for="(item,index) in nowClass.classmates" :key="index">
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
    import { mapState } from 'vuex'
    export default {
        name: 'class',
        data() {
            return {
                nowClass: {
                    teacher: {
                        avatar: '',
                        teacher_name: ''
                    }
                },
                curId: 0,
                txt:false,
            }
        },
        methods: {
            changeClass(index) {
                this.curId = index
                this.nowClass = this.myClass[this.curId]
            },
        },
        created: function () {
            this.$store.commit('updateLoading', true)
            this.$store.dispatch('getClass').then(() => {
                if(this.myClass==null){
                    this.txt = true;
                }
                else 
                    this.nowClass = this.myClass[this.curId];
            })
        },
        computed: {
            ...mapState({
                myClass: state => state.myClass,
            }),
        },
    }
</script>

<style scoped>
    #new .nameOfClass {
        width: auto;
        min-width: 100px;
        background: #51c79f;
        height: 40px;
        font-size: 15px;
        text-align: center;
        margin: 10px 10px 0 0;
        padding: 0 10px;
        font-weight: bold;
        color: #fff;
        border-radius: 12px;
    }

    #new button.nameOfClass:hover,
    #new button.active {
        color: #75b598;
        background: #fff;
    }

    #new .avastimg {
        vertical-align: middle;
        width: 40px;
    }

    /*[ RESTYLE TAG ]*/
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }

    #new body,
    #new html {
        height: 100%;
        font-family: sans-serif;
    }

    /* ------------------------------------ */
    #new a {
        margin: 0px;
        transition: all 0.4s;
        -webkit-transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
    }

    #new a:focus {
        outline: none !important;
    }

    #new a:hover {
        text-decoration: none;
    }

    /* ------------------------------------ */
    #new h1,
    #new h2,
    #new h3,
    #new h4,
    #new h5,
    #new h6 {
        margin: 0px;
    }

    #new p {
        margin: 0px;
    }

    #new ul,
    #new li {
        margin: 0px;
        list-style-type: none;
    }

    /* ------------------------------------ */
    #new button {
        outline: none !important;
        border: none;
        background: transparent;
    }

    #new button:hover {
        cursor: pointer;
    }

    #new iframe {
        border: none !important;
    }

    /*//////////////////////////////////////////////////////////////////
    [ Table ]*/
    #new .limiter {
        width: 100%;
        margin: 0 auto;
    }

    #new .container-table100 {
        width: 100%;
        min-height: 100vh;
        padding: 10px 30px;
    }

    #new .wrap-table100 {
        width: 100%;
        margin-top: 20px;
    }

    /*//////////////////////////////////////////////////////////////////
    [ Table ]*/
    #new table {
        width: 100%;
        background-color: #fff;
    }

    #new th,
    #new td {
        font-weight: unset;
        padding-right: 10px;
    }

    #new .column100 {
        width: 130px;
        padding-left: 25px;
        text-align: center;
    }

    #new .row100.head th {
        padding-top: 24px;
        padding-bottom: 20px;
    }

    #new .row100 td {
        padding-top: 10px;
        padding-bottom: 8px;
    }

    /*==================================================================
    [ Ver1 ]*/
    #new .table100.ver1 td {
        font-family: Montserrat-Regular;
        font-size: 14px;
        color: #808080;
        line-height: 1.4;
    }

    #new .table100.ver1 th {
        font-family: Montserrat-Medium;
        font-size: 15px;
        color: #fff;
        line-height: 1.4;
        text-transform: uppercase;
        background-color: #3d857a;
    }

    #new .table100.ver1 .row100:hover {
        background-color: #eff4e7;
    }

    #new .table100.ver1 .hov-column-ver1 {
        background-color: #eff4e7;
    }

    #new .table100.ver1 .hov-column-head-ver1 {
        background-color: #484848 !important;
    }

    #new .table100.ver1 .row100 td:hover {
        background-color: #51c79f;
        color: #fff;
    }
</style>