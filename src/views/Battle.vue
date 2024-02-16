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
      character: {
        id: 1,
        name: "Barry",
        health: 100,
        maxHealth: 100,
        mana: 70,
        manaRegen: 40,
        maxMana: 100,
        strength: 40,
        maxStrength: 70,
        shield: 10,
        maxshield: 35,
        attacks: [
          {
            id: 1,
            name: "Punch",
            type: 1,
            effects: [
              {
                icon: "hand-back-fist",
                value: "10",
              },
              {
                icon: "shield-virus",
                value: "25%",
              },
            ],
          },
          {
            id: 2,
            name: "Kick",
            effects: [
              {
                icon: "hand-back-fist",
                value: "15",
              },
            ],
          },
          {
            id: 3,
            name: "Fireball",
            effects: [
              {
                icon: "wand-sparkles",
                value: "-20",
              },
              {
                icon: "hand-back-fist",
                value: "10",
              },
              {
                icon: "shield-virus",
                value: "50%",
              },
            ],
            type: 2,
            typeName: "Magical",
            damage: 20,
            manaCost: 10,
            shieldPiercing: 50,
          },
          {
            id: 4,
            name: "Ice Shard",
            effects: [
              {
                icon: "wand-sparkles",
                value: "15",
              },
              {
                icon: "hand-back-fist",
                value: "25",
              },
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
                value: "-15",
              },
              {
                icon: "heart",
                value: "+10",
              },
            ],
          },
          {
            id: 6,
            name: "Shield",
            effects: [
              {
                icon: "wand-sparkles",
                value: "-10",
              },
              {
                icon: "shield-cat",
                value: "+10",
              },
            ],
          },
        ],
      },
    };
  },

  mounted() {
    auth
      .get("/battle")
      .then((response) => {
        this.getCharacter(response.data["slef"].character_id).then((data) => {
          this.self = data;
        });
        this.getCharacter(response.data["ennemy"].character_id).then((data) => {
          this.ennemy = data;
        });
      })
      .catch((error) => {
        console.log(error.response.data.messages);
        if (error.response.data.messages.error == "notInGame") {
          this.eventBus.emit("show-toast", "Vous n'êtes pas en jeu");
          // this.$router.push('/');
        }
      });

    try {
      this.$conn.onmessage = (e) => {
        console.log(e)
        if (e.data != 'undefined') {

          const data = JSON.parse(e.data);
          console.log(data);
          
          if (data.messages == "founedPlayer") {
            this.$router.push("/battle");
          }
        }
      };
    } catch (error) {
      this.reconnect();
    }
  },

  methods: {
    async getCharacter(id) {
      const response = await auth.get("/character/" + id);
      return response.data;
    },

    attack(id) {
      auth.post("battle/attack/" + id);
    },

    reconnect() {
      console.log("reconnect");
      try {
        var conn = new WebSocket("ws://192.168.1.17:8081");

        conn.onerror = (error) => {
          this.eventBus.emit("show-toastSocket");
        };

        conn.onopen = function (e) {
          console.log("Connection established!");
        };

        app.config.globalProperties.$conn = conn;
      } catch (error) {
        this.eventBus.emit("show-toastSocket");
      }
    },
  },
};
</script>
