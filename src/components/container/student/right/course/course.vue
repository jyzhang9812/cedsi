<template>
    <div class="container">
        <searchBar></searchBar>
        <courseCard></courseCard>
    </div>
</template>

<script>
    import courseCard from'./all.vue'
    import searchBar from'../searchBar.vue'
    export default {
        name: 'dashboard',
        components:{
            courseCard,
            searchBar,
        },
        // mounted(){
        //     this.$store.commit('add',1)
        // }
}   
</script>

<style scoped>
    .container{
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #f4f9fa;
        color: #fff;
        padding: 0;
    }
</style>