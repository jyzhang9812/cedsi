<template>
    <div class="searchBar">
        <div class="searchBoxContainer">
            <input class="searchBox" placeholder="课程名...">
            <img class="searchImg" :src=searchImg @click="searchData">
        </div>
        <div>
            <button class="button">
                开始创作
            </button>
        </div>
    </div>
</template>

<script>
    // import Bus from '../../../../store/bus.js'
    export default {
        name: 'searchBar',
        components:{
        },
        data() {
            return {
                searchImg:'../../' + this.$store.state.url + 'dashboard/search.png',
            }
        },
        methods:{
            searchData(){
                return this.$store.state.currentIndex;
            }
        },
    }   
</script>

<style>
    .searchBar{
        background-color: #00bcd4;
        color: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100px;
    }
    .searchBoxContainer{
        width: 500px;
        height: 40px;
        border-radius: 6px;
        background: #17788e;
        color: #fff;
        margin: 0 30px;
        display: flex;
    }
    ::placeholder{
        color: #e7e7e7;
    }
    .searchBox{
        border: none;
        width: 470px;
        height: 40px;
        padding: 0 10px;
        border-radius: 6px;
        background: #17788e;
        color: #fff;
    }
    .searchBox:focus{
        background: #fff;
        color: #777;
    }
    .searchImg{
        margin: 8px;
        width: 25px;
        height: 25px;
        cursor: pointer;
    }
    .button{
        display: inline-block;
        vertical-align: middle;
        margin: 0 30px;
        font-family: inherit;
        padding: .85em 1em;
        -webkit-appearance: none;
        border: 1px solid transparent;
        border-radius: 5px;
        transition: background-color .25s ease-out,color .25s ease-out;
        font-size: 1.5rem;
        line-height: 1;
        text-align: center;
        cursor: pointer;
        background: #ff8d1a;
        color: #fff;
    }
</style>