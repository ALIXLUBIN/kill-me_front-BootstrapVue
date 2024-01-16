<style>
:root {
  /* --base-spaceing: 50vh; */
}

.background-line.line-1 {
  top: calc(var(--base-spaceing) * -1);
  background-color: var(--color-1);
}

.background-line.line-2 {
  top: calc(var(--base-spaceing) * 0);

  background-color: var(--color-2);
}

.background-line.line-3 {
  top: calc(var(--base-spaceing) * 1);

  background-color: var(--color-3);
}
.background-line.line-4 {
  top: calc(var(--base-spaceing) * 2);

  background-color: var(--color-4);
}

.background {
  transition: all 0.5s ease-in-out;

  --base-spaceing: 50vh;
  --base-height: 50vh;
  --base-rotate: 140deg;
  --base-offset: -60%;
}

.background-line {
  transition: all 0.5s ease-in-out;
  position: fixed;
  height: var(--base-height);
  width: 200%;
  transform: rotate(var(--base-rotate));
  box-shadow: 0 15px 15px rgba(0, 0, 0, 0.2);
}

.background-line {
  right: var(--base-offset);
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
  /* background-color: #fd0202; Couleur de l'arrière-plan */
}
</style>

<template>
  <div class="background" ref="background">
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

  data() {
    return {
      types: {
        centerSmall: {
          spaceing: "10vh",
          height: "10vh",
          rotate: "140deg",
          offset: "-60%",
        },
        cover: {
          spaceing: "60vh",
          height: "60vh",
          rotate: "140deg",
          offset: "-50%",
        },
      },
    };
  },

  props: {
    type: {
      type: String,
      default: "centerSmall",
    },
  },

  mounted() {
    this.changeLine();
  },
  methods: {
    changeLine() {
      const background = this.$refs.background;
      background.style.setProperty(
        "--base-spaceing",
        this.types[this.type].spaceing
      );
      background.style.setProperty(
        "--base-height",
        this.types[this.type].height
      );
      background.style.setProperty(
        "--base-rotate",
        this.types[this.type].rotate
      );
      background.style.setProperty(
        "--base-offset",
        this.types[this.type].offset
      );
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.changeLine();
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.changeLine();
    next();
  },
};
</script>
