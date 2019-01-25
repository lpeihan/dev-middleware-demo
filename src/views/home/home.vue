<template>
  <div class="home">
    <img src="@/assets/imgs/logo.png">
    <router-link to="/login">login</router-link>
  </div>
</template>

<script>
import { getExample } from '@/api/example';

export default {
  mounted() {
    getExample();
  }
};
</script>
