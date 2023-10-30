<template>
  <Header></Header>
  <router-view />
</template>

<script>
import Header from "@/components/Header.vue";
import BackGround from "@/components/BackGround.vue";

export default {
  components: {
    Header,
    BackGround,
  },
};
</script>
