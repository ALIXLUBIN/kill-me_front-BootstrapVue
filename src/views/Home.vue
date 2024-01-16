<style scoped>
ul {
	list-style-type: none;
	padding: 4px;
	margin: 0;
}

.li-character {
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	overflow: hidden;
	background-color: rgba(254, 254, 254);
	backdrop-filter: blur(10px);
	border-radius: 10px;
	border: 1px solid rgba(178, 178, 178, 0.6);
	margin: 3px;
	list-style: none;
	padding: 5px;
}

.li-disabled {
	background-color: rgba(254, 254, 254);
	backdrop-filter: blur(10px);
	border-radius: 10px;
	border: 1px solid rgba(178, 178, 178, 0.6);
	margin: 3px;
	list-style: none;
	padding: 5px;
	opacity: 0.5;
}

.li-active {
	transform: translate(15px);
	/* margin-left: 15px; */
	box-shadow: 0 0 5px var(--color-2) !important;
	font-weight: bold;
}
</style>

<template>
	<BackGround />
	<div class="container">
		<div class="row">
			<div class="col-12 p-3">
				<h2>Bonjour {{ player.nickname }}</h2>
				<p>Score: {{ player.score }} • Thunes: {{ player.money }}</p>
			</div>
		</div>
		<div class="row">
			<div class="col-4 card-blur">
				<h3>Vos personnages:</h3>
				<p>Choisisez votre personnage ici</p>
				<ul class="m-0">
					<li
						class="li-character shadow d-flex align-items-center"
						v-for="(ownedCarater, index) in owned.true"
						:class="{
							'li-active': selectCharacter == ownedCarater,
						}"
						@click="selectCharacter = ownedCarater"
					>
						{{ characters[ownedCarater].name }}
						<smallLine :show="selectCharacter == ownedCarater" />
					</li>

					<li
						class="li-character shadow d-flex align-items-center li-disabled"
						v-for="(ownedCarater, index) in owned.false"
						:class="{
							'li-active': selectCharacter == ownedCarater,
						}"
						@click="selectCharacter = ownedCarater"
					>
						{{ characters[ownedCarater].name }}
						<smallLine :show="selectCharacter == ownedCarater" />
					</li>
				</ul>
			</div>
			<div class="col-7 card-blur ms-3">
				<div class="row">
					<div class="col-12 text-center">
						<h3>Lancer un match</h3>
					</div>
					<div class="col-12">
						<h3 v-show="!selectCharacter" class="placeholder-glow">
							<span class="placeholder col-6"></span>
						</h3>
						<h3 v-if="selectCharacter">
							{{ characters[selectCharacter].name }}
						</h3>
						<div class="p-2">
							<caracterStats
								:character="characters[selectCharacter]"
								v-if="selectCharacter"
							/>
						</div>
					</div>
					<div class="rol">
						<div class="col-12 d-grid gap-2 pt-2">
							<button class="btn btn-primary btn-block" @click="handleClick" :class="{
										'disabled': inqueue,
									}">
								<div
									v-if="
										!selectCharacter || characters[selectCharacter].owned == '1'
									"

								>
									Lancer un match
								</div>
								<div v-else>
									Acheter le personnage •
									{{ characters[selectCharacter].price }}
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { auth } from "@/plugins/axios.js";
import BackGround from "@/components/BackGround.vue";
import smallLine from "@/components/Lines/smallLines.vue";
import caracterStats from "@/components/Battle/caracterStats.vue";

export default {
	name: "Home",
	components: {
		BackGround,
		smallLine,
		caracterStats,
	},
	data() {
		return {
			player: {},
			selectCharacter: 0,
			characters: {},
			owned: {},
			inqueue: false,
		};
	},

	beforeMount() {

		if (!app.config.globalProperties.$conn) {
			// reconnect();
		}

		try {
			this.$conn.onmessage = function (e) {
				data = JSON.parse(e);

				if (data.type == "founedPlayer") {
					this.$router.push({ name: "Battle" });
				}
			};
		} catch (error) {
			this.reconnect();

			// console.error(error);
		}

		this.player.nickname = localStorage.getItem("nickname");
		this.player.score = localStorage.getItem("score");
		this.player.money = localStorage.getItem("money");

		auth
			.get(process.env.VUE_APP_API_IP + "/character", {})
			.then((response) => {
				this.characters = response.data["characters"];
				this.owned = response.data["owned"];

				if (this.owned.true.length > 0) {
					this.selectCharacter = this.owned.true[0];
				} else {
					this.selectCharacter = this.owned.false[0];
				}
			})
			.catch((error) => {
				console.log(error);
			});
	},

	methods: {
		handleClick() {
			if (this.inqueue) {
				this.eventBus.emit("show-toast", "Vous êtes déjà dans la file d'attente");				
				return;
			}
			if (
				!this.selectCharacter ||
				this.characters[this.selectCharacter].owned == "1"
			) {
				this.launchMatch();
			} else {
				this.buyCharacter();
			}
		},
		launchMatch() {
			auth
				.post("/battle", { character_id: this.selectCharacter })
				.then((response) => {
					if (response.data.messages == "addedToQueue") {
						console.log("addedToQueue");
						this.eventBus.emit("show-toastSuccess", "Vous êtes dans la file d'attente");
						this.inqueue = true;
					} else {
						try {
							console.log(response.data),
							this.$conn.send(
								JSON.stringify({
									to_user_id: response.data.user_id,
									type: "founedPlayer",
									user_id: response.data.user_id,
									character_id: this.selectCharacter,
								})
							);
							this.$router.push({ name: "Battle" });
						} catch (error) {
							reconnect();
							console.log(error);
						}
					}

					// this.$router.push({ name: "Battle" });
				})
				.catch((error) => {
					this.eventBus.emit("show-toast", error.response.data.messages.error)
				})
		},
		buyCharacter() {
			auth
				.post(`/character/${this.selectCharacter}/buy`, {})
				.then((response) => {
					console.log(response.data);
					this.player.money = response.data.money;
					this.owned.true.push(this.selectCharacter);
					this.owned.false.splice(
						this.owned.false.indexOf(this.selectCharacter),
						1
					);
					this.characters[this.selectCharacter].owned = 1;
				});
		},
		reconnect() {
		try {
		var conn = new WebSocket("ws://192.168.1.17:8081");
	
		conn.onopen = function (e) {
			console.log("Connection established!");
		};
	
		app.config.globalProperties.$conn = conn;
	} catch (error) {
		console.log(error);
	}
		}
	},
};
</script>
