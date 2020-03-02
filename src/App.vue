<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" v-model="inputValue"   @change="changeValue"></a-input>
    <a-button type="primary" @click="add" @keyup.enter="add">添加事项</a-button>
    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-checkbox :checked="item.done" @click="changeState($event,item.id)">{{item.info}}</a-checkbox>
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <span>{{undoneList}}条剩余</span>
        <a-button-group>
          <a-button :type="viewKey==='all'?'primary':'default'" @click="changeView('all')">全部</a-button>
          <a-button :type="viewKey==='done'?'primary':'default'"  @click="changeView('done')">已完成</a-button>
          <a-button :type="viewKey==='undone'?'primary':'default'"  @click="changeView('undone')">未完成</a-button>
        </a-button-group>
        <a @click="clearALL">清除已完成的</a>
      </div>
    </a-list>
  </div>
</template>
<script>
import {mapState,mapMutations,mapGetters} from 'vuex'
export default {
  name:'todo',
  data(){
    return{
      
    }
  },
  created(){
    // dispatch触发store中actions中方法
    this.$store.dispatch('getList')
  },
  computed:{
    ...mapState(['viewKey','inputValue']),
    ...mapGetters(['undoneList','infoList'])
  },
  methods:{
    ...mapMutations(['clearALL']),
    changeValue(e){
      this.$store.commit('changeInputVal',e.target.value)
    },
    add(){
      if(this.inputValue.trim().length<=0) {
        return this.$message.warning("添加任务不能为空")
      }
      this.$store.commit('addItem')
    },
    changeState(e,id){
      // console.log(e.target.checked)
      let obj ={
        id,
        status:e.target.checked
      }
      // commit只能传递一个参数，写一个对象
      this.$store.commit('changeInputState',obj)
     
    },
    // 根据id删除
    removeItemById(id){
      this.$store.commit('removeItem',id)
    },
    //改变footer下对应的状态并保存在store中
    changeView(key){
      this.$store.commit('changeViewKey',key)
    }
  }

}
</script>

<style lang="less" scoped>
#app{
  padding: 10px;
  .my_ipt{
    width: 500px;
    margin-right: 10px;
  }
  .dt_list{
    width: 500px;
    margin-top: 10px;

  }
  .footer{
    display: flex;
    justify-content: space-between;
    align-items: center
  }
}

</style>
