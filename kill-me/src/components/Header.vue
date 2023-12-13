<style>
nav {
  position: sticky;
  top: 0;
  background-color: rgba(211, 211, 211, 0.7);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  /* width: 100vb; */
}

.logo img {
  height: 1rem;
  /* box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
	background-color: rgba(0, 0, 0, 0.3); */
}

.header-line-container {
  position: relative;
  height: 1rem;
  width: 100%;
}

.header-line {
  position: relative;
  top: -50px;
  height: 95px;
  width: 10px;
  transform: rotate(20deg);
  box-shadow: -2px 1px 3px rgba(0, 0, 0, 0.5);
}

.line-1 {
  background-color: rgb(255, 200, 0);
}
.line-2 {
  background-color: hsl(157, 98%, 50%);
}
.line-3 {
  background-color: #023dfd;
}
.line-4 {
  background-color: rgb(252, 3, 3);
}

.header-link {
  color: var(--bs-dark-text-emphasis);
  text-decoration: none;
}

.header-link:hover,
.header-link.active {
  color: var(--bs-dark-text);
}
</style>

<template>
  <div class="background">
    <div class="m-2 rounded bg-gradient-primary border-dark">
      <!-- Image and text -->
      <b-navbar>
        <b-navbar-brand href="#">
          <img
            src="https://placekitten.com/g/30/30"
            class="d-inline-block align-top"
            alt="Kitten"
          />
          BootstrapVue
        </b-navbar-brand>
        <b-navbar-nav right>
          <b-nav-item href="login">Login</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      login: true,
      user: {},
    };
  },
};
</script>
