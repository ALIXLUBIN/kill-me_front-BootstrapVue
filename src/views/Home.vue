<style scoped>
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
  <BackGround :type="this.line" />
  <div class="container">
    <div class="row">
      <div class="col-12 p-3">
        <h2>Bonjour {{ player.nickname }}</h2>
        <p>Score: {{ player.score }} <font-awesome-icon :icon="['fas', 'star']" /> • Argent: {{ player.money }} <font-awesome-icon :icon="['fas', 'bitcoin-sign']" /></p>
      </div>
    </div>
    <div class="row">
      <div class="col-4 card-blur">
        <h3>Vos personnages:</h3>
        <p>Choisisez votre personnage ici</p>
        <ul class="m-0">
          <li class="li-character shadow d-flex align-items-center" v-for="(ownedCarater, index) in owned.true" :class="{
              'li-active': selectCharacter == ownedCarater,
            }" @click="selectCharacter = ownedCarater">
            {{ characters[ownedCarater].name }}
            <smallLine :show="selectCharacter == ownedCarater" />
          </li>

          <li class="li-character shadow d-flex align-items-center li-disabled" v-for="(ownedCarater, index) in owned.false" :class="{
              'li-active': selectCharacter == ownedCarater,
            }" @click="selectCharacter = ownedCarater">
            {{ characters[ownedCarater].name }}
            <smallLine :show="selectCharacter == ownedCarater" />
          </li>
        </ul>
      </div>
      <div class="col-7 card-blur ms-3">
        <div class="row">
          <div class="col-12 text-center">
            <h3>Lancer un match</h3>
          </div>
          <div class="col-12">
            <h3 v-show="!selectCharacter" class="placeholder-glow">
              <span class="placeholder col-6"></span>
            </h3>
            <h3 v-if="selectCharacter">
              {{ characters[selectCharacter].name }}
            </h3>
            <div class="p-2">
              <caracterStats :character="characters[selectCharacter]" v-if="selectCharacter" />
            </div>
          </div>
          <div class="rol">
            <div class="col-12 d-grid gap-2 pt-2">
              <button class="btn btn-primary btn-block" @click="handleClick">
                <div v-if="
                    !selectCharacter || characters[selectCharacter].owned == '1'
                  ">
                  Lancer un match
                </div>
                <div v-else>
                  Acheter le personnage •
                  {{ characters[selectCharacter].price }}
                  <font-awesome-icon :icon="['fas', 'bitcoin-sign']" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "@/plugins/axios.js";
import BackGround from "@/components/BackGround.vue";
import smallLine from "@/components/Lines/smallLines.vue";
import caracterStats from "@/components/Battle/caracterStats.vue";
import { socket } from "@/socket.js";
import router from "@/router";
import { state } from "@/socket.js";

export default {
  name: "Home",
  components: {
    BackGround,
    smallLine,
    caracterStats,
  },
  data() {
    return {
      line: "centerSmall",
      player: {},
      selectCharacter: 0,
      characters: {},
      owned: {},
      waitForPlayer: false,
    };
  },

  computed: {
    connected() {
      return state.connected;
    },
  },

  created() {
  },

  beforeMount() {

    try {
      this.$conn.onmessage = function (e) {
        console.log(e.data);
      };
    } catch (error) {
      console.error(error);
    }

    this.player.nickname = localStorage.getItem("nickname");
    this.player.score = localStorage.getItem("score");
    this.player.money = localStorage.getItem("money");

    auth
      .get(process.env.VUE_APP_API_IP + "/character", {})
      .then((response) => {
        this.characters = response.data["characters"];
        this.owned = response.data["owned"];

        if (this.owned.true.length > 0) {
          this.selectCharacter = this.owned.true[0];
        } else {
          this.selectCharacter = this.owned.false[0];
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    handleClick() {
      if (
        !this.selectCharacter ||
        this.characters[this.selectCharacter].owned == "1"
      ) {
        this.launchMatch();
      } else {
        this.buyCharacter();
      }
    },
    launchMatch() {
      if (!state.connected) {
        this.eventBus.emit("show-toast", "Impossible de joindre le serveur");
        return;
      }
      auth
        .post("/joinBattle", { character_id: this.selectCharacter })
        .then((response) => {
          if (response.data.messages == "waiting") {
            this.waitForPlayer = true;
            this.line = "cover";
            this.eventBus.emit("show-toast", "En attente d'un joueur");
            socket.on("playerFound", (data) => {
              socket.off("playerFound");
              router.push("/battle");
            });
          } else if (response.data.messages == "battle_created") {
            router.push("/battle");
          } else if (response.data.messages == "inGame") {
            this.$router.push("/battle");
          }
        })
        .catch((error) => {
          this.eventBus.emit("show-toast", error.response.data.messages.error);
        });
    },
    buyCharacter() {
      auth
        .post(`/character/${this.selectCharacter}/buy`, {})
        .then((response) => {
          console.log(response.data);
          this.player.money = response.data.money;
          this.owned.true.push(this.selectCharacter);
          this.owned.false.splice(
            this.owned.false.indexOf(this.selectCharacter),
            1
          );
          this.characters[this.selectCharacter].owned = 1;
          localStorage.setItem("money", response.data.money);
        })
        .catch((error) => {
          this.eventBus.emit("show-toast", error.response.data.messages.error);
        });
    },
    reconnect() {},
  },
};
</script>
