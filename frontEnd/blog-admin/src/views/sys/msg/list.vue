<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" size="small" @click="socketButton">新增</el-button>
    </el-row>
    <br>
    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" /> -->
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'Msg',
  sockets: { // 通过vue实例对象sockets实现组件中的事件监听
    connect: function() { // socket的connect事件
      console.log('socket connected from Page 哈哈哈哈')
    },
    events(data) { // 后端按主题名推送的消息数据
      console.log('Page：' + data)
    }
  },
  // components: { Pagination },

  data() {
    return {
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    socketButton() {
      console.log('就这？')
      this.$socket.emit('events', '我们来嘿嘿嘿')// 在页面加载时发起订阅，“STREAM_STATUS”是你跟后端约定好的主题名
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
