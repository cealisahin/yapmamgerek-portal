<template>
  <div>
    <h2> {{ title }}</h2>
    <span>{{ content }}</span>
    <span> detay </span>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const title = ref();
const content = ref();

  useHead({
    title: `...`,
  })

useFetchWebtoons('/attractions/' + route.params.slug, {
  onResponse({request, response, options}) {
    content.value = response._data.description
    title.value = response._data.title

    useHead({
      title: title,
    })
  },
})
</script>

<style lang="scss">
</style>
