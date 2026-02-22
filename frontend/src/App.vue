<template>
  <section class="hero-map">
    <!-- Navbar -->
    <Navbar />

    <!-- Facts / Info Boxes -->
    <div
      v-for="(fact, index) in facts"
      :key="index"
      class="fact-box"
      :style="{ top: fact.top, left: fact.left }"
    >
      {{ fact.text }}
    </div>

    <!-- Profile Picture as speaker -->
    <div class="profile-container">
      <img src="/images/profilepic.jpg" alt="Profile" />
      <div class="tech-frame"></div>
    </div>
  </section>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'HeroMap',
  components: {
    Navbar,
  },
  data() {
    return {
      facts: [
        { text: 'About Me: Christian, BSIT student', top: '20%', left: '15%' },
        { text: 'Skills: Vue.js, JS, HTML/CSS, Supabase', top: '35%', left: '40%' },
        { text: 'Academic: Asia Pacific College', top: '50%', left: '60%' },
        { text: 'Learning: Web dev & full-stack', top: '70%', left: '25%' },
        { text: 'Guestbook: Leave a message!', top: '55%', left: '80%' },
      ],
    }
  },
}
</script>

<style scoped>
.hero-map {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('/images/SolSystemMap.webp');
  background-size: cover;
  background-position: center;
  font-family: 'Cinzel', serif;
  overflow: hidden;
}

/* Navbar floats on top */
.navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background-color: rgba(0,0,0,0.4); /* semi-transparent over map */
}

/* Fact Boxes */
.fact-box {
  position: absolute;
  padding: 0.8rem 1rem;
  background-color: rgba(0, 212, 255, 0.2);
  border: 1px solid #00d4ff;
  border-radius: 6px;
  color: #00d4ff;
  font-weight: bold;
  text-shadow: 0 0 6px #00d4ff;
  backdrop-filter: blur(2px);
  animation: flicker 1.5s infinite;
  cursor: pointer;
  transition: transform 0.3s;
}

.fact-box:hover {
  transform: scale(1.1);
  background-color: rgba(0, 212, 255, 0.4);
}

/* Profile Picture Container */
.profile-container {
  position: absolute;
  bottom: 2%;
  right: 2%;
  width: 150px;
  height: 150px;
  z-index: 5;
}

.profile-container img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid #00d4ff;
  box-shadow: 0 0 20px #00d4ff, 0 0 40px #00d4ff inset;
  object-fit: cover;
  position: relative;
  z-index: 2;
}

/* Tech frame overlay */
.profile-container .tech-frame {
  position: absolute;
  inset: 0;
  border: 2px dashed rgba(0,212,255,0.5);
  border-radius: 50%;
  box-shadow: 0 0 20px #00d4ff;
  animation: flicker 2s infinite alternate;
  z-index: 1;
}

/* Flicker animation for holo effect */
@keyframes flicker {
  0% { opacity: 0.7; }
  25% { opacity: 0.9; }
  50% { opacity: 0.6; }
  75% { opacity: 1; }
  100% { opacity: 0.8; }
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .profile-container {
    width: 100px;
    height: 100px;
  }

  .fact-box {
    font-size: 0.8rem;
    padding: 0.5rem 0.8rem;
  }
}
</style>