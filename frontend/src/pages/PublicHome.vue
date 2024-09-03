<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Manga } from '@/types';
import { api } from '@/api';
import MangaCard from '@/components/MangaCard.vue'

const mangas = ref([] as Manga[])
const loading = ref(true)
const error = ref<Error>()

onMounted( async () => {
  try {
    const { data } = await api.get('/mangas?populate=cover')
    mangas.value = data.data
  } catch(e) {
    error.value = e as Error
  } finally {
    loading.value = false
  }
})


</script>

<template>
  <div v-if="error" class="alert alert-danger" role="alert">
          {{ error.message }}
        </div>

        <div v-if="loading" class="spinner-border" role="status">
           <span class="visually-hidden">Loading...</span>
        </div>
        <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <MangaCard  v-for="manga in mangas" 
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