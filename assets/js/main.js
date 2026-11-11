(function () {
  "use strict";

  var W = window.WEDDING;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var ICONS = {
    rings: '<circle cx="9" cy="14" r="6"/><circle cx="15" cy="14" r="6"/><path d="m10 4 2-2 2 2-2 2z"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    pen: '<path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/>',
    car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
    glass: '<path d="M8 22h8"/><path d="M12 11v11"/><path d="m19 3-7 8-7-8Z"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  };
  var svg = function (name) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[name] + "</svg>"; };
  var esc = function (s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; };

  /* ── Dates ─────────────────────────────── */
  var start = new Date(W.start);
  var end = new Date(W.end);
  var parts = {};
  new Intl.DateTimeFormat("en-GB", {
    timeZone: W.timeZone, weekday: "long", day: "numeric", month: "long", year: "numeric",
  }).formatToParts(start).forEach(function (p) { parts[p.type] = p.value; });
  var num = {};
  new Intl.DateTimeFormat("en-GB", {
    timeZone: W.timeZone, day: "2-digit", month: "2-digit", year: "numeric",
  }).formatToParts(start).forEach(function (p) { num[p.type] = p.value; });

  var DATE = {
    long: parts.weekday + ", " + parts.day + " " + parts.month + " " + parts.year,
    dots: num.day + " . " + num.month + " . " + num.year,
    time: start.toLocaleTimeString("en-US", { timeZone: W.timeZone, hour: "numeric", minute: "2-digit" }),
  };

  /* ── Guest name from ?to= (or ?guest=) ──── */
  var params = new URLSearchParams(location.search);
  var guest = (params.get("to") || params.get("guest") || W.defaultGuest || "").trim();

  /* ── Fill text bindings ─────────────────── */
  var deep = function (path) { return path.split(".").reduce(function (o, k) { return o && o[k]; }, W); };
  $$("[data-name]").forEach(function (el) { el.textContent = el.dataset.name === "1" ? W.partner1 : W.partner2; });
  $$("[data-mono]").forEach(function (el) { el.textContent = W.monogram[+el.dataset.mono - 1]; });
  $$("[data-date]").forEach(function (el) { el.textContent = DATE[el.dataset.date]; });
  $$("[data-text]").forEach(function (el) { el.textContent = deep(el.dataset.text) || ""; });
  $$("[data-venue]").forEach(function (el) { el.textContent = W.venue[el.dataset.venue]; });
  $$("[data-guest]").forEach(function (el) { el.textContent = guest ? "Dear " + guest : ""; });
  $$("[data-img]").forEach(function (el) {
    var img = el.dataset.img === "hero" ? W.heroImage : W.storyImage;
    el.src = img.src;
    el.style.objectPosition = img.position || "center";
  });
  document.title = W.partner1 + " & " + W.partner2 + " · Wedding Invitation";
  $("#rsvpName").value = params.get("to") || params.get("guest") || "";

  /* ── Events ─────────────────────────────── */
  $("#eventList").innerHTML = W.events.map(function (e, i) {
    return '<div class="event reveal" style="transition-delay:' + i * 0.1 + 's">' +
      '<span class="event-ic">' + svg(ICONS[e.icon] ? e.icon : "heart") + "</span>" +
      "<h3>" + esc(e.title) + "</h3>" +
      '<div class="event-time">' + esc(e.time) + "</div>" +
      '<span class="bar" aria-hidden="true"></span></div>';
  }).join("");

  /* ── Gallery + lightbox ─────────────────── */
  $("#galleryGrid").innerHTML = W.gallery.map(function (g, i) {
    return '<button type="button" class="g-tile reveal' + (g.tall ? " tall" : "") + '" data-i="' + i + '" style="transition-delay:' + (i % 4) * 0.08 + 's" aria-label="View photo ' + (i + 1) + '">' +
      '<span class="g-frame"><img src="' + g.src + '" alt="" loading="lazy" decoding="async" style="object-position:' + (g.position || "center") + '"></span></button>';
  }).join("");

  var lb = $("#lightbox"), lbImg = $("img", lb), lbIndex = 0;
  var showLb = function (i) {
    lbIndex = (i + W.gallery.length) % W.gallery.length;
    lbImg.src = W.gallery[lbIndex].src;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  };
  var hideLb = function () { lb.hidden = true; document.body.style.overflow = ""; };
  $$(".g-tile").forEach(function (t) { t.addEventListener("click", function () { showLb(+t.dataset.i); }); });
  $(".lb-close").addEventListener("click", hideLb);
  $(".lb-prev").addEventListener("click", function (e) { e.stopPropagation(); showLb(lbIndex - 1); });
  $(".lb-next").addEventListener("click", function (e) { e.stopPropagation(); showLb(lbIndex + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) hideLb(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") hideLb();
    if (e.key === "ArrowLeft") showLb(lbIndex - 1);
    if (e.key === "ArrowRight") showLb(lbIndex + 1);
  });
  var touchX = null;
  lb.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showLb(lbIndex + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ── Venue ──────────────────────────────── */
  $("#mapFrame").src = "https://maps.google.com/maps?q=" + encodeURIComponent(W.venue.mapEmbedQuery) + "&z=14&output=embed";
  $("#mapFrame").title = "Map of " + W.venue.name;
  $("#mapsLink").href = W.venue.mapsLink;

  /* ── Call buttons ───────────────────────── */
  $("#callRow").innerHTML = W.phones.map(function (p) {
    return '<a class="call-btn" href="tel:' + esc(p.tel) + '" aria-label="Call ' + esc(p.name) + '">' + svg("phone") + " Call " + esc(p.name) + "</a>";
  }).join("");

  /* ── Countdown ──────────────────────────── */
  var cd = { d: $("#cdDays"), h: $("#cdHours"), m: $("#cdMins"), s: $("#cdSecs") };
  var pad = function (n) { return n < 10 ? "0" + n : String(n); };
  var setNum = function (el, v) {
    if (el.textContent === v) return;
    el.textContent = v;
    el.classList.remove("tick"); void el.offsetWidth; el.classList.add("tick");
  };
  var tick = function () {
    var diff = Math.max(0, start - Date.now());
    var s = Math.floor(diff / 1000);
    setNum(cd.d, pad(Math.floor(s / 86400)));
    setNum(cd.h, pad(Math.floor((s % 86400) / 3600)));
    setNum(cd.m, pad(Math.floor((s % 3600) / 60)));
    setNum(cd.s, pad(s % 60));
  };
  tick();
  setInterval(tick, 1000);

  /* ── Calendar ───────────────────────────── */
  var utc = function (d) { return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); };
  var calTitle = "Wedding of " + W.partner1 + " & " + W.partner2;
  var calLoc = [W.venue.hall, W.venue.name, W.venue.address].filter(Boolean).join(", ");
  $("#calGoogle").href = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(calTitle) +
    "&dates=" + utc(start) + "/" + utc(end) +
    "&location=" + encodeURIComponent(calLoc) +
    "&details=" + encodeURIComponent("We can't wait to celebrate with you! " + location.href.split("?")[0]);
  $("#calIcs").addEventListener("click", function (e) {
    e.preventDefault();
    var ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding//Invitation//EN", "BEGIN:VEVENT",
      "UID:" + utc(start) + "-" + W.partner1.toLowerCase() + "@wedding",
      "DTSTAMP:" + utc(new Date()), "DTSTART:" + utc(start), "DTEND:" + utc(end),
      "SUMMARY:" + calTitle, "LOCATION:" + calLoc.replace(/,/g, "\\,"),
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = "wedding-" + W.partner1.toLowerCase() + "-" + W.partner2.toLowerCase() + ".ics";
    document.body.appendChild(a); a.click(); a.remove();
  });
  var calBtn = $("#calBtn"), calMenu = $("#calMenu");
  calBtn.addEventListener("click", function () {
    var open = calBtn.getAttribute("aria-expanded") !== "true";
    calBtn.setAttribute("aria-expanded", open);
    calMenu.hidden = !open;
  });

  /* ── RSVP (sent through WhatsApp) ───────── */
  var form = $("#rsvpForm"), thanks = $("#rsvpThanks"), err = $("#rsvpErr");
  var storeKey = "rsvp-" + W.partner1 + "-" + W.partner2;
  var guestField = $("#guestField");
  $$('input[name="attend"]').forEach(function (r) {
    r.addEventListener("change", function () { guestField.hidden = form.attend.value === "no"; });
  });
  try { if (localStorage.getItem(storeKey)) { form.hidden = true; thanks.hidden = false; } } catch (e) {}
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    err.hidden = !!name;
    if (!name) { form.name.focus(); return; }
    var yes = form.attend.value === "yes";
    var msg = "RSVP – " + W.partner1 + " & " + W.partner2 + "'s wedding\n" +
      "Name: " + name + "\n" +
      "Attending: " + (yes ? "Yes, joyfully accept" : "No, regretfully decline") + "\n" +
      (yes ? "Guests: " + form.guests.value + "\n" : "") +
      (form.note.value.trim() ? "Note: " + form.note.value.trim() : "");
    window.open("https://wa.me/" + W.rsvp.whatsapp + "?text=" + encodeURIComponent(msg), "_blank");
    try { localStorage.setItem(storeKey, "1"); } catch (e2) {}
    form.hidden = true; thanks.hidden = false;
  });
  $("#rsvpAgain").addEventListener("click", function () {
    try { localStorage.removeItem(storeKey); } catch (e) {}
    thanks.hidden = true; form.hidden = false;
  });

  /* ── Music ──────────────────────────────── */
  var audio = $("#bgMusic"), musicBtn = $("#musicBtn");
  if (W.music) {
    audio.src = W.music;
    musicBtn.hidden = false;
    musicBtn.addEventListener("click", function () {
      if (audio.paused) { audio.play(); musicBtn.classList.remove("muted"); }
      else { audio.pause(); musicBtn.classList.add("muted"); }
    });
  }

  /* ── Petals ─────────────────────────────── */
  var tones = ["#E5EDF5", "#DEE7F0", "#E7F0F9", "#D8E3EE"];
  var petalHtml = "";
  for (var i = 0; i < 13; i++) {
    var size = 8 + ((i * 7) % 9);
    petalHtml += '<span class="petal" style="left:' + (4 + i * 7.4).toFixed(1) + "%;animation-duration:" + (13 + ((i * 5) % 10)) + "s;animation-delay:" + ((i * 3) % 12) + 's">' +
      '<i style="width:' + size + "px;height:" + size + "px;opacity:" + (0.35 + (i % 4) * 0.05) +
      ";background:radial-gradient(circle at 32% 28%, #fff, " + tones[i % 4] + ");animation-duration:" + (4 + (i % 5) * 0.5) + "s;animation-delay:" + ((i * 3) % 12) + 's"></i></span>';
  }
  $("#petals").innerHTML = petalHtml;

  /* ── Scroll reveal ──────────────────────── */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); revealObs.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  var startReveal = function () { $$(".reveal").forEach(function (el) { revealObs.observe(el); }); };

  /* ── Active nav link ────────────────────── */
  var navLinks = $$(".topnav a, .bottomnav a");
  var setActive = function (id) {
    navLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + id); });
  };
  var navIds = ["hero", "story", "events", "gallery", "venue", "rsvp"]; // page order
  var onScroll = function () {
    var mid = window.innerHeight * 0.35, current = "hero";
    navIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= mid) current = id;
    });
    // the bottom nav has no "story" item; keep Home lit there
    setActive(current);
    if (current === "story") $$(".bottomnav a")[0].classList.add("active");
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── Envelope opening ───────────────────── */
  var intro = $("#intro");
  var opened = false;
  var openInvite = function () {
    if (opened) return;
    opened = true;
    intro.classList.add("is-opening");
    if (W.music) { audio.play().catch(function () { musicBtn.classList.add("muted"); }); }
    setTimeout(function () {
      intro.classList.add("is-gone");
      document.body.classList.remove("locked");
      window.scrollTo(0, 0);
      startReveal();
    }, 1700);
    setTimeout(function () { intro.hidden = true; }, 2700);
  };
  $("#openBtn").addEventListener("click", openInvite);
  $(".cel-card").addEventListener("click", openInvite);

  // Skip the envelope when linking straight to a section (e.g. …/#rsvp)
  if (location.hash && document.getElementById(location.hash.slice(1))) {
    intro.hidden = true;
    opened = true;
    document.body.classList.remove("locked");
    startReveal();
  }
})();
