<template>
  <div class="slider">
    <div
      class="slider-wrapper"
      ref="wrapper"
      :style="{
        'white-space': `${vertical ? 'wrap' : 'nowrap'}`,
        'transform': `translate${vertical ? 'Y' : 'X'}(${translate - ((index - 1) * size)}px)`,
        'transition': `transform ${slidering ? 0 : transition}ms`
      }"
      @touchstart.stop="handleTouchstart"
      @touchmove.stop="handleTouchmove"
      @touchend.stop="handleTouchend"
      @transitionend="handleTransitionend"
    >
      <slot></slot>
    </div>

    <slot name="indicator">
      <div class="indicator" v-if="length && showIndicator">
        <div
          class="indicator-item"
          v-for="i in length"
          :key="i"
          :class="{
            'active': realIndex === i
          }"
        ></div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    duration: {
      type: Number,
      default: 3000
    },
    transition: {
      type: Number,
      default: 300
    },
    loop: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    initialIndex: {
      type: Number,
      default: 1
    },
    showIndicator: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      index: 1,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      deltaX: 0,
      deltaY: 0,
      translate: 0,
      clientWidth: 0,
      clientHeight: 0,
      slidering: true,
      timer: null,
      length: 0
    };
  },
  computed: {
    realIndex() {
      if (this.loop) {
        if (this.index === 1) {
          return this.length;
        }

        if (this.index === this.length + 2) {
          return 1;
        }

        return this.index - 1;
      }

      return this.index;
    },
    delta() {
      return this.vertical ? this.deltaY : this.deltaX;
    },
    size() {
      return this.vertical ? this.clientHeight : this.clientWidth;
    }
  },
  watch: {
    translate(val) {
      this.$emit('translate', val);
    },
    realIndex(val) {
      this.$emit('change', val);
    }
  },
  mounted() {
    this.resizeWidth();
    window.addEventListener('resize', this.resizeWidth);
    this.length = this.$refs.wrapper.children.length;

    setTimeout(() => {
      this.slidering = false;
    }, 300);

    this.index = this.initialIndex;

    if (this.loop) {
      this.index = this.initialIndex + 1;
      this.initLoop();
    }

    this.autoPlay();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeWidth);
  },
  methods: {
    getAngle(startX, startY, endX, endY) {
      return 360 * Math.atan((endY - startY) / (endX - startX)) / (2 * Math.PI);
    },
    clear() {
      clearInterval(this.timer);
    },
    autoPlay() {
      if (this.autoplay === false) {
        return;
      }
      this.timer = setInterval(() => {
        this.next();
      }, this.duration);
    },
    resizeWidth() {
      this.clientWidth = this.$el.clientWidth;
      this.clientHeight = this.$el.clientHeight;
    },
    initLoop() {
      const el = this.$refs.wrapper;
      const first = el.firstChild.cloneNode(true);
      const last = el.lastChild.cloneNode(true);
      el.appendChild(first);
      el.insertBefore(last, el.firstChild);
    },
    correctIndex() {
      if (this.loop === false) {
        return;
      }

      if (this.index >= this.length + 2) {
        this.index = 2;
      }
      if (this.index <= 1) {
        this.index = this.length + 1;
      }
    },
    next() {
      this.slidering = false;
      this.index++;
    },
    prev() {
      this.slidering = false;
      this.index--;
    },
    switch(index) {
      this.slidering = false;
      this.index = index;
    },
    reset() {
      this.startX = 0;
      this.startY = 0;
      this.endX = 0;
      this.endY = 0;
      this.deltaX = 0;
      this.deltaY = 0;
      this.translate = 0;
    },
    noSlider() {
      return (
        (this.delta < 0 && this.index >= this.length) || (this.delta > 0 && this.index === 1));
    },
    handleTouchstart(e) {
      this.slidering = true;
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;

      this.clear();
      this.correctIndex();
    },
    handleTouchmove(e) {
      this.endX = e.touches[0].pageX;
      this.endY = e.touches[0].pageY;

      this.deltaX = this.endX - this.startX;
      this.deltaY = this.endY - this.startY;

      if (this.loop === false && this.noSlider()) {
        return;
      }

      const angle = this.getAngle(this.startX, this.startY, this.endX, this.endY);

      if (this.vertical === false && (Math.abs(this.deltaX) < 6 || Math.abs(angle) > 30)) {
        return;
      }

      if (this.vertical && (Math.abs(this.deltaX) < 6 || Math.abs(angle) < 30)) {
        return;
      }

      this.translate = this.delta > 0 ? Math.min(this.delta, this.size) : Math.max(this.delta, -this.size);
    },
    handleTouchend() {
      this.slidering = false;
      const percent = this.translate / this.size;

      if (percent < -0.1) {
        this.next();
      } else if (percent > 0.1) {
        this.prev();
      }

      this.reset();
      this.autoPlay();
    },
    handleTransitionend() {
      this.correctIndex();
      this.slidering = true;
    }
  }
};
</script>

<style lang="stylus" scoped>
.slider
  position: relative
  overflow: hidden

  &-wrapper
    font-size: 0
    height: 100%

    & > div
      size: 100%
      display: inline-block
      font-size: $font-size-base

  .indicator
    absolute: left 0 right 0 bottom 12px
    text-align: center

    .indicator-item
      display: inline-block
      size: 7px
      margin: 0 4px
      background: $white
      border-radius: 50%
      transition: background 0.3s

      &.active
        background: $color-theme
</style>
