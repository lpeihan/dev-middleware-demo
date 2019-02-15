<template>
  <div class="slider">
    <div
      class="slider-wrapper"
      ref="wrapper"
      :style="{
        'transform': `translate${this.vertical ? 'Y' : 'X'}(${translateX - ((index - 1) * clientWidth)}px)`,
        'transition': `transform ${slidering ? 0 : transition}ms`
      }"
      @touchstart.stop="handleTouchstart"
      @touchmove.stop="handleTouchmove"
      @touchend.stop="handleTouchend"
      @transitionend="handleTransitionend"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    interval: {
      type: Number,
      default: 3000
    },
    transition: {
      type: Number,
      default: 300
    },
    loop: {
      type: Boolean,
      default: true
    },
    vertical: {
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
      translateX: 0,
      translateY: 0,
      clientWidth: 0,
      clientHeight: 0,
      slidering: false
    };
  },
  computed: {
    realIndex() {
      if (this.loop) {
        if (this.index === 1) {
          return this.length;
        }

        if (this.index === this.length) {
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
  mounted() {
    this.resizeWidth();
    window.addEventListener('resize', this.resizeWidth);

    this.$nextTick(() => {
      this.length = this.$refs.wrapper.children.length;
    });

    if (this.loop) {
      this.index = 2;
      this.initLoop();
    }
  },
  methods: {
    resizeWidth() {
      this.clientWidth = this.$el.clientWidth;
      this.clientHeight = this.$el.clientHeight;
    },
    getAngle(startX, startY, endX, endY) {
      return 360 * Math.atan((endY - startY) / (endX - startX)) / (2 * Math.PI);
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

      if (this.index >= this.length) {
        this.index = 2;
      }
      if (this.index <= 1) {
        this.index = this.length;
      }
    },
    next() {
      this.index++;
    },
    prev() {
      this.index--;
    },
    reset() {
      this.startX = 0;
      this.startY = 0;
      this.endX = 0;
      this.endY = 0;
      this.translateX = 0;
      this.translateY = 0;
      this.deltaX = 0;
      this.deltaY = 0;
    },
    noSlider() {
      return (
        (this.deltaX < 0 && this.index >= this.length) || (this.deltaX > 0 && this.index === 1));
    },
    handleTouchstart(e) {
      this.slidering = true;
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;

      this.correctIndex();
    },
    handleTouchmove(e) {
      this.endX = e.touches[0].pageX;
      this.endY = e.touches[0].pageY;

      const deltaX = this.deltaX = this.endX - this.startX;
      const angle = this.getAngle(this.startX, this.startY, this.endX, this.endY);

      if (this.loop === false && this.noSlider()) {
        return;
      }

      if (Math.abs(deltaX) > 6 && Math.abs(angle) < 20) {
        this.translateX = deltaX > 0 ? Math.min(deltaX, this.clientWidth) : Math.max(deltaX, -this.clientWidth);
      }
    },
    handleTouchend() {
      this.slidering = false;
      const percent = this.translateX / this.clientWidth;

      if (percent < -0.1) {
        this.next();
      } else if (percent > 0.1) {
        this.prev();
      }

      this.reset();
    },
    handleTransitionend() {
      this.$emit('change', this.realIndex);
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
    white-space: nowrap
    height: 100%

    & > div
      size: 100%
      display: inline-block
      font-size: $font-size-base
</style>
