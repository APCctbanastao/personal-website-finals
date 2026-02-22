<template>
  <section class="skills">
    <h2>Skills</h2>
    <ul>
      <li>Vue.js / React.js</li>
      <li>JavaScript / TypeScript</li>
      <li>HTML5 & CSS3 / Tailwind</li>
      <li>Supabase / REST API Integration</li>
      <li>Git / GitHub / Vercel Deployment</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Skills',
}
</script>

<style scoped>
.skills {
  padding: 2rem 4rem;
  color: #00d4ff;
  text-shadow: 0 0 6px #000;
}

.skills h2 {
  font-family: 'Cinzel', serif;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.skills ul {
  list-style-type: none;
  padding-left: 0;
}

.skills li {
  margin: 0.5rem 0;
  font-weight: bold;
}

/* Mobile */
@media (max-width: 768px) {
  .skills {
    padding: 1rem 2rem;
  }
  .skills h2 {
    font-size: 1.5rem;
  }
  .skills li {
    font-size: 0.9rem;
  }
}
</style>