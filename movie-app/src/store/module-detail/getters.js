export function isFine (state) {
  return !state.isLoading && !state.isError;
}