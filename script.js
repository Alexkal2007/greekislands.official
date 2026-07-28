/* ==========================================================================
   Greek Island — script.js
   Hash-routed SPA. Reads DESTINATIONS from data.js. Zero build step.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------ *
   * UI STRINGS (EN/EL)
   * ------------------------------------------------------------------ */
  var UI = {
    el: {
      skipLink: "Μετάβαση στο περιεχόμενο", navHome: "Αρχική", navCities: "Όλες οι πόλεις",
      heroH1: "Βρες το επόμενο νησί των ονείρων σου",
      heroLead: "Οδηγοί, παραλίες, budget tips και ακτοπλοϊκά δρομολόγια για όλα τα δημοφιλή ελληνικά νησιά — σε ένα μέρος.",
      searchPlaceholder: "Αναζήτησε νησί ή περιοχή (π.χ. Κυκλάδες)...",
      adLabel: "Διαφημιστικός Χώρος",
      citiesH2: "Όλες οι πόλεις", citiesP: "Επίλεξε μια πόλη για να δεις πλήρη οδηγό: τι να κάνεις, ποια αξιοθέατα να επισκεφτείς και πώς να φτάσεις εκεί.",
      islandsH2: "Όλα τα Νησιά", islandsP: "Επίλεξε ένα νησί για να δεις πλήρη οδηγό: τι να κάνεις, ποιες παραλίες να επισκεφτείς και πώς να φτάσεις εκεί.",
      searchEmptyMsg: "Δεν βρέθηκε νησί με αυτό το όνομα. Δοκίμασε κάτι άλλο.",
      whyGoPrefix: "Γιατί να πας", sectionIntro: "Εισαγωγή", sectionWhy: "Γιατί να πας", sectionWhat: "Τι να κάνεις",
      sectionBeaches: "Γνωστές παραλίες", sectionSights: "Αξιοθέατα",
      sidebarTitle: "Χρήσιμες πληροφορίες", sidebarBudget: "Budget", sidebarSuited: "Κατάλληλο για",
      sidebarBestTime: "Καλύτερη περίοδος", sidebarRegion: "Περιοχή",
      ferryH2: "🚢 Ακτοπλοϊκά Εισιτήρια", ferryPrefix: "Ενδεικτικές διαδρομές, εταιρείες και τιμές προς",
      ferryThCompany: "Εταιρεία", ferryThOneWay: "Τιμή μονή", ferryThReturn: "Τιμή πήγαινε-έλα",
      ferryThDuration: "Διάρκεια", ferryThShip: "Τύπος πλοίου",
      ferryNote: "⚠️ Οι τιμές ενδέχεται να διαφέρουν ανάλογα με την περίοδο, τη διαθεσιμότητα και τον τρόπο κράτησης. Ελέγξτε πάντα την τρέχουσα τιμή στην επίσημη σελίδα της εταιρείας πριν την κράτηση.",
      transportH2: "🚗 Πώς θα φτάσεις",
      otherIslandsH2: "Άλλα νησιά που μπορεί να σου αρέσουν", otherCitiesH2: "Άλλες πόλεις που μπορεί να σου αρέσουν",
      footerTagline: "Ο πλήρης οδηγός για να επιλέξεις το επόμενο νησιώτικο ταξίδι σου στην Ελλάδα.",
      footerPopular: "Δημοφιλή", footerInfo: "Πληροφορίες", footerLegal: "Νομικά",
      footerAbout: "About Us", footerContact: "Επικοινωνία", footerTerms: "Terms of Use",
      footerCookies: "Cookies Policy", footerPrivacy: "Privacy Policy",
      footerCopy: "© 2026 Greek Island. Οι τιμές των εισιτηρίων είναι ενδεικτικές.",
      breadcrumbHome: "Αρχική",
      backToHome: "← Πίσω στην αρχική"
    },
    en: {
      skipLink: "Skip to content", navHome: "Home", navCities: "All Cities",
      heroH1: "Find your next dream island",
      heroLead: "Guides, beaches, budget tips, and ferry routes for all the popular Greek islands — in one place.",
      searchPlaceholder: "Search for an island or region (e.g. Cyclades)...",
      adLabel: "Ad Space",
      citiesH2: "All Cities", citiesP: "Pick a city to see a full guide: what to do, which sights to visit, and how to get there.",
      islandsH2: "All Islands", islandsP: "Pick an island to see a full guide: what to do, which beaches to visit, and how to get there.",
      searchEmptyMsg: "No island found with that name. Try something else.",
      whyGoPrefix: "Why visit", sectionIntro: "Introduction", sectionWhy: "Why visit", sectionWhat: "What to do",
      sectionBeaches: "Popular beaches", sectionSights: "Top sights",
      sidebarTitle: "Useful information", sidebarBudget: "Budget", sidebarSuited: "Best for",
      sidebarBestTime: "Best time to visit", sidebarRegion: "Region",
      ferryH2: "🚢 Ferry Tickets", ferryPrefix: "Indicative routes, companies, and prices to",
      ferryThCompany: "Company", ferryThOneWay: "One-way price", ferryThReturn: "Return price",
      ferryThDuration: "Duration", ferryThShip: "Ship type",
      ferryNote: "⚠️ Prices may vary depending on the season, availability, and booking method. Always check the current price on the ferry company's official website before booking.",
      transportH2: "🚗 How to get there",
      otherIslandsH2: "Other islands you might like", otherCitiesH2: "Other cities you might like",
      footerTagline: "The complete guide to choosing your next Greek island getaway.",
      footerPopular: "Popular", footerInfo: "Information", footerLegal: "Legal",
      footerAbout: "About Us", footerContact: "Contact", footerTerms: "Terms of Use",
      footerCookies: "Cookies Policy", footerPrivacy: "Privacy Policy",
      footerCopy: "© 2026 Greek Island. Ferry prices shown are indicative.",
      breadcrumbHome: "Home",
      backToHome: "← Back to home"
    }
  };

  var REGION_LABELS_EN = {
    "Κυκλάδες": "Cyclades", "Αργοσαρωνικός": "Argo-Saronic", "Σποράδες": "Sporades",
    "Δωδεκάνησα": "Dodecanese", "Ιόνιο": "Ionian", "Βόρειο Αιγαίο": "North Aegean",
    "Κρήτη": "Crete", "Μεγάλες Πόλεις": "Major Cities"
  };

  /* ------------------------------------------------------------------ *
   * STATIC PAGES (About / Contact / Terms / Cookies / Privacy)
   * ------------------------------------------------------------------ */
  var CONTACT_EMAIL = "greekislands.official@gmail.com";

  var PAGES = {
    about: {
      el: { title: "About Us", body:
        "<p>Το «Greek Island» είναι ένας ανεξάρτητος ταξιδιωτικός οδηγός αφιερωμένος στα νησιά της Ελλάδας. Στόχος μας είναι να βοηθήσουμε κάθε ταξιδιώτη — από παρέες που ψάχνουν νυχτερινή ζωή μέχρι οικογένειες που θέλουν ήσυχες παραλίες — να βρει το νησί που ταιριάζει στις ανάγκες του.</p>" +
        "<h2>Τι προσφέρουμε</h2><p>Για κάθε νησί που παρουσιάζουμε, συγκεντρώνουμε πρακτικές πληροφορίες: τι να κάνεις, ποιες παραλίες αξίζει να επισκεφτείς, ενδεικτικό κόστος διακοπών, καλύτερη περίοδο επίσκεψης, καθώς και βασικές πληροφορίες για τα ακτοπλοϊκά δρομολόγια.</p>" +
        "<h2>Διαφάνεια</h2><p>Οι τιμές και τα δρομολόγια που αναφέρουμε είναι ενδεικτικά και μπορεί να αλλάξουν. Συνιστούμε πάντα να επιβεβαιώνεις τις τρέχουσες τιμές απευθείας από τις ακτοπλοϊκές εταιρείες πριν την κράτηση.</p>" +
        "<p>Αν έχεις οποιαδήποτε ερώτηση, μη διστάσεις να <a href=\"#/page/contact\">επικοινωνήσεις μαζί μας</a>.</p>" },
      en: { title: "About Us", body:
        "<p>Greek Island is an independent travel guide dedicated to the islands of Greece. Our goal is to help every traveler — from groups of friends looking for nightlife to families wanting quiet beaches — find the island that fits what they're looking for.</p>" +
        "<h2>What we offer</h2><p>For every island we cover, we gather practical information: what to do, which beaches are worth visiting, an indicative cost of a holiday, the best time to visit, and the basics on ferry routes.</p>" +
        "<h2>Transparency</h2><p>The prices and routes we mention are indicative and may change. We always recommend confirming current prices directly with the ferry companies before booking.</p>" +
        "<p>If you have any questions, feel free to <a href=\"#/page/contact\">get in touch</a>.</p>" }
    },
    contact: {
      el: { title: "Επικοινωνία", body:
        "<p>Έχεις κάποια ερώτηση, πρόταση για νέο νησί, ή διόρθωση σε κάποια πληροφορία;</p>" +
        "<p>Επικοινωνήστε μαζί μας στο παρακάτω email:</p>" +
        "<p style=\"text-align:center;margin:2em 0;\"><a class=\"btn\" href=\"mailto:" + CONTACT_EMAIL + "\">" + CONTACT_EMAIL + "</a></p>" +
        "<p>Θα χαρούμε να ακούσουμε τη γνώμη σου.</p>" },
      en: { title: "Contact", body:
        "<p>Have a question, a suggestion for a new island, or a correction to some information?</p>" +
        "<p>Get in touch with us at the email below:</p>" +
        "<p style=\"text-align:center;margin:2em 0;\"><a class=\"btn\" href=\"mailto:" + CONTACT_EMAIL + "\">" + CONTACT_EMAIL + "</a></p>" +
        "<p>We'd love to hear from you.</p>" }
    },
    terms: {
      el: { title: "Terms of Use", body:
        "<p>Με την πρόσβαση σε αυτό το website, αποδέχεστε τους παρακάτω όρους.</p>" +
        "<h2>Περιεχόμενο</h2><p>Το περιεχόμενο του site παρέχεται αποκλειστικά για ενημερωτικούς σκοπούς. Δεν εγγυόμαστε την πληρότητα ή την επικαιρότητα των πληροφοριών, ιδίως τιμών και δρομολογίων ακτοπλοϊκών.</p>" +
        "<h2>Περιορισμός ευθύνης</h2><p>Δεν φέρουμε ευθύνη για ζημιά ή ταλαιπωρία που προκύπτει από τη χρήση του περιεχομένου του site.</p>" +
        "<h2>Αλλαγές</h2><p>Διατηρούμε το δικαίωμα να τροποποιήσουμε τους όρους οποιαδήποτε στιγμή.</p>" },
      en: { title: "Terms of Use", body:
        "<p>By accessing this website, you agree to the terms below.</p>" +
        "<h2>Content</h2><p>The site's content is provided solely for informational purposes. We do not guarantee the completeness or currency of the information, particularly ferry prices and schedules.</p>" +
        "<h2>Limitation of liability</h2><p>We are not liable for any damage or inconvenience arising from use of the site's content.</p>" +
        "<h2>Changes</h2><p>We reserve the right to modify these terms at any time.</p>" }
    },
    cookies: {
      el: { title: "Cookies Policy", body:
        "<p>Αυτό το site ενδέχεται να χρησιμοποιεί cookies για analytics και διαφημίσεις (π.χ. Google AdSense).</p>" +
        "<h2>Τύποι cookies</h2><ul><li>Απαραίτητα cookies λειτουργίας</li><li>Cookies στατιστικών</li><li>Διαφημιστικά cookies τρίτων</li></ul>" +
        "<h2>Έλεγχος</h2><p>Μπορείτε να ελέγξετε ή να διαγράψετε τα cookies μέσω των ρυθμίσεων του browser σας.</p>" },
      en: { title: "Cookies Policy", body:
        "<p>This site may use cookies for analytics and advertising (e.g. Google AdSense).</p>" +
        "<h2>Types of cookies</h2><ul><li>Essential site-function cookies</li><li>Analytics cookies</li><li>Third-party advertising cookies</li></ul>" +
        "<h2>Managing cookies</h2><p>You can control or delete cookies through your browser settings.</p>" }
    },
    privacy: {
      el: { title: "Privacy Policy", body:
        "<p>Η προστασία των προσωπικών σας δεδομένων είναι σημαντική για εμάς.</p>" +
        "<h2>Δεδομένα</h2><p>Ενδέχεται να συλλέγονται ανώνυμα στατιστικά επισκεψιμότητας και δεδομένα μέσω cookies διαφημίσεων τρίτων (Google AdSense).</p>" +
        "<h2>Επικοινωνία</h2><p>Για ερωτήματα σχετικά με το απόρρητο: <a href=\"mailto:" + CONTACT_EMAIL + "\">" + CONTACT_EMAIL + "</a></p>" },
      en: { title: "Privacy Policy", body:
        "<p>Protecting your personal data is important to us.</p>" +
        "<h2>Data</h2><p>Anonymous traffic statistics and data via third-party advertising cookies (Google AdSense) may be collected.</p>" +
        "<h2>Contact</h2><p>For privacy questions: <a href=\"mailto:" + CONTACT_EMAIL + "\">" + CONTACT_EMAIL + "</a></p>" }
    }
  };

  /* ------------------------------------------------------------------ *
   * STATE
   * ------------------------------------------------------------------ */
  var state = { lang: localStorage.getItem("gi_lang") === "el" ? "el" : "en" };

  function t(key) { return UI[state.lang][key] || key; }

  function normalize(str) {
    return (str || "").toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function photoUrl(dest, w, h) {
    if (dest.photoReal) {
      return "https://images.unsplash.com/photo-" + dest.photo + "?auto=format&fit=crop&w=" + w + "&h=" + h + "&q=80";
    }
    return "https://picsum.photos/seed/" + dest.photo + "/" + w + "/" + h;
  }

  function loc(dest) {
    if (state.lang === "en") {
      return {
        id: dest.id, kind: dest.kind, region: dest.regionEn, photo: dest.photo, photoReal: dest.photoReal,
        name: dest.nameEn, vibe: dest.vibeEn, tagline: dest.taglineEn, intro: dest.introEn, why: dest.whyEn,
        activities: dest.activitiesEn, beaches: dest.beachesEn, budget: dest.budget, suited: dest.suitedEn,
        bestTime: dest.bestTimeEn, grammarFull: dest.nameEn, grammarBare: dest.nameEn,
        ferries: dest.ferries, transport: dest.transportEn
      };
    }
    return {
      id: dest.id, kind: dest.kind, region: dest.region, photo: dest.photo, photoReal: dest.photoReal,
      name: dest.name, vibe: dest.vibe, tagline: dest.tagline, intro: dest.intro, why: dest.why,
      activities: dest.activities, beaches: dest.beaches, budget: dest.budget, suited: dest.suited,
      bestTime: dest.bestTime, grammarFull: dest.grammarFull, grammarBare: dest.grammarBare,
      ferries: dest.ferries, transport: dest.transport
    };
  }

  function byId(id) {
    for (var i = 0; i < DESTINATIONS.length; i++) if (DESTINATIONS[i].id === id) return DESTINATIONS[i];
    return null;
  }

  /* ------------------------------------------------------------------ *
   * CARD RENDERING
   * ------------------------------------------------------------------ */
  function cardHtml(dest) {
    var d = loc(dest);
    return '<a class="island-card" href="#/island/' + d.id + '" data-name="' + d.name + '" data-region="' + d.region + '">' +
      '<div class="thumb"><img src="' + photoUrl(dest, 500, 380) + '" alt="' + d.name + '" loading="lazy"></div>' +
      '<div class="body"><span class="tag">' + d.region + '</span><h3>' + d.name + '</h3><p class="vibe">' + d.vibe + '</p></div>' +
      '</a>';
  }

  function renderHomeGrids() {
    var cities = DESTINATIONS.filter(function (d) { return d.kind === "city"; });
    var islands = DESTINATIONS.filter(function (d) { return d.kind !== "city"; });
    document.getElementById("cityGrid").innerHTML = cities.map(cardHtml).join("");
    document.getElementById("islandGrid").innerHTML = islands.map(cardHtml).join("");
  }

  /* ------------------------------------------------------------------ *
   * SEARCH / REGION FILTER (islands grid)
   * ------------------------------------------------------------------ */
  function wireSearch() {
    var input = document.getElementById("searchInput");
    var grid = document.getElementById("islandGrid");
    var empty = document.getElementById("searchEmpty");
    if (!input || !grid) return;

    function run() {
      var q = normalize(input.value.trim());
      var cards = grid.querySelectorAll(".island-card");
      var visible = 0;
      cards.forEach(function (card) {
        var name = normalize(card.getAttribute("data-name"));
        var region = normalize(card.getAttribute("data-region"));
        var match = q === "" || name.indexOf(q) !== -1 || region.indexOf(q) !== -1;
        card.classList.toggle("is-hidden", !match);
        if (match) visible++;
      });
      if (empty) empty.style.display = visible === 0 ? "block" : "none";
    }
    input.addEventListener("input", run);
    input.addEventListener("keyup", run);
    input._runFilter = run;
    run();
  }

  function filterByRegion(regionGr) {
    var label = state.lang === "en" ? (REGION_LABELS_EN[regionGr] || regionGr) : regionGr;
    var input = document.getElementById("searchInput");
    if (input) {
      input.value = label;
      if (input._runFilter) input._runFilter();
    }
  }

  /* ------------------------------------------------------------------ *
   * DETAIL VIEW (island or city)
   * ------------------------------------------------------------------ */
  function ferryRouteHtml(route) {
    var rows = route.legs.map(function (leg) {
      var company = state.lang === "en" ? leg.companyEn : leg.company;
      var duration = state.lang === "en" ? leg.durationEn : leg.duration;
      var ship = state.lang === "en" ? leg.shipEn : leg.ship;
      return "<tr><td>" + company + "</td><td>" + leg.oneWay + "</td><td>" + leg.returnP + "</td><td>" + duration + "</td><td>" + ship + "</td></tr>";
    }).join("");
    var routeText = state.lang === "en" ? route.routeEn : route.route;
    return '<div class="ferry-route"><span class="route-path">📍 ' + routeText + '</span>' +
      '<table class="ferry-table"><thead><tr><th>' + t("ferryThCompany") + '</th><th>' + t("ferryThOneWay") + '</th><th>' +
      t("ferryThReturn") + '</th><th>' + t("ferryThDuration") + '</th><th>' + t("ferryThShip") + '</th></tr></thead>' +
      '<tbody>' + rows + '</tbody></table></div>';
  }

  function renderDetail(id) {
    var dest = byId(id);
    var view = document.getElementById("view-detail");
    if (!dest) { view.innerHTML = "<p style='padding:80px 24px;text-align:center;'>Not found.</p>"; return; }
    var d = loc(dest);
    var isCity = d.kind === "city";

    document.title = t("whyGoPrefix") + " " + d.grammarFull + " — Greek Island";
    var metaDesc = document.getElementById("pageDescription");
    if (metaDesc) metaDesc.setAttribute("content", d.tagline);

    var beachesHtml = d.beaches.map(function (b) { return "<li>" + b + "</li>"; }).join("");

    var ferryOrTransportHtml;
    if (isCity) {
      ferryOrTransportHtml = '<section class="ferry-section"><div class="container"><div class="section-title"><h2>' +
        t("transportH2") + '</h2></div><div class="ferry-route"><p style="margin:0;color:#33475a;">' + (d.transport || "") + '</p></div></div></section>';
    } else {
      var ferriesHtml = (d.ferries || []).map(ferryRouteHtml).join("");
      ferryOrTransportHtml = '<section class="ferry-section"><div class="container"><div class="section-title"><h2>' +
        t("ferryH2") + '</h2><p>' + t("ferryPrefix") + ' ' + d.grammarBare + '.</p></div>' + ferriesHtml +
        '<p class="ferry-note">' + t("ferryNote") + '</p></div></section>';
    }

    var related = DESTINATIONS.filter(function (o) { return o.id !== dest.id && o.kind === dest.kind; }).slice(0, 4);
    var relatedHtml = related.map(cardHtml).join("");
    var relatedHeading = isCity ? t("otherCitiesH2") : t("otherIslandsH2");

    view.innerHTML =
      '<header class="island-hero" style="background-image:url(\'' + photoUrl(dest, 1800, 900) + '\');">' +
        '<div class="island-hero-inner">' +
          '<p class="breadcrumbs"><a href="#/">' + t("breadcrumbHome") + '</a> / ' + d.region + ' / ' + d.name + '</p>' +
          '<span class="eyebrow">' + d.region + ' · ' + d.vibe + '</span>' +
          '<h1>' + t("whyGoPrefix") + ' ' + d.grammarFull + '</h1>' +
          '<p>' + d.tagline + '</p>' +
        '</div>' +
      '</header>' +
      '<main>' +
        '<div class="content-layout">' +
          '<article class="article">' +
            '<h2>' + t("sectionIntro") + '</h2><p>' + d.intro + '</p>' +
            '<h2>' + t("sectionWhy") + '</h2><p>' + d.why + '</p>' +
            '<h2>' + t("sectionWhat") + '</h2><p>' + d.activities + '</p>' +
            '<div class="ad-slot"><span>' + t("adLabel") + '</span></div>' +
            '<h2>' + (isCity ? t("sectionSights") : t("sectionBeaches")) + '</h2>' +
            '<ul class="beach-list">' + beachesHtml + '</ul>' +
          '</article>' +
          '<aside><div class="info-box">' +
            '<h3>' + t("sidebarTitle") + '</h3>' +
            '<div class="info-row"><span>' + t("sidebarBudget") + '</span><span class="budget-euro">' + d.budget + '</span></div>' +
            '<div class="info-row"><span>' + t("sidebarSuited") + '</span><span>' + d.suited + '</span></div>' +
            '<div class="info-row"><span>' + t("sidebarBestTime") + '</span><span>' + d.bestTime + '</span></div>' +
            '<div class="info-row"><span>' + t("sidebarRegion") + '</span><span>' + d.region + '</span></div>' +
          '</div></aside>' +
        '</div>' +
        ferryOrTransportHtml +
        '<div class="ad-slot"><span>' + t("adLabel") + '</span></div>' +
        '<section class="section" style="padding-top:0;">' +
          '<div class="section-title"><h2>' + relatedHeading + '</h2></div>' +
          '<div class="island-grid">' + relatedHtml + '</div>' +
        '</section>' +
      '</main>';
  }

  /* ------------------------------------------------------------------ *
   * STATIC PAGE VIEW
   * ------------------------------------------------------------------ */
  function renderStaticPage(slug) {
    var page = PAGES[slug];
    var view = document.getElementById("view-page");
    if (!page) { view.innerHTML = "<p style='padding:80px 24px;text-align:center;'>Not found.</p>"; return; }
    var content = page[state.lang] || page.el;
    document.title = content.title + " — Greek Island";
    view.innerHTML = '<div class="simple-page"><h1>' + content.title + '</h1><div class="article">' + content.body + '</div></div>';
  }

  /* ------------------------------------------------------------------ *
   * i18n APPLY (static chrome: nav, hero, footer, section titles)
   * ------------------------------------------------------------------ */
  function applyChromeTranslations() {
    document.documentElement.setAttribute("lang", state.lang);
    document.documentElement.setAttribute("data-lang", state.lang);
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (UI[state.lang][key] !== undefined) el.textContent = UI[state.lang][key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (UI[state.lang][key] !== undefined) el.setAttribute("placeholder", UI[state.lang][key]);
    });
    document.querySelectorAll(".region-link").forEach(function (el) {
      var regionGr = el.getAttribute("data-region");
      el.textContent = state.lang === "en" ? (REGION_LABELS_EN[regionGr] || regionGr) : regionGr;
    });
    document.getElementById("langToggle").textContent = state.lang === "en" ? "ΕΛ" : "EN";
  }

  /* ------------------------------------------------------------------ *
   * ROUTER
   * ------------------------------------------------------------------ */
  function showView(id) {
    document.querySelectorAll(".view").forEach(function (v) { v.classList.toggle("is-active", v.id === id); });
  }

  function router() {
    var hash = window.location.hash || "#/";
    var parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);

    closeMobileNav();
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

    if (parts.length === 0) {
      showView("view-home");
      renderHomeGrids();
      wireSearch();
      document.title = "Greek Island — " + (state.lang === "en" ? "Complete Greek Islands Guide" : "Πλήρης Οδηγός για Ελληνικά Νησιά");
      var metaDesc = document.getElementById("pageDescription");
      if (metaDesc) metaDesc.setAttribute("content", state.lang === "en"
        ? "Discover the best Greek islands: beaches, activities, budget, and ferry tickets for every destination."
        : "Ανακάλυψε τα καλύτερα ελληνικά νησιά: παραλίες, δραστηριότητες, budget και ακτοπλοϊκά εισιτήρια.");
      return;
    }
    if (parts[0] === "island" && parts[1]) {
      showView("view-detail");
      renderDetail(parts[1]);
      return;
    }
    if (parts[0] === "page" && parts[1]) {
      showView("view-page");
      renderStaticPage(parts[1]);
      return;
    }
    showView("view-home");
    renderHomeGrids();
    wireSearch();
  }

  /* ------------------------------------------------------------------ *
   * NAV: mobile toggle, region links, language toggle
   * ------------------------------------------------------------------ */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  function closeMobileNav() {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
  navToggle.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.querySelectorAll(".region-link").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var region = el.getAttribute("data-region");
      if (window.location.hash !== "#/" && window.location.hash !== "") {
        window.location.hash = "#/";
        setTimeout(function () { filterByRegion(region); document.getElementById("islands").scrollIntoView({ behavior: "smooth" }); }, 30);
      } else {
        filterByRegion(region);
        document.getElementById("islands").scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  document.querySelectorAll(".cities-link").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      function go() { document.getElementById("cities").scrollIntoView({ behavior: "smooth" }); }
      if (window.location.hash !== "#/" && window.location.hash !== "") {
        window.location.hash = "#/";
        setTimeout(go, 30);
      } else {
        go();
      }
    });
  });

  document.getElementById("langToggle").addEventListener("click", function (e) {
    e.preventDefault();
    state.lang = state.lang === "en" ? "el" : "en";
    localStorage.setItem("gi_lang", state.lang);
    applyChromeTranslations();
    router();
  });

  /* ------------------------------------------------------------------ *
   * INIT
   * ------------------------------------------------------------------ */
  applyChromeTranslations();
  window.addEventListener("hashchange", router);
  router();
})();
