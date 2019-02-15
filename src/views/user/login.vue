<template>
  <div class="login">
    <icon name="back" @click="back()"></icon>
    {{name}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'login',
  computed: {
    ...mapGetters('user', ['name'])
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="stylus" scoped>
.login
  .icon-back
    color: red
</style>
