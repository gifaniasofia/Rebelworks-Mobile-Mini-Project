<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar shrink class="bg-grey-3">
        <q-btn
          v-if="isHome"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          class="text-grey-6 q-mr-md"
        />

        <q-avatar square size="30px">
          <img src="../statics/image/movie.png" />
        </q-avatar>

        <q-toolbar-title>
          Movie App
        </q-toolbar-title>

        <q-btn
          v-if="!isHome"
          flat
          dense
          round
          icon="close"
          class="text-white"
          @click="$router.push('/')"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <!-- <keep-alive> -->
        <router-view />
      <!-- </keep-alive> -->
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
    }
  },
  computed: {
    isHome () {
      return this.$route.name === 'home';
    }
  }
}
</script>
