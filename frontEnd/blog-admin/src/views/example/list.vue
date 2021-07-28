<template>
  <div class="app-container">
    <el-table v-loading="listLoading" script :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column label="标题" prop="title" />
      <el-table-column align="center" label="作者">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="artcle_describe" />
      <el-table-column label="分类" prop="classify_name" />
      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ new Date(scope.row.create_time) | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="更新时间">
        <template slot-scope="scope">
          <span>{{ new Date(scope.row.modify_time?scope.row.modify_time:scope.row.create_time) | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="状态">
        <template slot-scope="{row}">
          <span v-if="row.artcle_status ==10">未发布</span>
          <span v-if="row.artcle_status ==20">已发布</span>
          <span v-if="row.artcle_status ==30">已关闭</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="$router.push('/example/edit/'+scope.row.id)" />
          <el-button type="primary" size="small" icon="el-icon-delete" @click="removeArtcle(scope.row.id)" />
          <el-button v-if="scope.row.artcle_status !=20" type="primary" size="small" @click="issue(scope.row.id)"> 发布</el-button>
          <el-button v-if="scope.row.artcle_status ==20" type="primary" size="small" @click="unissueArtcle(scope.row.id)"> 取消</el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { listArtcle, removeArtcle, issueArtcle, unissueArtcle } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    unissueArtcle(id) {
      this.$confirm('此操作将取消发布该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        unissueArtcle({ id: id }).then(response => {
          console.log(response)
          this.getList()
          this.$message({
            type: 'success',
            message: '取消成功!'
          })
        })
      }).finally(() => {
        this.listLoading = false
      })
    },
    issue(id) {
      this.$confirm('此操作将发布该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        issueArtcle({ id: id }).then(response => {
          console.log(response)
          this.getList()
          this.$message({
            type: 'success',
            message: '发布成功!'
          })
        })
      }).finally(() => {
        this.listLoading = false
      })
    },
    getList() {
      this.listLoading = true
      listArtcle(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    removeArtcle(id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        removeArtcle({ id: id }).then(response => {
          console.log(response)
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).finally(() => {
        this.listLoading = false
      })
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
