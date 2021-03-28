<template>
  <div>
    <template v-if="isLoading">
      <q-skeleton height="25rem" />
      <div class="q-pa-md">
        <div class="q-col-gutter-md row items-start">
          <div v-for="index in 10" :key="index" class="col-12">
            <q-skeleton height="25rem" />
          </div>
        </div>
      </div>
    </template>
    <template v-if="isError">
      <Error
        @clickedTryAgain="tryAgain"
      />
    </template>
    <template v-if="isFine">
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        autoplay
        swipeable
        transition-prev="slide-right"
        transition-next="slide-left"
      >
        <q-carousel-slide
          v-for="(randMovie, index) in randomMovies"
          :key="index"
          :name="index"
          :img-src="`https://image.tmdb.org/t/p/original/${randMovie.poster_path}`"
          @click.prevent="$router.push(`/movie/${randMovie.id}`)"
        >
        </q-carousel-slide>
      </q-carousel>
      <div class="q-pa-md">
        <p class="text-left text-grey-8 text-h6">Now Playing</p>
        <q-infinite-scroll @load="onLoad" :offset="250">
          <div class="q-col-gutter-md row items-start">
            <div v-for="(movie) in movies" :key="movie.id" class="col-12">
              <CardMovie
                :movie="movie"
              />
            </div>
          </div>
          <template v-slot:loading>
            <SpinnerDots />
          </template>
          <PageScroller />
        </q-infinite-scroll>
      </div>
    </template>
  </div>
</template>

<script>
import CardMovie from '../components/CardMovie';
import SpinnerDots from '../components/SpinnerDots';
import PageScroller from '../components/PageScroller';
import Error from '../components/Error';

export default {
  name: 'Home',
  components: {
    CardMovie,
    SpinnerDots,
    PageScroller,
    Error
  },
  data () {
    return {
      page: 1,
      slide: 1,
    }
  },
  mounted () {
    this.$store.dispatch('home/getInitialMovies');
  },
  computed: {
    isLoading () {
      return this.$store.state.home.isLoading;
    },
    isError () {
      return this.$store.state.home.isError;
    },
    movies () {
      return this.$store.state.home.movies;
    },
    randomMovies () {
      return this.$store.getters['home/randomMovies'];
    },
    isFine () {
      return this.$store.getters['home/isFine'];
    }
  },
  methods: {
    onLoad (index, done) {
      setTimeout(() => {
        if (this.movies) {
          this.page = this.page + 1;
          this.$store.dispatch('home/getOnLoadMovies', this.page);
          done();
        }
      }, 2000);
    },
    tryAgain () {
      this.$store.dispatch('home/getInitialMovies');
    }
  }
}
</script>
