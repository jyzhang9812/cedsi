<template>
    <div class="coursemap">
        <div class="introduction" :style="screenHeight">
            <div class="introductionContent">
                <img :src="mapUrl" class="course-map-img">
                <div class="introductionList">
                    <div class="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            mapUrl:this.$store.state.url + "scratch/bg.f0d850a.jpg",
        }
    },
    created: function () {
      this.height = document.documentElement.clientHeight,
      this.screenHeight = 'height:' + (this.height - 56) + 'px;';
    }
}
</script>
<style>
    .introduction{
        width: 100%;
        margin: 0 auto;
        background: #2fd0ff;
    }
    .introductionContent{
        max-width: 1200px;
        min-height: 700px;
        position: relative;
        margin: 0 auto;
    }
    .course-map-img{
        border: 0!important;
        display: block;
        width: 100%;
    }
    .introductionList{
        position: absolute;
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
    }
</style>