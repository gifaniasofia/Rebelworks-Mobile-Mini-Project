export function randomMovies (state) {
  const arrUniqueIdx = [];
  const arrRandMovies = [];
  while(arrUniqueIdx.length < 6){
    let r = Math.floor(Math.random() * state.movies.length);
    if (arrUniqueIdx.indexOf(r) === -1) {
      arrUniqueIdx.push(r)
      arrRandMovies.push(state.movies[r])
    };
  }
  return arrRandMovies
}

export function isFine (state) {
  return !state.isLoading && !state.isError;
}
