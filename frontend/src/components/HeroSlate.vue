<template>
  <div class="hero-container">
    <div class="background-particles">
      <span v-for="p in particles" :key="p.id" class="particle"
        :style="{ top: p.top, left: p.left, width: p.size+'px', height: p.size+'px', opacity: p.opacity, animationDuration: p.duration+'s', animationDelay: p.delay+'s' }">
      </span>
    </div>

    <div class="holo-icons">
      <span v-for="(h,i) in holos" :key="i" class="holo-icon"
        :style="{ top: h.top, left: h.left }"></span>
    </div>

    <div class="hero-slate">
      <div class="metal-seams"></div>
      <div class="scanlines"></div>
      
      <div class="user-signature">
        <span class="rank">OPERATOR:</span> CHRISTIAN BANASTAO
      </div>

      <div class="panel-content">
        <div class="data-area">
          
          <div v-if="showBoot" class="boot-sequence">
            <p v-for="(line,index) in bootLines" :key="index">
              {{ typedLines[index] }}
            </p>
          </div>

          <div v-else-if="isOverview" class="dashboard-wrapper">
            <div class="dashboard-panel top-panel">
              <div class="panel-header">RANK: CHRISTIAN BANASTAO</div>
              <div class="panel-body dashboard-split">
                <div class="log-text">
                  <p v-for="(line, index) in bootLines.slice(0, 4)" :key="index">{{ line }}</p>
                </div>
                <div class="visual-log-box">
                  <div class="tag">VISUAL_LOG_ACTIVE.dll</div>
                  <img src="/images/profilepic.jpg" class="dashboard-img" />
                </div>
              </div>
            </div>

            <div class="dashboard-panel mid-panel">
              <div class="panel-header">DATA FOCUS: {{ activeThumbLabel.toUpperCase() }}</div>
              <div class="panel-body dashboard-split">
                <div class="archive-desc">
                  <p>>>> Comprehensive log of expeditions. These records are time sensitive. Status: ARCHIVED.</p>
                </div>
                <div class="focus-viewer-mini">
                  <div class="tag">FOCUS_VIEWER</div>
                  <img :src="activeThumb || '/images/amsterdam.jpg'" class="dashboard-img full-color" />
                </div>
              </div>
            </div>

            <div class="dashboard-panel bot-panel">
              <div class="panel-header">DATA RELIQUARIUM - GLOBAL ASSETS</div>
              <div class="dashboard-grid">
                <div v-for="(img, key) in myImages" :key="key" class="grid-item" @click="setFocus(img, key)">
                  <img :src="img" :class="{'active-thumb': activeThumb === img}" />
                  <div class="grid-label">{{ key.toUpperCase() }}</div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="currentSection" class="data-section">
            <p class="data-start">
              &gt;&gt; [LOG] Data inload . . .<br>
              &gt;&gt; [LOG] Accessing: {{ currentSection }}
            </p>

            <div v-if="currentSection === 'Honorable Guest'" class="guestbook-container">
              <div class="guestbook-form">
                <input v-model="newGuestName" placeholder="IDENTIFY YOURSELF (NAME)..." class="ter-input" />
                <textarea v-model="newGuestMessage" placeholder="TRANSMIT MESSAGE TO THE ARCHIVES..." class="ter-input"></textarea>
                <button @click="submitToRollOfHonor" :disabled="isSubmitting" class="submit-btn">
                  {{ isSubmitting ? 'TRANSMITTING...' : 'SEAL & TRANSMIT' }}
                </button>
              </div>
              <div class="entries-list">
                <div v-for="entry in guestbookEntries" :key="entry.id" class="entry-card">
                  <div class="entry-header" style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="entry-name">[{{ entry.name }}]:</span>
                    <span class="entry-date" style="font-size: 0.8rem; opacity: 0.5; color: #66ff66;">{{ formatDate(entry.created_at) }}</span>
                  </div>
                  <span class="entry-msg">{{ entry.message }}</span>
                </div>
              </div>
            </div>

            <div v-else-if="currentSection === 'Archive'">
              <div class="focus-viewer" v-if="activeThumb">
                <img :src="activeThumb" class="enlarged-img full-color" />
                <div class="viewer-tag">VISUAL_LOG_ACTIVE.dll</div>
              </div>
              <div class="archive-grid">
                <div v-for="(img, idx) in cards.Archive.images" :key="idx" 
                     class="thumb-card" @click="activeThumb = img" :class="{ 'active-border': activeThumb === img }">
                  <img :src="img" class="grid-img" />
                  <div class="click-overlay">EXTRACT</div>
                </div>
              </div>
              <p class="typed-text">{{ displayedCardText }}</p>
            </div>

            <div v-else>
              <div v-if="cards[currentSection].image" class="thumbnail-wrapper">
                <img :src="cards[currentSection].image" class="single-thumb full-color" />
              </div>
              <p class="typed-text">{{ displayedCardText }}</p>
            </div>
          </div>
        </div>

        <div class="buttons-area">
          <button class="overview-btn" @click="toggleOverview">OVERVIEW</button>
          
          <button v-for="section in sectionNames" :key="section" @click="selectSection(section)">
            {{ section }}
          </button>
        </div>
      </div>

      <div class="profile-pic-container">
        <img src="/images/profilepic.jpg" class="profile-pic"/>
        <div class="tech-frame"></div>
        <div class="scan-overlay"></div>
      </div>

      <div class="aquila-container">
        <img src="/images/ImperialAquila.webp" class="aquila"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"HeroSlate",
  data(){
    return{
      isOverview: false,
      sectionNames:["Archive","Combat Doctrines","Scholasticus","The Eternal Crusade","Honorable Guest"],
      currentSection:null,
      showBoot:true,
      activeThumb: null,
      activeThumbLabel: 'amsterdam',
      // YOUR IMAGE SET
      myImages: {
        amsterdam: "/images/amsterdam.jpg", beach: "/images/beach.jpg", cargohold: "/images/cargohold.jpg",
        crane: "/images/crane.jpg", france: "/images/france.jpg", gala: "/images/gala.jpg",
        japan: "/images/japan.jpg", onduty: "/images/onduty.jpg", paraderest: "/images/paraderest.jpg",
        porthole: "/images/porthole.jpg", redsky: "/images/redsky.jpg", singapore: "/images/singapore.jpg",
        thailand: "/images/thailand.jpg"
      },
      bootLines:[
        ">> [LOG] Initializing Machine Spirit... Appeased.",
        ">> [LOG] Thought for the day: Blessed is the mind too small for doubt.",
        ">> [LOG] Accessing Data Reliquarium 056/234124...",
        ">> [LOG] Gellar Field Integrity: STABLE.",
        ">> [LOG] Archival Infoscantum 412: Pico/Lamdax active.",
        ">> [LOG] Originator: The Rock (Dark Angels Fortress Monastery)",
        ">> [LOG] Positional Triangulation: INCONCLUSIVE. Emperor Protects."
      ],
      typedLines:[],
      cards:{
        "Archive":{
          content: "Comprehensive log of past expeditions. Current status: ARCHIVED.",
          images: ["/images/amsterdam.jpg", "/images/france.jpg", "/images/thailand.jpg", "/images/japan.jpg"] 
        },
        "Combat Doctrines":{
          content: "Strategic Toolset: Mastery of Vue.js, NestJS, and Supabase.",
          image: "/images/onduty.jpg"
        },
        "Scholasticus":{
          content: "Bachelor of Science in Information Technology.",
          image: "/images/gala.jpg"
        },
        "The Eternal Crusade":{
          content: "Bridging software engineering and sci-fi aesthetics.",
          image: "/images/redsky.jpg"
        },
        "Honorable Guest":{content:"", image: null} 
      },
      displayedCardText:"",
      particles:[],
      holos:[],
      holoCount:20,
      typingTimer: null,
      guestbookEntries: [],
      newGuestName: '',
      newGuestMessage: '',
      isSubmitting: false
    }
  },
  created(){
    for(let i=0;i<50;i++){
      this.particles.push({
        id:i, top:Math.random()*100+'%', left:Math.random()*100+'%',
        size:1+Math.random()*2, opacity:0.05+Math.random()*0.2,
        duration:3+Math.random()*7, delay:Math.random()*5
      });
    }
    for(let i=0;i<this.holoCount;i++){
      this.holos.push({ top:Math.random()*100+'%', left:Math.random()*100+'%' });
    }
    this.startBootTyping();
  },
  methods:{
    formatDate(dateString) {
      if (!dateString) return '[DATE UNKNOWN]';
      const date = new Date(dateString);
      return `[${date.toLocaleDateString()}]`;
    },
    async redactEntry(id) {
      if (!confirm("CONFIRM EXTERMINATUS ON THIS RECORD?")) return;
      try {
        const response = await fetch(`/guestbook/${id}`, { method: 'DELETE' });
        if (response.ok) { await this.fetchGuestbook(); }
      } catch (error) { console.error("Redaction Failed:", error); }
    },
    startBootTyping(){
      let i=0,lineIndex=0;
      this.typedLines=Array(this.bootLines.length).fill("");
      const type=()=>{
        if(lineIndex>=this.bootLines.length) return;
        if(i<this.bootLines[lineIndex].length){
          this.typedLines[lineIndex]+=this.bootLines[lineIndex][i++];
          setTimeout(type,40);
        }else{ lineIndex++; i=0; setTimeout(type,100); }
      };
      type();
    },
    toggleOverview() {
      this.isOverview = true;
      this.showBoot = false;
      this.currentSection = null;
    },
    setFocus(img, label) {
      this.activeThumb = img;
      this.activeThumbLabel = label;
    },
    async selectSection(section){
      this.isOverview = false;
      this.showBoot = false;
      this.currentSection=section;
      if (section === 'Archive') { this.activeThumb = this.cards.Archive.images[0]; } 
      else { this.activeThumb = this.cards[section].image || null; }
      
      if(this.typingTimer) clearTimeout(this.typingTimer);
      if(section === 'Honorable Guest') { await this.fetchGuestbook(); } 
      else { this.startCardTyping(); }
    },
    startCardTyping(){
      this.displayedCardText="";
      let text=this.cards[this.currentSection].content;
      let i=0;
      const typeChar=()=>{
        if(i<text.length){
          this.displayedCardText+=text[i++];
          this.typingTimer = setTimeout(typeChar,30);
        }
      };
      typeChar();
    },
    async fetchGuestbook() {
      try {
        const response = await fetch('/guestbook');
        this.guestbookEntries = await response.json();
      } catch (error) { console.error("Archive Access Denied:", error); }
    },
    async submitToRollOfHonor() {
      if (!this.newGuestName || !this.newGuestMessage) return;
      this.isSubmitting = true;
      try {
        const response = await fetch('/guestbook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: this.newGuestName, message: this.newGuestMessage })
        });
        if (response.ok) {
          this.newGuestName = ''; this.newGuestMessage = '';
          await this.fetchGuestbook();
        }
      } catch (error) { console.error("Transmission Failed:", error); }
      finally { this.isSubmitting = false; }
    }
  }
}
</script>

<style scoped>
/* ALL YOUR ORIGINAL STYLES REMAIN UNTOUCHED BELOW */
.hero-container { width: 100vw; height: 100vh; background-color: #000; overflow: hidden; position: relative; }
.hero-slate { position: relative; width: 100%; height: 100%; background: linear-gradient(145deg, #1a1a1a, #050505); border: 10px solid #222; box-shadow: inset 0 0 60px rgba(0,0,0,0.9), 0 0 40px rgba(0, 255, 0, 0.2); }
.panel-content { position: relative; z-index: 3; display: flex; height: 100%; padding: 60px 220px 60px 60px; box-sizing: border-box; }
.data-area { flex: 1; color: #b6ff9a; font-family: 'VT323', monospace; text-align: left; overflow-y: auto; text-shadow: 0 0 8px rgba(0, 255, 0, 0.5); }
.data-area::-webkit-scrollbar { width: 6px; }
.data-area::-webkit-scrollbar-thumb { background: #66ff66; border-radius: 3px; }

/* NEW DASHBOARD STYLES */
.dashboard-wrapper { display: flex; flex-direction: column; gap: 15px; padding-right: 20px; }
.dashboard-panel { border: 2px solid #333; background: rgba(0,0,0,0.5); padding: 15px; border-radius: 4px; }
.panel-header { color: #fff; font-size: 1.2rem; border-bottom: 1px solid #333; margin-bottom: 10px; }
.dashboard-split { display: flex; gap: 20px; }
.visual-log-box, .focus-viewer-mini { width: 200px; height: 120px; border: 1px solid #66ff66; position: relative; background: #000; }
.dashboard-img { width: 100%; height: 100%; object-fit: cover; }
.tag { position: absolute; top: -10px; left: 5px; background: #000; font-size: 0.7rem; padding: 0 5px; color: #66ff66; border: 1px solid #66ff66; }
.dashboard-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; margin-top: 10px; }
.grid-item { border: 1px solid #444; height: 70px; position: relative; cursor: pointer; }
.grid-item img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) brightness(0.5); }
.grid-item:hover img, .active-thumb { filter: none !important; brightness: 1 !important; border: 1px solid #fff; }
.grid-label { position: absolute; bottom: 0; width: 100%; background: rgba(0,0,0,0.8); color: #fff; font-size: 0.6rem; text-align: center; }

/* OVERVIEW BUTTON UNIQUE STYLE */
.overview-btn { background: #004400 !important; border: 2px solid #fff !important; color: #fff !important; margin-bottom: 20px !important; }

/* FULL COLOR LOGIC */
.full-color { filter: none !important; }

/* RESTORED: REMAINING ORIGINAL CSS */
.typed-text { font-size: 1.4rem; line-height: 1.6; margin-top: 15px; }
.archive-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 15px; margin-top: 20px; }
.thumb-card { position: relative; border: 1px solid #66ff66; padding: 4px; background: rgba(0, 255, 0, 0.05); cursor: pointer; transition: all 0.3s ease; }
.thumb-card:hover { border-color: #fff; box-shadow: 0 0 10px #66ff66; }
.active-border { border-color: #fff; box-shadow: 0 0 15px #66ff66; }
.grid-img { width: 100%; height: 100px; object-fit: cover; filter: sepia(100%) hue-rotate(90deg) brightness(0.7); }
.focus-viewer { width: 100%; max-width: 500px; height: 300px; border: 2px solid #66ff66; margin-bottom: 20px; position: relative; background: #000; }
.enlarged-img { width: 100%; height: 100%; object-fit: contain; }
.viewer-tag { position: absolute; bottom: 5px; right: 5px; color: #66ff66; font-size: 0.8rem; background: #000; padding: 2px 5px; }
.thumbnail-wrapper { margin-bottom: 20px; border: 1px solid #66ff66; width: fit-content; padding: 5px; background: rgba(0, 255, 0, 0.05); }
.single-thumb { max-width: 300px; display: block; filter: sepia(100%) hue-rotate(90deg) brightness(0.8); }
.buttons-area { position: absolute; right: 40px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 15px; z-index: 10; }
.buttons-area button { background: #0b0b0b; border: 2px solid #66ff66; color: #b6ff9a; font-family: 'VT323', monospace; padding: 12px 20px; font-size: 1.1rem; min-width: 180px; cursor: pointer; text-transform: uppercase; transition: 0.2s; }
.buttons-area button:hover { background: #1a0000; color: #ff3333; border-color: #ff3333; box-shadow: 0 0 15px rgba(255, 51, 51, 0.5); }
.guestbook-container { max-width: 600px; }
.guestbook-form { display: flex; flex-direction: column; gap: 10px; margin-bottom: 30px; }
.ter-input { background: rgba(0, 30, 0, 0.5); border: 1px solid #66ff66; color: #b6ff9a; padding: 12px; font-family: 'VT323', monospace; font-size: 1.1rem; width: 100%; }
.submit-btn { background: #004400; color: #fff; border: 1px solid #66ff66; padding: 10px; cursor: pointer; font-family: 'VT323', monospace; }
.entry-card { border-left: 2px solid #66ff66; padding: 10px; margin-bottom: 10px; background: rgba(0,255,0,0.05); }
.entry-name { color: #ff3333; margin-right: 10px; font-weight: bold; }
.particle { position: absolute; background: #66ff66; border-radius: 50%; pointer-events: none; animation: float infinite linear; }
@keyframes float { 0% { transform: translateY(0); } 100% { transform: translateY(-100vh); } }
.holo-icon { position: absolute; width: 4px; height: 4px; background: rgba(0, 255, 0, 0.2); pointer-events: none; }
.aquila-container { position: absolute; top: 30px; right: 40px; width: 120px; z-index: 5; }
.aquila { width: 100%; filter: drop-shadow(0 0 5px #0f0); opacity: 0.6; }
.profile-pic-container { position: absolute; bottom: 30px; right: 40px; width: 120px; height: 120px; z-index: 5; }
.profile-pic { width: 100%; height: 100%; border-radius: 50%; border: 3px solid #0f0; box-shadow: 0 0 15px #0f0; object-fit: cover; }
.tech-frame { position: absolute; inset: -5px; border: 1px solid #0f0; border-radius: 50%; animation: rotate 10s linear infinite; }
.scan-overlay { position: absolute; inset: 0; background: linear-gradient(transparent, rgba(0,255,0,0.1), transparent); height: 20%; animation: scan 3s linear infinite; }
@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes scan { from { top: -20%; } to { top: 120%; } }
.scanlines { position: absolute; inset: 0; background: linear-gradient(rgba(0, 255, 0, 0.03) 1px, transparent 1px); background-size: 2px 2px; pointer-events: none; }
.metal-seams { position: absolute; inset: 0; border: 2px solid rgba(255,255,255,0.05); pointer-events: none; }
.user-signature { position: absolute; bottom: 20px; left: 20px; color: #b6ff9a; font-family: 'VT323', monospace; font-size: 1.2rem; letter-spacing: 2px; text-shadow: 0 0 10px rgba(0, 255, 0, 0.7); z-index: 10; border-left: 3px solid #66ff66; padding-left: 10px; pointer-events: none; }
.user-signature .rank { font-size: 0.8rem; opacity: 0.6; display: block; }

@media (max-width: 1024px) {
  .user-signature { bottom: 10px; left: 10px; font-size: 1rem; }
  .panel-content { flex-direction: column; padding: 20px; padding-bottom: 100px; }
  .buttons-area { position: static; transform: none; flex-direction: row; flex-wrap: wrap; justify-content: center; margin-top: 20px; }
  .buttons-area button { min-width: 140px; padding: 8px; font-size: 0.9rem; }
  .profile-pic-container, .aquila-container { display: none; }
}
</style>