<template>
  <div class="container">
    <div class="row py-3">
      <div class="col-md-6">
        <h2>產品列表</h2>
        <table class="table table-hover mt-4">
          <thead>
            <tr>
              <th width="150">產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="150">是否啟用</th>
              <th width="120">查看細節</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in products" :key="item.id">
              <tr>
                <td width="150">{{ item.title }}</td>
                <td width="120">{{ item.origin_price }}</td>
                <td width="120">{{ item.price }}</td>
                <td width="150">
                  <span class="text-success" v-if="item.is_enabled">啟用</span>
                  <span v-else>未啟用</span>
                </td>
                <td width="120">
                  <!-- 點擊後會讓item物件賦值到temp物件中                   -->
                  <button type="button" class="btn btn-primary" @click="temp = item">
                    查看細節
                  </button>
                </td>
              </tr></template
            >
          </tbody>
        </table>
        <p>
          目前有 <span>{{ products.length }}</span> 項產品
        </p>
      </div>
      <div class="col-md-6">
        <h2>單一產品細節</h2>

        <template v-if="temp.title">
          <div class="card mb-3">
            <img :src="temp.imageUrl" class="card-img-top primary-image" alt="主圖" />
            <div class="card-body">
              <h5 class="card-title">
                {{ temp.title }}
                <span class="badge bg-primary ms-2">{{ temp.category }}</span>
              </h5>
              <p class="card-text">商品描述：{{ temp.description }}</p>
              <p class="card-text">商品內容：{{ temp.content }}</p>
              <div class="d-flex">
                <p class="card-text me-2">{{ temp.price }}</p>
                <p class="card-text text-secondary">
                  <del>{{ temp.origin_price }}</del>
                </p>
                元 / {{ temp.unit }}
              </div>
            </div>
          </div>

          <template v-for="(img, id) in temp.imagesUrl" :key="id">
            <img :src="img" alt="" class="images m-2" />
          </template>
        </template>
        <p class="text-secondary" v-else>請選擇一個商品查看</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="js" name="ProductsView">
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
//數據
const products = reactive([])
const temp = ref({})
const token = ref('')
//鉤子
onMounted(() => {
  token.value = document.cookie.replace(
    /(?:(?:^|.*;\s*)cd131423token\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  )

  axios.defaults.headers.common['Authorization'] = token.value
  checkLogin()
})
//方法
function getProducts() {
  axios
    .get('https://vue3-course-api.hexschool.io/v2/api/cd131423/admin/products')
    .then((res) => {
      products.push(...res.data.products)
      console.log(products)
    })
    .catch((err) => {
      console.log(err)
    })
}

function checkLogin() {
  axios
    .post(`https://vue3-course-api.hexschool.io/v2/api/user/check`)
    .then(() => {
      getProducts()
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style scoped>
img {
  object-fit: contain;
  max-width: 100%;
}

.primary-image {
  height: 300px;
}

.images {
  height: 150px;
}
</style>
