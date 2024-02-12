<template>
	<div class="stat">
		<div class="row">
			<div class="col-2 text-end">
				PV
				<font-awesome-icon :icon="['fas', 'heart']" />
			</div>
			<div class="col-10">
				<div
					class="progress"
					role="progressbar"
					aria-valuemin="0"
					aria-valuemax="1000"
				>
					<div
						class="progress-bar bg-color-2 text-dark"
						:style="{
							width: (character.health / character.maxHealth) * 100 + '%',
						}"
					>
						{{ character.health }} / {{ character.maxHealth }}
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
				<div class="progress-stacked">
					<div
						role="progressbar"
						aria-label="Segment one"
						aria-valuemin="0"
						aria-valuemax="100"
						class="progress"
						:style="{
							width: (character.mana / character.maxMana) * 100 + '%',
						}"
					>
						<div class="progress-bar bg-color-3">
							{{ character.mana }} / {{ character.maxMana }}
						</div>
					</div>
					<div
						class="progress"
						:style="{
							width:
								(character.manaRegen % (character.maxMana - character.mana)) +
								'%',
						}"
					>
						<div
							class="progress-bar progress-bar-striped bg-color-3-light"
							v-show="
								character.manaRegen % (character.maxMana - character.mana)
							"
						>
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
						<div
							class="progress"
							role="progressbar"
							aria-valuemin="0"
							aria-valuemax="100"
						>
							<div
								class="progress-bar bg-color-1 text-dark"
								:style="{
									width: (character.shield / character.maxshield) * 100 + '%',
								}"
							>
								{{ character.shield }} / {{ character.maxshield }}
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
						<div
							class="progress"
							role="progressbar"
							aria-valuemin="0"
							aria-valuemax="100"
						>
							<div
								class="progress-bar bg-color-4"
								:style="{
									width:
										(character.strength / character.maxStrength) * 100 + '%',
								}"
							>
								{{ character.strength }} / {{ character.maxStrength }}
							</div>
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