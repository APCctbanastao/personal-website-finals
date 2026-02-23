<template>
  <div id="app">
    <HeroSlate />
  </div>
</template>

<script>
import HeroSlate from './components/HeroSlate.vue'

export default {
  name: 'App',
  components: { HeroSlate }
}
</script>

<style>
/* Make full viewport black background */
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
}

/* Ensure app container doesn't constrain HeroSlate */
#app {
  display: block;
  width: 100vw;
  height: 100vh;
  margin: 0 ;
  padding: 0;
  text-align: justify; /* optional */
  overflow: hidden;
  background-color: #000;
}

/* Optional: default font for whole app */
body {
  font-family: 'VT323', monospace;
}
</style>