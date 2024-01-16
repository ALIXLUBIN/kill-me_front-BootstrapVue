<template>
  <div
    class="toast sticky-bottom bottom-0 end-0 m-2 p-2 position-absolute"
    :class="{
      show: showToast,
    }"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="q-body">
      La connextion à été perdu...
      <div class="mt-2 pt-2 border-top">
        <button
          type="button"
          class="btn btn-primary btn-sm me-2"
          @click="Reconnect()"
        >
          Reconnecter
        </button>
        <button
          type="button"
          class="btn btn-secondary btn-sm"
          @click="showToast = false"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      showToast: false,
    };
  },
  mounted() {
    this.eventBus.on("show-toastSocket", () => {
      this.showToast = true;
    });
  },
  beforeDestroy() {
    EventBus.off("show-toastSocket", this.showToast);
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
  },
};
</script>
