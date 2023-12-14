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
        maxHealth: 100,
        mana: 100,
        maxMana: 100,
        strength: 1,
        maxStrength: 1.5,
        defense: 1,
        maxDefense: 0.5,
        attacks: [
          {
            id: 1,
            name: "Punch",
            type: 1,
            typeName: "Physical",
            damage: 10,
            manaCost: 0,
          },
          {
            id: 2,
            name: "Kick",
            typeName: "Physical",
            type: 1,
            damage: 15,
            manaCost: 0,
          },
          {
            id: 3,
            name: "Fireball",
            type: 2,
            typeName: "Magical",
            damage: 20,
            manaCost: 10,
          },
          {
            id: 4,
            name: "Ice Shard",
            type: 2,
            typeName: "Magical",
            damage: 25,
            manaCost: 15,
          },
        ],
      },
    };
  },
};
</script>
