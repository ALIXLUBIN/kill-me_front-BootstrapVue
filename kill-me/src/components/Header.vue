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
