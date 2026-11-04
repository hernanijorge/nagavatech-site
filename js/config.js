// NagavaTech — site config. No build step: plain values, loaded before main.js.
window.NagavaConfig = {
  // Set this to a Formspree endpoint ("https://formspree.io/f/xxxxxxxx") or a
  // Web3Forms endpoint ("https://api.web3forms.com/submit", with an
  // "access_key" field added in js/main.js's submitViaEndpoint). Leave empty
  // ("") to keep the contact form working as a plain mailto: link -- no
  // backend required, but the visitor has to actually send the opened email.
  FORM_ENDPOINT: "https://api.web3forms.com/submit",

  // Web3Forms only: your access key from https://web3forms.com/ (dashboard ->
  // "Access Key"). Sent as a hidden "access_key" field on every submit.
  // Not used at all when FORM_ENDPOINT is a Formspree URL.
  // REQUIRED -- left empty on purpose, no real key was provided. Until you
  // fill this in, every submit will fail at Web3Forms (missing access_key)
  // and fall back to mailto automatically -- the form still works for
  // visitors, it just won't reach Web3Forms yet.
  WEB3FORMS_KEY: "",

  // Placeholder testimonials (home) and placeholder stats (about.html) are
  // not real data yet. Set to true once you have real customer quotes and
  // real numbers to show -- the markup and copy are still in the HTML/i18n,
  // just hidden via main.js when this is false.
  SHOW_TESTIMONIALS: false,
};
