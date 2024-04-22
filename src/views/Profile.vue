<style>
.main {
  height: 100vh;
}
</style>

<template>
  <Background />
  <div class="container">
    <div class="row main d-flex justify-content-center align-items-center">
      <form action="">
        <h3>{{ nickname }}</h3>
        <div class="mt-5 card-blur">
          <div class="mt-3">
            <label for="exampleFormControlInput1" class="form-label">Adresse mail</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="" />
          </div>
        </div>
        <h3 class="mt-3">Changement de mot de passe</h3>
        <div class="mt-5 card-blur">
        <div class="mt-3">
            <label for="exampleFormControlInput1" class="form-label">Ancien mot de passe</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" />
          </div>
          <div class="mt-3">
            <label for="exampleFormControlInput1" class="form-label">Nouveau mot de passe</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" />
          </div>
          <div class="mt-3">
            <label for="exampleFormControlInput1" class="form-label">Confirmer mot de passe</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" />
          </div>
          <button type="submit" class="mt-3 btn btn-primary">Envoyer</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BackGround from "@/components/BackGround.vue";
import smallLine from "@/components/Lines/smallLines.vue";


export default {
  name: "Profile",
  data() {
    return {
      nickname: "pute"
    };
  },
  components: {
    BackGround,
    smallLine
  },
};
</script>
