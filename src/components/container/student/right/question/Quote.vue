<template>
    <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="panel panel-default">
            <div class="panel-body quote">
                <p class="cross">
                    <span @click='deleteQuote(quoteindex)'>×</span>
                </p>
                <slot>
                    <!--父组件向子组件插入数据-->
                </slot>
            </div>
        </div>

    </div>
</template>
<script>
import Quote from './Quote.vue';
export default {
        props:['quotes','quoteindex'],
        components: {
            appQuote: Quote
        },
        methods:{
            deleteQuote(quoteindex) {
                event.stopPropagation();//阻止触发父元素的点击事件
                this.$parent.deleteQuote(quoteindex);
            },
        }
    }
</script>

<style>
    .panel-body {
        font-family: 'Arizonia', cursive;
        font-size: 24px;
        color: #6e6e6e;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .quote {
        cursor: pointer;
    }

    .quote:hover {
        background-color: #f4f9fa;
        /* background-color: #ffe2e2; */
    }

    .cross{
        text-align: right;
        margin:0; 
        font-size: 15px;
        color: red;
        font-weight: bold;
    }
</style>