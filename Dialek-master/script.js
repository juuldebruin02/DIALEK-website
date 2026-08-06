/* ============================================================
   DIALEK. — interaction layer
   · split text into chars / words + staggered reveal
   · subtle scroll + pointer parallax (background only)
   · drop-in vlaai + synthesized sound effects
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. SPLIT TEXT ------------------------------------ */
  function splitChars(el) {
    var dot = el.querySelector(".title__dot");
    var dotHTML = dot ? dot.outerHTML : "";
    var base = (el.getAttribute("aria-label") || el.textContent).replace(/\.$/, "");
    el.innerHTML = "";
    base.split("").forEach(function (ch) {
      var s = document.createElement("span");
      s.className = "char";
      s.textContent = ch;
      el.appendChild(s);
    });
    if (dotHTML) {
      var wrap = document.createElement("span");
      wrap.className = "char";
      wrap.innerHTML = dotHTML;
      el.appendChild(wrap);
    }
  }
  function splitWords(el) {
    var base = el.getAttribute("aria-label") || el.textContent;
    el.innerHTML = "";
    base.trim().split(/\s+/).forEach(function (w) {
      var s = document.createElement("span");
      s.className = "word";
      s.textContent = w;
      el.appendChild(s);
    });
  }
  function splitOne(el) {
    if (el.hasAttribute("data-split-words")) splitWords(el);
    else splitChars(el);
  }

  /* ---------- 2. STAGGERED REVEAL (helper used by reveal + i18n) - */
  var STAGGER = 55;
  function revealEl(el) {
    el.classList.add("is-revealed");
    el.querySelectorAll(".char, .word").forEach(function (bit, i) {
      bit.style.transitionDelay = i * STAGGER + "ms";
    });
  }

  /* ---------- 1b. LOCALIZATION — the "languages" are dialects --- */
  var I18N = window.DIALEK_I18N || { dialects: [], defaultCode: "" };
  var byCode = {};
  I18N.dialects.forEach(function (d) { byCode[d.code] = d; });

  function escapeHtml(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function applyDialect(code, reveal) {
    var d = byCode[code] || byCode[I18N.defaultCode] || I18N.dialects[0];
    if (!d) return;
    var s = d.strings;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var val = s[el.getAttribute("data-i18n")];
      if (val == null) return;
      if (el.hasAttribute("data-split-words") || el.hasAttribute("data-split")) {
        el.setAttribute("aria-label", val);
        el.textContent = val;            // pre-split / no-JS fallback
        splitOne(el);                    // rebuild .char/.word (hidden)
        if (reveal) revealEl(el);
      } else if (val.indexOf("\n") >= 0) {
        el.innerHTML = val.split("\n").map(escapeHtml).join("<br>");
      } else {
        el.textContent = val;
      }
    });
  }

  var stored = null;
  try { stored = localStorage.getItem("dialek-dialect"); } catch (e) {}
  var current = byCode[stored] ? stored : I18N.defaultCode;

  var select = document.getElementById("dialectSelect");
  if (select) {
    I18N.dialects.forEach(function (d) {
      var opt = document.createElement("option");
      opt.value = d.code;
      opt.textContent = d.name + " · " + d.town;
      select.appendChild(opt);
    });
    select.value = current;
    select.addEventListener("change", function () {
      current = select.value;
      try { localStorage.setItem("dialek-dialect", current); } catch (e) {}
      applyDialect(current, !reduceMotion);   // swap text + re-stagger it in
    });
  }

  // apply the chosen dialect, then split the (non-localized) brand title
  applyDialect(current, false);
  document.querySelectorAll("[data-split]:not([data-i18n])").forEach(splitChars);

  /* ---------- 2b. REVEAL TIMELINE ------------------------------ */
  if (reduceMotion) {
    document.querySelectorAll(".reveal, [data-split], [data-split-words]")
      .forEach(function (el) { el.classList.add("is-revealed"); });
  } else {
    var hero = document.getElementById("hero");
    var heroGroups = [
      hero.querySelector(".kicker"),
      hero.querySelector(".title"),
      hero.querySelector(".subtitle"),
      hero.querySelector(".hero__lineup"),
      hero.querySelector(".hero__present"),
      hero.querySelector(".hero__when")
    ].filter(Boolean);

    window.addEventListener("load", function () {
      heroGroups.forEach(function (g, gi) {
        setTimeout(function () { revealEl(g); }, 200 + gi * 260);
      });
    });
    hero.querySelectorAll(".hero__lineup li").forEach(function (li, i) {
      li.style.transitionDelay = i * STAGGER + "ms";
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { revealEl(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll("main > .panel .reveal").forEach(function (el) { io.observe(el); });
  }

  /* ---------- 3. PARALLAX (background only, via `translate`) ---- */
  var clouds = Array.prototype.slice.call(document.querySelectorAll(".clouds"));
  var rig = document.querySelector(".vlaai-rig");

  var scrollY = window.pageYOffset;
  var pointerX = 0, pointerY = 0, curPX = 0, curPY = 0;
  var ticking = false;

  function requestTick() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  function update() {
    ticking = false;
    curPX += (pointerX - curPX) * 0.07;
    curPY += (pointerY - curPY) * 0.07;

    if (!reduceMotion) {
      // clouds: tiny scroll lag + gentle pointer drift (kept small so the
      // bands stay on-screen across the whole page).
      clouds.forEach(function (c) {
        var d = parseFloat(c.getAttribute("data-depth")) || 0.05;
        var tx = curPX * d * 220;
        var ty = scrollY * d * 0.5;
        c.style.translate = tx.toFixed(1) + "px " + ty.toFixed(1) + "px";
      });
      // the vlaai rig: very subtle scroll lag + pointer follow (drop & swing
      // live on inner layers, so this `translate` never fights them).
      if (rig) {
        var rd = parseFloat(rig.getAttribute("data-depth")) || 0.12;
        rig.style.translate = (curPX * 22).toFixed(1) + "px " + (scrollY * rd * 0.5).toFixed(1) + "px";
      }
    }
    if (Math.abs(pointerX - curPX) > 0.001 || Math.abs(pointerY - curPY) > 0.001) requestTick();
  }

  window.addEventListener("scroll", function () { scrollY = window.pageYOffset; requestTick(); }, { passive: true });
  window.addEventListener("resize", requestTick);
  if (!reduceMotion) {
    window.addEventListener("pointermove", function (e) {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = (e.clientY / window.innerHeight) * 2 - 1;
      requestTick();
    }, { passive: true });
  }
  update();

  /* ---------- 4. NAV + PROGRESS -------------------------------- */
  var nav = document.querySelector(".nav");
  var progress = document.querySelector(".scroll-progress span");
  function onChrome() {
    var y = window.pageYOffset;
    if (nav) nav.classList.toggle("is-stuck", y > 40);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = "scaleX(" + (h > 0 ? y / h : 0) + ")";
    }
  }
  window.addEventListener("scroll", onChrome, { passive: true });
  onChrome();

  /* ---------- 5. SOUND EFFECTS (Web Audio, synthesized) -------- */
  // No audio files: a descending whoosh + rope-catch "tok" for the drop,
  // and a soft airy whoosh on each swing pass. Sound only ever starts from
  // an explicit user gesture (button / tap), so autoplay rules are respected.
  var SWING_PERIOD = 4600;        // matches the `bungel` animation duration
  var AC = null, master = null, noise = null, soundOn = false, swingTimer = null, swingSide = 1;

  function initAudio() {
    if (AC) return AC;
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    AC = new Ctx();
    master = AC.createGain();
    master.gain.value = 0.9;
    master.connect(AC.destination);
    // 2s of white noise, reused for all whooshes
    var len = AC.sampleRate * 2;
    noise = AC.createBuffer(1, len, AC.sampleRate);
    var data = noise.getChannelData(0);
    for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return AC;
  }

  function whoosh(opts) {
    if (!AC) return;
    var t = AC.currentTime;
    var src = AC.createBufferSource(); src.buffer = noise;
    var bp = AC.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = opts.q || 1;
    if (opts.sweep) {
      bp.frequency.setValueAtTime(opts.f0, t);
      bp.frequency.exponentialRampToValueAtTime(opts.f1, t + opts.dur);
    } else {
      bp.frequency.value = opts.f0;
    }
    var g = AC.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(opts.gain, t + 0.06);
    g.gain.exponentialRampToValueAtTime(0.0006, t + opts.dur);
    var tail = src.connect(bp).connect(g);
    if (opts.pan && AC.createStereoPanner) {
      var p = AC.createStereoPanner(); p.pan.value = opts.pan;
      tail.connect(p).connect(master);
    } else {
      tail.connect(master);
    }
    src.start(t); src.stop(t + opts.dur + 0.05);
  }

  function playDrop() {
    if (!soundOn || !AC) return;
    // falling whoosh, pitch sweeping down
    whoosh({ sweep: true, f0: 1700, f1: 220, q: 0.8, gain: 0.16, dur: 0.55 });
    // rope-catch "tok" + little boing when the string goes taut (~0.6s in)
    var t = AC.currentTime + 0.58;
    var o = AC.createOscillator(); o.type = "triangle";
    o.frequency.setValueAtTime(220, t);
    o.frequency.exponentialRampToValueAtTime(110, t + 0.18);
    var g = AC.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.28, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    o.connect(g).connect(master); o.start(t); o.stop(t + 0.45);
  }

  function playSwing(side) {
    whoosh({ f0: 720, q: 1.3, gain: 0.05, dur: 0.5, pan: side * 0.5 });
  }

  function startSwingLoop() {
    if (swingTimer || reduceMotion) return;
    swingTimer = setInterval(function () {
      if (soundOn) { playSwing(swingSide); swingSide *= -1; }
    }, SWING_PERIOD / 2);  // a pass at each direction change
  }
  function stopSwingLoop() {
    if (swingTimer) { clearInterval(swingTimer); swingTimer = null; }
  }

  /* ---------- 6. DROP-IN + WIRING ------------------------------ */
  var drop = document.querySelector(".vlaai-drop");
  var vlaaiBtn = document.getElementById("vlaai");
  var soundBtn = document.getElementById("soundToggle");

  function replayDrop() {
    if (!drop || reduceMotion) return;
    drop.style.animation = "none";
    void drop.offsetWidth;     // force reflow so the animation restarts
    drop.style.animation = "";
  }

  function setSound(on) {
    soundOn = on;
    if (soundBtn) {
      soundBtn.classList.toggle("is-on", on);
      soundBtn.setAttribute("aria-pressed", on ? "true" : "false");
      soundBtn.setAttribute("aria-label", on ? "Geluid oetzètte" : "Geluid aanzètte");
    }
    if (on) startSwingLoop(); else stopSwingLoop();
  }

  if (soundBtn) {
    soundBtn.addEventListener("click", function () {
      initAudio();
      if (AC && AC.state === "suspended") AC.resume();
      if (!soundOn) {
        setSound(true);
        replayDrop();           // show + hear the drop as the payoff
        setTimeout(playDrop, 30);
      } else {
        setSound(false);
      }
    });
  }

  if (vlaaiBtn) {
    vlaaiBtn.addEventListener("click", function () {
      // a tap is a user gesture → safe to (re)start audio
      initAudio();
      if (AC && AC.state === "suspended") AC.resume();
      replayDrop();
      if (soundOn) setTimeout(playDrop, 30);
    });
  }
})();
