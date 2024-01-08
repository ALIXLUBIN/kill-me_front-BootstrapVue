<style scoped>
/* Style du texte à l'intérieur de la zone d'arrière-plan */
.background-text {
  color: #fff; /* Couleur du texte */
  text-align: center; /* Alignement du texte au centre */
  padding: 20px; /* Espacement du texte */
}

.main {
  height: 100vh;
}
</style>

<template>
  <Background type="cover" />
  <div class="container">
    <div class="row main d-flex justify-content-center align-items-center">
      <div
        v-bind:style="formReact"
        id="main-card"
        class="col-md-6 card-blur shadow-lg"
      >
        <h1>{{ title }}</h1>
        <form @submit.prevent="submit">
          <div class="mb-3" v-for="(inpute, key) in inputes" :key="key">
            <label :for="inpute.name" class="form-label">{{
              inpute.name
            }}</label>
            <input
              :id="inpute.name"
              :type="inpute.type"
              class="form-control"
              :placeholder="inpute.placeholder"
              :aria-label="inpute.placeholder"
              v-model="inpute.value"
              required
            />
          </div>
          <div v-if="errors" class="alert alert-danger" role="alert">
            <ul>
              <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
            </ul>
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary" v-if="!loading">
              Envoyer
            </button>
            <button type="button" class="btn btn-primary" disabled v-else>
              Chargement...
            </button>

            <button
              type="button"
              class="btn btn-secondary"
              @click="switchInputes"
            >
              {{ notTitle }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Background from "@/components/BackGround.vue";
import axios from "axios";
export default {
  name: "LoginRegister",
  components: {
    Background,
  },
  data() {
    return {
      loginInputes: [
        {
          type: "text",
          placeholder: "Entrez voutre pseudo",
          name: "username",
          value: "",
        },
        {
          type: "password",
          placeholder: "Enter your password",
          name: "password",
          value: "",
        },
      ],
      RegisterInputes: [
        {
          type: "text",
          placeholder: "Enter your Nickname",
          name: "nickname",
          value: "",
        },
        {
          type: "email",
          placeholder: "Enter your email",
          name: "email",
          value: "",
        },
        {
          type: "password",
          placeholder: "Enter your password",
          name: "password",
          value: "",
        },
        {
          type: "password",
          placeholder: "Enter your password",
          name: "confirm_password",
          value: "",
        },
      ],
      formReact: {},
      inputes: [],
      type: "",
      title: "Log-me in",
      notTitle: "Create-me",
      loading: false,
      errors: null,
    };
  },
  mounted() {
    this.type = this.$route.name;
    this.switchInputes(this.type);
  },
  methods: {
    switchInputes(target = null) {
      console.log(
        target
        // (this.type === "login" || target === "register") && target !== "login"
      );
      if (
        (this.type === "login" || target === "register") &&
        target !== "login"
      ) {
        this.inputes = this.RegisterInputes;
        this.title = "Create-me";
        this.notTitle = "Log-me in";
        this.type = "register";
      } else {
        this.inputes = this.loginInputes;
        this.title = "Log-me in";
        this.noTitle = "Create-me";
        this.type = "login";
      }
    },

    async submit() {
      this.loading = true;
      var formData = {};
      this.inputes.forEach((inpute) => {
        formData[inpute.name] = inpute.value;
      });

      console.log(this.type);

      if (this.type === "login") {
        this.submitLogin(formData);
      } else {
        this.submitRegister(formData);
      }
    },

    submitLogin(formData) {
      formData.grant_type = "password";
      axios
        .post(process.env.VUE_APP_API_IP + "/login", formData, {
          auth: {
            username: process.env.VUE_APP_CLIENT_USERNAME,
            password: process.env.VUE_APP_CLIENT_SECRET,
          },
          headers: {
            "access-control-expose-headers": "Set-Cookie",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          this.formFail(error.response.data.error_description);
        })
        .finally(() => {
          this.loading = false;
          setTimeout(() => {
            this.formReact = {};
          }, 500);
        });
    },

    submitRegister(formData) {
      axios
        .post(process.env.VUE_APP_API_IP + "/" + this.type, formData)
        .then((response) => {
          this.formSecces(response, this.type);
          this.switchInputes();
          // this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          // en cas d’échec de la requête
          this.formFail(error.response.data.messages.message);
        })
        .finally(() => {
          this.loading = false;
          setTimeout(() => {
            this.formReact = {};
          }, 500);
        });
    },
    formFail(data) {
      this.formReact = {
        "background-color": "rgba(255, 100, 100, 0.6)",
      };

      if (typeof data == "string") {
        this.errors = [data];
        return;
      }
      this.errors = data;
    },
    formSecces(data, type = null) {
      this.formReact = {
        "background-color": "rgba(103, 255, 76, 0.6)",
      };

      if (type === "login") {
        this.inputes[0].value = data.data.nickname;
      }

      console.log(data);
      // this.errors = data.;
    },
  },
};
</script>
