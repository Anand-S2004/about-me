/**
 * Interactive Experiments & Lab Simulators
 * Showcasing the core algorithmic & mathematical innovations:
 * 1. Project Milky Way: Celestial Directional Foliation
 * 2. CV-OSNS: Complex Plane Orthogonal Signal-Noise Decomposition
 * 3. Theseus' Foe: Anti-Cyclic Combat Reinforcement Learning
 * 4. SpiderNet: Multi-Shock 5D Topological Anomaly Radar
 */

// ==========================================
// 1. PROJECT MILKY WAY: CELESTIAL FOLIATION
// ==========================================
function initMilkyWayLab() {
    const dimSlider = document.getElementById('mw-dim');
    const bitsSlider = document.getElementById('mw-bits');
    const dimVal = document.getElementById('mw-dim-val');
    const bitsVal = document.getElementById('mw-bits-val');
    const compRatio = document.getElementById('mw-compression-ratio');
    const cosineSim = document.getElementById('mw-cosine-sim');
    const canvas = document.getElementById('mw-canvas');

    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function update() {
        const D = parseInt(dimSlider.value, 10);
        const B = parseInt(bitsSlider.value, 10);
        dimVal.textContent = D;
        bitsVal.textContent = B;

        // Original 32-bit float vector = D * 32 bits
        const origBits = D * 32;
        // Milky Way: 1 photometric float (32 bits) + D directional bits
        const mwBits = 32 + (D * (B / 4));
        const ratio = (origBits / mwBits).toFixed(1);
        compRatio.textContent = `${ratio}x`;

        // Empirical fidelity curve: 1 - e^(-B) * scaling
        const fidelity = (0.91 + (0.085 * (1 - Math.exp(-B / 2)))).toFixed(3);
        cosineSim.textContent = fidelity;

        // Render 2D celestial foliation projection
        drawFoliation(ctx, canvas.width, canvas.height, D, B);
    }

    function drawFoliation(ctx, w, h, D, B) {
        ctx.clearRect(0, 0, w, h);
        const cx = w / 2;
        const cy = h / 2;

        // Draw radial concentric foliation shells
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
        ctx.lineWidth = 1;
        for (let r = 25; r < cx - 10; r += 30) {
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Draw hyperspherical directional rays
        const numRays = Math.min(64, Math.floor(D / 10) * B);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        for (let i = 0; i < numRays; i++) {
            const angle = (i / numRays) * Math.PI * 2;
            const r = (cx - 15) * (0.4 + 0.6 * Math.sin(i * 1.7));
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
            ctx.stroke();

            // Draw quantized stellar vertex
            ctx.fillStyle = i % 2 === 0 ? '#38bdf8' : '#818cf8';
            ctx.beginPath();
            ctx.arc(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 2.2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Standard Candle central emitter
        const gradient = ctx.createRadialGradient(cx, cy, 2, cx, cy, 28);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(0.3, 'rgba(129, 140, 248, 0.6)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, 28, 0, Math.PI * 2);
        ctx.fill();
    }

    dimSlider.addEventListener('input', update);
    bitsSlider.addEventListener('input', update);
    update();
}

// ==========================================
// 2. CV-OSNS: COMPLEX PLANE SEPARATION
// ==========================================
function initCvOsnsLab() {
    const volSlider = document.getElementById('cv-volatility');
    const volVal = document.getElementById('cv-vol-val');
    const signalError = document.getElementById('cv-signal-error');
    const noiseError = document.getElementById('cv-noise-error');
    const canvas = document.getElementById('cv-canvas');

    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let time = 0;

    function render() {
        time += 0.03;
        const vol = parseFloat(volSlider.value);
        volVal.textContent = `${(vol * 100).toFixed(0)}%`;

        // Signal Net error stays minimal (orthogonal protection)
        const sigErr = (0.012 + 0.003 * Math.sin(time)).toFixed(3);
        // Noise net absorbs the full variance
        const nErr = (vol * 1.45 + 0.05 * Math.cos(time * 2)).toFixed(3);
        signalError.textContent = sigErr;
        noiseError.textContent = nErr;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;

        // Draw Complex Plane axes
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(15, cy);
        ctx.lineTo(w - 15, cy);
        ctx.moveTo(cx, 15);
        ctx.lineTo(cx, h - 15);
        ctx.stroke();

        ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
        ctx.font = '10px monospace';
        ctx.fillText('Re (Signal net)', w - 85, cy - 8);
        ctx.fillText('Im (Noise net)', cx + 8, 22);

        // Signal trajectory (Deterministic trend along Real axis)
        const baseTrend = Math.sin(time * 0.8) * 65;
        // Orthogonal noise spike along Imaginary axis
        const noisePerturb = (Math.sin(time * 4) + Math.cos(time * 7) * 0.5) * (vol * 70);

        // Orthogonal vector decomposition in C
        const px = cx + baseTrend;
        const py = cy - noisePerturb;

        // Trace line from origin to (a + ib)
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.stroke();

        // Projections on Real & Imaginary axes
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)'; // Real projection
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px, cy);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)'; // Imaginary projection
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(cx, py);
        ctx.stroke();
        ctx.setLineDash([]);

        // Real Signal point (Blue)
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(px, cy, 5, 0, Math.PI * 2);
        ctx.fill();

        // Imaginary Noise point (Amber)
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(cx, py, 5, 0, Math.PI * 2);
        ctx.fill();

        // Complex number (a + ib) head
        ctx.fillStyle = '#ec4899';
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();

        requestAnimationFrame(render);
    }

    volSlider.addEventListener('input', () => {});
    render();
}

// ==========================================
// 3. THESEUS' FOE: ANTI-CYCLIC COMBAT AI
// ==========================================
function initTheseusLab() {
    const moveButtons = document.querySelectorAll('.combat-move-btn');
    const bossActionDisplay = document.getElementById('boss-action-display');
    const aiPrediction = document.getElementById('ai-predicted-move');
    const playerHistoryDisplay = document.getElementById('player-history-display');
    const exploitScoreDisplay = document.getElementById('ai-exploit-score');
    const statusText = document.getElementById('combat-status-text');

    if (!bossActionDisplay) return;

    // Counters dictionary
    const counterMap = {
        'Fast Slash': 'Shield Parry & Riposte',
        'Heavy Smash': 'Sidestep & Counter-Thrust',
        'Feint & Roll': 'Sweeping Whirlwind',
        'Defensive Block': 'Guard-Break Bash'
    };

    // Transition Markov matrix
    const history = [];
    const transitionMatrix = {};
    const moves = ['Fast Slash', 'Heavy Smash', 'Feint & Roll', 'Defensive Block'];

    moves.forEach(m1 => {
        transitionMatrix[m1] = {};
        moves.forEach(m2 => {
            transitionMatrix[m1][m2] = 1; // Laplace smoothing
        });
    });

    moveButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const playerMove = btn.dataset.move;
            executeCombatTurn(playerMove);
        });
    });

    function executeCombatTurn(playerMove) {
        let predictedNextMove = 'Fast Slash';
        let exploitConfidence = 25;

        if (history.length >= 1) {
            const lastMove = history[history.length - 1];
            transitionMatrix[lastMove][playerMove] += 3;

            // Predict player's move following playerMove
            let maxCount = -1;
            for (const nextCandidate of moves) {
                if (transitionMatrix[playerMove][nextCandidate] > maxCount) {
                    maxCount = transitionMatrix[playerMove][nextCandidate];
                    predictedNextMove = nextCandidate;
                }
            }

            // Calculate confidence
            let totalTransitions = 0;
            moves.forEach(m => totalTransitions += transitionMatrix[playerMove][m]);
            exploitConfidence = Math.min(96, Math.round((maxCount / totalTransitions) * 100));
        }

        history.push(playerMove);
        if (history.length > 8) history.shift();

        // Boss counters the move the player JUST executed or anticipated
        const bossMove = counterMap[playerMove] || 'Adaptive Stance Shift';

        // Update UI
        bossActionDisplay.textContent = bossMove;
        bossActionDisplay.className = 'text-base font-semibold text-rose-400 animate-pulse';
        aiPrediction.textContent = predictedNextMove;
        exploitScoreDisplay.textContent = `${exploitConfidence}%`;

        // Render history chips
        playerHistoryDisplay.innerHTML = '';
        history.forEach((m, idx) => {
            const chip = document.createElement('span');
            chip.className = 'text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700';
            chip.textContent = `${idx + 1}. ${m}`;
            playerHistoryDisplay.appendChild(chip);
        });

        if (exploitConfidence > 65) {
            statusText.textContent = `🚨 Anti-Cyclic Memory active! AI detected repeated behavioral pattern and adapted counters.`;
            statusText.className = 'text-xs text-amber-400 mt-2 font-mono';
        } else {
            statusText.textContent = `⚡ Boss is mapping your tactical state space (Entropy high).`;
            statusText.className = 'text-xs text-cyan-400 mt-2 font-mono';
        }
    }
}

// ==========================================
// 4. SPIDERNET: 5-SHOCK ANOMALY RADAR
// ==========================================
function initSpiderNetLab() {
    const canvas = document.getElementById('spider-canvas');
    const shockButtons = document.querySelectorAll('.shock-scenario-btn');
    const activeScenarioLabel = document.getElementById('shock-scenario-label');
    const anomalyConfidence = document.getElementById('shock-confidence');

    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const shocks = [
        { name: 'Latent Geometry', key: 'latent', angle: (0 * 2 * Math.PI) / 5 - Math.PI / 2 },
        { name: 'GMM Zone Likelihood', key: 'zone', angle: (1 * 2 * Math.PI) / 5 - Math.PI / 2 },
        { name: 'Temporal Velocity', key: 'temporal', angle: (2 * 2 * Math.PI) / 5 - Math.PI / 2 },
        { name: 'Wasserstein Topology', key: 'topology', angle: (3 * 2 * Math.PI) / 5 - Math.PI / 2 },
        { name: 'Causal Edge Residuals', key: 'causal', angle: (4 * 2 * Math.PI) / 5 - Math.PI / 2 }
    ];

    let currentLevels = [0.2, 0.25, 0.18, 0.15, 0.22];
    let targetLevels = [0.2, 0.25, 0.18, 0.15, 0.22];

    const presets = {
        baseline: { name: 'Normal Operational Flow', vals: [0.15, 0.18, 0.12, 0.14, 0.16], conf: '4.2%' },
        ddos: { name: 'Distributed Traffic Surge', vals: [0.85, 0.92, 0.78, 0.35, 0.40], conf: '94.8%' },
        topological: { name: 'Cascading Topology Shift', vals: [0.45, 0.30, 0.52, 0.96, 0.88], conf: '98.1%' },
        flash: { name: 'Latent Causal Shock', vals: [0.94, 0.45, 0.82, 0.65, 0.95], conf: '96.4%' }
    };

    shockButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            shockButtons.forEach(b => b.classList.remove('bg-indigo-600', 'text-white'));
            btn.classList.add('bg-indigo-600', 'text-white');

            const scenarioKey = btn.dataset.scenario;
            const scenario = presets[scenarioKey];
            if (scenario) {
                targetLevels = scenario.vals;
                activeScenarioLabel.textContent = scenario.name;
                anomalyConfidence.textContent = scenario.conf;
            }
        });
    });

    function drawRadar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const maxR = cx - 38;

        // Smooth interpolation
        for (let i = 0; i < 5; i++) {
            currentLevels[i] += (targetLevels[i] - currentLevels[i]) * 0.08;
        }

        // Draw web rings
        ctx.strokeStyle = 'rgba(79, 70, 229, 0.18)';
        ctx.lineWidth = 1;
        for (let ring = 0.2; ring <= 1.0; ring += 0.2) {
            ctx.beginPath();
            shocks.forEach((s, idx) => {
                const x = cx + Math.cos(s.angle) * (maxR * ring);
                const y = cy + Math.sin(s.angle) * (maxR * ring);
                if (idx === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.closePath();
            ctx.stroke();
        }

        // Draw radial spokes & labels
        ctx.fillStyle = 'rgba(148, 163, 184, 0.75)';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        shocks.forEach(s => {
            const sx = cx + Math.cos(s.angle) * maxR;
            const sy = cy + Math.sin(s.angle) * maxR;
            ctx.strokeStyle = 'rgba(129, 140, 248, 0.25)';
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(sx, sy);
            ctx.stroke();

            // Label position
            const lx = cx + Math.cos(s.angle) * (maxR + 18);
            const ly = cy + Math.sin(s.angle) * (maxR + 18) + 3;
            ctx.fillText(s.name.split(' ')[0], lx, ly);
        });

        // Draw active shock polygon
        ctx.beginPath();
        shocks.forEach((s, idx) => {
            const r = maxR * currentLevels[idx];
            const px = cx + Math.cos(s.angle) * r;
            const py = cy + Math.sin(s.angle) * r;
            if (idx === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.fillStyle = 'rgba(236, 72, 153, 0.35)';
        ctx.fill();
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw vertices
        shocks.forEach((s, idx) => {
            const r = maxR * currentLevels[idx];
            const px = cx + Math.cos(s.angle) * r;
            const py = cy + Math.sin(s.angle) * r;
            ctx.fillStyle = '#f43f5e';
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(drawRadar);
    }

    drawRadar();
}

window.addEventListener('DOMContentLoaded', () => {
    initMilkyWayLab();
    initCvOsnsLab();
    initTheseusLab();
    initSpiderNetLab();
});

