<template>
   
</template>


<style scoped>
   
</style>

<script>
    import pagination from "../utils/pagination.vue";
    

    export default {
        name: 'message',
        components: {
            pagination,
        },
        data() {
            return {
              
            }
        },
        methods: {

            //换页
            getNew(value) {
                var currentPage = value / this.limit;
                this.currentPage = currentPage;
                this.$store.commit("changeMsgCurrentList", this.currentPage * this.limit)
            },
        },
        created: function () {
            
          
        },
        computed: {
           
        },
    }
</script>