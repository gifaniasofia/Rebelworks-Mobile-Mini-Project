<template>
  <div>
    <template v-if="isLoading">
      <q-skeleton height="30rem" />
      <div class="q-pa-md">
        <q-skeleton class="q-my-sm" v-for="index in 5" :key="index" />
        <div class="q-col-gutter-md row items-start q-mt-md">
          <div v-for="index in 10" :key="index" class="col-6">
            <q-skeleton height="15rem" />
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
      <q-img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" contain>
      </q-img>
      <div class="q-pa-md">
        <p class="text-center text-h6">{{ movie.title }}</p>
        <div class="row justify-center q-my-md">
          <q-btn outline rounded color="orange-3" style="font-size: 12px;" :label="`${releaseYear}`" />
        </div>
        <p class="text-center text-weight-light text-caption">{{ movie.overview }}</p>
        <p class="text-center">Similar</p>
        <div class="row justify-center q-my-md">
          <span class="line-marked" />
        </div>
        <q-infinite-scroll @load="onLoad" :offset="250">
          <div class="q-col-gutter-md row items-start">
            <div v-for="(movie, index) in similarMovies" :key="index" class="col-6">
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
import PageScroller from '../components/PageScroller';
import SpinnerDots from '../components/SpinnerDots';
import Error from '../components/Error';

export default {
  name: 'Detail',
  components: {
    CardMovie,
    PageScroller,
    SpinnerDots,
    Error
  },
  data () {
    return {
      page: 1,
    }
  },
  computed: {
    paramsId () {
      return this.$route.params.id;
    },
    movie () {
      return this.$store.state.detail.movie;
    },
    similarMovies () {
      return this.$store.state.detail.similarMovies;
    },
    isLoading () {
      return this.$store.state.detail.isLoading;
    },
    isError () {
      return this.$store.state.detail.isError;
    },
    isFine () {
      return this.$store.getters['detail/isFine'];
    },
    releaseYear () {
      if (Object.keys(this.movie).length > 0 && this.movie.release_date) {
        return this.movie.release_date.slice(0, 4);
      } else {
        return '----'
      }
    }
  },
  mounted () {
    this.$store.dispatch('detail/initPage', this.paramsId);
  },
  watch: {
    // call again the method if the route changes
    paramsId (newParamsId, oldParamsId) {
      if (this.$route.name === "detail") {
        this.$store.dispatch('detail/initPage', newParamsId);
      }
    }
  },
  methods: {
    onLoad (index, done) {
      setTimeout(() => {
        if (this.similarMovies) {
          this.page = this.page + 1;
          this.$store.dispatch('detail/getOnLoadSimilarMovies', { movieId: this.paramsId, page: this.page });
          done()
        }
      }, 2000)
    },
    tryAgain () {
      this.$store.dispatch('detail/initPage', this.paramsId);
    }
  }
}
</script>

<style lang="scss" scoped>
  .line-marked {
    width: 3rem;
    border-bottom: 4px solid #fc641c;
  }

</style>