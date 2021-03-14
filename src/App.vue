<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import { fetchGraphQLHelper } from '@/service/graphql';
import HelloWorld from './components/HelloWorld.vue';

const launchesQuery = `
  query launchesQuery ($limit: Int) {
    launches(limit: $limit) {
      details
      mission_name
      launch_date_local
      rocket {
        rocket_name
      }
      links {
        mission_patch_small
      }
    }

  }
`;

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      launches: [],
    };
  },
  async created() {
    const { data } = await fetchGraphQLHelper(launchesQuery, { limit: 5 });
    this.launches = data.launches;
    console.log(this.launches);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
