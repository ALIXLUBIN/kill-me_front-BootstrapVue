<template>
	<div class="container">
		<div class="row d-flex justify-content-center mt-4">
			<div class="col-9">
				<h1>Connect-me</h1>
			</div>
			<div class="col-9">
				<form @submit.prevent="submitRegister">
					<div
						class="input-group mb-3"
						v-for="(inpute, key) in inputes"
						:key="key"
					>
						<input
							:type="inpute.type"
							class="form-control"
							:placeholder="inpute.placeholder"
							:aria-label="inpute.placeholder"
							v-model="inpute.value"
						/>
					</div>
					<div class="d-flex justify-content-between">
						<button type="submit" class="btn btn-primary" v-if="!loading">
							Envoyer
						</button>
						<button type="button" class="btn btn-primary" disabled v-else>
							Chargement...
						</button>

						<RouterLink to="/register">
							<button type="button" class="btn btn-secondary">Create-me</button>
						</RouterLink>
					</div>
				</form>
				<div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import Toast from "@/components/Toast.vue";
export default {
	name: "Register",
	components: {
		Toast,
	},
	data() {
		return {
			inputes: [
				{
					type: "text",
					placeholder: "Enter your Nickname",
					name: "nickname",
					value: "",
				},
				{
					type: "email",
					placeholder: "Enter your email",
					name: "email",
					value: "",
				},
				{
					type: "password",
					placeholder: "Enter your password",
					name: "password",
					value: "",
				},
				{
					type: "password",
					placeholder: "Enter your password",
					name: "confirm_password",
					value: "",
				},
			],
			loading: false,
		};
	},
	methods: {
		submitRegister() {
			this.loading = true;
			var formData = {};
			this.inputes.forEach((inpute) => {
				formData[inpute.name] = inpute.value;
			});
			console.log(formData);
			axios
				.post(this.$api + "/register", formData)
				.then((response) => {
					if (response.data.success) {
						this.$router.push({ name: "Login" });
					} else {
						this.test = response.data.message;
					}
					console.log(response.data);
				})
				.catch(function (error) {
					// en cas d’échec de la requête
					console.log(error);
				})
				.finally(() => {
					this.loading = false;
				});
		},
	},
};
</script>
