<template>
  <div class="login">
    <icon name="back"></icon>
    {{name}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('user', ['name'])
  }
};
</script>

<style lang="stylus" scoped>
>>> .icon-back
  color: red
</style>
