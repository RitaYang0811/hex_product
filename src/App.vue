<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import ProductsView from './views/ProductsView.vue'
import ProductsAdminViewVue from './views/ProductsAdminView.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header></Header>
  <main>
    <RouterView />
    <Footer></Footer>
  </main>
</template>

<style scoped>
main {
  /* background: grey; */
  position: relative;
  min-height: calc(100vh - 50px);
  padding-bottom: 50px;
}
</style>
