<script setup lang="ts">
import type { QueryItem } from '~/types'

const props = defineProps<{
  query: QueryItem
}>()

const item = await listAttraction('last/3')
console.log('val :',item);

</script>
<template>
  <CarouselBase>
    <template #title>
      {{ query.title }}
    </template>
    <template #more>
      <NuxtLink :to="`/${props.query.type}`" n-link>
        {{ 'Explore more' }}
      </NuxtLink>
    </template>
    <MediaCard
        v-for="i of item  || []"
        :key="i.name"
        :item="i"
        :type="props.query.type"
        flex-1 w-40 md:w-60
    />
  </CarouselBase>
</template>


<style scoped>

</style>