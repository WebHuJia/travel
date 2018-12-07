<template>
 <div>
  <CityHeader></CityHeader>
  <CitySearch></CitySearch>
  <CityList :cities="cities" :hot="hotCities" :letter="letter"></CityList>
  <CityAlphabet :cities="cities" @change="handleLetterChange"></CityAlphabet>
 </div>
</template>

<script>
import CityHeader from './components/CityHeader'
import CitySearch from './components/Search'
import CityList from './components/CityList'
import CityAlphabet from './components/Alphabet'
import axios from 'axios'
export default {
  name: 'City',
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  },
  data () {
    return {
      cities: {}, // 存储字母对应全部城市数据
      hotCities: [], // 存储热门城市
      letter: ''
    }
  },
  methods: {
    getCityInfo () {
      var _this = this
      axios.get('/api/city.json?' + new Date().getTime()).then(function (res) {
        res = res.data
        if (res.ret && res.data) {
          const data = res.data
          console.log(data)
          _this.cities = data.cities
          _this.hotCities = data.hotCities
        }
      })
    },
    handleLetterChange (letter) {
      this.letter = letter
      console.log(this.letter)
    }
  },
  mounted () {
    this.getCityInfo()
  }
}
</script>

<style lang="stylus" scoped>

</style>
