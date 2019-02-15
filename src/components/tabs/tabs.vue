<template>
  <div class="tabs">
    <div class="tabs-titles" ref="tabsTitle">
      <div
        class="title"
        v-for="(tab, index) in tabs"
        :key="index"
        @click="switchTab(index + 1)"
        :class="{ 'active':  tabIndex === index + 1 }"
      >{{tab}}</div>

      <div class="scroll-bar" :style="{
        width: `${100 / tabs.length}%`,
        transform: `translateX(${(((tabIndex - 1) - translate / titleWidth) / tabs.length) * titleWidth}px)`
      }"></div>
    </div>

    <slider
      ref="slider"
      @change="index => tabIndex = index"
      :initialIndex="3"
      @translate="translate => this.translate = translate"
    >
      <slot></slot>
    </slider>
  </div>
</template>

<script>
import Slider from '@/components/slider';

export default {
  components: {
    Slider
  },
  props: {
    tabs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tabIndex: 1,
      translate: 0
    };
  },
  methods: {
    switchTab(index) {
      this.$refs.slider.switch(index);
    }
  },
  mounted() {
    this.titleWidth = this.$refs.tabsTitle.clientWidth;
  }
};
</script>

<style lang="stylus" scoped>
$height = 45px

.tabs
  &-titles
    display: flex
    position: relative
    border-bottom-1px()

    .title
      flex: 1
      text-align: center
      line-height: $height

      &.active
        color: $color-theme

    .scroll-bar
      absolute: bottom 0
      transition: all 300ms
      height: 2px
      background: $color-theme

  .slider
    height: calc(100% - 45px)
</style>
