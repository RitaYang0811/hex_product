<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <div class="navbar-nav">
          <RouterLink to="/" class="nav-link hover-under-link">Home</RouterLink>

          <RouterLink to="/products" class="nav-link hover-under-link">Products</RouterLink>

          <RouterLink to="/products-admin" class="nav-link hover-under-link">Admin</RouterLink>
        </div>
        <button class="btn btn-outline-success" type="button" @click="toLoginPage">Login</button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="js" name="Header">
import LoginView from '@/views/LoginView.vue'
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()

function toLoginPage() {
  router.push({
    path: '/login',
    name: 'login',
    component: LoginView
  })
}
</script>

<style></style>
