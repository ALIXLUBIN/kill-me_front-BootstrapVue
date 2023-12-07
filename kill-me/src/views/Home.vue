<template>
  <button @click="test">test</button>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",

  methods: {
    test() {
      axios.post(process.env.VUE_APP_API_IP + "/home", "test", {
        withCredentials: true,
        headers: {
          "access-control-expose-headers": "Set-Cookie",
        },
      });
    },
  },
};
</script>
