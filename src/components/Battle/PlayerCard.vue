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
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  padding: 5px;
}
</style>

<template>
  <span class="character">
    <h2 class="character-name">{{ character.name }}</h2>
  </span>
  <div class="container-fuid card-blur">
    <div class="stats">
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
              Shild <font-awesome-icon :icon="['fas', 'shield-cat']" />
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
                    width: (character.shild / character.maxShild) * 100 + '%',
                  }"
                >
                  {{ character.shild }} / {{ character.maxShild }}
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
    <div class="row">
      <h3>Attaque</h3>
      <div class="col-6 p-2" v-for="(attack, key) in character.attacks">
        <Button :attack="attack" @click="this.attack(attack.id)"></Button>
      </div>
    </div>
    <div class="row">
      <h3>Spécialité</h3>
      <div class="col-6 p-2" v-for="(spell, key) in character.spells">
        <Button :attack="spell" @click="this.attack(attack.id)"></Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Battle/Button.vue";
export default {
  name: "Card",
  components: {
    Button,
  },
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    // console.log(this.character.attacks);
  },
  methods: {
    attack(id) {
      console.log(id);
    },
  },
};
</script>
