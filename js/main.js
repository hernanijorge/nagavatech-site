// NagavaTech — shared site behavior. Plain JS, no build step, no dependencies.
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "13396008241"; // https://wa.me/13396008241
  var CONTACT_EMAIL = "nagatech@gmail.com";

  function lang() {
    return (window.NagavaI18n && window.NagavaI18n.getLang()) || "en";
  }

  function t(key) {
    return window.NagavaI18n ? window.NagavaI18n.t(key, lang()) : key;
  }

  /* ---------- Mobile nav ---------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var header = document.querySelector(".site-header");
    if (!toggle || !header) return;
    toggle.addEventListener("click", function () {
      header.classList.toggle("nav-open");
    });
    header.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () { header.classList.remove("nav-open"); });
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- Active nav link ---------- */
  function markActiveNav() {
    var path = location.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
    document.querySelectorAll(".nav-links a[href]").forEach(function (a) {
      var href = a.getAttribute("href").replace(/\.html$/, "");
      if (href !== "/" && path.indexOf(href) !== -1) a.classList.add("active");
    });
  }

  /* ---------- WhatsApp helpers ---------- */
  function waLink(message) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  function initWaFloat() {
    var el = document.querySelector("[data-wa-float]");
    if (!el) return;
    el.href = waLink(t("wa.default_message"));
  }

  /* ---------- Catalog (apps.html / hardware.html) ---------- */
  function money(value, currency) {
    try {
      return new Intl.NumberFormat(lang() === "pt" ? "pt-BR" : "en-US", {
        style: "currency",
        currency: currency || "USD",
      }).format(value);
    } catch (e) {
      return "$" + value;
    }
  }

  function productCard(p) {
    var l = lang();
    var name = p.name[l] || p.name.en;
    var desc = p.description[l] || p.description.en;
    var specs = p.specs[l] || p.specs.en;
    var priceNote = (p.price_note && (p.price_note[l] || p.price_note.en)) || "";

    var card = document.createElement("article");
    card.className = "product-card fade-up";
    card.setAttribute("data-id", p.id);
    card.setAttribute("data-category", p.category);
    card.setAttribute("data-search", (name + " " + desc).toLowerCase());

    var specsHtml = specs.map(function (s) { return "<li>" + s + "</li>"; }).join("");

    var buyHref = p.payment_link && p.payment_link.trim()
      ? p.payment_link
      : waLink(t("wa.default_message") + " " + name);
    var buyTarget = ' target="_blank" rel="noopener"';

    card.innerHTML =
      '<div class="thumb"><img src="' + p.image + '" alt="' + name + '" loading="lazy" width="120" height="90"></div>' +
      '<div class="body">' +
      '<span class="cat-tag">' + (p.subcategory || p.category) + "</span>" +
      "<h3>" + name + "</h3>" +
      '<p class="desc">' + desc + "</p>" +
      '<ul class="specs trace-list">' + specsHtml + "</ul>" +
      '<div class="price-row"><span class="price">' + money(p.price, p.currency) +
      (priceNote ? "<small>" + priceNote + "</small>" : "") + "</span></div>" +
      '<div class="actions">' +
      '<a class="btn btn-primary btn-sm" href="' + buyHref + '"' + buyTarget + ">" + t("catalog.buy") + "</a>" +
      '<a class="btn btn-outline btn-sm" href="' + waLink(t("wa.default_message") + " " + name) + '" target="_blank" rel="noopener">' + t("catalog.quote") + "</a>" +
      "</div></div>";

    return card;
  }

  function initCatalog() {
    var grid = document.querySelector("[data-catalog]");
    if (!grid) return;

    var category = grid.getAttribute("data-catalog"); // "apps" | "hardware"
    var toolbar = document.querySelector("[data-catalog-toolbar]");
    var searchInput = document.querySelector("[data-catalog-search]");
    var emptyState = document.querySelector("[data-catalog-empty]");

    var state = { sub: "all", query: "" };
    var allProducts = [];

    function render() {
      var q = state.query.trim().toLowerCase();
      var items = allProducts.filter(function (p) {
        var matchSub = state.sub === "all" || p.subcategory === state.sub;
        var matchQuery = !q || (p.name.en + " " + p.name.pt + " " + p.description.en + " " + p.description.pt).toLowerCase().indexOf(q) !== -1;
        return matchSub && matchQuery;
      });

      grid.innerHTML = "";
      if (items.length === 0) {
        if (emptyState) emptyState.style.display = "block";
        return;
      }
      if (emptyState) emptyState.style.display = "none";
      items.forEach(function (p) { grid.appendChild(productCard(p)); });
    }

    function buildFilters(products) {
      if (!toolbar) return;
      var subs = Array.from(new Set(products.map(function (p) { return p.subcategory; }).filter(Boolean)));
      var filtersWrap = toolbar.querySelector(".catalog-filters");
      if (!filtersWrap) return;
      filtersWrap.innerHTML = "";

      var allChip = document.createElement("button");
      allChip.className = "chip active";
      allChip.type = "button";
      allChip.textContent = t("catalog.filter.all");
      allChip.addEventListener("click", function () { selectChip(allChip, "all"); });
      filtersWrap.appendChild(allChip);

      subs.forEach(function (sub) {
        var chip = document.createElement("button");
        chip.className = "chip";
        chip.type = "button";
        chip.textContent = sub.replace(/-/g, " ");
        chip.addEventListener("click", function () { selectChip(chip, sub); });
        filtersWrap.appendChild(chip);
      });

      function selectChip(chip, sub) {
        filtersWrap.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        state.sub = sub;
        render();
      }
    }

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.query = searchInput.value;
        render();
      });
    }

    grid.innerHTML = '<p class="empty-state">' + t("catalog.loading") + "</p>";

    fetch("/data/products.json")
      .then(function (res) { return res.json(); })
      .then(function (products) {
        allProducts = products.filter(function (p) { return p.category === category; });
        buildFilters(allProducts);
        render();
      })
      .catch(function () {
        grid.innerHTML = '<p class="empty-state">—</p>';
      });

    document.addEventListener("nagavatech:langchange", render);
  }

  /* ---------- Contact form ---------- */
  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;

    var status = form.querySelector("[data-form-status]");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("[name=name]").value.trim();
      var email = form.querySelector("[name=email]").value.trim();
      var subject = form.querySelector("[name=subject]").value.trim();
      var message = form.querySelector("[name=message]").value.trim();
      var honeypot = form.querySelector("[name=company_website]");

      if (honeypot && honeypot.value) return; // bot

      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !emailOk || !message) {
        if (status) {
          status.textContent = t("contact.form.error");
          status.className = "form-status err";
        }
        return;
      }

      var body = message + "\n\n" + name + " <" + email + ">";
      var mailto = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(subject || "Contact from nagavatech.tech") +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;

      if (status) {
        status.textContent = t("contact.form.note");
        status.className = "form-status ok";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initYear();
    markActiveNav();
    initWaFloat();
    initCatalog();
    initContactForm();
  });

  document.addEventListener("nagavatech:langchange", function () {
    initWaFloat();
  });
})();
