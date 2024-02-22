<script setup lang="ts">
import type { Media, MediaType } from '~/types'

defineProps<{
  type: MediaType
  item: Media
}>()
</script>

<template>
  <div mt-2>
    {{ item.title || item.name }}
    test
  </div>
</template>

