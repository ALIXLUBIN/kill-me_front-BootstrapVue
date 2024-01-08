<style scoped>
ul {
  list-style-type: none;
  padding: 4px;
  margin: 0;
}

.li-character {
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
  cursor: not-allowed;
}

.li-active {
  margin-left: 15px;
  box-shadow: 0 0 5px var(--color-2) !important;
  font-weight: bold;
}
</style>

<template>
  <BackGround />
  <div class="container">
    <div class="row">
      <div class="col-12 p-3">
        <h2>Bonjour {{ player.name }}</h2>
        <p>Score: {{ player.score }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-4 card-blur">
        <h3>Vos personnages:</h3>
        <p>Choisisez votre personnage ici</p>
        <ul class="m-0">
          <li
            class="li-character shadow d-flex"
            v-for="character in characters"
            :key="character.id"
            :class="{
              'li-disabled': !character.owned,
              'li-active': character.active,
            }"
            @click="selectCharacter(character.id)"
          >
            {{ character.name }}
            <smallLine v-if="character.active" />
          </li>
        </ul>
      </div>
      <div class="col-7 card-blur ms-3">
        <div class="row">
          <div class="col-6">
            <h3>Lancer un match</h3>
            <p>Kill them</p>
          </div>
          <div class="col-6">
            <h3>{{ characters[selectCharacter].name }}</h3>
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
                      width:
                        (characters[selectCharacter].health /
                          characters[selectCharacter].maxHealth) *
                          100 +
                        '%',
                    }"
                  >
                    {{ characters[selectCharacter].health }} /
                    {{ characters[selectCharacter].maxHealth }}
                  </div>
                </div>
              </div>
            </div>
            <p>mana: {{ characters[selectCharacter].maxMana }}</p>
            <p>force: {{ characters[selectCharacter].strength }}</p>
            <p>shild: {{ characters[selectCharacter].shild }}</p>
          </div>
          <div class="rol">
            <div class="col-12">
              <button
                class="btn btn-primary btn-block text-uppercase"
                @click="test"
              >
                Commencer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BackGround from "@/components/BackGround.vue";
import smallLine from "@/components/Lines/smallLines.vue";

export default {
  name: "Home",
  components: {
    BackGround,
    smallLine,
  },
  data() {
    return {
      player: {
        name: "Ticket",
        score: 1300,
      },
      selectCharacter: 1,
      characters: {
        1: {
          id: 1,
          name: "Barry",
          type: 1,
          health: 100,
          maxHealth: 100,
          maxMana: 100,
          strength: 40,
          shild: 10,
          owned: true,
          active: true,
        },
        2: {
          id: 2,
          name: "Slayer",
          type: 1,
          maxHealth: 100,
          maxMana: 100,
          strength: 40,
          shild: 10,
          owned: true,
          active: false,
        },
        3: {
          id: 3,
          name: "Passage pied thon",
          type: 1,
          maxHealth: 100,
          maxMana: 100,
          strength: 40,
          shild: 10,
          owned: false,
          active: false,
        },
        4: {
          id: 4,
          name: "Solenne",
          type: 1,
          maxHealth: 100,
          maxMana: 100,
          strength: 40,
          shild: 10,
          owned: false,
          active: false,
        },
      },
    };
  },

  methods: {
    // TODO: remove this
    // <button @click="test">test</button>
    test() {
      axios.post(process.env.VUE_APP_API_IP + "/home", "test", {
        withCredentials: true,
        headers: {
          "access-control-expose-headers": "Set-Cookie",
        },
      });
    },
  },
};
</script>
