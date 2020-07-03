<template>
  <Modal :open="open" @dismiss="$emit('dismiss')" :type="type" class="confirmation">
    <template v-slot:header>
      <p>{{ message }}</p>
    </template>
    <template v-slot:body>
      <div :class="'alert alertconfirmation'">
        <div class="d-flex">
          <button class="btn danger" @click="$emit('confirmed', false)">
            {{ cancelText }}
          </button>
          <button class="btn success" @click="$emit('confirmed', true)">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from './Modal.vue';

export default Vue.extend({
  name: 'ConfirmationDialog',
  components: { Modal },
  props: {
    type: { type: String },
    open: { type: Boolean, required: true },
    message: { type: String, required: true },
    confirmText: { type: String, required: true },
    cancelText: { type: String, required: true }
  }
});
</script>

<style scoped lang="scss">
.d-flex {
  button {
    margin: 0 1rem;
  }
}
</style>
