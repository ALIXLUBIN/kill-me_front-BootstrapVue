import { createRouter, createWebHashHistory } from "vue-router";

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
	},
	{
		path: "/register",
		name: "register",
		component: () => import("../views/LoginRegister.vue"),
	},
	{
		path: "/battle",
		name: "battle",
		component: () => import("../views/Battle.vue"),
	},
	{
		path: "/endGame",
		name: "endGame",
		component: () => import("../views/endGame.vue"),
	},
	{
		path: "/profile",
		name: "profile",
		component: () => import("../views/Profile.vue"),
	},
	{
		path: "/admin",
		name: "admin",
		beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem("scope") == "admin") {
				next();
			} else {
				router.push("/");
			}
		},
		children: [
			{
				path: "characters",
				name: "characters",
				component: () => import("../views/admin/Characters.vue"),
			},
		],
	},
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
