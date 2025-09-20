
// ===== Route 420 — Sleek Age Gate (Drop‑in) =====
// Usage: include in <head>
// <link rel="stylesheet" href="agegate.css">
// <script src="agegate.js" defer></script>

(function(){
  const KEY = 'route420_age_ok';

  // Already verified? Nothing to do.
  try {
    if (localStorage.getItem(KEY) === 'yes') return;
  } catch(e) {}

  // Blur/lock the page content underneath
  document.documentElement.classList.add('age-locked');
  document.body.classList.add('age-locked');

  // Optionally blur a main container if present
  // If not, we still use overlay backdrop-filter
  const rootToBlur = document.querySelector('body > *:not(script):not(link):not(style)');
  if (rootToBlur) rootToBlur.classList.add('age-blur');

  // Build gate
  const gate = document.createElement('div');
  gate.id = 'r420-agegate';
  gate.innerHTML = `
    <div class="ag-panel" role="dialog" aria-modal="true" aria-labelledby="agTitle">
      <div class="ag-head">
        <div class="ag-logo"><img src="img/logo.png" alt="Route 420"></div>
      </div>
      <div style="text-align:center;margin-top:6px;">
        <span class="ag-pill">21+ Only</span>
      </div>
      <h2 id="agTitle">Welcome to Premium Glass</h2>
      <p>By entering, you confirm you are at least 21 years old.</p>

      <div class="ag-joint">
        <div class="ag-smoke"><span></span><span></span><span></span></div>
      </div>

      <div class="ag-actions">
        <label class="ag-remember"><input id="agRemember" type="checkbox"> Don't show again</label>
        <button id="agEnter" class="ag-btn" type="button" aria-label="Enter site">Enter</button>
        <div class="ag-links" aria-live="polite">
          <a href="https://www.responsibility.org/" target="_blank" rel="noopener">Exit</a>
        </div>
      </div>
    </div>
  `;

  function closeGate(){
    try {
      const remember = document.getElementById('agRemember');
      if (remember && remember.checked) localStorage.setItem(KEY, 'yes');
    } catch(e) {}
    gate.remove();
    document.documentElement.classList.remove('age-locked');
    document.body.classList.remove('age-locked');
    const blurred = document.querySelectorAll('.age-blur');
    blurred.forEach(el => el.classList.remove('age-blur'));
  }

  gate.addEventListener('click', (e)=>{
    // close only if clicking the overlay outside the panel
    if (e.target === gate) return; // keep modal strict (no accidental close)
  });

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' && document.getElementById('agEnter')){
      e.preventDefault();
      closeGate();
    }
  });

  gate.querySelector('#agEnter').addEventListener('click', closeGate);
  document.body.appendChild(gate);
})();
