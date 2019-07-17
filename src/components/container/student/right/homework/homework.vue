<template>
    <div class="container">
        <div>
            <rollPic></rollPic>
        </div>
    </div>
</template>

<script>
    import rollPic from'./rollPic.vue'
    export default {
        name: 'homework',
        components:{
            rollPic,
        },
    }
</script>

<style>
    .container{
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #f4f9fa;
        min-height: 620px;
        padding: 0;
    }
</style>