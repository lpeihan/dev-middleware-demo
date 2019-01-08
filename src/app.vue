<template>
  <div id="app">
    <div class="btn" @click="click()">click</div>

    <transition>
      <div class="dot" v-if="show"></div>
    </transition>
  </div>
</template>

<script>
import { getExample } from '@/api/example';

export default {
  data() {
    return {
      show: false
    };
  },
  created() {
    getExample();
  },
  methods: {
    click() {
      this.show = !this.show;
    }
  }
};
</script>

<style lang="stylus" scoped>
#app
  color: red

  .dot
    fixed: bottom 10px right 10px
    size: 20px
    background: blue
    border-radius: 50%

    &.v
      &-enter-active
      &-leave-active
        transition: all 0.4s linear

      &-enter
      &-leave-to
        transform: translate3d(-300px, -600px, 0)
</style>
