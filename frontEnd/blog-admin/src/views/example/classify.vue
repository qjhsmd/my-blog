<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" size="small" @click="dialogVisible = true">新增</el-button>
    </el-row>
    <br>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 70%">
      <el-table-column align="center" label="分类名称" prop="classify_name" />
      <el-table-column label="分类id" prop="id" width="100" />
      <el-table-column label="父类id" prop="pid" width="130" />
      <el-table-column align="center" label="操作" width="130">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-delete" @click="removeClassify(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分类名称" prop="classify_name">
          <el-input v-model="form.classify_name" />
        </el-form-item>
        <el-form-item label="父类id" prop="pid">
          <el-input v-model="form.pid" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="postClassify('form') ">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
  </div>
</template>

<script>
import { listClassify, removeClassify, postClassify } from '@/api/article'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  // components: { Pagination },
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
      dialogVisible: false,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20
      },
      form: {
        classify_name: '',
        pid: ''
      },
      rules: {
        classify_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        pid: [
          { required: true, message: '请输入pid', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    getList() {
      this.listLoading = true
      listClassify(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
      })
    },
    postClassify(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.listLoading = true
          postClassify(this.form).then(response => {
            console.log(response)
            this.$refs[formName].resetFields()
            this.getList()
          }).finally(() => {
            this.listLoading = false
            this.dialogVisible = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    removeClassify(id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        removeClassify({ id: id }).then(response => {
          console.log(response)
          this.getList()
          this.listLoading = false
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
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
