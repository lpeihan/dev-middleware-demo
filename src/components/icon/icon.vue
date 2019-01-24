<template>
  <svg class="icon" :class="'icon-' + name" @click="$emit('click', $event)">
    <use :xlink:href="'#' + name"></use>
  </svg>
</template>

<script>
import icons from '@/assets/icons';

export default {
  name: 'icon',
  props: {
    name: {
      type: String,
      required: true,
      default: '',
      validator(val) {
        return icons[val];
      }
    }
  },
  data() {
    return {
      icons
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/icon'
</style>
