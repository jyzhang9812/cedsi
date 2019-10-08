<template>
    <div class="content">
        <section class="section-control homepage note">
            <div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="10000" data-warp="true"
                data-pause="true">
                <ol class="carousel-indicators">
                    <li data-target="#myCarousel" v-for="n in piclength" data-slide-to="{n}" class="{n==1?'active':''}"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="item" @click="gotoActivity(index)" v-for="(item,index) in slidePic" :class="[index==1?'active':'']">
                        <img :src="item.cover">
                        <div class=" carousel-caption">
                            <div class="zf-column col-md-6 ">
                                <h1>{{item.title}}</h1>
                                <h2>{{item.subtitle}}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 左右切换按钮 -->
                <a href="#myCarousel" class="left carousel-control" role="button" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                </a>
                <a href="#myCarousel" class="right carousel-control" role="button" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                </a>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'SlidePic',
        data() {
            return {
                piclength:0,
            }
        },
        methods: {
            gotoActivity(index) {
                console.log(this.slidePic[index])
                this.$router.push({ path: '/activitydetailCard', query: { id: this.slidePic[index].id } })
            },
        },
        created: function () {
            this.$store.dispatch('getActivity').then(()=>{
                this.piclength = this.slidePic.length
            })
        },
        computed: {
            ...mapState({
                slidePic: state => state.slidePic,
            }),
        },
    }
</script>


<style scoped>
    div {
        margin: 0;
        padding: 0;
        height: 500px;
    }

    content {
        transform: none;
        transition: transform .5s ease;
        backface-visibility: hidden;
    }

    *,
    :after,
    :before {
        box-sizing: inherit;
    }

    .section-control {
        margin: 0 auto;
        position: relative;
        overflow: hidden;
        padding-bottom: 0;
        max-width: 1800px;
        font-weight: 400;
    }

    @media (min-width: 64em) {
        .section-control {
            text-align: left;
        }
    }

    img {
        background-repeat: no-repeat;
        height: 100%;
        width: 100%;
    }

    .carousel-control.left {
        background-image: none;
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1)
    }

    .carousel-control.right {
        left: auto;
        right: 0;
        background-image: none;
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1)
    }

    @media screen and (min-width: 75em) {
        .homepage .zf-row {
            min-height: 28vw;
            max-height: 33rem;
            margin-bottom: 0;
            margin-top: 4rem;
            margin-left: 100px;
            position: relative;
            text-align: left;
        }
    }

    @media screen and (min-width: 75em) {
        .col-md-6 {
            margin-left: 2rem;
            float: left;
            margin-top: 100px;
        }
    }

    @media screen and (min-width: 64em) {
        .col-md-6 {
            max-width: none;
            font-size: 1.1rem;
            text-align: left;
            width: 50%;
        }
    }

    @media screen and (min-width: 40em) {
        .zf-column {
            padding-right: .9375rem;
            padding-left: .9375rem;
        }
    }

    @media (min-width: 40em) {
        .col-md-6 h1 {
            font-size: 3.0rem;
            font-family: Roboto Slab, Open Sans, Helvetica, Arial, sans-serif;
            font-weight: 400;
            line-height: 1.3;
            padding-bottom: 10px;
            margin-top: 10px;
            margin-left: 100px;
            margin-bottom: .5rem;
            font-style: normal;
            text-rendering: optimizeLegibility;
        }
    }

    .col-md-6 h2 {
        font-family: Open Sans, Helvetica, Arial, sans-serif;
        font-size: 20px;
        line-height: 1.5;
        font-weight: 400;
        padding-bottom: 0 !important;
        margin-bottom: 2rem;
        font-style: normal;
        text-rendering: optimizeLegibility;
    }

    @media (min-width: 75em) {
        .zf-row .zf-column .zf-row {
            margin-right: -.9375rem;
            margin-left: -.9375rem;
        }
    }

    @media print,
    screen and (min-width: 64em) {
        .col-md-6 {
            width: 100%;
            margin-left: 50px;
        }
    }

    .pay {
        color: #fff;
        font-size: 18px;
        line-height: 1;
        font-family: Open Sans, Helvetica, Arial, sans-serif;
        text-rendering: optimizeLegibility;
        margin-top: 30px;
    }

    a {
        text-decoration: none;
    }
</style>