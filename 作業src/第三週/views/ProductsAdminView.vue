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
          <template v-for="item in products.value" :key="item.id">
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
                    @click="openModal('edit', item, item.id)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    data-bs-toggle="modal"
                    @click="openModal('delete', item, item.id)"
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
              <span>新增產品</span>
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
                    <label for="imageUrl" class="form-label">輸入圖片網址</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                      v-model="productInfo.imageUrl"
                    />
                  </div>

                  <img class="img-fluid" src="" alt="" />
                </div>
                <div>
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="uploadPicture(pic)"
                  >
                    新增圖片
                  </button>
                </div>
                <div>
                  <button class="btn btn-outline-danger btn-sm d-block w-100">刪除圖片</button>
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
              @click="confirmUpdate(isNew, productInfo, id)"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- delete Modal -->
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
            <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="delProduct(id)">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    <Pagination :pages="pagination"></Pagination>
  </div>
</template>

<script setup lang="js" name="ProductsAdminView">
import { ref, reactive, onMounted } from 'vue'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { nanoid } from 'nanoid'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Pagination from '../components/Pagination.vue'
//數據
const router = useRouter()
const myModal = ref('')
const delModal = ref('')
const token = ref('')
const products = reactive([])
const pagination = reactive({})
const productInfo = reactive({
  category: '',
  content: '',
  description: '',
  id: '',
  imageUrl: '',
  imagesUrl: [],
  is_enabled: '',
  num: '',
  origin_price: '',
  price: '',
  title: '',
  unit: ''
})
const id = ref('')
const isNew = ref('')

//鉤子
onMounted(() => {
  token.value = document.cookie.replace(
    /(?:(?:^|.*;\s*)cd131423token\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
  axios.defaults.headers.common['Authorization'] = token.value
  checkLogin()
  // console.log(token)
  myModal.value = new bootstrap.Modal('#productModal', { keyboard: false, backdrop: 'static' })
  delModal.value = new bootstrap.Modal('#delProductModal', { keyboard: false, backdrop: 'static' })
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
function getProducts(page = 1) {
  axios
    .get(`https://ec-course-api.hexschool.io/v2/api/cd131423/admin/products?page=${page}`)
    .then((res) => {
      products.value = [...res.data.products]
      pagination.value = { ...res.data.pagination }
      console.log(products.value)
      console.log(pagination.value)
    })
    .catch((err) => {
      console.log(err.data)
    })
}
function openModal(status, item, idVal) {
  if (status === 'new') {
    Object.keys(productInfo).forEach((key) => {
      productInfo[key] = null
      productInfo.imagesUrl = []
    })
    isNew.value = true
    myModal.value.show()
  } else if (status === 'edit') {
    Object.assign(productInfo, item)
    id.value = idVal
    isNew.value = false
    myModal.value.show()
  } else if (status === 'delete') {
    id.value = idVal
    delModal.value.show()
  }
}

function confirmUpdate(isNew, data, id) {
  let apiUrl = 'https://ec-course-api.hexschool.io/v2/api/cd131423/admin/product'
  let apiMethod = 'post'
  if (isNew === true) {
    const ID = nanoid()
    data.id = ID
  } else if (isNew === false) {
    apiUrl = `https://ec-course-api.hexschool.io/v2/api/cd131423/admin/product/${id}`
    apiMethod = 'put'
  }
  axios[apiMethod](apiUrl, { data: data })
    .then((res) => {
      console.log(res.data)
      myModal.value.hide()
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
      delModal.value.hide()
      getProducts()
    })
    .catch((err) => {
      console.log(err.data)
    })
}
</script>

<style></style>
