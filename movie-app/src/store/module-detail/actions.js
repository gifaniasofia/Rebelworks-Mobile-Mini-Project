import axios from 'axios'

export async function getDetailMovie ({ commit }, movieId) {
  return axios({
    url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`,
    method: 'GET'
  })
    .then(({ data }) => {
      const movie = JSON.parse(JSON.stringify(data));
      commit('SET_DETAILMOVIE', movie);
      return true;
    })
    .catch(err => {
      console.log(err);
      return false;
    })
}

export async function getInitialSimilarMovies ({ commit }, movieId) {
  return axios({
    url: `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`,
    method: 'GET'
  })
    .then(({ data }) => {
      // this.similarMovies = data.results;
      commit('SET_SIMILARMOVIES', data.results);
      return true;
    })
    .catch(err => {
      console.log(err);
      return false;
    })
}

export async function initPage ({ dispatch, commit }, movieId) {
  // this.isLoading = true;
  commit('SET_LOADING', true);
  const respDetail = await dispatch('getDetailMovie', movieId);
  const respSimilarMovie = await dispatch('getInitialSimilarMovies', movieId);
  // this.isLoading = false;
  commit('SET_LOADING', false);
  const isError = !respDetail || !respSimilarMovie;
  commit('SET_ERROR', isError);
}

export function getOnLoadSimilarMovies ({ commit, state }, { movieId, page }) {
  axios({
    url: `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.API_KEY}&language=en-US&page=${page}`,
    method: 'GET'
  })
    .then(({ data }) => {
      let additionalSimilarMovies = [ ...state.similarMovies, ...data.results ];
      commit('SET_SIMILARMOVIES', additionalSimilarMovies)
    })
    .catch(err => {
      console.log(err)
      commit('SET_ERROR', err);
    })
}