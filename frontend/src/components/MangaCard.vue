<script setup lang="ts">


import type { Manga } from '@/types';
import { BASE_URL } from '@/api';
defineProps<Manga>()
</script>

<template>
  <RouterLink :to="`/mangas/${id}`">
    <div class="col">
      <div class="card shadow-sm">
        <img :src="BASE_URL + cover.url" :alt="`Capa do Manga ${number}`" class="cover">
        <div class="card-body">
          <h5 class="card-title">{{ number }} - {{  title }}</h5>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-body-secondary">{{ price }}</small>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.cover:hover {
  filter: sepia(0.8);
}
</style>