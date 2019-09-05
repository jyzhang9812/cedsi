<template>
    <div class="quote_container">
        <app-header :quoteCount = "quotes.length" :maxQuotes='maxQuotes'></app-header>
        <app-new-quote @quoteAdded="newQuote"></app-new-quote>
        <app-quote-grid :quotes="quotes" @quoteDeleted="deleteQuote"></app-quote-grid>
        <div class="quote_row">
          <div class="col-sm-12 text-center">
            <div class="alert alert-info">点击卡片查看具体问题及回复~</div>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import QuoteGrid from './quoteGrid.vue';
  import NewQuote from './newQuote.vue';
  import Header from './quoteHeader.vue';
  
  export default {
    data: function(){
      return {
        quotes:[
          'Just a Quote to see something'
        ],
        maxQuotes: 20
      }
    },
    methods:{
      newQuote(quote){
        if(this.quotes.length >= this.maxQuotes){
          return alert('please delete Quotes first!');
        }
        this.quotes.push(quote);
      },
      deleteQuote(index){
        this.quotes.splice(index,1);
      }
    },
    components:{
      appQuoteGrid: QuoteGrid,
      appNewQuote: NewQuote,
      appHeader:Header
    }
  }
  </script>

  <style scoped>
    .quote_container{
      width: 100%;
      min-height: 100%;
    }
    .quote_row{
      width: 100%;
    }
  </style>
  