<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" size="small" @click="dialogVisible = true">新增</el-button>
    </el-row>
    <br>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150" label="用户名" prop="user_name" />
      <el-table-column label="角色" width="120" prop="roles" />
      <el-table-column label="头像" prop="image" />
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ new Date(scope.row.create_time) | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间">
        <template slot-scope="scope">
          <span>{{ new Date(scope.row.update_time) | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" />
          <el-button type="primary" size="small" icon="el-icon-delete" @click="userRemove(scope.row.id)" />
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
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="form.user_name" clearable />
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <!-- <el-input v-model="form.roles" /> -->
          <el-select v-model="form.roles" clearable style="width:100%">
            <el-option v-for="(item,index) in rolesArry" :key="index" :value="item" :label="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="pass_word">
          <el-input v-model="form.pass_word" type="password" clearable />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="postClassify('form') ">确 定</el-button>
      </span>
    </el-dialog>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
import { userList, userRemove, saveUser } from '@/api/sys'
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
      dialogVisible: false,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 20
      },
      rolesArry: [
        'admin',
        'editor',
        'customer'
      ],
      form: {
        user_name: '',
        roles: '',
        pass_word: ''
      },
      rules: {
        user_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        roles: [
          { required: true, message: '请输入角色', trigger: 'blur' }
        ],
        pass_word: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    postClassify(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.listLoading = true
          saveUser(this.form).then(response => {
            console.log(response)
            this.getList()
            this.$refs[formName].resetFields()
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
    handleClose() {
      this.dialogVisible = false
    },
    getList() {
      this.listLoading = true
      userList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    userRemove(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        userRemove({ id: id }).then(response => {
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
