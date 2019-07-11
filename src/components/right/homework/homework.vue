<template>
    <div class="container">
        <div>
            <zuopin></zuopin>
        </div>
    </div>
</template>

<script>
    import zuopin from'./zuopin.vue'
    export default {
        name: 'homework',
        components:{
            zuopin,
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