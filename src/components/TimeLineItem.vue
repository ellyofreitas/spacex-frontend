<template>
  <v-timeline-item large>
    <template v-slot:icon>
      <img style="width: 2rem" :src="launch.links.mission_patch_small" />
    </template>
    <template v-slot:opposite>
      <span>{{ launch.launch_date_local | formatDate }}</span>
    </template>
    <v-card class="elevation-2">
      <v-card-title class="headline"> MISSION: {{ launch.mission_name }} </v-card-title>
      <v-card-subtitle> Rocket: {{ launch.rocket.rocket_name }} </v-card-subtitle>
      <v-card-text> {{ launch.details }}</v-card-text>
    </v-card>
  </v-timeline-item>
</template>

<script>
import format from 'date-fns/format';

export default {
  name: 'TimeLineItem',

  props: { launch: Object },
  filters: {
    formatDate(value) {
      return format(new Date(value), 'dd/MM/yyyy');
    },
  },
};
</script>
