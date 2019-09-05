<template>
  <div id="videos">
    <span>课程视频管理</span>
    <div class="outside">
      <table class="table table-hover">
        <thead>
        <tr>
          <th v-for="(th, index) in tableTitle" :key="index" class="title">{{th}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(line, seq) in currentList" :key="seq" class="content">
          <td :style="{'width': tableWidth[0] + 'px'}">{{seq + 1}}</td>
          <td v-for="(item, index) in line"
              :key="index"
              :style="{'width': tableWidth[index + 1] + 'px'}">
            {{item}}
          </td>
          <td>
            <span class="operation" @click="popModal('view')">预览</span>
            <span class="operation" @click="popModal('choose')">选择题目</span>
            <span class="operation" @click="popModal('insert')">插入题目</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>
      <pagination :num="videoData.length"
                  @getNew="changeTablePages"
                  :limit="limit">
      </pagination>
    </div>
  </div>
</template>

<script>
  import Pagination from "../utils/pagination";

  export default {
    name: "videos",
    components: {Pagination},
    data() {
      return {
        limit: 10,
        videoData: [
          [
            "Scratch入门课 | 第1节课 | 大炮打僵尸--僵尸移动",
            "本节课主要是控制一个僵尸进行移动，其中会学到【移动10步】、【面向90度】、【移到x：0 y：0】、【重复执行10】、【等待1秒】和【下一个造型】等6个程序模块。通过这6个程序模块的组合使用，模拟单个僵尸入侵我们的小木屋的过程。",
            "2019-01-10 13:42:46",
            "超级管理员"
          ],
          [
            "Scratch入门课 | 第2节课 | 大炮打僵尸--成群僵尸",
            "上一节课，我们学到了单个小僵尸入侵我们的小木屋，本节课我们来实现成群的僵尸入侵我们的小木屋。期间我们会复习旧知识，并且学习【当我被克隆】、【克隆一个】、【如果…那么… ]、【重复执行】、【碰到】和【停止全部】等新知识。",
            "2019-01-10 13:43:11",
            "超级管理员"
          ],
          [
            "Scratch入门课 | 第3课 | 大炮打僵尸--发射炮弹",
            "前面的课程一直是僵尸来入侵我们的小木屋，我们只能眼睁睁看着，显得非常无力。本节课我们终于能够进行反击了，而且是大炮！我们利用前面所学知识，实现炮弹的不断发射。虽然没有增加新模块的学习，但是温故而知新，只有学会的知识才是自己的！",
            "2019-01-10 13:43:48",
            "超级管理员"
          ],
          [
            "Scratch入门课 | 第4节课 | 大炮打僵尸--控制炮台",
            "前面的课程一直是僵尸来入侵我们的小木屋，我们只能眼睁睁看着，显得非常无力。本节课我们终于能够进行反击了，而且是大炮！我们利用前面所学知识，实现炮弹的不断发射。虽然没有增加新模块的学习，但是温故而知新，只有学会的知识才是自己的！",
            "2019-01-10 13:43:48",
            "超级管理员"
          ],
          [
            "Scratch入门课 | 第5节课 | 大炮打僵尸--毕业设计",
            "经过前面的学习，我们已经成功掌握了基本的软件使用方法，和简单的游戏小制作。我们何不成热打铁，小试牛刀一番。最好的学习方式是记忆+练习+拓展。前面的学习，我们已经做到了记忆+练习，本节课就开始你的拓展之旅吧",
            "2019-01-10 13:45:13",
            "超级管理员"
          ]
        ],
        tableTitle: [
          "序号",
          "课程名称",
          "操作说明",
          "上传时间",
          "创建人",
          "操作"
        ],
        tableWidth: [48, 290, 300, 210, 210, 180],
        currentList: []
      }
    },
    methods: {
      popModal(option) {
        console.log(option);
        if (option === "view") {
          // 预览
        } else if (option === "choose") {
          // 选择题目
        } else if (option === "insert") {
          // 插入题目
        }
      },
      changeTablePages(value) {
        this.currentList = this.videoData.slice(value, value + this.limit);
      }
    },
    mounted() {
      this.changeTablePages(0);
    }
  }
</script>

<style scoped>
  #videos {
    font-size: 12px;
    color: #606266;
  }

  #videos .title {
    text-align: center;
  }

  #videos .content td {
    line-height: 23px;
  }

  #videos table tr {
    text-align: center !important;
  }

  #videos table td {
    vertical-align: middle !important;
  }

  #videos .outside {
    margin-top: 20px;
  }

  #videos .operation {
    color: #409eff;
    margin: 0 3px;
    cursor: pointer;
  }
</style>
