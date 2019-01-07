<template>
  <div id="app">
    app
  </div>
</template>

<script>
import { getExample } from '@/api/example';

export default {
  created() {
    getExample();
  }
};
</script>

<style lang="stylus" scoped>
#app
  color: red
</style>
