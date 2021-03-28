<template>
  <q-card @click.prevent="$router.push(`/movie/${movie.id}`)" style="cursor: pointer; border-radius: .75rem;">
    <q-img
      :ratio="3/4"
      :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
    >
    </q-img>
  </q-card>
</template>

<script>
export default {
  name: 'CardMovie',
  props: ['movie']
}
</script>
