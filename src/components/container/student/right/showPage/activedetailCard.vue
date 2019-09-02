<template>
    <div class="detail">
        <img class="banner" :src="banner"></img>
        <div class="main">
            <ul class="breadcrumb">
                <li><a href="{name:showPage}">我的首页</a></li>
                <li><a href="{name:showPage}">教务活动</a></li>
                <li class="active">活动详情</li>
            </ul>
            <h3 class="title">{{title}}</h3>
            <p class="principal">作者：{{principal}}&emsp;时间：{{release_time}}</p>
            <div class="content" v-for="item in contents">
                <p>
                    {{item}}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            banner:this.$store.state.url+"activity/bannerBg.png",
            type: "教育",
            title: "第一次活动",
            principal: "zhanghuiquan",
            contents: [
                "快风疏雨消溽暑，天朗气清喜迎新",
            ],
            release_time: "1566255"

        }
    }
}
</script>
<style>
.detail {
    width: 70%;
    margin-left: 15%;

}

.banner {
    width: 100%;
    height: 150px;
}

.main {
    width: 100%;
    height: auto;
    border: 1px solid #E8E8E8;
    margin-top: 10px;
}

.main .title {
    text-align: center;
}

.main .principal {
    background-color: #FBFBF9;
    text-align: center
}

.content p {
    text-indent: 25px;
}
</style>