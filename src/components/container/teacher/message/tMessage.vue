<template>
  <div id="tMessage">
    <div class="message">我的消息</div>
    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
      <div v-for="(card,index) in cards" :key="index" class="panel panel-default">
        <div class="panel-heading" role="tab" id="headingOne">
          <h4 class="panel-title">
            <div role="button" data-toggle="collapse" data-parent="#accordion" :href="card.href" aria-expanded="true"
              aria-controls="collapseOne">
              {{card.title}}
              <span> {{card.date}} </span>
            </div>
          </h4>
        </div>
        <div :id="card.id" class="panel-collapse collapse " role="tabpanel" aria-labelledby="headingOne">
          <div class="panel-body">
            {{card.content}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import instance from "../../../../axios-auth.js";

  export default {
    name: 'message',
    components: { pagination },
    data() {
      return { limit: 10, cards: [] }
    },
    methods: {
      getNew(value) {
        var currentPage = value / this.limit;
        this.currentPage = currentPage;
        this.$store.commit("changeMsgCurrentList", this.currentPage * this.limit)
      },
      pullMessageList() {
        let config = { headers: { Authorization: localStorage.getItem('idToken') } };
        return new Promise((resolve, reject) => {
          instance.get("/teacher/message", config)
            .then(res => { resolve(res) })
            .catch(err => { reject(err) });
        });
      }
    },
    created: function () {
      this.pullMessageList()
        .then(res => {
          res.data.forEach((item, index) => {
            this.cards.push({
              date: item.TIME,
              content: item.CONTENT,
              messageId: item.MESSAGE_ID,
              title: item.TITLE,
              type: item.MESSAGE_TYPE,
              status: item.MESSAGE_STATUS,
              id: "collapse" + String(index),
              href: "#collapse" + String(index)
            });
          });
        })
        .catch(err => { console.log(err) });
    }
  }
</script>



<style scoped>
  #tMessage {
    font-size: 12px;
    color: #606266;
  }

  #tMessage .message {
    padding-bottom: 15px;
  }

  #tMessage .panel-default {
    margin-right: 5%;
  }

  #tMessage .panel-heading {
    padding: 20px;
  }

  #tMessage .panel-body {
    color: #9a9a9a;
    padding: 20px;
  }

  #tMessage span {
    float: right;
  }
</style>