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
			La connexion à été perdu...
			<div class="mt-2 pt-2 border-top">
				<button
					type="button"
					class="btn btn-primary btn-sm me-2"
					@click="Reconnect()"
				>
					<div v-show="loading" class="spinner-border spinner-border-sm" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>

          <div v-show="!loading">
            Reconnecter
          </div>

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
import { faL } from '@fortawesome/free-solid-svg-icons';

export default {
	name: "Toast",
	data() {
		return {
			showToast: false,
      loading: false,
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
      this.loading = true;
			if (sessionStorage.getItem("logged")) {
				try {
					var conn = new WebSocket(process.env.VUE_APP_WS_IP);

					conn.onerror = (error) => {
            this.loading = false;
						this.eventBus.emit("show-toastSocket");
						this.eventBus.emit("show-toast", "La connexion à échoué");

					};
          
					conn.onopen = (e) => {
            this.loading = false;
						console.log("Connection established!");
						this.eventBus.emit("show-toastSuccess", "La connexion à été rétablie");
            this.showToast = false;
					};

					app.config.globalProperties.$conn = conn;

				} catch (error) {
					this.eventBus.emit("show-toastSocket");
				}
			}
		},
	},
};
</script>
