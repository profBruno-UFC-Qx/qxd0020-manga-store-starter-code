<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ApplicationError, Manga } from '@/types'
import { api } from '@/api'
import { useUpload } from '@/composables/useUpload'
import { useUserStore } from '@/stores/userStore'
import { isAxiosError } from 'axios'
import { isApplicationError } from '@/composables/useApplicationError'

const mangas = ref([] as Manga[])
const loading = ref(true)
const exception = ref<ApplicationError>()

const uploadHelper = useUpload()
const userStore = useUserStore()

const mangaToDelete = ref<Manga | undefined>(undefined)

onMounted(async () => {
  try {
    const { data } = await api.get('/mangas?populate=cover&sort[0]=number')
    mangas.value = data.data
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      exception.value = e.response?.data
    }
  } finally {
    loading.value = false
  }
})

function close() {
  mangaToDelete.value = undefined
}

function askToDelete(id: number) {
  mangaToDelete.value = mangas.value.find((m) => m.id === id)
}

async function remover(id: number) {
  try {
    const { data } = await api.delete(`/mangas/${id}`, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    })

    const mangaDeleted = data.data
    const index = mangas.value.findIndex((m) => m.id == mangaDeleted.id)
    mangas.value.splice(index, 1)
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      exception.value = e.response?.data
    }
  } finally {
    loading.value = false
  }

  close()
}
</script>

<template>
  <div v-if="exception" class="alert alert-danger" role="alert">
    {{ exception.error.message }}
  </div>

  <RouterLink to="/mangas/create" class="btn btn-success">
    <i class="bi bi-plus"></i>
    Add
  </RouterLink>

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
          <td>{{ manga.id }}</td>
          <td>
            <img :src="uploadHelper(manga.cover.url)" :alt="manga.title" /><br />
            {{ manga.title }}
          </td>
          <td>{{ manga.number }}</td>
          <td>{{ manga.price }}</td>
          <td>
            <RouterLink :to="`/mangas/edit/${manga.id}`" class="btn btn-secondary">
              <i class="bi bi-pencil"></i>
            </RouterLink>
            <button @click="askToDelete(manga.id)" class="btn btn-danger">
              <i class="bi bi-trash"></i> 
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="modal" tabindex="-1" v-if="mangaToDelete">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Remoção de Manga</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Você tem certeza que deseja remover o manga <strong>{{ mangaToDelete.title }}</strong></p>
        </div>
        <div class="modal-footer">
          <button @click="close" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Não
          </button>
          <button @click="remover(mangaToDelete.id)" type="button" class="btn btn-primary">
            Sim
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: block;
}
</style>
