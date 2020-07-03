<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
html,
body,
.router-view {
  height: 100%;
  // padding: 0;
  // margin: 0;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
input.submit,
button {
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin: 0.5rem 0;
  color: #007bff;
  border-color: #007bff;
  &:hover {
    color: #fff;
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }

  &.danger {
    border-color: red;
    color: red;
    &:hover {
      color: #fff;
      color: #fff;
      background-color: red;
      border-color: red;
    }
  }

  &.warning {
    border-color: #ff9800;
    color: #ff9800;
    &:hover {
      color: #fff;
      color: #fff;
      background-color: #ff9800;
      border-color: #ff9800;
    }
  }
}
</style>
