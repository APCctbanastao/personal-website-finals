<template>
  <section :class="['hero-map', darkMode ? 'dark' : 'light']">
    <!-- Navbar -->
    <Navbar @toggle-theme="toggleDarkMode" :dark-mode="darkMode" />

    <!-- Fact Boxes -->
    <div
      v-for="(fact, index) in facts"
      :key="index"
      class="fact-wrapper"
      :style="getLineStyle(fact)"
    >
      <div class="line-to-profile"></div>
      <div
        class="fact-box"
        :style="{ animationDelay: fact.delay + 's' }"
        @click="fact.open = !fact.open"
      >
        <strong>{{ fact.title }}</strong>
        <p v-if="fact.open">{{ fact.text }}</p>
      </div>
    </div>

    <!-- Profile Picture -->
    <div ref="profile" class="profile-container">
      <img src="/images/profilepic.jpg" alt="Profile" />
      <div class="tech-frame"></div>
    </div>
  </section>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'HeroMap',
  components: { Navbar },
  data() {
    return {
      darkMode: true,
      facts: [
        {
          title: 'About Me',
          text: 'Christian, BSIT student',
          top: '20%',
          left: '15%',
          delay: 0,
          open: false,
        },
        {
          title: 'Skills',
          text: 'Vue.js, JS, HTML/CSS, Supabase',
          top: '35%',
          left: '40%',
          delay: 0.5,
          open: false,
        },
        {
          title: 'Academic',
          text: 'Asia Pacific College',
          top: '50%',
          left: '60%',
          delay: 1,
          open: false,
        },
        {
          title: 'Learning',
          text: 'Web dev & full-stack',
          top: '70%',
          left: '25%',
          delay: 1.5,
          open: false,
        },
        {
          title: 'Guestbook',
          text: 'Leave a message!',
          top: '55%',
          left: '80%',
          delay: 2,
          open: false,
        },
      ],
      profileRect: { x: 0, y: 0, width: 0, height: 0 },
    }
  },
  mounted() {
    this.updateProfileRect()
    window.addEventListener('resize', this.updateProfileRect)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateProfileRect)
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
    },
    updateProfileRect() {
      const profileEl = this.$refs.profile
      if (profileEl) {
        const rect = profileEl.getBoundingClientRect()
        this.profileRect = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      }
    },
    getLineStyle(fact) {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const factX = parseFloat(fact.left) / 100 * viewportWidth
      const factY = parseFloat(fact.top) / 100 * viewportHeight
      const dx = this.profileRect.x - factX
      const dy = this.profileRect.y - factY
      const angle = Math.atan2(dy, dx) * 180 / Math.PI
      return {
        position: 'absolute',
        top: fact.top,
        left: fact.left,
        transform: `rotate(${angle}deg)`,
      }
    },
  },
}
</script>

<style scoped>
.hero-map {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #000; /* darker background outside map */
  font-family: 'Cinzel', serif;
  overflow: hidden;
}

.hero-map.dark {
  background-color: #000;
}

.hero-map.light {
  background-color: #111;
}

/* Map image full coverage */
.hero-map::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/images/SolSystemMap.webp');
  background-size: cover;
  background-position: center;
  z-index: 0;
  filter: brightness(0.9); /* slight darkening for better contrast */
}

/* Navbar floats on top */
.navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.4);
}

/* Fact wrapper with line */
.fact-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 5;
}

/* Dynamic glowing line */
.line-to-profile {
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #7fff00, #adff2f); /* neon green/yellowish */
  box-shadow: 0 0 10px #7fff00, 0 0 20px #adff2f;
  animation: glow-line 2s infinite alternate;
}

/* Fact Box */
.fact-box {
  padding: 0.8rem 1rem;
  background-color: rgba(127, 255, 0, 0.2);
  border: 1px solid #7fff00;
  border-radius: 6px;
  color: #7fff00;
  font-weight: bold;
  text-shadow: 0 0 8px #000;
  backdrop-filter: blur(0); /* remove blur for readability */
  animation: flicker 1.5s infinite;
  cursor: pointer;
  transition: transform 0.3s;
  max-width: 200px;
}

.fact-box p {
  margin: 0.5rem 0 0 0;
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
  border: 3px solid #7fff00;
  box-shadow: 0 0 20px #7fff00, 0 0 40px #7fff00 inset;
  object-fit: cover;
  position: relative;
  z-index: 2;
}

/* Tech frame overlay */
.profile-container .tech-frame {
  position: absolute;
  inset: 0;
  border: 2px dashed rgba(127, 255, 0, 0.5);
  border-radius: 50%;
  box-shadow: 0 0 20px #7fff00;
  animation: flicker 2s infinite alternate;
  z-index: 1;
}

/* Flicker animations */
@keyframes flicker {
  0% { opacity: 0.7; }
  25% { opacity: 0.9; }
  50% { opacity: 0.6; }
  75% { opacity: 1; }
  100% { opacity: 0.8; }
}

@keyframes glow-line {
  0% { box-shadow: 0 0 5px #7fff00; opacity: 0.7; }
  50% { box-shadow: 0 0 15px #7fff00, 0 0 25px #adff2f; opacity: 1; }
  100% { box-shadow: 0 0 5px #7fff00; opacity: 0.7; }
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .profile-container { width: 100px; height: 100px; }
  .fact-box { font-size: 0.8rem; padding: 0.5rem 0.8rem; max-width: 150px; }
  .line-to-profile { height: 1.5px; }
}
</style>