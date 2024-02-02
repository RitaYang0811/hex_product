<template>
  <div>
    <div class="container">
      <div class="text-end mt-4">
        <button class="btn btn-primary" data-bs-toggle="modal" @click="openModal('new')">
          建立新的產品
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">分類</th>
            <th>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="100">是否啟用</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in products" :key="item.id">
            <tr>
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td class="text-end">{{ item.price }}</td>
              <td class="text-end">{{ item.origin_price }}</td>
              <td>
                <span v-if="item.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    data-bs-toggle="modal"
                    @click="openModal('edit', item)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    data-bs-toggle="modal"
                    @click="openModal('delete', item)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <!-- add / edit Modal -->
    <!-- <div
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
                      @click="createImage"
                    >
                      新增圖片
                    </button>

                    <button
                      class="btn btn-outline-danger btn-sm d-block w-100"
                      v-else
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
              @click="confirmUpdate(isNew, productInfo)"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div> -->
    <DeleteModel :product-info="productInfo" @del-product="delProduct" ref="dModal"></DeleteModel>
    <ProductModal
      :product-info="productInfo"
      :is-new="isNew"
      @confirm-update="confirmUpdate"
      ref="pModal"
    ></ProductModal>

    <Pagination :pages="pagination" @send-page="savePage"></Pagination>
  </div>
</template>

<script setup lang="js" name="ProductsAdminView">
import { ref, onMounted } from 'vue'
import { nanoid } from 'nanoid'
import axios from 'axios'
import { useRouter } from 'vue-router'
import ProductModal from '../components/ProductModal.vue'
import DeleteModel from '../components/DeleteModel.vue'
import Pagination from '../components/Pagination.vue'
//數據
const router = useRouter()
const token = ref('')
const products = ref([])
const pagination = ref({})
const productInfo = ref({
  imagesUrl: []
})
const isNew = ref('')
const page = ref(1)
let pModal = ref()
let dModal = ref()
//鉤子
onMounted(() => {
  token.value = document.cookie.replace(
    /(?:(?:^|.*;\s*)cd131423token\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
  axios.defaults.headers.common['Authorization'] = token.value
  checkLogin()
  // console.log(token)
})

//方法
function checkLogin() {
  axios
    .post(`https://vue3-course-api.hexschool.io/v2/api/user/check`)
    .then(() => {
      getProducts()
    })
    .catch((err) => {
      console.log(err)
      router.push({ name: 'login' })
    })
}
function getProducts(page) {
  axios
    .get(`https://ec-course-api.hexschool.io/v2/api/cd131423/admin/products?page=${page}`)
    .then((res) => {
      console.log(res)
      products.value = res.data.products
      pagination.value = { ...res.data.pagination }
      // console.log('傳送頁面', page)
      console.log('products裡的內容', products.value)
      console.log('productInfo裡的內容', productInfo)
    })
    .catch((err) => {
      console.log(err.data)
    })
}
function savePage(currentPage) {
  page.value = currentPage
  console.log('點擊頁', page.value)
  getProducts(page.value)
}

function openModal(status, item) {
  if (status === 'new') {
    productInfo.value = { imagesUrl: [] }
    isNew.value = true
    pModal.value.openModal()
  } else if (status === 'edit') {
    console.log('編輯帶入的item', item)
    productInfo.value = { ...item, imagesUrl: item.imagesUrl || [] }
    isNew.value = false
    console.log('編輯的productInfo', productInfo)
    pModal.value.openModal()
  } else if (status === 'delete') {
    productInfo.value = { ...item }
    dModal.value.openModal()
  }
}

function confirmUpdate(isNew) {
  let apiUrl = 'https://ec-course-api.hexschool.io/v2/api/cd131423/admin/product'
  let apiMethod = 'post'
  if (isNew === true) {
    const ID = nanoid()
    productInfo.value.id = ID
  } else if (isNew === false) {
    apiUrl = `https://ec-course-api.hexschool.io/v2/api/cd131423/admin/product/${productInfo.value.id}`
    apiMethod = 'put'
  }
  axios[apiMethod](apiUrl, { data: productInfo.value })
    .then((res) => {
      console.log(res.data)
      pModal.value.hideModal()
      getProducts()
    })
    .catch((err) => {
      console.log(err.data)
    })
}
function delProduct(id) {
  axios
    .delete(`https://ec-course-api.hexschool.io/v2/api/cd131423/admin/product/${id}`)
    .then((res) => {
      console.log(res.data)
      dModal.value.hideModal()
      getProducts()
    })
    .catch((err) => {
      console.log(err.data)
    })
}
</script>

<style></style>
