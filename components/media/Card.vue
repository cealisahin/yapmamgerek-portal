<script setup lang="ts">
import type { MainAttraction, MediaType } from '~/types'

defineProps<{
  type: MediaType
  item: MainAttraction
}>()
</script>

<template>
  <NuxtLink
      :to="`/${item.name}`" pb2
  >
  <div>
    {{ item.title }}
  </div>
  </NuxtLink>
</template>

