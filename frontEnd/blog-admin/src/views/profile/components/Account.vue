<template>
  <el-form>
    <el-form-item label="Name">
      <el-input v-model.trim="myUser.name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="myUser.email" />
    </el-form-item>
    <el-upload
      action="/api/file/uploadFile"
      :file-list="fileList"
      list-type="picture-card"
      :on-success="handleImageSuccess"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <br>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUser } from '@/api/sys'
import { getToken } from '@/utils/auth'

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  data() {
    return {
      headers: {
        Authorization: getToken()
      },
      tempUrl: '',
      myUser: JSON.parse(JSON.stringify(this.user)),
      fileList: []
    }
  },
  mounted() {
    if (this.user.image) {
      this.fileList = [{ url: this.user.image, name: 'user' }]
    }
  },
  methods: {
    handlePictureCardPreview() {
    },
    handleRemove() {

    },
    handleImageSuccess(file) {
      file.url = file.data.path
      this.myUser.image = '/' + file.data.path
    },
    submit() {
      this.listLoading = true
      updateUser(this.myUser).then(response => {
        console.log(response)
        // this.$refs[formName].resetFields()
        this.$message({
          message: 'User information has been updated successfully',
          type: 'success',
          duration: 5 * 1000
        })
        this.$store.dispatch('user/getInfo')
      }).finally(() => {
        this.listLoading = false
      })
    }
  }
}
</script>
