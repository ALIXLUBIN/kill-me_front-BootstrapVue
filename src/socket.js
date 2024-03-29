import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.VUE_APP_WS_IP;
	// process.env.NODE_ENV === "production" ? undefined : process.env.VUE_APP_WS_IP;

export const socket = io(URL, {
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 500,
    reconnectionDelayMax: 5000,
  });

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("foo", (...args) => {
  state.fooEvents.push(args);
});

socket.on("bar", (...args) => {
  state.barEvents.push(args);
});
