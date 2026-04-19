// =============================================
// Lihka Games - app.js | Premium 2026 Edition
// =============================================
(function () {
  'use strict';

  // ===== MOBILE MENU =====
  const menuBtn = document.querySelector('.menu-btn');
  const mobNav = document.querySelector('.mob-nav');
  const mobClose = document.querySelector('.mob-close');
  const mobOverlay = document.querySelector('.mob-overlay');
  const btt = document.querySelector('.btt');
  const headerSearch = document.getElementById('hs');

  function openMenu() {
    mobNav && mobNav.classList.add('open');
    mobOverlay && mobOverlay.classList.add('open');
    menuBtn && menuBtn.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeMenu() {
    mobNav && mobNav.classList.remove('open');
    mobOverlay && mobOverlay.classList.remove('open');
    menuBtn && menuBtn.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  menuBtn && menuBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    mobNav && mobNav.classList.contains('open') ? closeMenu() : openMenu();
  });

  mobClose && mobClose.addEventListener('click', closeMenu);
  mobOverlay && mobOverlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  if (mobNav) {
    mobNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  // ===== BACK TO TOP =====
  if (btt) {
    window.addEventListener('scroll', function () {
      btt.classList.toggle('show', window.scrollY > 300);
    });
    btt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== HEADER SEARCH =====
  if (headerSearch) {
    function doSearch() {
      var v = headerSearch.value.trim();
      if (v) location.href = 'search.html?q=' + encodeURIComponent(v);
    }
    headerSearch.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') doSearch();
    });
    var searchBtn = headerSearch.parentElement.querySelector('button');
    searchBtn && searchBtn.addEventListener('click', doSearch);
  }

})();

// =============================================
// SEARCH DATABASE
// =============================================
var DB = [
  { name: "Block Fusion",                 type: "game", link: "https://github.com/LihkaGames/Block-Fusion-Game/raw/refs/heads/main/Block%20Fusion.apk" },
  { name: "Blitz Storm Arena",            type: "game", link: "https://github.com/LihkaGames/Blitz-Storm-Arena/raw/refs/heads/main/Blitz%20Storm%20Arena.apk" },
  { name: "Crystal Cascade",              type: "game", link: "https://github.com/LihkaGames/Crystal-Cascade-Game/raw/refs/heads/main/Crystal%20Cascade.apk" },
  { name: "Disc Strike Arena",            type: "game", link: "https://github.com/LihkaGames/Disc-Strike-Arena-Game/releases/download/v1.0/Disc.Strike.Arena.apk" },
  { name: "Roll Master Quest: Ludo Game", type: "game", link: "https://github.com/LihkaGames/Roll-Master-Quest-Ludo-Game/releases/download/v1.0.0/Roll.Master.Quest.apk" },
  { name: "Serpent Surge",                type: "game", link: "https://github.com/LihkaGames/Serpent-Surge-Game/releases/download/v1.0.0/Serpent.Surge.apk" },
  { name: "Turbo Trail Racer",            type: "game", link: "https://github.com/LihkaGames/Turbo-Trail-Racer-Game/releases/download/v1.0.0/Turbo.Trail.Racer.apk" },
  { name: "Precision Shot",               type: "game", link: "https://github.com/LihkaGames/Precision-Shot-Game/releases/download/v1.0.0/Precision.Shot.apk" },
  { name: "Phantom Strike",               type: "game", link: "https://github.com/LihkaGames/Phantom-Strike-Game/releases/download/v1.0.0/Phantom.Strike.apk" },
  { name: "Glass Velocity",               type: "game", link: "https://github.com/LihkaGames/Glass-Velocity-Game/releases/download/v1.0.0/Glass.Velocity.apk" },
  { name: "Axe Splitter",                 type: "game", link: "https://github.com/LihkaGames/Axe-Splitter-Game/releases/download/v1.0.0/Axe.Splitter.apk" },
  { name: "Toon Crosser",                 type: "game", link: "https://github.com/LihkaGames/Toon-Crosser-Game/releases/download/v1.0.0/Toon.Crosser.apk" },
  { name: "PhotoEdit Pro",                type: "app",  link: "#" },
  { name: "CloudNote Plus",               type: "app",  link: "#" },
  { name: "FitTrack Health",              type: "app",  link: "#" },
  { name: "MusicBox Stream",              type: "app",  link: "#" },
  { name: "VideoMaker",                   type: "app",  link: "#" },
  { name: "Social Connect",               type: "app",  link: "#" }
];

// =============================================
// PREMIUM 2026 STYLES INJECTION
// =============================================
(function injectStyle() {
  var style = document.createElement('style');
  style.textContent = `

    /* ── GLOBAL SEARCH PAGE RESET ── */
    #search-results * { box-sizing: border-box; }

    /* ── ANIMATED GRADIENT BACKGROUND ORBS ── */
    .search-bg-orb {
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
      filter: blur(80px);
      animation: orbFloat 8s ease-in-out infinite;
    }
    .search-bg-orb-1 {
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(0,200,83,0.08), transparent 70%);
      top: -100px; left: -100px;
      animation-delay: 0s;
    }
    .search-bg-orb-2 {
      width: 300px; height: 300px;
      background: radial-gradient(circle, rgba(0,230,118,0.06), transparent 70%);
      bottom: 200px; right: -80px;
      animation-delay: -4s;
    }
    .search-bg-orb-3 {
      width: 200px; height: 200px;
      background: radial-gradient(circle, rgba(0,200,83,0.05), transparent 70%);
      top: 50%; left: 50%;
      animation-delay: -2s;
    }
    @keyframes orbFloat {
      0%,100% { transform: translateY(0px) scale(1); }
      33%      { transform: translateY(-30px) scale(1.05); }
      66%      { transform: translateY(20px) scale(0.95); }
    }

    /* ── RESULTS WRAPPER ── */
    .search-results-wrap {
      display: flex;
      flex-direction: column;
      gap: 12px;
      position: relative;
      z-index: 1;
    }

    /* ── RESULT ROW ── */
    .srr {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 16px 20px;
      background: linear-gradient(135deg,
        rgba(15,15,15,0.95) 0%,
        rgba(20,20,20,0.95) 100%
      );
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.04);
      position: relative;
      overflow: hidden;
      cursor: default;
      transition:
        transform 0.35s cubic-bezier(.4,2,.6,1),
        border-color 0.35s ease,
        box-shadow 0.35s ease;
      animation: rowSlideIn 0.4s cubic-bezier(.4,2,.6,1) both;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    /* staggered slide-in */
    .srr:nth-child(1)  { animation-delay: 0.03s; }
    .srr:nth-child(2)  { animation-delay: 0.06s; }
    .srr:nth-child(3)  { animation-delay: 0.09s; }
    .srr:nth-child(4)  { animation-delay: 0.12s; }
    .srr:nth-child(5)  { animation-delay: 0.15s; }
    .srr:nth-child(6)  { animation-delay: 0.18s; }
    .srr:nth-child(7)  { animation-delay: 0.21s; }
    .srr:nth-child(8)  { animation-delay: 0.24s; }
    .srr:nth-child(9)  { animation-delay: 0.27s; }
    .srr:nth-child(10) { animation-delay: 0.30s; }

    @keyframes rowSlideIn {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.96);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    /* animated green left accent bar */
    .srr::before {
      content: '';
      position: absolute;
      left: 0; top: 0;
      width: 3px; height: 100%;
      background: linear-gradient(180deg, #00c853, #00e676, #00c853);
      background-size: 100% 200%;
      border-radius: 3px 0 0 3px;
      animation: accentFlow 2s linear infinite;
    }
    @keyframes accentFlow {
      0%   { background-position: 0% 0%; }
      100% { background-position: 0% 200%; }
    }

    /* top shimmer line */
    .srr::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(0,230,118,0.3),
        transparent
      );
      opacity: 0;
      transition: opacity 0.35s ease;
    }

    .srr:hover::after { opacity: 1; }

    .srr:hover {
      transform: translateX(6px) scale(1.01);
      border-color: rgba(0, 200, 83, 0.2);
      box-shadow:
        0 8px 32px rgba(0,0,0,0.4),
        0 0 0 1px rgba(0,200,83,0.08),
        inset 0 0 30px rgba(0,200,83,0.02);
    }

    /* inner glow sweep on hover */
    .srr-glow {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: radial-gradient(
        ellipse at 0% 50%,
        rgba(0,200,83,0.06) 0%,
        transparent 60%
      );
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }
    .srr:hover .srr-glow { opacity: 1; }

    /* ── LEFT ICON CIRCLE ── */
    .srr-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, #00c853, #00e676);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      flex-shrink: 0;
      position: relative;
      box-shadow:
        0 4px 14px rgba(0,200,83,0.3),
        inset 0 1px 0 rgba(255,255,255,0.2);
      transition: transform 0.35s cubic-bezier(.4,2,.6,1), box-shadow 0.3s ease;
      animation: iconPop 0.5s cubic-bezier(.4,2,.6,1) both;
    }
    @keyframes iconPop {
      from { transform: scale(0.5) rotate(-10deg); opacity: 0; }
      to   { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    .srr:hover .srr-icon {
      transform: scale(1.12) rotate(-5deg);
      box-shadow: 0 6px 20px rgba(0,200,83,0.45);
    }

    /* icon pulse ring */
    .srr-icon::after {
      content: '';
      position: absolute;
      inset: -3px;
      border-radius: 15px;
      border: 1.5px solid rgba(0,230,118,0.3);
      opacity: 0;
      transition: opacity 0.3s ease;
      animation: iconRing 2s ease-in-out infinite;
    }
    .srr:hover .srr-icon::after { opacity: 1; }
    @keyframes iconRing {
      0%,100% { transform: scale(1); opacity: 0.3; }
      50%      { transform: scale(1.1); opacity: 0; }
    }

    /* ── TEXT AREA ── */
    .srr-info { min-width: 0; flex: 1; }

    .srr-name {
      font-weight: 700;
      font-size: 0.95rem;
      color: #f0f0f0;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: 0.1px;
      transition: color 0.3s ease;
    }
    .srr:hover .srr-name { color: #fff; }

    .srr-meta {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .srr-dev {
      font-size: 0.72rem;
      color: #555;
      letter-spacing: 0.2px;
    }

    .srr-dot {
      width: 3px; height: 3px;
      border-radius: 50%;
      background: #333;
      flex-shrink: 0;
    }

    /* type badge */
    .srr-badge {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      padding: 2px 8px;
      border-radius: 20px;
      font-size: 0.62rem;
      font-weight: 800;
      letter-spacing: 0.6px;
      text-transform: uppercase;
    }
    .srr-badge-game {
      background: rgba(0,200,83,0.1);
      color: #00e676;
      border: 1px solid rgba(0,200,83,0.2);
    }
    .srr-badge-app {
      background: rgba(100,180,255,0.08);
      color: #64b5f6;
      border: 1px solid rgba(100,180,255,0.2);
    }

    /* ── PREMIUM DOWNLOAD BUTTON ── */
    .srr-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 20px;
      background: linear-gradient(135deg, #00b248, #00c853, #00e676, #00c853, #00b248);
      background-size: 300% 300%;
      color: #fff !important;
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-decoration: none;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      box-shadow:
        0 4px 15px rgba(0,200,83,0.35),
        0 0 0 1px rgba(0,230,118,0.15),
        inset 0 1px 0 rgba(255,255,255,0.18);
      animation: btnGradFlow 3s ease infinite;
      transition:
        transform 0.3s cubic-bezier(.4,2,.6,1),
        box-shadow 0.3s ease;
    }

    @keyframes btnGradFlow {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* shimmer sweep */
    .srr-btn::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 60%; height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255,255,255,0.25),
        transparent
      );
      transition: left 0.55s ease;
    }
    .srr-btn:hover::before { left: 150%; }

    /* outer glow ring */
    .srr-btn::after {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: 12px;
      border: 1.5px solid rgba(0,230,118,0);
      transition: border-color 0.3s ease;
    }
    .srr-btn:hover::after {
      border-color: rgba(0,230,118,0.35);
      animation: btnRingPulse 1s ease-out infinite;
    }
    @keyframes btnRingPulse {
      0%   { transform: scale(1); opacity: 1; }
      100% { transform: scale(1.12); opacity: 0; }
    }

    .srr-btn:hover {
      transform: translateY(-3px) scale(1.06);
      box-shadow:
        0 10px 30px rgba(0,200,83,0.5),
        0 0 25px rgba(0,230,118,0.2),
        inset 0 1px 0 rgba(255,255,255,0.25);
    }

    .srr-btn:active {
      transform: translateY(0) scale(0.96);
      box-shadow: 0 2px 8px rgba(0,200,83,0.3);
    }

    /* download icon bounce */
    .srr-btn-icon {
      display: inline-block;
      animation: iconBounce 2s ease-in-out infinite;
    }
    @keyframes iconBounce {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(2px); }
    }
    .srr-btn:hover .srr-btn-icon {
      animation: iconBounceFast 0.4s ease-in-out infinite;
    }
    @keyframes iconBounceFast {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(3px); }
    }

    /* ── NUMBER COUNTER BADGE ── */
    .srr-num {
      position: absolute;
      top: 10px; right: 10px;
      font-size: 0.6rem;
      font-weight: 800;
      color: rgba(0,200,83,0.25);
      letter-spacing: 0.5px;
      font-variant-numeric: tabular-nums;
    }

    /* ── COUNT BADGE IN HEADING ── */
    .search-count-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 2px 10px;
      background: linear-gradient(135deg, #00c853, #00e676);
      color: #000;
      font-size: 0.72rem;
      font-weight: 800;
      border-radius: 20px;
      margin-left: 8px;
      box-shadow: 0 2px 8px rgba(0,200,83,0.3);
      animation: pillPop 0.4s cubic-bezier(.4,2,.6,1) both;
    }
    @keyframes pillPop {
      from { transform: scale(0); opacity: 0; }
      to   { transform: scale(1); opacity: 1; }
    }

    /* ── EMPTY STATE ── */
    .search-empty {
      text-align: center;
      padding: 70px 20px;
      animation: fadeUp 0.5s ease both;
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .search-empty-icon {
      font-size: 3rem;
      margin-bottom: 14px;
      animation: emptyIconFloat 3s ease-in-out infinite;
    }
    @keyframes emptyIconFloat {
      0%,100% { transform: translateY(0) rotate(0deg); }
      50%      { transform: translateY(-8px) rotate(5deg); }
    }
    .search-empty h3 {
      color: #666;
      font-size: 1rem;
      margin: 0 0 6px;
      font-weight: 700;
    }
    .search-empty p {
      color: #444;
      font-size: 0.82rem;
      margin: 0;
    }

    /* ── SEARCH TYPING INDICATOR ── */
    .search-typing {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 30px;
    }
    .search-typing span {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #00c853;
      animation: typingDot 1.2s ease-in-out infinite;
    }
    .search-typing span:nth-child(2) { animation-delay: 0.2s; }
    .search-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typingDot {
      0%,80%,100% { transform: scale(0.6); opacity: 0.3; }
      40%          { transform: scale(1); opacity: 1; }
    }

    /* ── RESULT COUNT ANIMATE ── */
    .srr-count-line {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      font-size: 0.82rem;
      color: #555;
      animation: fadeUp 0.3s ease both;
    }
    .srr-count-divider {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, rgba(0,200,83,0.2), transparent);
    }

    /* ── POPULAR TAGS ── */
    .search-tag {
      display: inline-flex;
      align-items: center;
      padding: 6px 14px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 20px;
      font-size: 0.78rem;
      color: #888;
      cursor: pointer;
      transition:
        background 0.25s ease,
        border-color 0.25s ease,
        color 0.25s ease,
        transform 0.25s cubic-bezier(.4,2,.6,1);
    }
    .search-tag:hover {
      background: rgba(0,200,83,0.1);
      border-color: rgba(0,200,83,0.25);
      color: #00e676;
      transform: translateY(-2px) scale(1.05);
    }

    /* ── SCROLLBAR ── */
    #search-results::-webkit-scrollbar { width: 4px; }
    #search-results::-webkit-scrollbar-track { background: transparent; }
    #search-results::-webkit-scrollbar-thumb {
      background: linear-gradient(#00c853, #00e676);
      border-radius: 4px;
    }

  `;
  document.head.appendChild(style);
})();

// =============================================
// INJECT BACKGROUND ORBS
// =============================================
(function injectOrbs() {
  if (!document.querySelector('.search-bg-orb')) {
    ['search-bg-orb-1','search-bg-orb-2','search-bg-orb-3'].forEach(function(cls) {
      var orb = document.createElement('div');
      orb.className = 'search-bg-orb ' + cls;
      document.body.appendChild(orb);
    });
  }
})();

// =============================================
// SEARCH PAGE
// =============================================
if (window.location.pathname.includes('search.html')) {

  var params = new URLSearchParams(window.location.search);
  var query  = params.get('q') || '';
  var qdEl   = document.getElementById('qd');
  var rcEl   = document.getElementById('rc');
  var resEl  = document.getElementById('search-results');
  var siEl   = document.getElementById('si');

  // live search input
  if (siEl) {
    siEl.value = query;

    var searchTimer;
    siEl.addEventListener('input', function () {
      clearTimeout(searchTimer);

      // show typing dots
      if (resEl && siEl.value.trim()) {
        resEl.innerHTML =
          '<div class="search-typing">' +
          '<span></span><span></span><span></span>' +
          '</div>';
      }

      searchTimer = setTimeout(function () {
        runSearch(siEl.value.trim());
      }, 280);
    });

    siEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var v = siEl.value.trim();
        if (v) location.href = 'search.html?q=' + encodeURIComponent(v);
      }
    });
  }

  if (qdEl) qdEl.textContent = query;
  runSearch(query);

  function runSearch(q) {
    if (!resEl) return;

    // ── EMPTY STATE ──
    if (!q) {
      if (rcEl) rcEl.innerHTML = '0';
      resEl.innerHTML =
        '<div class="search-empty">' +
          '<div class="search-empty-icon">🔎</div>' +
          '<h3>Search apps & games</h3>' +
          '<p style="margin-bottom:20px">Try searching for your favourite game</p>' +
          '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">' +
            tag('Block Fusion') + tag('Racing') +
            tag('Ludo') + tag('Snake') + tag('Puzzle') +
          '</div>' +
        '</div>';
      return;
    }

    var lower   = q.toLowerCase();
    var results = DB.filter(function (item) {
      return item.name.toLowerCase().includes(lower);
    });

    // ── UPDATE COUNT ──
    if (rcEl) {
      rcEl.innerHTML =
        results.length +
        ' <span class="search-count-pill">' + results.length + '</span>';
    }

    // ── NO RESULTS ──
    if (results.length === 0) {
      resEl.innerHTML =
        '<div class="search-empty">' +
          '<div class="search-empty-icon">😕</div>' +
          '<h3>No results for "' + escHtml(q) + '"</h3>' +
          '<p style="margin-bottom:20px">Try a different keyword</p>' +
          '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">' +
            tag('Block') + tag('Blitz') +
            tag('Turbo') + tag('Crystal') + tag('Phantom') +
          '</div>' +
        '</div>';
      return;
    }

    // ── RESULTS ──
    var html =
      '<div class="srr-count-line">' +
        '<span>' + results.length + ' result' + (results.length > 1 ? 's' : '') + ' found</span>' +
        '<div class="srr-count-divider"></div>' +
      '</div>' +
      '<div class="search-results-wrap">';

    results.forEach(function (item, i) {
      var isGame     = item.type === 'game';
      var badgeCls   = isGame ? 'srr-badge-game' : 'srr-badge-app';
      var badgeIcon  = isGame ? '🎮' : '📱';
      var badgeTxt   = isGame ? 'GAME' : 'APP';
      var emoji      = isGame ? '🎮' : '📱';
      var num        = String(i + 1).padStart(2, '0');

      html +=
        '<div class="srr">' +
          '<div class="srr-glow"></div>' +
          '<span class="srr-num">' + num + '</span>' +

          '<div style="display:flex;align-items:center;gap:14px;min-width:0;flex:1;">' +

            '<div class="srr-icon" style="animation-delay:' + (i * 0.05) + 's">' +
              emoji +
            '</div>' +

            '<div class="srr-info">' +
              '<div class="srr-name">' + escHtml(item.name) + '</div>' +
              '<div class="srr-meta">' +
                '<span class="srr-dev">Lihka Games</span>' +
                '<span class="srr-dot"></span>' +
                '<span class="srr-badge ' + badgeCls + '">' +
                  badgeIcon + ' ' + badgeTxt +
                '</span>' +
              '</div>' +
            '</div>' +

          '</div>' +

          '<a href="' + item.link + '" class="srr-btn" download>' +
            '<span class="srr-btn-icon">⬇</span>' +
            'Download' +
          '</a>' +

        '</div>';
    });

    html += '</div>';
    resEl.innerHTML = html;
  }

  // ── HELPER: popular tag chip ──
  function tag(label) {
    return '<span class="search-tag" onclick="' +
      'document.getElementById(\'si\').value=\'' + label + '\';' +
      'runSearch(\'' + label + '\')">' +
      label +
    '</span>';
  }

  // ── HELPER: escape HTML ──
  function escHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}