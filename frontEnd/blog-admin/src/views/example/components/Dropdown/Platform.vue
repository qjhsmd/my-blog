<template>
  <el-dropdown :hide-on-click="false" :show-timeout="100" trigger="click">
    <el-button plain>
      Platfroms({{ platforms.length }})
      <i class="el-icon-caret-bottom el-icon--right" />
    </el-button>
    <el-dropdown-menu slot="dropdown" class="no-border">
      <el-checkbox-group v-model="platforms" style="padding: 5px 15px;">
        <el-checkbox v-for="item in platformsOptions" :key="item.key" :label="item.key">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    value: {
      required: true,
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      platformsOptions: [
        { key: 'my-blog', name: 'my-blog' },
        { key: 'csdn', name: 'CSDN' }
      ]
    }
  },
  computed: {
    platforms: {
      get() {
        if (this.value.length > 0) {
          return JSON.parse(JSON.stringify(this.value))
        } else {
          return []
        }
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
