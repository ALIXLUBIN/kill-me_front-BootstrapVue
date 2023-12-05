import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: () => import("../views/Home.vue"),
	},
	{
		path: "/about",
		name: "about",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
	},
	{
		path: "/login",
		name: "login",
		component: () => import("../views/LoginRegister.vue"),
		props: { type: "login" },
	},
	{
		path: "/register",
		name: "register",
		component: () => import("../views/LoginRegister.vue"),
		props: { type: "register" },
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
