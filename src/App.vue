<template>
  <Header></Header>
  <ToastSocket />
  <ToastError />
  <router-view />
</template>

<script>
import Header from "@/components/Header.vue";
import BackGround from "@/components/BackGround.vue";
import ToastSocket from "@/components/ToastSocket.vue";
import ToastError from "@/components/ToastError.vue";

export default {
  components: {
    Header,
    BackGround,
    ToastSocket,
    ToastError,
  },
};
</script>
