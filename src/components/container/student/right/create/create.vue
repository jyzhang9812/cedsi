<template>
    <div id="create" class="container">
        <div>
            <searchBar></searchBar>
            <createCard></createCard>
        </div>
    </div>
</template>

<script>
    import createCard from './createCard.vue'
    import searchBar from '../searchBar.vue'
    export default {
        name: 'create',
        components: {
            createCard,
            searchBar,
        },
    }
        //加入课程分类，时间筛选
</script>

<style scoped>
    #create {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #f4f9fa;
        min-height: 100%;
        padding: 0;
    }
</style>