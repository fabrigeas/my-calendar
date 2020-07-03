<template>
  <Modal :open="true" @dismiss="$emit('dismiss')">
    <template v-slot:header>
      <h3>Invite fabrigeas to an event</h3>
    </template>
    <template v-slot:body>
      <form @submit.prevent="submitEvent">
        <formGroup
          :label="'Title of the event'"
          :model.sync="event.title"
          :invalid="event.title.length < 2"
          :attrs="{ required: true, autofocus: true }"
        />

        <formGroup :label="'Note'" :type="'textarea'" :model.sync="event.note">{{
          event.note
        }}</formGroup>

        <formGroup
          :label="'organizer'"
          :type="'email'"
          :model.sync="event.organizer.email"
          :invalid="event.organizer.email.length < 2"
          :attrs="{ required: true }"
        />

        <formGroup :label="'Location'" :type="'textarea'" :model.sync="event.location">{{
          event.location
        }}</formGroup>

        <fieldset>
          <legend>Links</legend>
          <div class="links-row">
            <formGroup
              :label="'Link to the Meeting'"
              :model.sync="link"
              :attrs="{
                placeholder: 'Please paste your link here'
              }"
            />
            <span>
              <button type="button" @click="addLink" :disabled="link.length < 5">save</button>
            </span>
          </div>

          <ul class="links">
            <li v-for="(href, i) of event.links" :key="i">
              <a class="link" :href="href">{{ href }}</a>
              <a class="delete" href="#" @click.prevent="event.links.splice(i, 1)">delete</a>
            </li>
          </ul>
        </fieldset>

        <fieldset>
          <legend>Dates</legend>
          <div class="doubled-container">
            <div class="doubled">
              <formGroup
                :label="'Starts on'"
                :type="'date'"
                :model.sync="event.startDate"
                :value="event.startDate"
                :attrs="{ required: true }"
              />

              <formGroup
                :label="'starts at'"
                :type="'time'"
                :model.sync="event.startTime"
                :invalid="event.startTime.length < 2"
                :attrs="{ required: true }"
              />
            </div>
            <div class="doubled">
              <formGroup
                :label="'Ends on'"
                :type="'date'"
                :model.sync="event.endDate"
                :value="event.endDate"
                :invalid="event.endDate.length < 2"
                :attrs="{ required: false, min: event.startDate }"
              />

              <formGroup
                :label="'Ends at'"
                :type="'time'"
                :model.sync="event.endTime"
                :value="event.endTime"
                :invalid="event.endTime.length < 2"
                :attrs="{ required: true, min: event.startTime }"
              />
            </div>
          </div>
        </fieldset>
        <div class="buttons-container">
          <button
            class="danger"
            type="button"
            style="float: left;"
            @click="showConfirmationModal = true"
          >
            delete this event
          </button>
          <button
            class="warning"
            type="button"
            style="margin-right: 0.5rem;"
            @click="$emit('dismiss')"
          >
            cancel
          </button>
          <input class="submit" type="submit" value="submit" />
        </div>
      </form>
    </template>

    <ConfirmationDialog
      :open="showConfirmationModal"
      message="Do you really want to delete this event?"
      cancelText="Cancel"
      confirmText="Delete"
      @dismiss="showConfirmationModal = false"
      @confirmed="deleteEvent"
    />
  </Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from '@/components/Modal.vue';
import FormGroup from '@/components/FormGroup.vue';
import ConfirmationDialog from './ConfirmationDialog.vue';
import { CalendarEvent } from '../types';
import moment from 'moment';
import { calculateDuration } from '../time';

const baseUrl = 'http://localhost:3000/api/events';
export default Vue.extend({
  components: {
    Modal,
    FormGroup,
    ConfirmationDialog
  },

  props: {
    event: { type: Object as () => CalendarEvent, required: true }
  },

  data: () => ({
    link: '',
    showConfirmationModal: false
  }),

  methods: {
    addLink: function () {
      this.link && this.event.links.push(this.link);
      this.link = '';
    },

    submitEvent: function () {
      const { event } = this;

      if (!event) return;

      const { startDate: sd, startTime, endTime, endDate: ed } = event;

      const startDate = moment(sd);
      const endDate = moment(ed);

      event.days = Math.abs(startDate.diff(endDate, 'days')) + 1;
      event.duration = calculateDuration(startTime, endTime);

      let [url, method, id] = [baseUrl, 'POST', event.id];

      if (id) {
        url = `${baseUrl}/${id}`;
        method = 'PUT';
      }

      fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        method,
        body: JSON.stringify(event)
      })
        .then((resposnse) => resposnse.json())
        .then((event) => {
          this.$emit('update', event);
        })
        .catch((error) => {
          console.error('toast this error', error);
          this.$emit('dismiss');
        });
    },

    deleteEvent: function (confirm: boolean) {
      this.showConfirmationModal = false;
      if (confirm) {
        const { event } = this;
        fetch(`${baseUrl}/${event.id}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'DELETE'
        })
          .then((resposnse) => resposnse.json())
          .then((event) => {
            this.$emit('delete', event);
          })
          .catch((error) => {
            console.error('toast this error', error);
            this.$emit('dismiss');
          });
      }
    }
  }
});
</script>

<style scoped lang="scss">
.doubled {
  display: flex;
  box-sizing: border-box;
  position: relative;
  margin-top: 1rem;
  & > * {
    width: calc(50%);
    margin: 2px;
    padding: 0;
    box-sizing: border-box;
  }
}

.buttons-container {
  width: 100%;
  text-align: end;
}
fieldset {
  text-align: start;
  border-radius: 0.25rem;
}

.links-row {
  display: flex;

  & > * {
    margin: 0 1rem;
  }

  & > :first-child {
    width: 75%;
  }
  & > span {
    width: auto;
    margin: auto;
  }
}

ul.links {
  padding: 0;
  overflow: hidden;
  li {
    display: flex;
    margin: 1rem 0;
    a.link {
      width: 80%;
    }
    a.delete {
      text-align: start;
      text-align: end;
      color: red;
    }
  }
}
</style>
