<template>
  <div
    id="delProductModal"
    ref="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ productInfo.title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="emitDelProduct('del-product', productInfo.id)"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="DeleteModel">
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { ref, defineProps, onMounted } from 'vue'
defineProps(['product-info'])
const emitDelProduct = defineEmits(['del-product'])
const delModal = ref('')

onMounted(() => {
  delModal.value = new bootstrap.Modal('#delProductModal', { keyboard: false, backdrop: 'static' })
})

function openModal() {
  delModal.value.show()
}
function hideModal() {
  delModal.value.hide()
}

defineExpose({
  openModal,
  hideModal
})
</script>

<style></style>
