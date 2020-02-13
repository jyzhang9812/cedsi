<template>
    <div class="searchBar">
        <el-row type="flex" justify="space-between">
            <!-- 搜索框 -->
            <el-col :span="10">
                <el-input class="searchBox" placeholder="课程名..." v-model="input">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="searchData"></i>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button  type="warning"><a :href='scratch'>开始创作</a></el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'searchBar',
        components: {
        },
        data() {
            return {
                input:""
            }
        },
        methods: {
            searchData() {
                return this.$store.state.currentIndex;
            }
        },
        computed: {
            ...mapState({
                scratch: state => state.scratch,
            }),
        }
    }   
</script>

<style>
    .searchBar {
        background-color: #00bcd4;
        color: #fff;
        width: 100%;
        padding: 30px
    }
    .searchBox input.el-input__inner {
        background: #17788e;
        border: none;
        color: #fff;
    }
    a{
        text-decoration:none;
        color: #fff;
    }
</style>