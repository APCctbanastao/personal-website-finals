<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo">My Portfolio</div>
      <ul class="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#academic">Academic</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#learning">Learning</a></li>
        <li><a href="#guestbook">Guestbook</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
.navbar {
  width: 100%;
  padding: 1rem 2rem;
  background-color: #1B1B17; /* dark LOTR feel */
  color: #F5E1A4; /* parchment/gold text */
  position: sticky;
  top: 0;
  z-index: 10;
  font-family: 'Cinzel', serif;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.nav-links a {
  font-weight: 500;
  text-shadow: 0 1px 2px #000;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #FFD700; /* gold highlight */
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
  text-shadow: 0 2px 3px #000;
}

@media (max-width: 768px) {
  .nav-links {
    width: 100%;
    justify-content: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .logo {
    width: 100%;
    text-align: center;
  }
}
</style>