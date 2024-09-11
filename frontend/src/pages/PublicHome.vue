<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ApplicationError, Manga } from '@/types'
import { api } from '@/api'
import MangaCard from '@/components/MangaCard.vue'
import { isAxiosError } from 'axios'
import { isApplicationError } from '@/composables/useApplicationError'

const mangas = ref([] as Manga[])
const loading = ref(true)
const exception = ref<ApplicationError>()

onMounted(async () => {
  try {
    const { data } = await api.get('/mangas?populate=cover')
    mangas.value = data.data
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      exception.value = e.response?.data
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="exception" class="alert alert-danger" role="alert">
    {{ exception.error.message }}
  </div>

  <div v-if="loading" class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
    <MangaCard
      v-for="manga in mangas"
      :key="manga.id"
      :id="manga.id"
      :title="manga.title"
      :number="manga.number"
      :price="manga.price"
      :summary="manga.summary"
      :cover="manga.cover"
    />
  </div>
</template>
