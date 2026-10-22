(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var STAGGER = 48;

  function splitChars(el) {
    var dot = el.querySelector(".title__dot");
    var dotHTML = dot ? dot.outerHTML : "";
    var base = (el.getAttribute("aria-label") || el.textContent).replace(/\.$/, "");
    el.innerHTML = "";
    base.split("").forEach(function (ch) {
      var span = document.createElement("span");
      span.className = "char";
      span.textContent = ch;
      el.appendChild(span);
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
    base.trim().split(/\s+/).forEach(function (word) {
      var span = document.createElement("span");
      span.className = "word";
      span.textContent = word;
      el.appendChild(span);
    });
  }

  function splitOne(el) {
    if (el.hasAttribute("data-split-words")) splitWords(el);
    else splitChars(el);
  }

  function revealEl(el) {
    el.classList.add("is-revealed");
    el.querySelectorAll(".char, .word").forEach(function (bit, index) {
      bit.style.transitionDelay = index * STAGGER + "ms";
    });
  }

  var I18N = window.DIALEK_I18N || { dialects: [], defaultCode: "" };
  var byCode = {};
  I18N.dialects.forEach(function (dialect) { byCode[dialect.code] = dialect; });

  function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function applyDialect(code, animate) {
    var dialect = byCode[code] || byCode[I18N.defaultCode] || I18N.dialects[0];
    if (!dialect) return;

    document.documentElement.dataset.dialect = dialect.code;
    document.documentElement.lang = dialect.code === "nl" ? "nl" : "li";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = dialect.strings[el.getAttribute("data-i18n")];
      if (value == null) return;

      if (el.hasAttribute("data-split-words") || el.hasAttribute("data-split")) {
        el.setAttribute("aria-label", value);
        el.textContent = value;
        splitOne(el);
        if (animate || reduceMotion) revealEl(el);
      } else if (el.hasAttribute("data-i18n-paragraphs")) {
        el.replaceChildren();
        value.split(/\n\n+/).forEach(function (text) {
          var paragraph = document.createElement("p");
          paragraph.textContent = text;
          el.appendChild(paragraph);
        });
      } else if (value.indexOf("\n") >= 0) {
        el.innerHTML = value.split("\n").map(escapeHtml).join("<br>");
      } else {
        el.textContent = value;
      }
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var value = dialect.strings[el.getAttribute("data-i18n-aria")];
      if (value) el.setAttribute("aria-label", value);
    });
    // Metadata blijft de Nederlandse, redactioneel vastgelegde bron.
    var source = window.DIALEK_COPY_NL;
    if (source) {
      document.title = source.pageTitle;
      document.querySelector('meta[name="description"]').content = source.description;
      document.querySelector('meta[property="og:title"]').content = source.ogTitle;
      document.querySelector('meta[property="og:description"]').content = source.ogDescription;
    }
  }

  var stored = null;
  try { stored = localStorage.getItem("dialek-beta3-language"); } catch (error) {}
  var current = byCode[stored] ? stored : I18N.defaultCode;
  var select = document.getElementById("dialectSelect");

  if (select) {
    I18N.dialects.forEach(function (dialect) {
      var option = document.createElement("option");
      option.value = dialect.code;
      option.textContent = dialect.name + (dialect.town ? " · " + dialect.town : "");
      select.appendChild(option);
    });
    select.value = current;
    select.addEventListener("change", function () {
      current = select.value;
      try { localStorage.setItem("dialek-beta3-language", current); } catch (error) {}
      applyDialect(current, !reduceMotion);
    });
  }

  applyDialect(current, false);
  document.querySelectorAll("[data-split]:not([data-i18n])").forEach(splitChars);

  if (reduceMotion) {
    document.querySelectorAll(".reveal, [data-split], [data-split-words]").forEach(revealEl);
  } else {
    var heroGroups = [
      document.querySelector(".kicker"),
      document.querySelector(".title"),
      document.querySelector(".subtitle"),
      document.querySelector(".hero__facts--times"),
      document.querySelector(".hero__facts--where")
    ].filter(Boolean);

    window.addEventListener("load", function () {
      heroGroups.forEach(function (group, index) {
        window.setTimeout(function () { revealEl(group); }, 180 + index * 210);
      });
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          revealEl(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: "0px 0px -7% 0px" });

    document.querySelectorAll("main .reveal:not(.hero .reveal)").forEach(function (el) {
      observer.observe(el);
    });
  }

  document.querySelectorAll("[data-accordion]").forEach(function (card) {
    var trigger = card.querySelector(".schedule-card__trigger");
    if (!trigger) return;

    trigger.addEventListener("click", function () {
      var willOpen = !card.classList.contains("is-open");
      var group = card.closest("[data-accordion-group]");

      if (group) {
        group.querySelectorAll("[data-accordion].is-open").forEach(function (openCard) {
          openCard.classList.remove("is-open");
          var openTrigger = openCard.querySelector(".schedule-card__trigger");
          if (openTrigger) openTrigger.setAttribute("aria-expanded", "false");
        });
      }

      card.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  });

  var clouds = Array.prototype.slice.call(document.querySelectorAll(".clouds"));
  var rig = document.querySelector(".vlaai-rig");
  var scrollY = window.pageYOffset;
  var pointerX = 0;
  var currentX = 0;
  var ticking = false;

  function requestTick() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateParallax);
    }
  }

  function updateParallax() {
    ticking = false;
    currentX += (pointerX - currentX) * .055;

    if (!reduceMotion) {
      clouds.forEach(function (cloud) {
        var depth = parseFloat(cloud.getAttribute("data-depth")) || .04;
        cloud.style.translate = (currentX * depth * 175).toFixed(1) + "px " + (scrollY * depth * .42).toFixed(1) + "px";
      });
      if (rig) {
        var rigDepth = parseFloat(rig.getAttribute("data-depth")) || .09;
        rig.style.translate = (currentX * 12).toFixed(1) + "px " + (scrollY * rigDepth * .35).toFixed(1) + "px";
      }
    }

    if (Math.abs(pointerX - currentX) > .001) requestTick();
  }

  window.addEventListener("pointermove", function (event) {
    pointerX = (event.clientX / window.innerWidth) * 2 - 1;
    requestTick();
  }, { passive: true });

  var nav = document.querySelector(".nav");
  var progress = document.querySelector(".scroll-progress span");

  function onScroll() {
    scrollY = window.pageYOffset;
    if (nav) nav.classList.toggle("is-stuck", scrollY > 40);
    if (progress) {
      var height = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = "scaleX(" + (height > 0 ? scrollY / height : 0) + ")";
    }
    requestTick();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", requestTick);
  onScroll();
})();
