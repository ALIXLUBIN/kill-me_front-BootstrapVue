import axios from "axios";
import Vue from "vue";

const guest = axios.create({
	baseURL: process.env.VUE_APP_API_IP,
	hraders: {
		"content-Type": "application/x-www-form-urlencoded",
		"X-Requested-With": "XMLHttpRequest",
	},
});

export { guest };