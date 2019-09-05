<template>
    <div class="quote_row">

        <!-- 模态框（Modal） -->
        <div class="modal fade" id="myModal" data-backdrop="false" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" 
        aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title question_detail" id="myModalLabel">
                            {{quotes[modal_index]}}
                        </h4>
                    </div>
                    <div class="modal-body">
                        <h4 class="modal-title question_detail" id="myModalLabel">
                            {{quotes[modal_index]}}
                        </h4>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                        </button>
                        <button type="button" class="btn btn-primary">
                            提交更改
                        </button>
                    </div>
                </div><!-- /.modal-content -->
            </div>
        </div><!-- /.modal结束 -->
        
        <app-quote v-for="(quote, index) in quotes" :key='index' data-toggle="modal" data-target="#myModal"
    @click.native="changeId (index)"  :quoteindex="index">{{ quote }}</app-quote>
    
    </div>
</template>

<script>
    import Quote from './quote.vue';
    export default {
        props:['quotes'],
        components:{
            appQuote:Quote
        },
        data(){
            return {
                modal_index: 0 ,
                quoteindex: 0,
            }
        },
        methods:{
            changeId(index){
                this.modal_index = index;
            },
            refreshId(index){
                this.modal_index = 0;
            },
            deleteQuote(index){
                $("#myModal").modal('hide'); 
                this.$emit('quoteDeleted',index);
            }
        }
    }
</script>

<style scoped>
    .quote_row{
      width: 100%;
      padding-left:15px; 
    }

    .modal-title{
        text-align: left;
    }

    .modal-content{
        font-size: 2px;
        color: #6e6e6e;
    }

    .question_detail{
        word-wrap: break-word;
    }
</style>