<style>
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

	<div class="modal" id="modal-new" ref="modalRef" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Modification / ajout</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<form @submit.prevent="submitModal()">
					<div class="modal-body">
						<div class="mb-3" v-for="(inpute, key) in Inpute" :key="key">
							<label :for="inpute.name" class="form-label">{{
								inpute.name
								}}</label>
							<input :id="inpute.name" :type="inpute.type" class="form-control" :placeholder="inpute.placeholder" :aria-label="inpute.placeholder" v-model="inpute.value" />
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
							Fermer
						</button>
						<button type="submit" class="btn btn-primary">Envoyer</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="modal" id="modal-liaison" ref="modalLiaison" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Modification / ajout</h5>

					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<form @submit.prevent="submitLiaison()">

					<div class="modal-body">
						<div class="mb-3">
							<label class="form-label">Attaques / spells</label>
							<input type="text" class="form-control" placeholder="Recherche" v-model="inputLiaisonAttaks" />
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
							Fermer
						</button>
						<button type="submit" class="btn btn-primary">Envoyer</button>
					</div>

				</form>
			</div>
		</div>
	</div>


	<div class="container-fluid">
		<div class="row m-4">
			<h1>Gestion des personnage</h1>
		</div>
		<div class="row m-1">
			<h2>personnage</h2>
			<div class="col-12 card-blur table-responsive">
				<div class="btn btn-primary mb-3" @click="showModal(null, 0)">Ajouter un personnage</div>

				<table class="table">
					<thead>
						<tr>
							<th scope="col"></th>
							<th scope="col"></th>
							<th scope="col" v-for="(value, key) in Object.values(characters)[0]">
								{{ key }}
							</th>
						</tr>
						<template v-for="character in characters">
							<tr>
								<td><font-awesome-icon @click="showModal(character.id, 0)" :icon="['fas', 'pen-to-square']" class="text-primary" /></td>
								<td><font-awesome-icon @click="showModalLaiaison(character.id)" class="text-primary" :icon="['fas', 'hand-fist']" /></td>
								<td scope="col" v-for="(value, key) in Object.values(characters)[0]">
									{{ character[key] }}
								</td>
							</tr>
						</template>
					</thead>
				</table>
			</div>
		</div>
		<div class="rox m-1">
			<h2>Attaques</h2>
		</div>
		<div class="col-12 card-blur table-responsive">
			<div class="btn btn-primary mb-3" @click="showModal(null, 1)">Ajouter une attaque</div>
			<table class="table">
				<thead>
					<tr>
						<th scope="col"></th>
						<th scope="col" v-for="(value, key) in Object.values(attacks)[0]">
							{{ key }}
						</th>
					</tr>
					<template v-for="attack in attacks">
						<tr>
							<td><font-awesome-icon @click="showModal(attack.id, 1)" :icon="['fas', 'pen-to-square']" class="text-primary" /></td>
							<td scope="col" v-for="(value, key) in Object.values(attacks)[0]">
								{{ attack[key] ?? 0}}
							</td>
						</tr>
					</template>
				</thead>
			</table>
		</div>
	</div>
</template>

<script>
import { auth } from "@/plugins/axios.js";
import smallLine from "@/components/Lines/smallLines.vue";

export default {
	name: "Characters",
	components: {
		smallLine,
	},

	data() {
		return {
			fromCharacters: {},
			characters: {},
			attacks: {},
			Inpute: [],
			inputLiaisonAttaks: "",
			modalType: 0,
			selectCharacter: null,
			characterInpute: [
				{
					type: "text",
					placeholder: "Le nom du personnage",
					name: "name",
					value: "",
				},
				{
					type: "number",
					placeholder: "",
					name: "health",
					value: "",
				},
				{
					type: "number",
					placeholder: "",
					name: "maxHealth",
					value: "",
				},
				{
					type: "number",
					placeholder: "",
					name: "mana",
					value: "",
				},
				{
					type: "number",
					placeholder: "",
					name: "maxMana",
					value: "",
				},
				{
					type: "number",
					placeholder: "",
					name: "manaRegen",
					value: "",
				},
				{
					type: "number",
					placeholder: "",
					name: "strength",
					value: "",
				},
				{
					type: "number",
					placeholder: "",
					name: "maxStrength",
					value: "",
				},
				{
					type: "number",
					placeholder: "",
					name: "shield",
					value: "",
				},
				{
					type: "number",
					placeholder: "",
					name: "maxShield",
					value: "",
				},
				{
					type: "number",
					placeholder: "",
					name: "price",
					value: "",
				},
				{
					type: "hidden",
					placeholder: "",
					name: "id",
					value: "",
				},
			],
			AttckInputes: [
				{
					type: "text",
					placeholder: "Le nom de l'attaque",
					name: "name",
					value: "",
				},
				{
					type: "number",
					placeholder: "",
					name: "damage",
					value: "",
				},
				{
					type: "number",
					placeholder: "",
					name: "shieldPiercing",
					value: "",
				},
				{
					type: "number",
					placeholder: "",
					name: "manaCost",
					value: "",
				},
				{
					type: "number",
					placeholder: "",
					name: "heal",
					value: "",
				},
				{
					type: "number",
					placeholder: "",
					name: "type",
					value: "",
				},
				{
					type: "number",
					placeholder: "",
					name: "shieldRepair",
					value: "",
				},
				{
					type: "hidden",
					placeholder: "",
					name: "id",
					value: "",
				},
			],
		};
	},

	mounted() {
		this.getCharacters();
		this.getAttacks();
		this.modal = new bootstrap.Modal(this.$refs.modalRef);
		this.modalLiaison = new bootstrap.Modal(this.$refs.modalLiaison);

	},

	methods: {
		showModal(id = null, type = 0) {
			this.modalType = type;
			this.Inpute = type ? this.AttckInputes : this.characterInpute;
			if (id && !type) {
				var selectCharacter = this.characters.find(obj => obj.id === id)

				this.characterInpute[0].value = selectCharacter.name;
				this.characterInpute[1].value = selectCharacter.health;
				this.characterInpute[2].value = selectCharacter.maxHealth;
				this.characterInpute[3].value = selectCharacter.mana;
				this.characterInpute[4].value = selectCharacter.maxMana;
				this.characterInpute[5].value = selectCharacter.manaRegen;
				this.characterInpute[6].value = selectCharacter.strength;
				this.characterInpute[7].value = selectCharacter.maxStrength;
				this.characterInpute[8].value = selectCharacter.shield;
				this.characterInpute[9].value = selectCharacter.maxShield;
				this.characterInpute[10].value = selectCharacter.price;
				this.characterInpute[11].value = selectCharacter.id;

				this.selectCharacter = id;
			} else if (id && type) {
				var selectAttack = this.attacks.find(obj => obj.id === id)

				this.AttckInputes[0].value = selectAttack.name;
				this.AttckInputes[1].value = selectAttack.damage;
				this.AttckInputes[2].value = selectAttack.shieldPiercing;
				this.AttckInputes[3].value = selectAttack.manaCost;
				this.AttckInputes[4].value = selectAttack.heal;
				this.AttckInputes[5].value = selectAttack.type;
				this.AttckInputes[6].value = selectAttack.shieldRepair;
				this.AttckInputes[7].value = selectAttack.id;

				this.selectCharacter = id;
			} else if (!idß) {
				this.Inpute.forEach((inpute) => {
					inpute.value = "";
				});
			}
			this.modal.show();
		},

		showModalLaiaison(id) {

			this.selectCharacter = id;

			this.inputLiaisonAttaks = "";
			this.inputLiaisonSpells = "";

			auth.get("/character/" + id).then((response) => {
				response.data.attacks.forEach(element => {
					this.inputLiaisonAttaks += element.id + ",";
				});

				response.data.spells.forEach(element => {
					this.inputLiaisonAttaks += element.id + ",";
				});

				this.inputLiaisonAttaks = this.inputLiaisonAttaks.slice(0, -1);

				this.modalLiaison.show();
			}).catch((error) => {
				console.log(error);
				this.eventBus.emit("show-toast", "Erreur lors de la récupération des attaques", {
				});
			})
		},

		getCharacters() {
			auth.get("/admin/character").then((response) => {
				this.characters = response.data;
				this.fromCharacters = { ...Object.values(this.characters)[0] };

				delete this.fromCharacters.id;

			});
		},

		getAttacks() {
			auth.get("/admin/attaque").then((response) => {
				this.attacks = response.data;
				this.fromAttacks = { ...Object.values(this.characters)[0] };

				delete this.fromAttacks.id;

			}).catch((error) => {
				this.eventBus.emit("show-toast", "Erreur lors de la récupération des attaques", {
				});
			})
		},

		submitModal() {
			if (this.modalType) {
				this.submitAttack();
			} else {
				this.submitCharacter();
			}
		},

		submitLiaison() {

			auth
				.put("/admin/characterAttack/" + this.selectCharacter, {attack: this.inputLiaisonAttaks})
				.then((response) => {
					console.log(response);
					this.getCharacters();
					this.modalLiaison.hide();
				})
				.catch((error) => {
					this.eventBus.emit("show-toast", "Erreur lors de la liaison", {
					});
					console.log(error);
				});
		},

		submitCharacter() {

			var formData = {};
			this.characterInpute.forEach((inpute) => {
				formData[inpute.name] = inpute.value;
			});

			if (formData.id) {
				auth
					.put("/admin/character/" + formData.id, formData)
					.then((response) => {
						console.log(response);
						this.getCharacters();

						// hide modal
						this.modal.hide();
					})
					.catch((error) => {
						console.log(error);
					});
				return;
			}
			auth
				.post("/admin/character", formData)
				.then((response) => {
					console.log(response);
					this.getCharacters();
					this.modal.hide();
				})
				.catch((error) => {
					console.log(error);
				});
		},

		submitAttack() {
			var formData = {};
			this.AttckInputes.forEach((inpute) => {
				formData[inpute.name] = inpute.value;
			});

			if (formData.id) {
				auth
					.put("/admin/attaque/" + formData.id, formData)
					.then((response) => {
						console.log(response);
						this.getAttacks();

						// hide modal
						this.modal.hide();
					})
					.catch((error) => {
						console.log(error);
					});
				return;
			}
			auth
				.post("/admin/attaque", formData)
				.then((response) => {
					console.log(response);
					this.getAttacks();
					this.modal.hide();
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>
