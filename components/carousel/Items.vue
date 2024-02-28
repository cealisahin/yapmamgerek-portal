<script setup lang="ts">
import type { MainAttraction, MediaType } from '~/types'
import {MainAttraction} from "#build/types";

defineProps<{
  type: MediaType
  items: MainAttraction[]
}>()
</script>

<template>
  <CarouselBase>
    <MediaCard
        v-for="i of items"
        :key="i.title"
        :item="i"
        :type="type"
        flex-1 w-40 md:w-60
    />
  </CarouselBase>
</template>
