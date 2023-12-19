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
            effects: [
              {
                icon: "hand-back-fist",
                value: '10',
              },
              {
                icon: "shield-virus",
                value: '25%',
              }
            ],
          },
          {
            id: 2,
            name: "Kick",
            effects: [
              {
                icon: "hand-back-fist",
                value: '15',
              }
            ],
          },
          {
            id: 3,
            name: "Fireball",
            effects: [
              {
                icon: "wand-sparkles",
                value: '-20',
              },
              {
                icon: "hand-back-fist",
                value: '10',
              },
              {
                icon: "shield-virus",
                value: '50%',
              }
            ],
            type: 2,
            typeName: "Magical",
            damage: 20,
            manaCost: 10,
            shildPiercing: 50,
          },
          {
            id: 4,
            name: "Ice Shard",
            effects: [
              {
                icon: "wand-sparkles",
                value: '15',
              },
              {
                icon: "hand-back-fist",
                value: '25',
              }
            ],
          },
        ],
        spells: [
          {
            id: 5,
            name: "Heal",
            effects: [
              {
                icon: "wand-sparkles",
                value: '-15',
              },
              {
                icon: "heart",
                value: '+10',
              }
            ]
          },
          {
            id: 6,
            name: "Shield",
            effects: [
              {
                icon: "wand-sparkles",
                value: '-10',
              },
              {
                icon: "shield-cat",
                value: '+10',
              }
            ]
          },
        ],
      },
    };
  },
};
</script>
