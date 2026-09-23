/* ============================================================
   EDIT THIS OBJECT — this is the only place you need to change
   to update Tilly's information on the page.
   ============================================================ */
const dog = {
  name: "Tilly",
  breed: "Border Collie",
  microchip: "",              // add the number here once you have it, e.g. "981000000000000"
  vet: "Monvets Balmes",
  photo: "",                  // leave "" to use the placeholder icon

  // Add or remove owners freely — one call button is generated per owner.
  owners: [
    { name: "Dicu Marius Nicolae", phone: "+34600272523" },
    { name: "Antonia Maria Taroiu", phone: "+34610633906" }
  ]
};

/* ============================================================
   Translations — English and Spanish. To add another language,
   copy one block, translate it, and add its code to LANGS below.
   ============================================================ */
const LANGS = ["en", "es"];

const strings = {
  en: {
    pageTitle: (name) => `Found ${name}? — Tap to contact the owner`,
    eyebrow: "If you found this dog",
    instruction: "Please contact the owner using the details below — no app or account needed.",
    call: (firstName) => `Call ${firstName}`,
    email: (firstName) => `Email ${firstName}`,
    microchipLabel: "Microchip no.",
    microchipUnknown: "Not registered",
    vetLabel: "Usual vet",
    ownerLabel: dogOwnersLabel => dogOwnersLabel > 1 ? "Registered owners:" : "Registered owner:",
    footer: "This page runs entirely from a chip in this tag — no tracking, no account, no ads.",
    toggleTo: "ES"
  },
  es: {
    pageTitle: (name) => `¿Has encontrado a ${name}? — Toca para contactar al dueño`,
    eyebrow: "Si has encontrado a este perro",
    instruction: "Por favor, contacta con el dueño usando los datos de abajo — no hace falta ninguna app ni cuenta.",
    call: (firstName) => `Llamar a ${firstName}`,
    email: (firstName) => `Escribir a ${firstName}`,
    microchipLabel: "Nº de microchip",
    microchipUnknown: "No registrado",
    vetLabel: "Veterinario habitual",
    ownerLabel: dogOwnersLabel => dogOwnersLabel > 1 ? "Dueños registrados:" : "Dueño registrado:",
    footer: "Esta página funciona solo con el chip de esta placa — sin rastreo, sin cuenta, sin anuncios.",
    toggleTo: "EN"
  }
};

/* ============================================================
   Language handling — auto-detects the phone's browser language
   on first visit (Spanish if the phone is set to Spanish,
   English otherwise), then remembers the finder's choice if they
   tap the toggle.
   ============================================================ */
function detectDefaultLang() {
  const saved = localStorage.getItem("dogTagLang");
  if (saved && LANGS.includes(saved)) return saved;
  const browserLang = (navigator.language || "en").slice(0, 2).toLowerCase();
  return LANGS.includes(browserLang) ? browserLang : "en";
}

let currentLang = detectDefaultLang();

/* ============================================================
   Rendering — you shouldn't need to touch anything below this
   line. It just takes the "dog" object and the current language
   and fills the page.
   ============================================================ */
function render() {
  const t = strings[currentLang];
  document.documentElement.lang = currentLang;
  document.title = t.pageTitle(dog.name);

  document.getElementById("statusLine").textContent = t.eyebrow;
  document.getElementById("dogName").textContent = dog.name;
  document.getElementById("dogBreed").textContent = dog.breed;
  document.getElementById("instructionText").textContent = t.instruction;
  document.getElementById("footerNote").textContent = t.footer;
  document.getElementById("langToggleLabel").textContent = t.toggleTo;

  document.getElementById("ownerLabel").textContent = t.ownerLabel(dog.owners.length);
  document.getElementById("ownerNames").textContent = dog.owners.map(o => o.name).join(" & ");

  // rebuild the call/email buttons in the current language
  const actions = document.getElementById("actions");
  actions.innerHTML = "";
  dog.owners.forEach(owner => {
    const firstName = owner.name.split(" ")[0];

    const callBtn = document.createElement("a");
    callBtn.className = "btn btn-call";
    callBtn.href = `tel:${owner.phone}`;
    callBtn.innerHTML = `<span class="btn-icon" aria-hidden="true">📞</span> ${t.call(firstName)}`;
    actions.appendChild(callBtn);

    if (owner.email) {
      const emailBtn = document.createElement("a");
      emailBtn.className = "btn btn-email";
      emailBtn.href = `mailto:${owner.email}?subject=${encodeURIComponent(dog.name)}`;
      emailBtn.innerHTML = `<span class="btn-icon" aria-hidden="true">✉️</span> ${t.email(firstName)}`;
      actions.appendChild(emailBtn);
    }
  });

  // microchip: show the plate only if a number has been entered
  document.getElementById("microchipLabel").textContent = t.microchipLabel;
  if (dog.microchip) {
    document.getElementById("microchipNumber").textContent = dog.microchip;
    document.getElementById("microchipBlock").hidden = false;
  } else {
    document.getElementById("microchipBlock").hidden = true;
  }

  // vet: show the plate only if a vet has been entered
  document.getElementById("vetLabel").textContent = t.vetLabel;
  if (dog.vet) {
    document.getElementById("vetName").textContent = dog.vet;
    document.getElementById("vetBlock").hidden = false;
  } else {
    document.getElementById("vetBlock").hidden = true;
  }

  // photo: use it if provided, otherwise keep the placeholder icon
  const photoEl = document.getElementById("dogPhoto");
  const placeholderEl = document.getElementById("photoPlaceholder");
  if (dog.photo) {
    photoEl.src = dog.photo;
    photoEl.alt = dog.name;
    photoEl.hidden = false;
    placeholderEl.hidden = true;
  }
}

document.getElementById("langToggle").addEventListener("click", () => {
  currentLang = currentLang === "en" ? "es" : "en";
  localStorage.setItem("dogTagLang", currentLang);
  render();
});

render();
