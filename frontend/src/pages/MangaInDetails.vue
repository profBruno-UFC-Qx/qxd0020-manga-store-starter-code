<script setup lang="ts">

import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '@/api'
import { useUpload } from '@/composables/useUpload';
import type { Manga } from '@/types';


const route = useRoute()
const manga = ref({} as Manga)
const loading = ref(true)
const error = ref<Error>()
const uploadHelper = useUpload()


async function getManga(){
  try {
    const { data } = await api.get(`/mangas/${route.params.id}`, {
      params: {
        populate: 'cover'
      }
    })
    manga.value = data.data
  } catch(e) {
    error.value = e as Error
  } finally {
    loading.value = false
  }
}

getManga()

</script>


<template>
    <div v-if="loading" class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div v-else class="row justify-content-center">
      <div class="col-lg-8 col-sm-12">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="uploadHelper(manga.cover.url)" class="w-100 rounded-start" :alt="manga.title">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ manga.title }}</h5>
                <hr>
                <div class="text-start">
                  <p class="card-text">Volume: {{ manga.number }}</p>
                  <p class="card-text"><strong>Preço: <small class="text-danger">{{ manga.price }}</small></strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
</template>