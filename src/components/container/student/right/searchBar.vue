<template>
    <div class="searchBar">
        <div class="searchBoxContainer">
            <input class="searchBox" placeholder="课程名...">
            <img class="searchImg" src="../../../../../static/images/dashboard/search.png">
        </div>
        <div>
            <button style="background: #ff8d1a"></button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'searchBar',
        components:{
        },
        data() {
        return {
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
    }
</style>