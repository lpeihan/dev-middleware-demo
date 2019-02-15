<template>
  <div class="login">
    <icon name="back" @click="back()"></icon>
    {{name}}
    <slider class="slider-container">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </slider>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Slider from '@/components/slider';

export default {
  computed: {
    ...mapGetters('user', ['name'])
  },
  components: {
    Slider
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
  .slider-container
    height: 200px
  .icon-back
    color: red
</style>
