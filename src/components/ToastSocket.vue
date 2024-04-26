<style>

</style>

<template>
	<div class="toast sticky-bottom bottom-0 end-0 m-2 p-2 position-absolute template" :class="{
		show: showToast,
	}" role="alert" aria-live="assertive" aria-atomic="true">
		<div class="q-body d-flex align-items-center justify-content-between">
			<span>
				La connextion à été perdu...
			</span>
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	</div>
</template>

<script>

import { state } from "@/socket";


export default {
	name: "Toast",
	data() {
		return {
			showToast: false,
		};
	},
	mounted() {

		if (!state.connected && sessionStorage.getItem("logged")) {
			this.showToast = true;
		}

		this.$watch(
			() => state.connected,
			(newValue, oldValue) => {
				// If the connection state changes to disconnected, show the toast
				if (!newValue && sessionStorage.getItem("logged")) {
					this.showToast = true;
				} else {
					// If the connection state changes to connected, hide the toast
					this.showToast = false;
				}
			}
		);

		this.eventBus.on("update-toastSocket", () => {
			setTimeout(() => {
				if (!state.connected && sessionStorage.getItem("logged")) {
					this.showToast = true;
				} else {
					// If the connection state changes to connected, hide the toast
					this.showToast = false;
				}
			}, 1000);
		});


		this.eventBus.on("show-toastSocket", () => {
			this.showToast = true;
		});
	},
	beforeDestroy() {
		this.eventBus.off("show-toastSocket", this.showToast);
		this.eventBus.off("update-toastSocket", this.showToast);
	},

	methods: {

	},
};
</script>
