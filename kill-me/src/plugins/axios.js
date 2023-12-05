import axios from "axios";
import Vue from "vue";

const guest = axios.create({
  baseURl: "http://localhost:8080/user",
  hraders: {
    "content-Type": "application/x-www-form-urlencoded",
    "X-Requested-With": "XMLHttpRequest",
  },
});
