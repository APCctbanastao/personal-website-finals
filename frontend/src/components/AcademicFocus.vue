<template>
  <section class="academic">
    <h2>Academic Focus</h2>
    <p>BSIT student at Asia Pacific College, focusing on full-stack web development, database management, and software design.</p>
  </section>
</template>

<script>
export default {
  name: 'AcademicFocus',
}
</script>

<style scoped>
.academic {
  padding: 2rem 4rem;
  color: #00d4ff;
  text-shadow: 0 0 6px #000;
}

.academic h2 {
  font-family: 'Cinzel', serif;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.academic p {
  font-size: 1.1rem;
  line-height: 1.5;
}

/* Mobile */
@media (max-width: 768px) {
  .academic {
    padding: 1rem 2rem;
  }
  .academic h2 {
    font-size: 1.5rem;
  }
  .academic p {
    font-size: 1rem;
  }
}
</style>