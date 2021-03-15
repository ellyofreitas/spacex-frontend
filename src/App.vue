<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h2>SpaceX Timeline</h2>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-timeline>
        <TimeLineItem v-for="(launch, n) in launchesList" :key="n" :launch="launch" />
      </v-timeline>
    </v-main>
  </v-app>
</template>

<script>
import { fetchGraphQLHelper } from '@/service/graphql';
import TimeLineItem from './components/TimeLineItem';

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
  components: { TimeLineItem },
  data() {
    return {
      launches: [],
    };
  },
  computed: {
    launchesList() {
      return this.launches.filter(launch => launch.details);
    },
  },
  async created() {
    const { data } = await fetchGraphQLHelper(launchesQuery, { limit: 5 });
    this.launches = data.launches;
  },
};
</script>
