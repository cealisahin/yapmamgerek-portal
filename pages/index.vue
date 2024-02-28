<script setup lang="ts">
import type { MediaType } from '~/types'
import { QUERY_LIST } from '~/constants/lists'

const route = useRoute()
const type = computed(() => route.params.type as MediaType || 'movie')

const queries = computed(() => [
  QUERY_LIST.movie[0],
  QUERY_LIST.tv[0],
])
</script>


<template>
  <div>
    <CarouselAutoQuery
        v-for="query of queries"
        :key="query.type + query.query"
        :query="query"
    />
  </div>
</template>

