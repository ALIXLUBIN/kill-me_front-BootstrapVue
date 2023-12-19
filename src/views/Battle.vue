<template>
  <BackGround size="light" />
  <div class="container-fluid py-5">
    <div class="row d-md-flex flex-md-row-reverse">
      <div class="col-12 col-md-3">
        <PlayerCard :character="character" />
      </div>
      <div class="col-12 col-md-9">
        <PlayerCard :character="character" />
      </div>
    </div>
  </div>
</template>

<script>
import PlayerCard from "@/components/Battle/PlayerCard.vue";
import BackGround from "@/components/Lines/centerSmall.vue";

export default {
  name: "Battle",
  components: {
    PlayerCard,
    BackGround,
  },
  data() {
    return {
      character: {
        id: 1,
        name: "Barry",
        type: 1,
        health: 100,
        maxHealth: 1000,
        mana: 70,
        manaRegen: 40,
        maxMana: 100,
        strength: 40,
        maxStrength: 70,
        shild: 10,
        maxShild: 35,
        attacks: [
          {
            id: 1,
            name: "Punch",
            type: 1,
            typeName: "Physical",
            damage: 10,
            manaCost: 0,
            shildPiercing: 25,
          },
          {
            id: 2,
            name: "Kick",
            typeName: "Physical",
            type: 1,
            damage: 15,
            manaCost: 0,
            shildPiercing: 0,
          },
          {
            id: 3,
            name: "Fireball",
            type: 2,
            typeName: "Magical",
            damage: 20,
            manaCost: 10,
            shildPiercing: 50,
          },
          {
            id: 4,
            name: "Ice Shard",
            type: 2,
            typeName: "Magical",
            damage: 25,
            manaCost: 15,
            shildPiercing: 0,
          },
        ],
      },
    };
  },
};
</script>
