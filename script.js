/* ============================================================
   EDIT THIS OBJECT — this is the only place you need to change
   to update Tilly's information on the page.
   ============================================================ */
const dog = {
  name: "Tilly",
  breed: "Border Collie",
  microchip: "992000004923466",
  vet: "Monvets Balmes",
  vetAddress: "Carrer de Balmes, 205, 08006 Barcelona",
  photo: "",                  // leave "" to use the placeholder icon

  // Add or remove owners freely — one row (name, visible number, call
  // button) is generated per owner.
  owners: [
    { name: "Dicu Marius Nicolae", phone: "+34600272523" },
    { name: "Antonia Maria Taroiu", phone: "+34610633906" }
  ]
};

/* ============================================================
   Translations — English and Spanish. To add another language,
   copy one block, translate it, and add its two-letter code to
   LANGS below.
   ============================================================ */
const LANGS = ["en", "es"];

const strings = {
  en: {
    pageTitle: (name) => `Found ${name}? — Tap to contact the owner`,
    eyebrow: "If you found this dog",
    instruction: "Please contact the owner using the details below — no app or account needed.",
    callAria: (firstName) => `Call ${firstName}`,
    microchipLabel: "Microchip no.",
    vetLabel: "Usual vet",
    footer: "This page runs entirely from a chip in this tag — no tracking, no account, no ads.",
    toggleTo: "ES"
  },
  es: {
    pageTitle: (name) => `¿Has encontrado a ${name}? — Toca para contactar al dueño`,
    eyebrow: "Si has encontrado a este perro",
    instruction: "Por favor, contacta con el dueño usando los datos de abajo — no hace falta ninguna app ni cuenta.",
    callAria: (firstName) => `Llamar a ${firstName}`,
    microchipLabel: "Nº de microchip",
    vetLabel: "Veterinario habitual",
    footer: "Esta página funciona solo con el chip de esta placa — sin rastreo, sin cuenta, sin anuncios.",
    toggleTo: "EN"
  }
};

/* ============================================================
   Language handling — auto-detects the phone's browser language
   on first visit (Spanish if the phone is set to Spanish, English
   otherwise), then remembers the finder's choice if they tap the
   toggle.
   ============================================================ */
function detectDefaultLang() {
  const saved = localStorage.getItem("dogTagLang");
  if (saved && LANGS.includes(saved)) return saved;
  const browserLang = (navigator.language || "en").slice(0, 2).toLowerCase();
  return LANGS.includes(browserLang) ? browserLang : "en";
}

let currentLang = detectDefaultLang();

// formats "+34600272523" as "+34 600 272 523" for display; falls back
// to the raw value for numbers that don't match the expected pattern
function formatPhone(raw) {
  const m = raw.replace(/\s+/g, "").match(/^\+(\d{2})(\d{3})(\d{3})(\d{3,4})$/);
  return m ? `+${m[1]} ${m[2]} ${m[3]} ${m[4]}` : raw;
}

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

  // owners: name + the phone number shown as plain text, plus a call button
  const owners = document.getElementById("owners");
  owners.innerHTML = "";
  dog.owners.forEach(owner => {
    const firstName = owner.name.split(" ")[0];

    const row = document.createElement("div");
    row.className = "owner-row";

    const details = document.createElement("div");
    details.className = "owner-details";

    const nameEl = document.createElement("span");
    nameEl.className = "owner-name";
    nameEl.textContent = owner.name;

    const phoneEl = document.createElement("a");
    phoneEl.className = "owner-phone";
    phoneEl.href = `tel:${owner.phone}`;
    phoneEl.textContent = formatPhone(owner.phone);

    details.appendChild(nameEl);
    details.appendChild(phoneEl);

    const callBtn = document.createElement("a");
    callBtn.className = "call-btn";
    callBtn.href = `tel:${owner.phone}`;
    callBtn.setAttribute("aria-label", t.callAria(firstName));
    callBtn.textContent = "📞";

    row.appendChild(details);
    row.appendChild(callBtn);
    owners.appendChild(row);
  });

  // microchip: show the plate only if a number has been entered
  document.getElementById("microchipLabel").textContent = t.microchipLabel;
  if (dog.microchip) {
    document.getElementById("microchipNumber").textContent = dog.microchip;
    document.getElementById("microchipBlock").hidden = false;
  } else {
    document.getElementById("microchipBlock").hidden = true;
  }

  // vet: show the plate only if a vet has been entered; address is optional
  document.getElementById("vetLabel").textContent = t.vetLabel;
  if (dog.vet) {
    document.getElementById("vetName").textContent = dog.vet;
    document.getElementById("vetAddress").textContent = dog.vetAddress || "";
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
