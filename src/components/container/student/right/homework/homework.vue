<template>
    <div id="homework" class="container">
        <div>
            <searchBar></searchBar>
            <rollPic></rollPic>
        </div>
    </div>
</template>

<script>
    import rollPic from'./rollPic.vue'
    import searchBar from'../searchBar.vue'
    export default {
        name: 'homework',
        components:{
            rollPic,
            searchBar,
        },
    }
</script>

<style scoped>
    #homework{
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #f4f9fa;
        min-height: 620px;
        padding: 0;
    }
</style>