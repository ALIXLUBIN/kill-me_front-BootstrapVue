<template>
	<div class="container">
		<div class="row">
			<div class="col-12">
				<h1>Connect-me</h1>
			</div>
			<div class="col-12">
				<form @submit="submitRegister">
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
							v-model="form[inpute.name]"
						/>
					</div>
					<div class="d-flex justify-content-between">
						<button type="submit" class="btn btn-primary">Submit</button>

						<RouterLink to="/register">
							<button type="button" class="btn btn-primary">Create-me</button>
						</RouterLink>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "Register",
	data() {
		return {
			inputes: [
				{
					type: "text",
					placeholder: "Enter your name",
					name: "name",
				},
				{
					type: "password",
					placeholder: "Enter your password",
					name: "password",
				},
			],
			form: {
				name: "",
				email: "",
				password: "",
			},
			test: false,
		};
	},
	methods: {
		submitRegister() {
			console.log("boop");
			this.$guest.post("/register", this.form).then((response) => {
				console.log(response);
			});
		},
	},
};
</script>
