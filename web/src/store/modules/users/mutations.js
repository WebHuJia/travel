var mutations = {
  newAuthor (state, msg) {
    state.author = msg
  },
  save (state, key, msg) {
    state[key] = msg
    localStorage.setItem(key, msg)
  }
}
export default mutations
