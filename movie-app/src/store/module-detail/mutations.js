export function SET_LOADING (state, payload) {
  state.isLoading = payload
}

export function SET_ERROR (state, payload) {
  state.isError = payload
}

export function SET_DETAILMOVIE (state, payload) {
  state.movie = payload
}

export function SET_SIMILARMOVIES (state, payload) {
  state.similarMovies = payload
}