<template>
    <div class="row">
        <div class="aside">
            <ul class="menu">
                <li v-for="item in aside" class="bg-hover" :key="item.name">
                    <div class="item-name" @click="dropDownListListener(item)">
                        <!-- <i><img :alt="item.name" :src="item.iconSrc" class="aside-icon"></i> -->
                        <i class='fa fa-lg' style='color: #fff' :class="item.icon" aria-hidden="true"></i>
                        <span>{{item.name}}</span>
                        <span class="menuPosition" :class="{'glyphicon glyphicon-menu-down':item.close,
                      'glyphicon glyphicon-menu-up':!item.close}" v-show="item.children.length !== 0">
                        </span>
                    </div>
                    <div :class="{'collapse': item.close}">
                        <ul class="menu nav">
                            <li v-for="child in item.children" class="children" @click="$router.push(child.route)"
                                :key="child.name">
                                {{child.name}}
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <div class="sonContainer">
            <router-view></router-view>
        </div>
    </div>

</template>

<script>
    export default {
        name: "asiders",
        props:{
            allside:Array
        },
        data() {
            return {
                aside:this.allside
            }
        },
        methods: {
            dropDownListListener(item) {
                if (item.children.length === 0) {
                    this.$router.push(item.route);
                } else {
                    item.close = !item.close;
                }
            }
        },
        created: function () {
            console.log(this.aside),
            this.width = document.documentElement.clientWidth,
                this.screenWidth = 'min-width:' + (this.width - 320) + 'px;'
        }
    }
</script>

<style  scoped>
@import "../../../static/css/sidebar.css"
    /* .row {
          margin: 0 !important;
          width: 100%;
          display: flex;
        }
      
        .menu {
          list-style: none;
          padding-inline-start: 0;
          margin-block-start: 0;
          margin-block-end: 0;
        }
      
        .menuPosition {
          float: right;
          padding: 20px 20px 0 0;
        }
      
        .aside {
          color: #FFF;
          background-color: #3766A6;
          width: 220px;
          min-width: 170px;
        }
      
        .item-name {
          height: 50px;
          line-height: 50px;
          padding-left: 28px;
        }
      
        .item-name:hover {
          background-color: #2C5285;
        }
      
        .children {
          height: 50px;
          line-height: 50px;
          padding-left: 49px;
        }
      
        .children:hover {
          background-color: #2C5285;
        }
      
        .sonContainer {
          right: 0;
          bottom: 0;
          top: 56px;
          flex-grow: 1;
          min-width: 800px;
        }
        .aside-icon {
          width: 18px;
          height: 18px;
        } */
</style>