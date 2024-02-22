<script setup lang="ts">
import '@unocss/reset/tailwind.css'
import type { MediaType } from '~/types'
import { QUERY_LIST } from '~/constants/lists'

const route = useRoute()
const type = computed(() => route.params.type as MediaType || 'Tiyatro')

const queries = computed(() => [
  QUERY_LIST.movie[0],
  QUERY_LIST.tv[0],
])

const AsyncWrapper = defineComponent({
  name: 'AsyncWrapper',
  async setup() {
    const list = await listMedia(type.value, queries.value[0].query, 1)
  },
})





</script>

<template>
  <div>
    <CarouselAutoQuery
        v-for="query of queries"
        :key="query.type + query.query"
        :query="query"
    />
    <NuxtWelcome />
  </div>
</template>
