<style>
body{
	/* overflow: hidden; */
}

.main {
	transition: all 0.5s ease-in-out;
	height: 90vh;
}

.looser {
	background-color: rgba(248, 163, 163, 0.5);
}

.winner {
	background-color: rgba(155, 255, 155, 0.6);
}

.reduceHeight {
	height: 20vh;
}
</style>

<template>
	<BackGround :type="lineType" />

	<div class="row main" :class="{'reduceHeight': collapse}">
		<div class="col-12 d-flex justify-content-center align-items-center">
			<div class="card-blur m-3 text-center d-inline-block p-4" :class="{'winner': win, 'looser': !win}">
				<div class="text-uppercase fs-1 fw-bold">
					<span v-show="!win">Défaite</span>
					<span v-show="win">Victoire</span>
				</div>
			</div>
		</div>
		<div class="col-12 text-center">
			<p class="card-blur d-inline-block">
				-30 point &bull; {{ self.score }} score
			</p>
		</div>
	</div>
	<div class="container">

		<div class="row">
			<div class="col">
				<PlayerCard :character="self" :turn="self.user_id == turn" v-if="self" />
			</div>
			<div class="col">
				<PlayerCard :character="ennemy" :turn="self.user_id == turn" v-if="self" />
			</div>

		</div>
	</div>
</template>

<script>
import PlayerCard from "@/components/Battle/PlayerCard.vue";
import BackGround from "@/components/BackGround.vue";
import { auth } from "@/plugins/axios.js";

export default {
	components: {
		BackGround,
		PlayerCard,
	},

	data() {
		return {
			lineType: "centerSmall",
			win: false,
			collapse: false,
			self: {},
			ennemy: {},
		};
	},

	computed: {
		win() {
			return this.self.health > 0 && this.ennemy.health <= 0;
		},
	},

	mounted() {
		setTimeout(() => {
			this.chanheStuff();
		}, 3000);

		auth.get("/battle/endGame")
			.then((response) => {
				this.getCharacter(response.data["self"].character_id).then((data) => {
					this.self = data;
					this.self.mana = response.data["self"].mana;
					this.self.user_id = response.data["self"].user_id;
					this.self.character_id = response.data["self"].character_id;
					this.self.health = response.data["self"].health;
					this.self.strength = response.data["self"].strength;
					this.self.shield = response.data["self"].shield;
					this.self.win = response.data["self"].win;
					this.turn = response.data["self"].current_turn;
					this.self.nickname = response.data["self"].nickname;
					this.self.score = response.data["self"].score;

				});
				this.getCharacter(response.data["ennemy"].character_id).then((data) => {
					this.ennemy = data;

					this.ennemy.mana = response.data["ennemy"].mana;
					this.ennemy.user_id = response.data["ennemy"].user_id;
					this.ennemy.character_id = response.data["ennemy"].character_id;
					this.ennemy.health = response.data["ennemy"].health;
					this.ennemy.strength = response.data["ennemy"].strength;
					this.ennemy.shield = response.data["ennemy"].shield;
					this.ennemy.last_attack = response.data["ennemy"].last_attack;
					this.ennemy.win = response.data["ennemy"].win;
					this.ennemy.nickname = response.data["ennemy"].nickname;
					console.log(data);
				});
			});
	},

	methods: {

		async getCharacter(id) {
			const response = await auth.get("/character/" + id);
			return response.data;
		},

		chanheStuff() {
			this.lineType = "cover";
			this.collapse = true;
		},

	},
}
</script>