<template>
  <nav aria-label="Page navigation example" class="container">
    <button>點我</button>
    {{ pages }}
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: pages.current_page === 1 }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="getProducts(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li
        class="page-item active"
        v-for="(page, index) in pages.total_pages"
        :key="index"
        :class="{ active: page === pages.current_page }"
      >
        <a class="page-link" href="#" @click.prevent="getProducts(page)">{{ page }}</a>
      </li>

      <li class="page-item" :class="{ disabled: pages.has_next === false }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="getProducts(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup name="Pagination">
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { toRefs, defineProps, onMounted } from 'vue'
const pagination = defineProps(['pages'])
let { pages } = toRefs(pagination)
onMounted(() => {
  console.log(pages)
})
</script>

<style></style>
