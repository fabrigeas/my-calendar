<template>
  <div class="calendar">
    <button data-dir="-1" @click="shift" style="position: fixed; left: 0;">&lt;</button>
    <button data-dir="+1" @click="shift" style="position: fixed; right: 0;">&gt;</button>

    <div id="table">
      <div>
        <div class="hour" style="color: white;">{{ date }}</div>
        <div class="hour" v-for="time of hours" :key="time">{{ time }}</div>
      </div>
      <div v-for="{ day, date, text, isWeekend } of dates" :key="date" class="date">
        <div :class="`hour ${isWeekend && 'weekend'}`">
          <div>{{ day }}</div>
          <div>{{ text }}</div>
        </div>
        <div
          v-for="time of hours"
          :key="time"
          :class="`hour ${isWeekend && 'weekend'}`"
          @click.stop="showDialog"
          :data-date="date"
          :data-time="time"
          :data-hour="time.substring(0, 2)"
          :title="`${date}-${time}`"
          :ref="`${date}-${time}`"
          :disabled="isWeekend"
        >
          <AppEvent
            v-if="events[date] && events[date][time]"
            :event="events[date][time]"
            @edit="(e) => (event = e)"
          />
        </div>
      </div>
      <hr
        id="currentTime"
        style="position: absolute; z-index: 4; width: 100%; border: solid 1px green;"
      />
    </div>

    <EventDialog
      v-if="event"
      :event="event"
      @dismiss="event = null"
      @update="renderEvent"
      @delete="deleteEvent"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import EventDialog from '@/components/EventDialog.vue';
import AppEvent from '@/components/AppEvent.vue';
import { EventType, CalendarEvent } from '../types';
import { addMinutes } from '../time';

declare const process: {
  env: {
    NODE_ENV: string;
  };
};

const baseUrl = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3002/api/events';

export interface DateFormat {
  day: string;
  date: string;
  text: string;
  isWeekend: boolean;
}

export default Vue.extend({
  name: 'MyCalendar',

  components: {
    AppEvent,
    EventDialog
  },

  data: () => ({
    events: {} as EventType,
    event: null as CalendarEvent | null,
    date: moment().format('ddd, DD-MM-YYYY'),
    dayIndex: 0
  }),

  methods: {
    showDialog: function ({ target }: Event): void {
      const { date, time } = (target as HTMLElement).dataset;
      const startDate = date || moment().format('YYYY-MM-DD');
      const startTime = time || moment().format('HH:SS');

      /* Read the value of event.defaultDuration from mySettings */
      const endTime = addMinutes(startTime, 30);

      this.event = {
        title: '',
        note: '',
        startDate,
        startTime,
        endDate: startDate,
        endTime,
        days: 0,
        duration: 0,
        location: '',
        organizer: {
          email: 'fabrigeas@gmail.com'
        },
        concerned: 'fabrigeas@hotmail.com',
        links: [],
        downloadCSV: true
      };
    },

    shift: function ({ target }: Event): void {
      const { dir } = (target as HTMLElement).dataset;

      // this.dayIndex += (7 * Number(dir));
      this.dayIndex += 1 * Number(dir);
    },

    addEvent: function (e: CalendarEvent) {
      this.events = {
        ...this.events,
        [e.startDate]: {
          [e.startTime]: {
            ...e
          }
        }
      };
    },

    /** Update the timwline position every minute */
    initTimeline: function () {
      function updateTimeLine() {
        const currentTime = document.getElementById('currentTime') as HTMLElement;
        const H = moment().format('HH');
        const M = Number(moment().format('MM'));
        const hour = document.querySelector(`[data-hour='${H}']`) as HTMLElement;

        if (!hour) {
          currentTime.hidden = true;
          return;
        }
        currentTime.hidden = false;

        const top = hour.offsetTop + 10;
        const height = hour.offsetHeight;
        const m = (Math.ceil(M * 100) / 60 / 100) * height;

        currentTime.style.top = `${top + m}px`;
      }

      updateTimeLine();
      setTimeout(updateTimeLine, 1000 * 60);
    },

    renderEvent: function (event: CalendarEvent) {
      this.events = {
        ...this.events,
        [event.startDate]: {
          [event.startTime]: event
        }
      };
      this.event = null;
    },

    deleteEvent: function (event: CalendarEvent) {
      delete this.events[event.startDate][event.startTime];
      this.event = null;
    }
  },

  computed: {
    /** returns an array of hours between 07:00 to 19:00 */
    hours: (): Array<string> => {
      const result = [];
      for (let i = 7; i < 19; i++) {
        const time = `${i < 10 ? '0' + i : i}:00`;
        result.push(time);
      }
      return result;
    },

    /** Generates and returns an array of 7 days a week excluding weekends */
    dates: function (): Array<DateFormat> {
      return [...Array(7).keys()].map((i) => {
        const date = moment().add(i + this.dayIndex, 'd');
        const isoWeekday = date.isoWeekday();

        return {
          day: date.format('ddd'),
          date: date.format('YYYY-MM-DD'),
          text: date.format('ddd, DD-MM-YYYY'),
          isWeekend: isoWeekday === 6 || isoWeekday === 7
        };
      });
    }
  },

  mounted: function () {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((result) => result.forEach(this.renderEvent));

    this.initTimeline();
  }
});
</script>

<style scoped lang="scss">
@import '../assets/global.scss';
$screenWidth: 100%;

* {
  box-sizing: border-box;
}
#table {
  // width: $hourWidth * 8;
  width: $screenWidth;
  display: flex;
  & > div {
    width: 100%;
  }
}

.date {
  display: flex;
  flex-direction: column;
}
.hour {
  border: solid 0.01px $green;
  width: 100%;
  height: $hourHeight;
  cursor: pointer;
  &:hover {
    background: #59ba83;
  }
}
.weekend {
  background: #e2564c;
  border: transparent;
  &:hover {
    background: #e2564c;
  }
}

button {
  cursor: pointer;
  color: #007bff;
  background-color: transparent;
  background-image: none;
  border: solid;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
