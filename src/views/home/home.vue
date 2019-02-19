<template>
  <div class="home">
    <slider v-if="banners.length" autoplay loop showIndicator>
      <div class="slider-item" v-for="(banner, index) in banners" :key="index">
        <img :src="banner.picUrl" width="100%" height="100%">
      </div>
    </slider>

    <tabs :tabs="tabs" :initialIndex="2">
      <div>
        <router-link to="/login">login</router-link>
      </div>
      <div>2</div>
      <div>3</div>
    </tabs>

    <div class="discs">
      <div class="discs-list">
        <div class="discs-item" v-for="disc in discs" :key="disc.id">
          <img :src="disc.picUrl" class="disc-pic">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBanners, getDiscs } from '@/api/example';
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
      discs: [],
      tabs: ['首页', '联系', '发现']
    };
  },
  methods: {
    async getBanners() {
      this.banners = (await getBanners()).banners;
    },
    async getDiscs() {
      this.discs = (await getDiscs()).result;
    }
  },
  mounted() {
    this.getBanners();
    this.getDiscs();
  }
};
</script>

<style lang="stylus" scoped>
.home
  height: 100%

  .slider
    height: 172px

  .tabs
    height: 300px
    border-bottom-1px()

  .discs
    font-size: 0

    &-list
      display: flex
      flex-wrap: wrap

    &-item
      width: calc(33.33% - 8px)
      margin-bottom: 6px
      margin-left: 6px

      .disc-pic
        width: 100%
        border-radius: 5px
</style>
