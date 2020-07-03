<template>
  <div class="modal px-0" :style="{ display: open ? 'block' : 'none' }">
    <div class="modal-content">
      <span class="close" @click.stop="$emit('dismiss')">&times;</span>
      <div v-if="$slots.header" class="modal-header">
        <slot name="header"></slot>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
        <slot name="default"></slot>
      </div>
      <div v-if="$slots.footer" class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Modal',
  props: {
    open: { type: Boolean, default: false }
  }
});
</script>

<style scoped lang="scss">
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 5; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  padding: 2rem 1rem !important;
  overflow: auto;
}

.modal-content {
  background-color: #fefefe;
  margin: auto !important;
  padding: 2rem;
  border: 1px solid #888;
  // width: 100%;
  width: 70%;
  max-width: 600px;
}

.close {
  color: #aaaaaa;
  text-align: right;
  font-size: 28px;
  font-weight: bold;
  margin-left: 100%;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
