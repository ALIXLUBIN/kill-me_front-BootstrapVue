<template>
  <b-container>
    <b-row>
      <b-form @submit="submitRegister">
        <b-form-group
          v-for="(inpute, key) in inputes"
          :key="key"
          :label="inpute.placeholder + ':'"
          :label-for="register + inpute.name"
        >
          <b-form-input
            :v-model="inpute.name"
            :type="inpute.type"
            :placeholder="inpute.placeholder"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
      {{ test }}
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      inputes: [
        {
          type: "text",
          placeholder: "Enter your name",
          name: "name",
        },
        {
          type: "email",
          placeholder: "Enter your email",
          name: "email",
        },
        {
          type: "password",
          placeholder: "Enter your password",
          name: "password",
        },
      ],
      form: {
        name: "",
        email: "",
        password: "",
      },
      test: false,
    };
  },
  methods: {
    submitRegister() {
      axios
        .post("http://localhost:8080/api/register", this.form, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .finally(() => {
          this.test = true;
        });
    },
  },
};
</script>
