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

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64" color="primary" />
    </v-overlay>
  </v-app>
</template>

<script>
import { fetchGraphQLHelper } from '@/service/graphql';
import TimeLineItem from './components/TimeLineItem';

const launchesQuery = `
  query launchesQuery ($limit: Int, $offset: Int, $order: String, $sort: String) {
    launches(limit: $limit, offset: $offset, order: $order, sort: $sort) {
      details
      mission_name
      launch_date_local
      rocket {
        rocket_name
      }
      links {
        article_link
        video_link
        mission_patch_small
        mission_patch
      }
    }
  }
`;
export default {
  name: 'App',
  components: { TimeLineItem },
  data() {
    return {
      loading: true,
      pagination: {
        hasNext: false,
        limit: 10,
        offset: 0,
        order: 'desc',
        sort: 'launch_date_local',
      },
      launches: [],
    };
  },
  computed: {
    launchesList() {
      return this.launches.filter(launch => launch.details);
    },
  },
  methods: {
    async fetch() {
      this.loading = true;
      const { data } = await fetchGraphQLHelper(launchesQuery, this.preparePagination());
      this.loading = false;

      console.log(data);

      this.pagination.hasNext = data.launches.length > this.pagination.limit;

      this.launches = this.launches.concat(data.launches.slice(0, this.pagination.limit));
    },
    preparePagination() {
      return { ...this.pagination, limit: this.pagination.limit + 1 };
    },
    paginate() {
      this.pagination.offset += this.pagination.limit;
    },
  },
  async created() {
    await this.fetch();

    window.onscroll = async () => {
      const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow && this.pagination.hasNext) {
        this.paginate();
        await this.fetch();
      }
    };
  },
};
</script>
