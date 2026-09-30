// ── SECURITY LAYER - BY TOXIC
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

window.addEventListener('pageshow', function (event) {
  document.getElementById('lov').classList.remove('show');
  document.getElementById('aov').classList.remove('show');
});

function goLogin(e) {
  e.preventDefault();
  document.getElementById('lov').classList.add('show');
  setTimeout(function () { window.location.href = 'login.html'; }, 1800);
}

function goApply(e) {
  e.preventDefault();
  document.getElementById('aov').classList.add('show');
  setTimeout(function () { window.location.href = 'apply.html'; }, 1800);
}

function makeSlider(trackId, dotsId, prevId, nextId, autoMs) {
  var track = document.getElementById(trackId);
  if (!track) return;
  var dotsEl = document.getElementById(dotsId);
  var dots = dotsEl ? Array.from(dotsEl.children) : [];
  var n = track.children.length;
  var cur = 0, timer = null;

  function go(i) {
    cur = ((i % n) + n) % n;
    track.style.transform = 'translateX(-' + (cur * 100) + '%)';
    dots.forEach(function (d, j) { d.classList.toggle('on', j === cur); });
  }

  var prev = document.getElementById(prevId);
  var next = document.getElementById(nextId);
  if (prev) prev.addEventListener('click', function () { clearInterval(timer); go(cur - 1); });
  if (next) next.addEventListener('click', function () { clearInterval(timer); go(cur + 1); });
  dots.forEach(function (d, i) { d.addEventListener('click', function () { clearInterval(timer); go(i); }); });

  var sx = 0;
  track.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', function (e) {
    var dx = sx - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) { clearInterval(timer); go(dx > 0 ? cur + 1 : cur - 1); }
  });

  if (autoMs) timer = setInterval(function () { go(cur + 1); }, autoMs);
}

makeSlider('heroTrack', 'heroDots', 'heroPrev', 'heroNext', 4500);
makeSlider('ishopTrack', 'ishopDots', null, null, 3800);
makeSlider('posterTrack', 'posterDots', null, null, 3000);
makeSlider('pickTrack', 'pickDots', null, null, 4000);
makeSlider('vTrack', 'vDots', null, null, 3200);

var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal, .stagger').forEach(function (el) { io.observe(el); });