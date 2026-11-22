// English/Danish switch. English is the text in the HTML; Danish comes from translations.js.
// The choice is kept in localStorage, and ?lang=da or ?lang=en in the URL overrides it.
(function () {
  var STORAGE_KEY = "lang";
  var da = window.I18N_DA || {};
  var english = new Map();

  function readStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function store(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { return; }
  }

  function initialLang() {
    var fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl === "da" || fromUrl === "en") return fromUrl;
    return readStored() === "da" ? "da" : "en";
  }

  function remember(el, slot, value) {
    if (!english.has(el)) english.set(el, {});
    var saved = english.get(el);
    if (!(slot in saved)) saved[slot] = value;
    return saved[slot];
  }

  function apply(lang) {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var en = remember(el, "html", el.innerHTML);
      el.innerHTML = lang === "da" && key in da ? da[key] : en;
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var parts = pair.split(":");
        var attr = parts[0].trim();
        var key = parts[1].trim();
        var en = remember(el, "attr:" + attr, el.getAttribute(attr));
        el.setAttribute(attr, lang === "da" && key in da ? da[key] : en);
      });
    });

    document.documentElement.lang = lang;
    document.querySelectorAll(".lang-switch [data-lang]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.getAttribute("data-lang") === lang));
    });
  }

  document.querySelectorAll(".lang-switch [data-lang]").forEach(function (button) {
    button.addEventListener("click", function () {
      var lang = button.getAttribute("data-lang");
      store(lang);
      apply(lang);
    });
  });

  apply(initialLang());
})();
