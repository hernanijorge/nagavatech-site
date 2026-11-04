// NagavaTech — i18n (EN default, PT toggle). No build step: plain script, loaded on every page.
(function () {
  "use strict";

  var STORAGE_KEY = "nagavatech_lang";
  var DEFAULT_LANG = "en";

  var dict = {
    en: {
      "nav.apps": "Apps",
      "nav.hardware": "Hardware",
      "nav.about": "About",
      "nav.contact": "Contact",
      "nav.cta": "Get a quote",

      "home.eyebrow": "Software & Hardware, built to work together",
      "home.title.1": "Smart apps.",
      "home.title.2": "Serious hardware.",
      "home.lead": "NagavaTech builds its own software and ships the mini desktops and laptops to run it on — one team, one warranty, one place to ask questions.",
      "home.cta.primary": "Browse apps",
      "home.cta.secondary": "Browse hardware",

      "home.highlights.title": "What we offer",
      "home.highlights.subtitle": "Three ways to work with us.",
      "home.highlights.apps.title": "Apps",
      "home.highlights.apps.desc": "In-house software products, licensed per seat or as a one-time purchase. Built, supported and updated by our own team.",
      "home.highlights.minipc.title": "Mini PCs",
      "home.highlights.minipc.desc": "Compact desktops sized for a desk, a kiosk or a server rack — tuned and tested before they ship.",
      "home.highlights.laptop.title": "Laptops",
      "home.highlights.laptop.desc": "Reliable laptops for work and development, configured and ready to use out of the box.",

      "home.diffs.title": "Why NagavaTech",
      "home.diffs.subtitle": "The details that make ownership easy.",
      "home.diffs.warranty.title": "Real warranty",
      "home.diffs.warranty.desc": "Every device and license ships with a clear, written warranty — no fine print surprises.",
      "home.diffs.support.title": "Direct support",
      "home.diffs.support.desc": "Talk to the people who actually build and configure what you bought, by email or WhatsApp.",
      "home.diffs.shipping.title": "Tracked shipping",
      "home.diffs.shipping.desc": "Every hardware order ships with tracking and careful packaging, from our bench to your door.",

      "home.courses.title": "Our catalog",
      "home.testimonials.title": "What customers say",
      "home.testimonials.t1": "“Set up our mini PC fleet in an afternoon — support answered every question on WhatsApp within minutes.”",
      "home.testimonials.n1": "Marina Alves",
      "home.testimonials.r1": "Operations Lead",
      "home.testimonials.t2": "“The app does exactly what we needed, no bloat. Updates ship fast and they actually listen to feedback.”",
      "home.testimonials.n2": "Diego Ferreira",
      "home.testimonials.r2": "Founder, small business",
      "home.testimonials.t3": "“Laptop arrived configured and ready. Straightforward buying process from quote to delivery.”",
      "home.testimonials.n3": "Priya Shah",
      "home.testimonials.r3": "Freelance Developer",

      "home.cta.band.title": "Not sure what you need?",
      "home.cta.band.desc": "Tell us about your use case and we'll put together a quote — software, hardware, or both.",
      "home.cta.band.button": "Talk to us on WhatsApp",

      "catalog.apps.title": "Apps",
      "catalog.apps.subtitle": "Software built in-house, licensed per seat or as a one-time purchase.",
      "catalog.hardware.title": "Hardware",
      "catalog.hardware.subtitle": "Mini desktops and laptops, configured and tested before they ship.",
      "catalog.search.placeholder": "Search the catalog…",
      "catalog.filter.all": "All",
      "catalog.empty": "No products match your search.",
      "catalog.buy": "Buy",
      "catalog.quote": "Request a quote",
      "catalog.loading": "Loading catalog…",

      "about.eyebrow": "About NagavaTech",
      "about.title": "Software and hardware from the same small team",
      "about.p1": "NagavaTech builds its own applications and sources, configures and ships the computers that run them. We keep the team small on purpose — it means the person who answers your support ticket is often the person who built the product.",
      "about.p2": "We work with individuals, small businesses and teams who want technology that's simple to buy, simple to own and simple to get help with.",
      "about.stat1.n": "2+", "about.stat1.l": "Years building",
      "about.stat2.n": "100%", "about.stat2.l": "In-house support",
      "about.stat3.n": "24h", "about.stat3.l": "Typical response time",

      "contact.eyebrow": "Get in touch",
      "contact.title": "Let's talk about what you need",
      "contact.subtitle": "Questions about a product, a bulk order, or a custom quote — reach out and we'll get back to you.",
      "contact.form.name": "Full name",
      "contact.form.email": "Email",
      "contact.form.subject": "Subject",
      "contact.form.message": "Message",
      "contact.form.submit": "Send message",
      "contact.form.note": "We'll get back to you as soon as possible.",
      "contact.form.note.sent": "Message sent — we'll get back to you soon.",
      "contact.form.note.mailto": "Opening your email client with the message pre-filled, addressed to nagavatech@gmail.com.",
      "contact.form.error": "Please fill in your name, a valid email and a message.",
      "contact.direct.title": "Direct contact",
      "contact.direct.email": "Email",
      "contact.direct.whatsapp": "WhatsApp",
      "contact.direct.hours": "Mon–Fri, 9am–6pm (local time)",

      "privacy.title": "Privacy Policy",
      "terms.title": "Terms of Service",
      "legal.updated": "Last updated: November 2026",

      "notfound.title": "Page not found",
      "notfound.desc": "The page you're looking for doesn't exist or has moved.",
      "notfound.cta": "Back to home",

      "footer.tagline": "Software and hardware, built and supported by one team.",
      "footer.company": "Company",
      "footer.legal": "Legal",
      "footer.contact": "Contact",
      "footer.rights": "All rights reserved.",

      "wa.default_message": "Hi NagavaTech! I'd like to know more about",
    },
    pt: {
      "nav.apps": "Apps",
      "nav.hardware": "Hardware",
      "nav.about": "Sobre",
      "nav.contact": "Contato",
      "nav.cta": "Pedir orçamento",

      "home.eyebrow": "Software e hardware, feitos para funcionar juntos",
      "home.title.1": "Apps inteligentes.",
      "home.title.2": "Hardware de verdade.",
      "home.lead": "A NagavaTech desenvolve seus próprios aplicativos e vende os mini desktops e laptops pra rodar eles — um time só, uma garantia só, um lugar só pra tirar dúvida.",
      "home.cta.primary": "Ver apps",
      "home.cta.secondary": "Ver hardware",

      "home.highlights.title": "O que oferecemos",
      "home.highlights.subtitle": "Três formas de trabalhar com a gente.",
      "home.highlights.apps.title": "Apps",
      "home.highlights.apps.desc": "Softwares desenvolvidos internamente, licenciados por usuário ou em compra única. Feitos, suportados e atualizados pelo nosso próprio time.",
      "home.highlights.minipc.title": "Mini PCs",
      "home.highlights.minipc.desc": "Desktops compactos pra mesa, totem ou rack de servidor — ajustados e testados antes de sair daqui.",
      "home.highlights.laptop.title": "Laptops",
      "home.highlights.laptop.desc": "Laptops confiáveis pra trabalho e desenvolvimento, configurados e prontos pra usar assim que chegam.",

      "home.diffs.title": "Por que a NagavaTech",
      "home.diffs.subtitle": "Os detalhes que facilitam a vida de quem compra.",
      "home.diffs.warranty.title": "Garantia de verdade",
      "home.diffs.warranty.desc": "Todo equipamento e licença sai com garantia clara e por escrito — sem letrinha miúda.",
      "home.diffs.support.title": "Suporte direto",
      "home.diffs.support.desc": "Fale com quem realmente constrói e configura o que você comprou, por e-mail ou WhatsApp.",
      "home.diffs.shipping.title": "Envio rastreado",
      "home.diffs.shipping.desc": "Todo pedido de hardware sai com rastreio e embalagem cuidadosa, direto da nossa bancada até sua porta.",

      "home.courses.title": "Nosso catálogo",
      "home.testimonials.title": "O que os clientes dizem",
      "home.testimonials.t1": "“Configuramos a frota de mini PCs numa tarde — o suporte respondeu tudo pelo WhatsApp em minutos.”",
      "home.testimonials.n1": "Marina Alves",
      "home.testimonials.r1": "Líder de Operações",
      "home.testimonials.t2": "“O app faz exatamente o que a gente precisava, sem excesso. Atualizações saem rápido e eles realmente ouvem feedback.”",
      "home.testimonials.n2": "Diego Ferreira",
      "home.testimonials.r2": "Fundador, pequeno negócio",
      "home.testimonials.t3": "“O laptop chegou configurado e pronto pra usar. Processo de compra direto, do orçamento até a entrega.”",
      "home.testimonials.n3": "Priya Shah",
      "home.testimonials.r3": "Desenvolvedora Freelancer",

      "home.cta.band.title": "Não sabe bem o que precisa?",
      "home.cta.band.desc": "Conta pra gente o seu caso de uso e montamos um orçamento — software, hardware, ou os dois.",
      "home.cta.band.button": "Falar no WhatsApp",

      "catalog.apps.title": "Apps",
      "catalog.apps.subtitle": "Software desenvolvido internamente, licenciado por usuário ou em compra única.",
      "catalog.hardware.title": "Hardware",
      "catalog.hardware.subtitle": "Mini desktops e laptops, configurados e testados antes de sair daqui.",
      "catalog.search.placeholder": "Buscar no catálogo…",
      "catalog.filter.all": "Todos",
      "catalog.empty": "Nenhum produto encontrado.",
      "catalog.buy": "Comprar",
      "catalog.quote": "Pedir orçamento",
      "catalog.loading": "Carregando catálogo…",

      "about.eyebrow": "Sobre a NagavaTech",
      "about.title": "Software e hardware do mesmo time pequeno",
      "about.p1": "A NagavaTech desenvolve seus próprios aplicativos e também seleciona, configura e envia os computadores que rodam eles. Mantemos o time pequeno de propósito — isso significa que quem responde seu chamado de suporte, muitas vezes, é quem construiu o produto.",
      "about.p2": "Trabalhamos com pessoas, pequenos negócios e times que querem tecnologia fácil de comprar, fácil de manter e fácil de pedir ajuda.",
      "about.stat1.n": "2+", "about.stat1.l": "Anos de estrada",
      "about.stat2.n": "100%", "about.stat2.l": "Suporte interno",
      "about.stat3.n": "24h", "about.stat3.l": "Tempo médio de resposta",

      "contact.eyebrow": "Fale com a gente",
      "contact.title": "Vamos conversar sobre o que você precisa",
      "contact.subtitle": "Dúvidas sobre um produto, pedido em volume, ou orçamento sob medida — manda uma mensagem que a gente responde.",
      "contact.form.name": "Nome completo",
      "contact.form.email": "E-mail",
      "contact.form.subject": "Assunto",
      "contact.form.message": "Mensagem",
      "contact.form.submit": "Enviar mensagem",
      "contact.form.note": "A gente responde o quanto antes.",
      "contact.form.note.sent": "Mensagem enviada — a gente responde em breve.",
      "contact.form.note.mailto": "Abrindo seu cliente de e-mail com a mensagem pronta, endereçada a nagavatech@gmail.com.",
      "contact.form.error": "Preencha seu nome, um e-mail válido e uma mensagem.",
      "contact.direct.title": "Contato direto",
      "contact.direct.email": "E-mail",
      "contact.direct.whatsapp": "WhatsApp",
      "contact.direct.hours": "Seg–Sex, 9h–18h (horário local)",

      "privacy.title": "Política de Privacidade",
      "terms.title": "Termos de Uso",
      "legal.updated": "Última atualização: novembro de 2026",

      "notfound.title": "Página não encontrada",
      "notfound.desc": "A página que você procura não existe ou foi movida.",
      "notfound.cta": "Voltar ao início",

      "footer.tagline": "Software e hardware, feitos e suportados por um time só.",
      "footer.company": "Empresa",
      "footer.legal": "Legal",
      "footer.contact": "Contato",
      "footer.rights": "Todos os direitos reservados.",

      "wa.default_message": "Olá NagavaTech! Quero saber mais sobre",
    },
  };

  function getLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "pt") return saved;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    apply(lang);
    document.dispatchEvent(new CustomEvent("nagavatech:langchange", { detail: { lang: lang } }));
  }

  function t(key, lang) {
    lang = lang || getLang();
    var table = dict[lang] || dict[DEFAULT_LANG];
    return (table && table[key]) || (dict[DEFAULT_LANG] && dict[DEFAULT_LANG][key]) || key;
  }

  function apply(lang) {
    lang = lang || getLang();
    document.documentElement.setAttribute("lang", lang === "pt" ? "pt-BR" : "en");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"), lang);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder"), lang));
    });
    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
  }

  function initToggle() {
    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initToggle();
    apply(getLang());
  });

  window.NagavaI18n = { t: t, getLang: getLang, setLang: setLang, apply: apply };
})();
