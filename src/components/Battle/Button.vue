<style scoped>
/* * {
	box-sizing: border-box;
} */

/* body {
	min-height: 100vh;
	display: grid;
	place-items: center;
	align-content: center;
	gap: 1rem;
} */

button {
  width: 100%;
  --radius: 8px;
  --text-padding: 8px 16px;
  --border: 1px;
  --padding: 3px;
  border-radius: var(--radius);
  border: 0;
  background: rgba(183, 182, 182, 0.6);
  /* box-shadow: inset 0 1px 0px 0px hsl(0 0% 100% / 0.5),
		inset 0 -1px 0px 0px hsl(0 0% 0% / 0.5); */
  /*   background:
    conic-gradient(from calc(var(--rx) * 360deg) at calc(var(--x) * 1px) calc(var(--y) * 1px), hsl(10 90% 50%), hsl(140 70% 50%), hsl(320 70% 50%), hsl(210 70% 50%), hsl(10 70% 50%));
  background-attachment: fixed; */
  position: relative;
  display: grid;
  place-items: center;
  padding: var(--padding);
  border: var(--border) solid rgba(196, 195, 195, 0.6);
  transform: translate(0, calc(var(--active, 0) * 2px));
  transition: transform 0.1s;
  /* color: hsl(0 0% 20%); */
}

button:is(:hover, :focus-visible) {
  --hover: 1;
  /*   border-color: transparent !important; */
}

button:active {
  --active: 1;
}

button:before {
  content: "";
  position: absolute;
  inset: 0px;
  border-radius: calc(var(--radius) - var(--border));
  background: hsl(0 0% 100% / calc(1 - var(--hover, 0) * 0.25));
  /* background: grey; */
  background: conic-gradient(from calc(var(--rx, 0) * 180deg) at calc(var(--x, 0) * 100%) calc(var(--y, 0) * 100%),
      hsl(10 90% 70%),
      hsl(140 80% 70%),
      hsl(320 80% 70%),
      hsl(210 80% 70%),
      hsl(10 80% 70%));
  filter: saturate(0.4);
  opacity: var(--hover, 0);
  transition: opacity 0.2s;
}

.backdrop {
  position: relative;
  width: 100%;
  height: 100%;
  background: hsl(0 0% 98% / 0.6);
  border-radius: calc(var(--radius) - var(--padding));
  display: block;
  grid-column: 1;
  grid-row: 1;
  backdrop-filter: blur(20px) brightness(1.5);
}

.text {
  z-index: 3;
  position: relative;
  text-align: left;
  width: 100%;
  height: 100%;
  display: block;
  grid-column: 1;
  grid-row: 1;
}

svg {
  width: 24px;
}

.dark {
  border-color: hsl(0 0% 20%);
}

.dark .backdrop {
  background: rgba(26, 26, 26, 0.4);
  backdrop-filter: blur(20px) brightness(1.2) saturate(1);
}

.dark:after {
  background: hsl(0 0% 10% / calc(1 - var(--hover, 0) * 0.25));
}

.dark {
  color: hsl(0 0% 98%);
  background: hsl(0 0% 10%);
}

.disable {
  /* pointer-events: none; */
  opacity: 0.5;
  cursor: not-allowed;
}

.noClick {
  pointer-events: none;
}
</style>

<template>
  <button @click="throwAttack(attack.id)" class="control" :class="{ 'disable': !enbale, 'noClick': (this.onClick[0] == 'false')}">
    <span class="backdrop"></span>
    <div class="text">
      <div class="container-fluid p-1">
        <div class="row justify-content-center fs-5 fw-bold">
          {{ attack.name }}
        </div>
        <div class="row justify-content-evenly">
          <div class="col-auto" v-show="attack.text">
            {{ attack.text }}
          </div>
          <div class="col-auto" v-show="attack.heal">
            <font-awesome-icon :icon="['fas', 'heart']" />
            +{{ attack.heal }}
          </div>
          <div class="col-auto" v-show="attack.manaCost">
            <font-awesome-icon :icon="['fas', 'wand-sparkles']" />
            -{{ attack.manaCost }}
          </div>
          <div class="col-auto" v-show="attack.damage">
            <font-awesome-icon :icon="['fas', 'hand-back-fist']" />
            {{ attack.damage }}
          </div>
          <div class="col-auto" v-show="attack.shieldPercing">
            <font-awesome-icon :icon="['fas', 'shield-virus']" />
            {{ attack.shieldPercing }}%
          </div>
        </div>
      </div>
    </div>
  </button>
</template>

<script>
import { auth } from "@/plugins/axios.js";

export default {
  name: "buton",
  data() {
    return {
      hover: false,
    };
  },
  props: {
    attack: {
      type: Object,
      required: true,
    },
    enbale: {
      type: Boolean,
      required: false,
      default: true,
    },
    onClick: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  mounted() {
    const CONTROLS = document.querySelectorAll("button");
    const UPDATE = ({ x, y }) => {
      const ELEMENT = document.elementFromPoint(x, y);
      const CONTROL = ELEMENT.closest(".control");
      if (CONTROL) {
        const BOUNDS = CONTROL.getBoundingClientRect();
        CONTROL.style.setProperty("--rx", (x - BOUNDS.x) / BOUNDS.width);
        CONTROL.style.setProperty("--x", (x - BOUNDS.x) / BOUNDS.width);
        CONTROL.style.setProperty("--y", (y - BOUNDS.y) / BOUNDS.height);
      }
    };

    document.body.addEventListener("pointermove", UPDATE);
  },

  methods: {
    throwAttack(id) {
      if (this.onClick[0] == "false") {
        console.log('bha non');
        return;
      }
      auth.post('battle/attack/' + id).catch((error) => {

        if (error.response.data.messages.error == "notYourTrun") {
          this.eventBus.emit("show-toast", "Ce n'est pas votre tour.");
          // this.$router.push('/');
        }
      });
    },
  }
};
</script>
