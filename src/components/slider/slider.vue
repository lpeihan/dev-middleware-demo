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
      default: true
    },
    vertical: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
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
      slidering: false,
      timer: null
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

    this.autoPlay();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeWidth);
  },
  methods: {
    clear() {
      clearInterval(this.timer);
    },
    autoPlay() {
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
    height: 100%

    & > div
      size: 100%
      display: inline-block
      font-size: $font-size-base
</style>
