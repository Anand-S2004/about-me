# 🌌 Anand Srinivasan — Research & Systems Portfolio

A hyper-aesthetic, physics-grounded personal portfolio website designed for GitHub Pages. Built with **ReactBits.dev-inspired micro-interactions**, dynamic **hyperspherical canvas backgrounds**, **interactive in-browser algorithmic laboratories**, and deep project narratives showcasing the creative inspirations behind your computer science work.

---

## 🚀 Live Preview Locally

You don't need any complex build tools or `npm install` — it runs right out of the box!

### Option 1: Direct File Open
Simply double click on `portfolio/index.html` or open it with your favorite browser:
```powershell
Start-Process "c:\Users\anand\Anu-CS\portfolio\index.html"
```

### Option 2: Local HTTP Server (Python)
```powershell
cd c:\Users\anand\Anu-CS\portfolio
& "C:\Users\anand\AppData\Local\Python\bin\python.exe" -m http.server 8000
```
Then navigate to: `http://localhost:8000`

---

## 🌐 How to Deploy to GitHub Pages (2 Minutes)

You can host this website completely for free on **GitHub Pages**!

### Method A: Host as your primary personal website (`yourusername.github.io`)
1. Create a new repository on GitHub named: `<your-username>.github.io`
2. Copy the files inside this `portfolio/` folder (`index.html`, `styles.css`, `script.js`, `canvas-bg.js`, `experiments.js`, and `assets/`) directly to the root of that repository.
3. Push the commits to `main`:
   ```bash
   git init
   git add .
   git commit -m "Launch research portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
4. Within 60 seconds, your portfolio will be live at `https://<your-username>.github.io`!

### Method B: Host as a project sub-page within an existing repo
1. Go to your GitHub repository -> **Settings** -> **Pages**.
2. Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
3. Choose branch `main` and directory `/portfolio` (or `/root`), then click **Save**.
4. Your website will be available at `https://<your-username>.github.io/<repo-name>/`.

---

## 🎨 Features & Interactive Elements

- **ReactBits.dev-Style Micro-Interactions**:
  - **Spotlight Cards**: Dynamic radial cursor illumination tracking the mouse with glowing borders.
  - **Aurora Ambient Mesh**: Multi-layered drifting gradient orbs creating depth behind dark glassmorphism surfaces.
  - **Decrypted Text Scramble**: Cybernetic character decode animations when hovering over badges and titles.
  - **Shiny Specular Badges**: Angled light shimmer effect across key impact markers.
- **Dynamic Background Modes**:
  - *Mode 1: Celestial Foliation*: Simulates the astronomical coordinate shells from **Project Milky Way**.
  - *Mode 2: Vector Flow*: Simulates Optimal Transport streamlines along neural vector fields (**Reduction Network**).
- **4 Playable Algorithmic Labs**:
  1. **Milky Way Foliation Simulator**: Adjust embedding dimensions and directional bits to observe compression ratio and cosine similarity preservation.
  2. **CV-OSNS Complex Plane Separator**: Inject volatility spikes and watch the dual network decouple base trajectory ($\text{Re}$) from heteroscedastic noise ($\text{Im}$).
  3. **Theseus' Foe Combat Duel**: Attack the boss! Test whether you can escape the AI's Markov exploit detection without getting countered.
  4. **SpiderNet 5-Shock Tensile Radar**: Trigger simulated system shocks (traffic bursts, topology shifts, causal spikes) and visualize the 5-shock attribution manifold.
- **Project Deep Dives**:
  - Covers **Project Milky Way**, **Theseus' Foe**, **CV-OSNS**, **DriftLoop**, **SpiderNet**, **Reduction Network (GTD)**, **Flux**, **Consistency AI**, and **OKC Analytics**.
  - Explains the exact philosophical and physical inspiration behind every single project.

---

## 📝 Customizing Placeholders

Search for `[Placeholder` inside `portfolio/index.html` to find sections ready for your personal additions:
- **Upcoming Publications** (`#publications`): Add details for next conference submissions.
- **Personal Hobbies** (`#hobbies`): Add music, sports, coffee, or hardware tinkering.
- **Awards & Honors** (`#about`): Add scholarships, hackathon victories, or fellowships.
- **Student Clubs & TA Roles** (`#extracurriculars`): Add teaching assistantships or leadership roles.

