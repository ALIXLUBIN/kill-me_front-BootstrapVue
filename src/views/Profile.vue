<template>
  <ConnectionManager />
  <ConnectionState />
  <button @click="emmit()">TEST</button>
  <!-- <div class="container">
    <div class="row">
      <div class="">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >Email address</label
          >
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import ConnectionManager from "@/components/ConnectionManager.vue";
import ConnectionState from "@/components/ConnectionState.vue";
import { socket } from "@/socket";

export default {
  name: "Profile",

  components: {
    ConnectionManager,
    ConnectionState,
  },

  mounted() {
    socket.on("test", () => {
      console.log("oui");
    });
  },

  methods: {
    emmit() {
      console.log("emitting");
      socket.emit("test", "Hello from the client");
    },
  },
};
</script>
