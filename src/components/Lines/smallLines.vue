<style>
.small-line-container {
  position: relative;
  height: 1rem;
  /* width: 100%; */
}

.small-line {
  transition: all 0.3s ease-in-out;
  position: relative;
  top: -50px;
  height: 95px;
  width: 10px;
  transform: rotate(20deg);
  box-shadow: -2px 1px 3px rgba(0, 0, 0, 0.5);
}

.hide {
  width: 0;
  margin-left: 10px;
}

.line-1 {
  background-color: var(--color-1);
}
.line-2 {
  background-color: var(--color-2);
}
.line-3 {
  background-color: var(--color-3);
}
.line-4 {
  background-color: var(--color-4);
}
</style>

<template>
  <div class="small-line-container d-inline-flex ms-3 ">
    <div class="small-line line-1" :class="{'hide': !show}"></div>
    <div class="small-line line-2" :class="{'hide': !show}"></div>
    <div class="small-line line-3" :class="{'hide': !show}"></div>
    <div class="small-line line-4" :class="{'hide': !show}"></div>
  </div>
</template>

<script>
export default {
  name: "SmallLines",
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    console.log(this.show);
  },
};
</script>
