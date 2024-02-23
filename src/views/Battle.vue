<template>
  <BackGround type="centerSmall" />
  <div class="container-fluid py-5">
    <div class="row d-md-flex">
      <div class="col-12 col-md-9">
        <PlayerCard :character="self" v-if="self" />
      </div>
      <div class="col-12 col-md-3">
        <PlayerCard :character="ennemy" v-if="ennemy" />
      </div>
    </div>
  </div>
</template>

<script>
import PlayerCard from "@/components/Battle/PlayerCard.vue";
import BackGround from "@/components/BackGround.vue";
import { auth } from "@/plugins/axios.js";
import { socket } from "@/socket.js";

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
    };
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


        });
        this.getCharacter(response.data["ennemy"].character_id).then((data) => {
          this.ennemy = data;
          
          this.ennemy.mana = response.data["ennemy"].mana;
          this.ennemy.user_id = response.data["ennemy"].user_id;
          this.ennemy.character_id = response.data["ennemy"].character_id;
          this.ennemy.health = response.data["ennemy"].health;
          this.ennemy.strength = response.data["ennemy"].strength;
          this.ennemy.shield = response.data["ennemy"].shield;
          console.log(data);
        });

        setTimeout(() => {
          socket.emit('joinRoom', response.data.battle_id);
        }, 100);

        socket.on('attack', (data) => {
        console.log('attque reçus !');
          
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
