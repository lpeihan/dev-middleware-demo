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

      <div
        class="scroll-bar"
        :style="{
        width: `${100 / tabs.length}%`,
        'transition': `transform ${transition}ms`,
        transform: `translateX(${(((tabIndex - 1) - translate / titleWidth) / tabs.length) * titleWidth}px)`
      }"
      ></div>
    </div>

    <slider
      ref="slider"
      @change="val => tabIndex = val"
      :initialIndex="initialIndex"
      @translate="val => translate = val"
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
    },
    initialIndex: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      tabIndex: 1,
      translate: 0,
      titleWidth: 0,
      transition: 0
    };
  },
  methods: {
    switchTab(index) {
      this.$refs.slider.switch(index);
    },
    setTitleWidth() {
      this.titleWidth = this.$refs.tabsTitle.clientWidth;
    }
  },
  mounted() {
    this.setTitleWidth();
    window.addEventListener('resize', this.setTitleWidth);

    const time = 300;
    setTimeout(() => {
      this.transition = time;
    }, time);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setTitleWidth);
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
      transition: color 300ms
      btn-active()

      &.active
        color: $color-theme

    .scroll-bar
      absolute: bottom 0
      height: 2px
      background: $color-theme
      z-index: 1
      border-radius: 2px

  .slider
    height: calc(100% - 45px)
</style>
