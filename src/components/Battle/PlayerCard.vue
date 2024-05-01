<style scooped>
/* .container-fuid {
  position: relative;
} */

.character-name {
	display: inline-block;
	z-index: 1;
	position: relative;
	left: 20px;
	top: 20px;
	backdrop-filter: blur(2px);
	/* mask-image: linear-gradient(
		to bottom,
		transparent 0%,
		black 10%,
		black 90%,
		transparent 100%
	); */
	padding: 5px;
}

.character-name *,
.character-name {
	text-shadow: rgb(252, 251, 249) 0 0 5px;
}
</style>

<template>
	<span class="character">
		<h2 class="character-name">{{ character.name }} - <span class="fw-light">{{ character.nickname }}</span></h2>
	</span>
	<div class="container-fuid card-blur">
		<caracterStats :character="character" />
		<div v-if="type">
			<div class="row" :class="{ 'd-none': displayAttack }">
				<h3>Attaque</h3>
				<div class="col-6 p-2" v-for="(attack, key) in character.attacks">
					<Button :enbale="turn" :attack="attack" @click="this.attack(attack.id)"></Button>
				</div>
			</div>
			<div class="row">
				<h3>Spécialité</h3>
				<div class="col-6 p-2" v-for="(spell, key) in character.spells">
					<Button :enbale="turn" :attack="spell" @click="this.attack(attack.id)"></Button>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="row">
				<h3>Dernière attaque</h3>
				<div class="col-12 p-2" v-for="(attack, key) in character.attacks" v-show="attack.id == lastAttack">
					<Button onClick="false" :attack="attack" @click="this.attack(attack.id)"></Button>
				</div>
				<div class="col-12 p-2" v-for="(spell, key) in character.spells" v-show="spell.id == lastAttack">
					<Button onClick="false" :attack="spell" @click="this.attack(attack.id)"></Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Button from "@/components/Battle/Button.vue";
import caracterStats from "@/components/Battle/caracterStats.vue";
export default {
	name: "Card",
	components: {
		Button,
		caracterStats,
	},
	props: {
		character: {
			type: Object,
			required: true,
		},
		type: {
			type: Boolean,
			required: false,
			default: true,
		},
    lastAttack: {
      type: Number,
      required: false,
      default: null,
    },
		turn: {
			type: Boolean,
			required: false,
			default: true,
		},
		displayAttack: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	mounted() {},
	methods: {
		attack(id) {},
	},
};
</script>
