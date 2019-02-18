<template>
  <div class="home">
    <slider v-if="banners.length" autoplay loop>
      <div class="slider-item" v-for="(banner, index) in banners" :key="index">
        <img :src="banner.picUrl" width="100%" height="100%">
      </div>
    </slider>

    <tabs :tabs="tabs" :initialIndex="2">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </tabs>
    <router-link to="/login">login</router-link>
  </div>
</template>

<script>
import { getExample } from '@/api/example';
import Slider from '@/components/slider';
import Tabs from '@/components/tabs';

export default {
  name: 'home',
  components: {
    Slider,
    Tabs
  },
  data() {
    return {
      banners: [],
      tabs: ['首页', '联系', '发现']
    };
  },
  methods: {
    async getBanners() {
      this.banners = (await getExample()).banners;
    }
  },
  mounted() {
    this.getBanners();
  }
};
</script>

<style lang="stylus" scoped>
.home
  .slider
    height: 172px

  .tabs
    height: 100px
</style>
