<template>
  <v-app class="app">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h2>SpaceX Timeline</h2>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <div class="background-container">
        <div class="stars"></div>
        <div class="twinkling"></div>
      </div>

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
<style>
@keyframes move-background {
  from {
    -webkit-transform: translate3d(0px, 0px, 0px);
  }
  to {
    -webkit-transform: translate3d(1000px, 0px, 0px);
  }
}
@-webkit-keyframes move-background {
  from {
    -webkit-transform: translate3d(0px, 0px, 0px);
  }
  to {
    -webkit-transform: translate3d(1000px, 0px, 0px);
  }
}

@-moz-keyframes move-background {
  from {
    -webkit-transform: translate3d(0px, 0px, 0px);
  }
  to {
    -webkit-transform: translate3d(1000px, 0px, 0px);
  }
}

@-webkit-keyframes move-background {
  from {
    -webkit-transform: translate3d(0px, 0px, 0px);
  }
  to {
    -webkit-transform: translate3d(1000px, 0px, 0px);
  }
}

.background-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.stars {
  background: black url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png) repeat;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  z-index: 0;
}

.twinkling {
  width: 10000px;
  height: 100%;
  background: transparent url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/twinkling.png')
    repeat;
  background-size: 1000px 1000px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;

  -moz-animation: move-background 70s linear infinite;
  -ms-animation: move-background 70s linear infinite;
  -o-animation: move-background 70s linear infinite;
  -webkit-animation: move-background 70s linear infinite;
  animation: move-background 70s linear infinite;
}
</style>
