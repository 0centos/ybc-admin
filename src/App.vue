<template>
  <div class="flex items-center justify-center h-screen">
    <div class="rounded w-96 h-auto p-5 bg-white">
      <h2 class="text-lg font-sans mb-4 text-center text-black">用户登录</h2>
      <el-form :model="formData" :rules="rules" label-position="top" ref="loginFormRef">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" />
        </el-form-item>

        <el-form-item label="密码:" prop="password">
          <el-input v-model="formData.password" type="password" placeholder="请输入密码" />
        </el-form-item>

        <div class="flex justify-center">
          <el-form-item>
            <el-button type="primary" @click="handleSubmit" id="loginBtn">登录</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-alert v-if="errorMessage" title="错误" type="error" id="errorMsg">{{
        errorMessage
      }}</el-alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import md5 from 'md5'
import Axios from './services/useaxios'
import { useRouter } from 'vue-router'

// 定义表单数据
const formData = ref({
  username: '',
  password: ''
})

// 错误信息状态
const errorMessage = ref('')

// 获取路由实例
const router = useRouter()

// 定义表单验证规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
// 提交处理逻辑
const handleSubmit = () => {
  const encryptedPassword = md5(formData.value.password) // 对密码进行 MD5 加密
  const params = {
    username: formData.value.username,
    password: encryptedPassword // 使用加密后的密码
  }

  // 发送 POST 请求
  Axios.post('/api/login', params) // 直接在请求体中发送 JSON 数据
    .then((response) => {
      const token = response.data.token // 获取 JWT
      localStorage.setItem('token', token) // 保存 token
      console.log('登陆成功')
      // 登录成功，跳转到首页
      router.push('/home')
    })
    .catch((error) => {
      // 登录失败，显示错误提示
      errorMessage.value = '登录失败，请检查用户名和密码' // 更新错误信息
    })
}
</script>

<style scoped>
/* 可以添加自定义样式 */
</style>
