import axios from "axios";
import router from "../router";
import Vue from "vue";

const guest = axios.create({
	baseURL: process.env.VUE_APP_API_IP,
	hraders: {
		"content-Type": "application/x-www-form-urlencoded",
		"X-Requested-With": "XMLHttpRequest",
	},
});

var accessToken = document.cookie
	.split("; ")
	.find((row) => row.startsWith("access_token="));

accessToken !== undefined
	? (accessToken = accessToken.split("=")[1])
	: (accessToken = "")

const auth = axios.create({
	baseURL: process.env.VUE_APP_API_IP,
	withCredentials: true,
	headers: {
		// Authorization: `Bearer ${accessToken}`,
		// "content-Type": "application/x-www-form-urlencoded",
		// "X-Requested-With": "XMLHttpRequest",
	},
});

auth.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.status === 401 && error.response.data.messages === "Unauthenticated") {
			sessionStorage.clear();
			router.push("/login");
		}
		return Promise.reject(error);
	}
);

export { guest, auth };