<template>
  <div id="app">
    <img src="./assets/logo.png">
    <form @submit.prevent="submit_search">
      <input v-model="search"></input>
      <button type="submit">Search</button>
    </form>

    <div v-if="weather_data">
      <p><strong>Location: </strong>{{ weather_data.location }}</p>
      <p><strong>Main </strong>{{ weather_data.main }}</p>
      <p><strong>Description: </strong>{{ weather_data.description }}</p>
      <p><strong>Temperature: </strong>{{ weather_data.temperature_kelvin }}</p>
      <p><strong>Sunrise: </strong>{{ weather_data.sunrise }}</p>
      <p><strong>Sunset: </strong>{{ weather_data.sunset }}</p>
    </div>
  </div>
</template>

<script>
const APP_ID = '701ddeca464cf5fc03f00538d3d6effa';
const BASE_URL = 'http://api.openweathermap.org/data/2.5';

export default {
  name: 'app',
  data() {
    return {
      search: '',
      weather_data: null,
    };
  },
  computed: {
    encoded_search() {
      return encodeURIComponent(this.search);
    },
  },
  methods: {
    submit_search() {
      const url = `${BASE_URL}/weather?q=${this.encoded_search}&APPID=${APP_ID}`;
      this.$http.get(url).then((response) => {
        const weather_data = response.body;

        this.weather_data = {
          location: weather_data.name,
          main: weather_data.weather[0].main,
          description: weather_data.weather[0].description,
          temperature_kelvin: weather_data.main.temp,
          sunrise: new Date(weather_data.sys.sunrise * 1000),
          sunset: new Date(weather_data.sys.sunset * 1000),
        };
      }).catch((response) => {
        console.error(response);
      });
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
