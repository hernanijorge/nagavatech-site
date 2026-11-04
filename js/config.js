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
  // Not used at all when FORM_ENDPOINT is a Formspree URL. This is a public
  // form identifier, not a secret -- Web3Forms is designed to have this key
  // embedded in client-side JS, same as this file.
  WEB3FORMS_KEY: "8e12d94c-d873-4647-8a96-ffefacc30705",

  // Placeholder testimonials (home) and placeholder stats (about.html) are
  // not real data yet. Set to true once you have real customer quotes and
  // real numbers to show -- the markup and copy are still in the HTML/i18n,
  // just hidden via main.js when this is false.
  SHOW_TESTIMONIALS: false,
};
