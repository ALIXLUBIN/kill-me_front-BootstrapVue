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
    <caracterStats :character="character" />
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
  },
  mounted() {
    // console.log(this.character.attacks);
  },
  methods: {
    attack(id) {
      // console.log(id);
    },
  },
};
</script>
