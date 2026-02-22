<template>
  <section id="guestbook" class="guestbook">
    <div class="container">
      <h2>Guestbook</h2>
      <p>Guestbook will be functional with Supabase later.</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Guestbook'
}
</script>

<style scoped>
.guestbook {
  padding: 4rem 2rem;
  background-color: #f1f5f9;
}

.guestbook .container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 0 1rem;
}

.guestbook h2 {
  font-size: 2rem;
  color: #2563eb;
  margin-bottom: 1rem;
}

.guestbook p {
  font-size: 1.1rem;
  color: #334155;
}

@media (max-width: 768px) {
  .guestbook h2 {
    font-size: 1.5rem;
  }

  .guestbook p {
    font-size: 1rem;
  }
}
</style>