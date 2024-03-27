<template>
  <BackGround type="centerSmall" />
  <div class="container-fluid py-5">
    <div class="row d-md-flex">
      <div class="col-12 col-md-9">
        <div>{{ self.user_id == turn ? 'Votre tour' : 'Pas ton tour' }}</div>
        <PlayerCard :character="self" :turn="self.user_id == turn" v-if="self" />
      </div>
      <div class="col-12 col-md-3">
        <PlayerCard :character="ennemy" :type="false" :lastAttack="ennemy.last_attack" v-if="ennemy" />
      </div>
    </div>
  </div>
</template>

<script>
import PlayerCard from "@/components/Battle/PlayerCard.vue";
import BackGround from "@/components/BackGround.vue";
import { auth } from "@/plugins/axios.js";
import { socket } from "@/socket.js";
import router from "@/router";

export default {
  name: "Battle",
  components: {
    PlayerCard,
    BackGround,
  },
  data() {
    return {
      self: {},
      ennemy: {},
      character: {},
      turn: 0,
      win: null,
    };
  },

  watch: {
    win() {
      if (this.win == true || this.win == false) {
        router.push("/endGame");
      }
    }
  },

  mounted() {
    auth.get("/battle")
      .then((response) => {
        this.getCharacter(response.data["self"].character_id).then((data) => {
          this.self = data;
          this.self.mana = response.data["self"].mana;
          this.self.user_id = response.data["self"].user_id;
          this.self.character_id = response.data["self"].character_id;
          this.self.health = response.data["self"].health;
          this.self.strength = response.data["self"].strength;
          this.self.shield = response.data["self"].shield;
          this.win = response.data["self"].win;
          this.turn = response.data["self"].current_turn;

        });
        this.getCharacter(response.data["ennemy"].character_id).then((data) => {
          this.ennemy = data;

          this.ennemy.mana = response.data["ennemy"].mana;
          this.ennemy.user_id = response.data["ennemy"].user_id;
          this.ennemy.character_id = response.data["ennemy"].character_id;
          this.ennemy.health = response.data["ennemy"].health;
          this.ennemy.strength = response.data["ennemy"].strength;
          this.ennemy.shield = response.data["ennemy"].shield;
          this.ennemy.last_attack = response.data["ennemy"].last_attack;
          this.ennemy.win = response.data["ennemy"].win;
        });

        setTimeout(() => {
          socket.emit('joinRoom', response.data.battle_id);
        }, 100);

        socket.on('attack', (data) => {
          console.log(this.win);

          Object.keys(data).forEach(key => {
            if (key == this.self.user_id) {
              this.self.health = data[key].health;
              this.self.mana = data[key].mana;
              this.self.shield = data[key].shield;
              this.self.force = data[key].force;
              this.turn = data[key].current_turn;
              this.win = data[key].win;
            } else {
              this.ennemy.health = data[key].health;
              this.ennemy.mana = data[key].mana;
              this.ennemy.shield = data[key].shield;
              this.ennemy.force = data[key].force;
              this.ennemy.last_attack = data[key].last_attack;
              this.ennemy.win = data[key].win;
            }
          });

        })


      })
      .catch((error) => {
        console.log(error.response.data.messages);
        if (error.response.data.messages.error == "notInGame") {
          this.eventBus.emit("show-toast", "Vous n'êtes pas en jeu");
          // this.$router.push('/');
        }
      });
  },

  methods: {

    async getCharacter(id) {
      const response = await auth.get("/character/" + id);
      return response.data;
    },

    attack(id) {
      auth.post("battle/attack/" + id);
    },

  },
};
</script>
