<template>
  <div class="container p-4">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal text-center">請先登入</h1>
      <div class="col-8">
        <form id="form" class="form-signin">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
              v-model="user.username"
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
              v-model="user.password"
            />
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit" @click.prevent="login">
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="js" name="Login">
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const user = reactive({
  username: '',
  password: ''
})
const router = useRouter()
function directToHome() {
  router.push('/')
}
function login() {
  // 執行登入邏輯
  axios
    .post('https://vue3-course-api.hexschool.io/v2//admin/signin', user)
    .then((res) => {
      // 成功登入
      console.log(res)
      // 將 token 存入 cookie 中
      const { token, expired } = res.data
      document.cookie = `cd131423token=${token};expires=${new Date(expired)}`
      directToHome()
    })
    .catch((err) => {
      console.log(err.data)
    })
}
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
