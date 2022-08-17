<script setup lang="ts">
import {ref} from "vue";
import useStore from "./stores/store";
import Page from "./Page.vue";

const store = useStore()

const pages = ref<Page[] | null>(null)
const activePage = ref(1)

const fetchData = async () => {
  const response = await fetch('https://bemeta-quick-matching.vercel.app/api/forms/quick-matching')

  const json = await response.json() as ApiResponse

  pages.value = json.pages

  // pages.value.forEach(page => {
  //   page.questions.forEach(question => {
  //     const { key } = question
  //
  //     if (question.type === 'multiselect') {
  //       store.setKey(key, [])
  //     } else {
  //       store.setKey(key, null)
  //     }
  //   })
  // })
}
fetchData()

const nextPage = () => {
  activePage.value++
}

const prevPage = () => {
  activePage.value--
}
</script>

<template>
  <main class="main">
    <div v-if="!pages">
      loading
    </div>

    <template v-else>
      <template v-for="(page, idx) in pages">
        <Page
            v-if="idx + 1 === activePage"
            :questions="page.questions"
            @nextPage="nextPage"
            @prevPage="prevPage"
        />
      </template>
    </template>
  </main>
</template>

<style scoped>
.main {
  padding-top: 200px;
}
</style>
