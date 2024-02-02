<template>
  <!-- new/edit Modal -->
  <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="h4 form-label">主要圖片</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入主要圖片連結"
                    v-model="productInfo.imageUrl"
                  />
                  <img class="img-fluid" :src="productInfo.imageUrl" alt="" />
                </div>
              </div>
              <!-- 多圖區域 -->
              <h4 for="imageUrl" class="form-label">詳細圖片</h4>
              <div v-if="Array.isArray(productInfo.imagesUrl)">
                <div v-for="(img, key) in productInfo.imagesUrl" :key="key + 123">
                  <img :src="img" alt="" class="img-fluid" />
                  <label for="imageUrl" class="form-label">圖片網址</label>
                  <input
                    type="text"
                    class="form-control mb-3"
                    placeholder="請輸入圖片連結"
                    v-model="productInfo.imagesUrl[key]"
                  />
                </div>

                <div>
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    v-if="
                      productInfo.imagesUrl.length === 0 ||
                      productInfo.imagesUrl[productInfo.imagesUrl.length - 1]
                    "
                    @click="productInfo.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>

                  <button
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="productInfo.imagesUrl.pop('')"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
            </div>

            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="productInfo.title"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="productInfo.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="productInfo.unit"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model="productInfo.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model="productInfo.price"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="productInfo.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="productInfo.content"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    v-model="productInfo.is_enabled"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="emitConfirmUpdate('confirm-update', isNew)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="ProductModal">
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { ref, defineProps, onMounted } from 'vue'
defineProps(['product-info', 'is-new'])
const emitConfirmUpdate = defineEmits(['confirm-update'])
const pModal = ref('')

onMounted(() => {
  pModal.value = new bootstrap.Modal('#productModal', { keyboard: false, backdrop: 'static' })
})
function openModal() {
  pModal.value.show()
}
function hideModal() {
  pModal.value.hide()
}
// function createImage() {
//   productInfo.imagesUrl.push('')
// }
defineExpose({
  openModal,
  hideModal
})
</script>

<style></style>
