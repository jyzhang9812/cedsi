<template>
  <div id='setup' class="container-fluid"
    style="background: url('https://www.tynker.com/image/dashboard/student/public-profile/profile-hero-adventurer-01-08-2018.png'),linear-gradient(45deg,#2ad3b6 0%,#99f3b1 100%)">
    <div class="menu">
      <button @click="tab(index)" v-for="(item,index) in items" class="tag"
        :class="{active : index===curId}">{{item.item}}</button>
    </div>
    <div class="row" style="margin-top: 10px">
      <courseCard v-if="0===curId"></courseCard>
      <newclass v-if="1===curId"></newclass>
    </div>
  </div>
</template>

<script>
  import courseCard from '../course/courseCard.vue'
  import newclass from './new.vue'
  export default {
    name: 'class',
    components: {
      newclass,
      courseCard
    },
    data() {
      return {
        curId: 0,
        items: [{ item: '我的课程' }, { item: '我的班级' }],
      }
    },
    methods: {
      tab(index) {
        this.curId = index;
      },
    }
  }
</script>

<style>
  #setup .menu {
    height: auto;
    padding-top: 10px;
    padding-right: 40px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: left;
  }

  #setup .tag {
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

  #setup .tag:hover,
  #setup button.active {
    background-color: #fff;
    color: #2e3347;
  }
</style>