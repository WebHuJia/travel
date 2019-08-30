import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem('car') || '[]')
export default new Vuex.Store({
  state: {
    car: car
  },
  mutations: {
    seclecNum (state, obj) {
      var flag = false
      state.car.some(item => {
        if (item.id === obj.id) {
          item.count += parseInt(obj.count)
          flag = true
          return true
        }
      })
      if (!flag) {
        state.car.push(obj)
      }
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    getCarCount (state, obj) {
      state.car.some(item => {
        if (item.id === obj.id) {
          item.count = parseInt(obj.count)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    getSelectedChange (state, obj) {
      state.car.some(item => {
        if (item.id === obj.id) {
          item.seclected = obj.seclected
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    getAllCount (state) {
      var c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getCount (state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getSelected (state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.seclected
      })
      return o
    }
  }
})
