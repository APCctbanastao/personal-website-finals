<template>
  <section class="learning-journey">
    <h2>Learning Journey</h2>
    <p>Started as a beginner in programming, currently focused on full-stack web development. Exploring advanced concepts like database integration, REST APIs, and deployment with modern frameworks.</p>
  </section>
</template>

<script>
export default {
  name: 'LearningJourney',
}
</script>

<style scoped>
.learning-journey {
  padding: 2rem 4rem;
  color: #00d4ff;
  text-shadow: 0 0 6px #000;
}

.learning-journey h2 {
  font-family: 'Cinzel', serif;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.learning-journey p {
  font-size: 1.1rem;
  line-height: 1.5;
}

/* Mobile */
@media (max-width: 768px) {
  .learning-journey {
    padding: 1rem 2rem;
  }
  .learning-journey h2 {
    font-size: 1.5rem;
  }
  .learning-journey p {
    font-size: 1rem;
  }
}
</style>