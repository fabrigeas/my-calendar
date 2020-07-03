<template>
  <div class="app-event" :style="style" :title="event.title" @click.stop="$emit('edit', event)">
    <div class="title">{{ event.title }}</div>
    <div class="duration">{{ event.startTime }} - {{ event.endTime }}</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { CalendarEvent } from '../types';

export default Vue.extend({
  props: {
    event: { type: Object as () => CalendarEvent }
  },

  data: () => ({
    showModal: false,
    height: (document.querySelector('.hour') as HTMLElement).offsetHeight,
    width: (document.querySelector('.hour') as HTMLElement).offsetWidth
  }),

  computed: {
    style(): Record<string, string> {
      const { days, duration } = this.event;
      return {
        height: this.height * ((duration > 30 ? duration - 2 : duration) / 60) + 'px',
        width: `${this.width * days - days}px`
      };
    }
  }
});
</script>
<style scoped lang="scss">
@import '../assets/global.scss';
* {
  font-size: small;
}
.app-event {
  background: $green;
  z-index: 3;
  position: absolute;
  border: solid 1px white;
  box-sizing: border-box;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden;
  & > div {
    padding: 0.1rem;
    color: white;
    padding: 0 !important;
    margin: 0 !important;
  }
}
</style>
