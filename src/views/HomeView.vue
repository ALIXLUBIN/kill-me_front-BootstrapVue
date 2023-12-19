<template>
  <div id="backGround">
    <div class="container"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Test from "@/components/Test.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    Test,
  },
};
</script>

<style>
body {
  background: rgb(255, 255, 255);
  /* background: url("<%= BASE_URL %>Dessin 1.svg"); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 45vh;
  position: relative;
}
</style>
