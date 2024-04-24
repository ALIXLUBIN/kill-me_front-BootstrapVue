<style>
nav {
  position: sticky;
  top: 0;
  background-color: rgba(232, 232, 232, 0.6);
  z-index: 1000;

  /* background-color: rgba(211, 211, 211, 0.7); */
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  /* width: 100vb; */
}

.logo img {
  height: 1rem;
  filter: drop-shadow(-2px 0 4px rgba(0, 0, 0, 0.5));
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
  <nav class="position-sticky mx-2 p-2 navbar navbar-expand-lg rounded-bottom d-flex justify-content-between">
    <div class="d-flex justify-content-between align-items-stretch">
      <RouterLink to="/" class="logo navbar-brand">
        <div class="d-flex align-items-center">
          <img src="@/assets/logoFull.png" alt="logo" />
          <div class="header-line-container d-flex mx-3">
            <div class="header-line line-1"></div>
            <div class="header-line line-2"></div>
            <div class="header-line line-3"></div>
            <div class="header-line line-4"></div>
          </div>
        </div>
      </RouterLink>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse d-lg-flex justify-content-end" id="navbarNav">
      <ul class="navbar-nav">
        <!-- // TODO: metre quand on est logg -->
        <li class="nav-item" v-show="!isLoggedIn">
          <RouterLink to="/login" class="nav-link"> Login </RouterLink>
        </li>
        <li class="nav-item" v-show="!isLoggedIn">
          <RouterLink to="/register" class="nav-link"> Register </RouterLink>
        </li>
        <li class="nav-item" v-show="isLoggedIn">
          <RouterLink to="/profile" class="nav-link"> Profile </RouterLink>
        </li>
      </ul>
    </div>

    <!-- <div class="d-flex justify-content-end">
			<RouterLink to="/login" class="mx-2 header-link"> Login </RouterLink>
			<RouterLink to="/register" class="mx-2 header-link">
				Register
			</RouterLink>
		</div> -->
  </nav>
</template>

<script>
export default {
  name: "Header",
  computed: {
    isLoggedIn() {
      return sessionStorage.getItem("logged") === "true";
    },
  },
};
</script>
