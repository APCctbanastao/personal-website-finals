<template>
  <footer class="footer">
    <img src="/images/apc-logo.png" alt="APC Logo" />
    <p>&copy; 2026 Christian Banastao. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background-color: rgba(0,0,0,0.5);
  color: #00d4ff;
  font-weight: bold;
  font-family: 'Cinzel', serif;
  text-shadow: 0 0 6px #000;
}

.footer img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

/* Mobile */
@media (max-width: 768px) {
  .footer {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  }
  .footer img {
    width: 30px;
    height: 30px;
  }
}
</style>