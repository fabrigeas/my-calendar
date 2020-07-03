<template>
  <div class="home">
    <Calendar msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Calendar from '@/components/Calendar.vue';

export default {
  name: 'Home',
  components: {
    Calendar
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
