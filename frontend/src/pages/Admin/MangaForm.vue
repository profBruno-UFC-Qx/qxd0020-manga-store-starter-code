<script setup lang="ts">
import { ref } from 'vue'
import { isAxiosError } from 'axios'
import { api } from '@/api'
import { useUpload } from '@/composables/useUpload'
import { useUserStore } from '@/stores/userStore'
import type { ApplicationError, Manga } from '@/types'
import { isApplicationError } from '@/composables/useApplicationError'
import { RouterLink, useRoute } from 'vue-router'

const id = ref(0)
const title = ref('')
const cover = ref<File>()
const coverURL = ref('')
const number = ref<number>()
const price = ref<number>()

const userStore = useUserStore()

const loading = ref(false)
const feedback = ref('')
const error = ref<ApplicationError>()

const route = useRoute()

async function getManga() {
  try {
    const { data } = await api.get(`/mangas/${route.params.id}`, {
      params: {
        populate: 'cover'
      }
    })
    const manga = data.data as Manga
    id.value = Number(route.params.id)
    title.value = manga.title
    price.value = manga.price
    number.value = manga.number
    coverURL.value = manga.cover.url
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      error.value = e.response?.data
    }
  } finally {
    loading.value = false
  }
}

function handleUpload(event: Event) {
  const inputEvent = event as InputEvent
  const target = inputEvent.target as HTMLInputElement
  cover.value = target.files?.item(0) as File
}

async function createManga() {
  try {
    loading.value = true
    const formData = new FormData()
    formData.append('files.cover', cover.value as File)
    formData.append(
      'data',
      JSON.stringify({
        title: title.value,
        number: number.value,
        price: price.value
      })
    )

    const { data } = await api.post('/mangas', formData, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    })

    console.log(data.data)
    feedback.value = 'Manga criado com sucesso.'
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      error.value = e.response?.data
      feedback.value = error.value.error.message
    }
  } finally {
    loading.value = false
  }
}

async function updateManga() {
  try {
    loading.value = true

    if (cover.value) {
      const formData = new FormData()
      formData.append('files.cover', cover.value as File)
      formData.append(
        'data',
        JSON.stringify({
          title: title.value,
          number: number.value,
          price: price.value
        })
      )

      const { data } = await api.put(`/mangas/${id.value}`, formData, {
        headers: {
          Authorization: `Bearer ${userStore.jwt}`
        }
      })

      console.log(data.data)
      feedback.value = 'Manga atualizado com sucesso.'
    } else {
      const { data } = await api.put(
        `/mangas/${id.value}`,
        {
          data: {
            title: title.value,
            number: number.value,
            price: price.value
          }
        },
        {
          headers: {
            Authorization: `Bearer ${userStore.jwt}`
          }
        }
      )
      await getManga()
      feedback.value = `Manga ${data.data.title} atualizado com sucesso.`
    }
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      error.value = e.response?.data
      feedback.value = error.value.error.message
    }
  } finally {
    loading.value = false
  }
}

if (route.params.id) {
  getManga()
}
</script>

<template>
  <div v-if="loading" class="text-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div
    v-if="feedback"
    class="col-12 alert alert-dismissible fade show"
    :class="{ 'alert-danger': error, 'alert-success': !error }"
    role="alert"
  >
    {{ feedback }}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  <form @submit.prevent="id != 0 ? updateManga() : createManga()">
    <img class="col-auto" v-if="coverURL" :src="useUpload()(coverURL)" />
    <div class="row text-start">
      <div class="col-12 mb-3">
        <label for="coverInput" class="form-label">Manga cover</label>
        <input
          @change="handleUpload"
          type="file"
          id="coverInput"
          accept="image/*"
          class="form-control"
        />
      </div>
      <div class="col-12 mb-3">
        <label for="titleInput" class="form-label">Manga title</label>
        <input
          v-model="title"
          type="text"
          id="titleInput"
          class="form-control"
          placeholder="an awesome title"
        />
      </div>
      <div class="col-3 mb-3">
        <label for="numberInput" class="form-label">Manga number</label>
        <input
          v-model="number"
          type="number"
          id="numberInput"
          class="form-control"
          placeholder="volume number"
        />
      </div>
      <div class="col-2 mb-3">
        <label for="priceInput" class="form-label">Manga price</label>
        <input
          v-model="price"
          type="text"
          id="priceInput"
          class="form-control"
          placeholder="00.00"
        />
      </div>
    </div>
    <RouterLink to="/admin" class="btn btn-danger">Cancel</RouterLink>
    <input v-if="id" type="submit" class="btn btn-primary" value="Edit" />
    <input v-else type="submit" class="btn btn-success" value="Create" />
  </form>
</template>
