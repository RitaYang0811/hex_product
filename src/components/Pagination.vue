<template>
  <nav aria-label="Page navigation example" class="container">
    <br />

    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: pages.current_page === 1 }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="emitPage('send-page', pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li
        class="page-item"
        v-for="(page, index) in pages.total_pages"
        :key="index"
        :class="{ active: page === pages.current_page }"
      >
        <a class="page-link" href="#" @click.prevent="emitPage('send-page', page)">{{ page }}</a>
      </li>

      <li class="page-item" :class="{ disabled: pages.has_next === false }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="emitPage('send-page', pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup name="Pagination">
import { toRefs, defineProps, onMounted } from 'vue'

const { pages } = defineProps(['pages'])
const emitPage = defineEmits(['send-page'])
</script>

<style></style>
