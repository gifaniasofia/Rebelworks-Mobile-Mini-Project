import axios from 'axios'

export function getInitialMovies ({ commit }) {
  commit('SET_LOADING', true);
  axios({
    url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=1`,
    method: 'GET'
  })
    .then(({ data }) => {
      commit('SET_MOVIES', data.results);
      commit('SET_ERROR', false);
    })
    .catch(err => {
      console.log(err);
      commit('SET_ERROR', true);
    })
    .finally(() => {
      commit('SET_LOADING', false);
    })
}

export function getOnLoadMovies ({ commit, state }, page) {
  axios({
    url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=${page}`,
    method: 'GET'
  })
    .then(({ data }) => {
      let additionalMovies = [ ...state.movies, ...data.results];
      commit('SET_MOVIES', additionalMovies);
      commit('SET_ERROR', false);
    })
    .catch(err => {
      console.log(err);
      commit('SET_ERROR', true);
    })
}