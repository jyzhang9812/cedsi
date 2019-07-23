<template>
    <div class="row">
        <div class="col-sm-12">
                <h3 class="quote_header">Question Added</h3>
                <div class="progress">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" aria-valuenow="60" 
                        aria-valuemin="0" aria-valuemax="100" :style="{width:(quoteCount/maxQuotes) * 100+'%'}">
                            {{quoteCount}} / {{maxQuotes}}
                        </div>
                    </div>
                </div>
        </div>
        
    </div>
</template>

<script>
    export default{
        props:['quoteCount','maxQuotes']
    }
</script>

<style>
    .quote_header{
        margin: 0;
        padding: 20px 0 10px 50px;
        background-color: #00bcd4;
        color: #fff;
        /* color: #ff8d1a; */
    }
</style>