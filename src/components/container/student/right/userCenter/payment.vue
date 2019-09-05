<template>
    <div id="payreceipt">
        <div class="payreceipt-card">
            <div class="card-title">
                <span>订单：{{orderNum}}</span>
            </div>
            <div class="card-content">
                <img src="https://www.tynker.com/image/course-card/vertical/minecraft-starter.png" class="card-img" />
                <div class="order-title">{{orderName}}</div>
                <div class="order-price">
                    实付金额:
                    <span>{{orderPrice}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                orderName: "玩转算法系列--图论精讲 面试升职必备（Java版）",
                orderPrice: "￥ 348.00",
                orderNum: "66666666666"
            }
        },
        methods: {
        }
    };
</script>

<style>
    #payreceipt {
        min-width: 1200px;
    }

    #payreceipt .payreceipt-card {
        height: auto;
        padding-bottom: 20px;
        width: 80%;
        margin: 0 auto;
        box-shadow: 0 8px 16px 0 rgba(7, 17, 27, 0.1);
        border-radius: 8px;
        background-color:rgba(255, 255, 255, 0.5);
    }

    #payreceipt .card-title {
        margin: 0 auto;
        width: 90%;
        padding: 40px 0;
        font-size: 16px;
        color: #07111b;
    }

    #payreceipt .card-content {
        margin: 0 auto;
        width: 90%;
        background-color: #fff;
        padding: 24px;
        height: 140px;
        margin-bottom: 20px;
    }

    #payreceipt .card-img {
        width: 160px;
        height: 90px;
        margin-right: 24px;
        float: left;
    }

    #payreceipt .order-title {
        float: left;
        font-size: 16px;
        width: 400px;
    }

    #payreceipt .order-price {
        display: inline-block;
        line-height: 95px;
        color: #93999f;
    }

    #payreceipt .order-price span {
        color: #f01414;
    }

</style>