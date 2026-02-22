<template>
  <section id="about" class="about">
    <div class="container">
      <h2>About Me</h2>
      <p>
        Hi! I’m Christian Banastao, a BSIT student and Web Programming student.
        I’m passionate about coding, learning new technologies, and building functional web applications.
        This personal profile website demonstrates my skills, projects, and academic journey.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about {
  padding: 4rem 2rem;
  background-color: #f1f5f9;
}

.about .container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 0 1rem;
}

.about h2 {
  font-size: 2rem;
  color: #2563eb;
  margin-bottom: 1rem;
}

.about p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #334155;
}

@media (max-width: 768px) {
  .about h2 {
    font-size: 1.5rem;
  }

  .about p {
    font-size: 1rem;
  }

  .about .container {
    padding: 0 1rem;
  }
}
</style>