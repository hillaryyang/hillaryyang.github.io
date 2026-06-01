<script setup lang="ts">
import Footer from './components/Footer.vue';
import NavBar from './components/NavBar.vue';
</script>

<template>
  <main>
    <NavBar />
    <RouterView />
    <Footer />
  </main>
</template>
