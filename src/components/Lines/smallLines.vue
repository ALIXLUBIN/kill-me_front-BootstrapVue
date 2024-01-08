<style>
.small-line-container {
  position: relative;
  height: 1rem;
  width: 100%;
}

.small-line {
  position: relative;
  top: -50px;
  height: 95px;
  width: 10px;
  transform: rotate(20deg);
  box-shadow: -2px 1px 3px rgba(0, 0, 0, 0.5);
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
  <div class="small-line-container d-flex mx-3">
    <div class="small-line line-1"></div>
    <div class="small-line line-2"></div>
    <div class="small-line line-3"></div>
    <div class="small-line line-4"></div>
  </div>
</template>

<script>
export default {
  name: "SmallLines",
};
</script>
