<template>
    <div class="row">
        <form class="form">
            <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
                <label>问题</label>
                <textarea class="form-control" rows="3" v-model="quote"></textarea>
            </div>
            <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group">
                <button class="btn btn-primary" @click.prevent="createNew">提问</button>
            </div>
        </form>

    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                quote: ''
            }
        },
        methods: {
            createNew() {
                this.$emit('quoteAdded', this.quote);
                this.quote = '';
            }
        }
    }
</script>

<style>
    .form{
        width: 100%;
    }
</style>