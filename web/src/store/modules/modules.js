import taskStore from './task'
import assetsStore from './assets'
import Users from './users'
var task = {
  state: taskStore.state,
  getters: taskStore.getters,
  mutations: taskStore.mutations
}
var assets = {
  state: assetsStore.state,
  getters: assetsStore.getters,
  mutations: assetsStore.mutations
}
var users = {
  state: Users.state,
  getters: Users.getters,
  mutations: Users.mutations
}
export default {
  task,
  assets,
  users
}
