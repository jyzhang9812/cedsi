<template>
  <div id="selectInput" @mouseover="clearIconShown" @mouseout="clearIconHidden">
    <div class="outside" :id="id"
         data-toggle="dropdown" aria-haspopup="true"
         aria-expanded="true" @click="startRotate">
      <label :for="id + 'text'"></label>
      <input type="text" class="inputBox" :placeholder="tips"
             :value="option"
             :id="id + 'text'">
      <img :src="menuIconSrc" alt=""
           :class="[rotate? 'afterRotate':'beforeRotate']"
           class="menu-icon" @click="clearOption">
    </div>
    <ul class="dropdown-menu" :aria-labelledby="id">
      <li v-for="item in dropDownList">
        <a href="#" @click="reportOption(item)">{{item.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "selectInput",
    props: {
      option: String,
      tips: String,
      dropDownList: Array,
      id: String
    },
    data() {
      return {
        rotate: false,
        deleteIcon: "../../../../../static/images/datepicker/delete.png",
        menudownIcon: "../../../../../static/images/selectInput/menudown.png",
        menuIconSrc: "../../../../../static/images/selectInput/menudown.png"
      }
    },
    methods: {
      startRotate() {
        if (this.menuIconSrc !== this.deleteIcon) {
          this.rotate = !this.rotate;
        }
      },
      reportOption(item) {
        this.startRotate();
        this.$emit('option', item, this.id)
      },
      clearIconShown() {
        if (this.option_copy !== "") {
          this.menuIconSrc = this.deleteIcon;
        }
      },
      clearIconHidden() {
        this.menuIconSrc = this.menudownIcon;
      },
      clearOption() {
        if (this.menuIconSrc === this.deleteIcon) {
          this.$emit('option', '', this.id);
          this.menuIconSrc = this.menudownIcon;
        }
      }
    },
    computed: {
      option_copy() {
        return this.option;
      }
    }
  }
</script>

<style scoped>

#selectInput{
    /* margin-left: 5px; */
    margin-right: 8px;
  }

  /* 此项真实有效，可能 IDE 不能识别VUE的动态 class 绑定*/
  #selectInput .beforeRotate {
    transition: all .3s;
  }

  /* 此项真实有效，可能 IDE 不能识别VUE的动态 class 绑定*/
  #selectInput .afterRotate {
    transform: rotate(-180deg);
    transition: all .3s;
  }

  #selectInput .outside {
    display: inline-block;
    width: 180px;
    height: 32px;
    border: 1px solid #409eff;
    cursor: pointer;
    border-radius: 5px;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
  }

  #selectInput .outside:hover {
    border-color: #c0c4cc;
  }

  #selectInput .inputBox {
    padding-left: 15px;
    padding-right: 30px;
    font-size: 12px;
    border: none;
    height: 30px;
    width: 150px;
    cursor: pointer;
  }

  #selectInput .inputBox:focus {
    outline: none;
  }

  #selectInput .menu-icon {
    display: inline-block;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }

</style>
