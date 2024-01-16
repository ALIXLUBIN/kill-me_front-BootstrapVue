<template>
  <div
    class="toast position-absolute end-0 m-2 align-items-center text-white border-0"
    :class="{
      show: showToast,
    }"
    v-bind:class="'bg-' + color"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="d-flex">
      <div class="toast-body">{{ message }}</div>
      <button
        type="button"
        class="btn-close btn-close-white me-2 m-auto"
        aria-label="Close"
        @click="showToast = false"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToastError",
  data() {
    return {
      showToast: false,
      message: "Error here",
      color: "danger",
    };
  },

  mounted() {
    this.eventBus.on("show-toast", (message) => {
      this.toastShow(message);
    });
    this.eventBus.on("show-toastSuccess", (message) => {
      this.toastShow(message, "color-2");
    });
  },

  beforeDestroy() {
    EventBus.off("show-toast", this.showToast);
  },

  methods: {
    Reconnect() {
      if (sessionStorage.getItem("logged")) {
        try {
          var conn = new WebSocket(process.env.VUE_APP_WS_IP);

          conn.onopen = function (e) {
            console.log("Connection established!");
          };

          app.config.globalProperties.$conn = conn;

          this.showToast = false;
        } catch (error) {
          this.Reconnect();
        }
      }
    },
    toastShow(message, color = "color-4") {
      this.color = color;
      this.message = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 5000);
    },
  },
};
</script>
