<style scoped>
.label-ratio {
	position: fixed;
	justify-self: center;
}
</style>

<template>
	<div class="stat">
		<div class="row">
			<div class="col-2 text-end">
				PV
				<font-awesome-icon :icon="['fas', 'heart']" />
			</div>
			<div class="col-10">
				<div class="progress position-relative" role="progressbar" aria-valuemin="0" aria-valuemax="1000">
					<small class="justify-content-center d-flex position-absolute w-100">{{ character.health }} / {{ character.maxHealth }}</small>

					<div class="progress-bar bg-color-2 text-dark" :style="{
							width: (character.health / character.maxHealth) * 100 + '%',
						}">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-2 text-end">
				Mana
				<font-awesome-icon :icon="['fas', 'wand-sparkles']" />
			</div>
			<div class="col-10">
				<div class="progress-stacked position-relative">
					<small class="justify-content-center d-flex position-absolute w-100">{{ character.mana }} / {{ character.maxMana }}</small>
					<div role="progressbar " aria-label="Segment one" aria-valuemin="0" aria-valuemax="100" class="progress" :style="{
							width: (character.mana / character.maxMana) * 100 + '%',
						}">

						<div class="progress-bar bg-color-3">
						</div>
					</div>
					<div class="progress" :style="{
							width:
								(character.manaRegen % (character.maxMana - character.mana)) +
								'%',
						}">

						<div class="progress-bar progress-bar-striped bg-color-3-light" v-show="
								character.manaRegen % (character.maxMana - character.mana)
							">
							+ {{ character.manaRegen % (character.maxMana - character.mana) }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-6">
				<div class="row">
					<div class="col-4 text-end">
						Shield <font-awesome-icon :icon="['fas', 'shield-cat']" />
					</div>
					<div class="col-8">
						<div class="progress position-relative" role="progressbar" aria-valuemin="0" aria-valuemax="100">
							<small class="justify-content-center d-flex position-absolute w-100">{{ character.shield }} / {{ character.maxShield }}</small>
							<div class="progress-bar bg-color-1 text-dark" :style="{
									width: (character.shield / character.maxShield) * 100 + '%',
								}">

							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-6">
				<div class="row">
					<div class="col-4 text-end">
						Force
						<font-awesome-icon :icon="['fas', 'hand-back-fist']" />
					</div>
					<div class="col-8">
						<div class="progress position-relative" role="progressbar" aria-valuemin="0" aria-valuemax="100">
							<small class="justify-content-center d-flex position-absolute w-100">{{ character.strength }} / {{ character.maxStrength }}</small>

							<div class="progress-bar bg-color-4" :style="{
									width:
										(character.strength / character.maxStrength) * 100 + '%',
								}"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "caracterStats",
	props: {
		character: {
			type: Object,
			required: true,
		},
	},
};
</script>
