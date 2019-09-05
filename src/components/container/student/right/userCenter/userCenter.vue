<template>
    <div id='userCenter' class="container-fluid bcg"
        :style="{backgroundImage:'url('+require('../../../../../../static/images/auth/bg-01.jpg')+')'}">
        <div class="menu">
            <button @click="tab(index)" v-for="(item,index) in items" class="tag"
                :class="{active : index===curId}">{{item.item}}</button>
        </div>
        <div class="row" style="margin-top: 10px">
            <updateUser v-if="0===curId"></updateUser>
            <payment v-if="1===curId"></payment>
        </div>
    </div>
</template>

<script>
    import updateUser from './updateUser.vue'
    import payment from './payment.vue'
    export default {
        name: 'userCenter',
        components: {
            updateUser,
            payment
        },
        data() {
            return {
                curId: 0,
                items: [{ item: '个人资料' }, { item: '我的订单' }],
            }
        },
        methods: {
            tab(index) {
                this.curId = index;
            },
        }
    }
</script>

<style scoped>
    #userCenter .menu {
        height: auto;
        padding-top: 10px;
        padding-right: 40px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: left;
    }

    .bcg {
        width: 100%;
        min-height: 100vh;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        position: relative;
        z-index: 1;
    }

    .bcg::before {
        content: "";
        display: block;
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(255, 255, 255, 0.8);
    }

    #userCenter .tag {
        background-color: rgba(46, 51, 71, .5);
        display: inline-block;
        margin: 10px;
        padding: 7px 20px;
        color: #fff;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 600;
        border: none;
    }

    #userCenter .tag:hover,
    #userCenter button.active {
        background-color: #fff;
        color: #2e3347;
    }
</style>