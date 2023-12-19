<style>
:root {
  --base-spaceing: 50vh;
}

.background-line.line-1 {
  top: calc(var(--base-spaceing) * -1 - 15vh);
  background-color: var(--color-1);
}

.background-line.line-2 {
  top: calc(var(--base-spaceing) * 0 + 10vh);

  background-color: var(--color-2);
}

.background-line.line-3 {
  top: calc(var(--base-spaceing) * 1 + 10vh);

  background-color: var(--color-3);
}
.background-line.line-4 {
  top: calc(var(--base-spaceing) * 2 + 10vh);

  background-color: var(--color-4);
}
</style>

<style scoped>
.background > * {
  z-index: -1;
}

/* @media only screen and (max-width: 992px) { */
.background-container-left {
  width: 100%;
}

.background-line {
  right: -60%;
}

.background-container-right {
  z-index: 1;
  display: block;
  width: 100%;
  left: 0;
}
/* } */

/* @media only screen and (min-width: 992px) {
  .background-container-left {
    width: 50%;
  }

  .background-line {
    right: -20%;
  }
} */

/* Créez une classe pour le conteneur de l'arrière-plan. */
.background-container-left {
  position: fixed;
  top: 0;
  height: 100vh; /* Couvrira toute la hauteur de la page */
  background-color: #fd0202; /* Couleur de l'arrière-plan */
}

.background-container-right {
  position: fixed;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100vh;
  background-color: #fff;
}

.background-line {
  position: fixed;
  height: 75vh;
  width: 200%;
  transform: rotate(140deg);
  box-shadow: 0 15px 15px rgba(0, 0, 0, 0.2);
}
</style>

<template>
  <div class="background">
    <div class="background-container-left">
      <div class="background-line line-1"></div>
      <div class="background-line line-2"></div>
      <div class="background-line line-3"></div>
      <div class="background-line line-4"></div>
    </div>
    <!-- <div class="background-container-right"></div> -->
  </div>
</template>

<script>
export default {
  name: "BackGround",
};
</script>
