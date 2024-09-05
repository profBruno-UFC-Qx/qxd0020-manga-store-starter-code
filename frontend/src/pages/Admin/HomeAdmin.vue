<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Manga } from '@/types';
import { api } from '@/api';
import { useUpload } from '@/composables/useUpload'

const mangas = ref([] as Manga[])
const loading = ref(true)
const error = ref<Error>()

const uploadHelper = useUpload()

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
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Number</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="manga in mangas" :key="manga.id">
                <td> {{  manga.id }}</td>
                <td> <img :src="uploadHelper(manga.cover.url)" :alt="manga.title"><br> {{ manga.title }}</td>
                <td> {{ manga.number }}</td>
                <td> {{ manga.price }}</td>
                <td><button>Editar</button><button>Remover</button></td>
              </tr>
            </tbody>
          </table>
        </div>
</template>