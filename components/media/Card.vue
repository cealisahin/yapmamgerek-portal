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
    <div
        block bg-gray4:10 p1
        class="aspect-10/16"
        transition duration-400
        hover="scale-105 z10"
    >
      <NuxtImg
          width="400"
          height="600"
          format="webp"
          :src="'https://bscsafetysigns.com.au/cdn/shop/products/P_5_grande.jpg?v=1423863059'"
          :alt="item.title"
          w-full h-full object-cover
          :style="{ 'view-transition-name': `item-${item.id}` }"
      />
    </div>
    <div mt-2>
      {{ item.title }}
    </div>
  </NuxtLink>
</template>

