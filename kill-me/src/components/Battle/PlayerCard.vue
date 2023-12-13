<style scooped>
/* .container-fuid {
  position: relative;
} */

.character-name {
  display: inline-block;
  z-index: 1;
  position: relative;
  left: 20px;
  top: 20px;
  backdrop-filter: blur(2px);
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  padding: 5px;
}
</style>

<template>
  <span class="character">
    <h2 class="character-name">{{ character.name }}</h2>
  </span>
  <div class="container-fuid card-blur kill-me-border shadow-me">
    <div>
      <div class="row">
        <div class="col-1">PV</div>
        <div class="col-11">
          <div
            class="progress"
            role="progressbar"
            aria-label="Basic example"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div class="progress-bar bg-info w-50"></div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-1">Mana</div>
        <div class="col-11">
          <div
            class="progress"
            role="progressbar"
            aria-label="Basic example"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div class="progress-bar w-75 color-1"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <h3>Attaque</h3>
    </div>
  </div>
  Card
  <p></p>
</template>

<script>
export default {
  name: "Card",
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  mounted() {},
};
</script>
