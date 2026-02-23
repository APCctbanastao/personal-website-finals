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

      <div class="panel-content">
        <div class="data-area">
          <div v-if="showBoot" class="boot-sequence">
            <p v-for="(line,index) in bootLines" :key="index">
              {{ typedLines[index] }}
            </p>
          </div>

          <div v-if="currentSection && !showBoot" class="data-section">
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
                  <span class="entry-name">[{{ entry.name }}]:</span>
                  <span class="entry-msg">{{ entry.message }}</span>
                </div>
              </div>
            </div>

            <p v-else class="typed-text">{{ displayedCardText }}</p>
          </div>
        </div>

        <div class="buttons-area">
          <button
            v-for="section in sectionNames"
            :key="section"
            @click="selectSection(section)">
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
      sectionNames:["Archive","Combat Doctrines","Scholasticus","The Eternal Crusade","Honorable Guest"],
      currentSection:null,
      showBoot:true,
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
        "Archive":{content:"Warhammer 40k fan, coding enthusiast, sci-fi UI designer, Vue developer."},
        "Combat Doctrines":{content:"Vue, Vite, Supabase, NestJS, JS, CSS, HTML, UI/UX, Futuristic Interfaces."},
        "Scholasticus":{content:"BSIT student, full-stack dev training, interactive systems design."},
        "The Eternal Crusade":{content:"From frontend to sci-fi interface engineering and system design."},
        "Honorable Guest":{content:""} 
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
    startBootTyping(){
      let i=0,lineIndex=0;
      this.typedLines=Array(this.bootLines.length).fill("");
      const type=()=>{
        if(lineIndex>=this.bootLines.length) return;
        if(i<this.bootLines[lineIndex].length){
          this.typedLines[lineIndex]+=this.bootLines[lineIndex][i++];
          setTimeout(type,40);
        }else{
          lineIndex++; i=0;
          setTimeout(type,100);
        }
      };
      type();
    },
    async selectSection(section){
      this.currentSection=section;
      this.showBoot=false;
      if(this.typingTimer) clearTimeout(this.typingTimer);

      if(section === 'Honorable Guest') {
        await this.fetchGuestbook();
      } else {
        this.startCardTyping();
      }
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
        // Relative path for Vercel deployment
        const response = await fetch('/guestbook');
        this.guestbookEntries = await response.json();
      } catch (error) {
        console.error("Archive Access Denied:", error);
      }
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
          this.newGuestName = '';
          this.newGuestMessage = '';
          await this.fetchGuestbook();
        }
      } catch (error) {
        console.error("Transmission Failed:", error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
</script>

<style scoped>
.hero-container {
  width: 100vw;
  height: 100vh;
  background-color: #000;
  overflow: hidden;
  position: relative;
}

.hero-slate {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #1a1a1a, #050505);
  border: 10px solid #222;
  box-shadow: inset 0 0 60px rgba(0,0,0,0.9), 0 0 40px rgba(0, 255, 0, 0.2);
}

.panel-content {
  position: relative;
  z-index: 3;
  display: flex;
  height: 100%;
  padding: 60px 220px 60px 60px;
  box-sizing: border-box;
}

.data-area {
  flex: 1;
  color: #b6ff9a;
  font-family: 'VT323', monospace;
  text-align: left;
  overflow-y: auto;
  text-shadow: 0 0 8px rgba(0, 255, 0, 0.5);
}

.typed-text { font-size: 1.4rem; line-height: 1.6; }

.buttons-area {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 10;
}

.buttons-area button {
  background: #0b0b0b;
  border: 2px solid #66ff66;
  color: #b6ff9a;
  font-family: 'VT323', monospace;
  padding: 12px 20px;
  font-size: 1.1rem;
  min-width: 180px;
  cursor: pointer;
  text-transform: uppercase;
  transition: 0.2s;
}

.buttons-area button:hover {
  background: #1a0000;
  color: #ff3333;
  border-color: #ff3333;
  box-shadow: 0 0 15px rgba(255, 51, 51, 0.5);
}

/* Guestbook Styles */
.guestbook-container { max-width: 600px; }
.guestbook-form { display: flex; flex-direction: column; gap: 10px; margin-bottom: 30px; }
.ter-input {
  background: rgba(0, 30, 0, 0.5);
  border: 1px solid #66ff66;
  color: #b6ff9a;
  padding: 12px;
  font-family: 'VT323', monospace;
  font-size: 1.1rem;
  width: 100%;
}
.submit-btn {
  background: #004400;
  color: #fff;
  border: 1px solid #66ff66;
  padding: 10px;
  cursor: pointer;
  font-family: 'VT323', monospace;
}
.entry-card { border-left: 2px solid #66ff66; padding: 10px; margin-bottom: 10px; background: rgba(0,255,0,0.05); }
.entry-name { color: #ff3333; margin-right: 10px; font-weight: bold; }

/* Decorations */
.aquila-container { position: absolute; top: 30px; right: 40px; width: 120px; z-index: 5; }
.aquila { width: 100%; filter: drop-shadow(0 0 5px #0f0); opacity: 0.6; }

.profile-pic-container { position: absolute; bottom: 30px; right: 40px; width: 120px; height: 120px; z-index: 5; }
.profile-pic { width: 100%; height: 100%; border-radius: 50%; border: 3px solid #0f0; box-shadow: 0 0 15px #0f0; object-fit: cover; }

.scanlines { position: absolute; inset: 0; background: linear-gradient(rgba(0, 255, 0, 0.03) 1px, transparent 1px); background-size: 2px 2px; pointer-events: none; }

/* MOBILE RESPONSIVENESS */
@media (max-width: 1024px) {
  .panel-content {
    flex-direction: column;
    padding: 20px;
    padding-bottom: 100px;
  }
  .buttons-area {
    position: static;
    transform: none;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
  }
  .buttons-area button {
    min-width: 140px;
    padding: 8px;
    font-size: 0.9rem;
  }
  .profile-pic-container, .aquila-container {
    display: none;
  }
}
</style>