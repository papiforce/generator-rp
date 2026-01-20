// ==========================================
// THEME MANAGEMENT
// ==========================================

/**
 * Gère le thème de l'application
 */
const ThemeManager = {
  // Clé de stockage localStorage
  STORAGE_KEY: "rpGeneratorTheme",

  // Images des icônes
  ICONS: {
    light: "assets/full-moon.png", // Lune pour mode sombre
    dark: "assets/sun.png", // Soleil pour mode clair
  },

  /**
   * Initialise le gestionnaire de thème
   */
  init() {
    // Récupère le thème sauvegardé ou détecte la préférence système
    const savedTheme = this.getSavedTheme();
    const systemTheme = this.getSystemTheme();
    const initialTheme = savedTheme || systemTheme;

    // Applique le thème initial
    this.setTheme(initialTheme, false);

    // Initialise le bouton
    this.initButton();

    // Écoute les changements de préférence système
    this.watchSystemTheme();
  },

  /**
   * Récupère le thème sauvegardé
   */
  getSavedTheme() {
    return localStorage.getItem(this.STORAGE_KEY);
  },

  /**
   * Sauvegarde le thème
   */
  saveTheme(theme) {
    localStorage.setItem(this.STORAGE_KEY, theme);
  },

  /**
   * Détecte la préférence système
   */
  getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ?
        "dark"
      : "light";
  },

  /**
   * Récupère le thème actuel
   */
  getCurrentTheme() {
    return document.documentElement.getAttribute("data-theme") || "light";
  },

  /**
   * Applique un thème
   */
  setTheme(theme, save = true) {
    // Applique l'attribut data-theme
    document.documentElement.setAttribute("data-theme", theme);

    // Met à jour l'icône du bouton
    this.updateButtonIcon(theme);

    // Sauvegarde si demandé
    if (save) {
      this.saveTheme(theme);
    }
  },

  /**
   * Bascule entre les thèmes
   */
  toggleTheme() {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === "light" ? "dark" : "light";

    // Animation de rotation
    const btn = getElement("themeBtn");
    if (btn) {
      btn.classList.add("rotating");
      setTimeout(() => btn.classList.remove("rotating"), 500);
    }

    this.setTheme(newTheme);
  },

  /**
   * Met à jour l'icône du bouton
   */
  updateButtonIcon(theme) {
    const btn = getElement("themeBtn");
    const img = btn?.querySelector("img");

    if (img) {
      // Affiche la lune en mode clair (pour activer le mode sombre)
      // Affiche le soleil en mode sombre (pour activer le mode clair)
      img.src = theme === "light" ? this.ICONS.light : this.ICONS.dark;
      img.alt =
        theme === "light" ? "Activer le mode sombre" : "Activer le mode clair";
    }
  },

  /**
   * Initialise le bouton de thème
   */
  initButton() {
    const btn = document.querySelector(".themeBtn");

    if (!btn) {
      console.warn("⚠️ Bouton de thème introuvable");
      return;
    }

    // Ajoute un ID pour faciliter l'accès
    btn.id = "themeBtn";

    // Ajoute l'événement de clic
    btn.addEventListener("click", () => this.toggleTheme());

    // Ajoute un titre au survol
    btn.title = "Changer le thème";
  },

  /**
   * Écoute les changements de préférence système
   */
  watchSystemTheme() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    mediaQuery.addEventListener("change", (e) => {
      // Ne change que si l'utilisateur n'a pas défini de préférence
      if (!this.getSavedTheme()) {
        const newTheme = e.matches ? "dark" : "light";
        this.setTheme(newTheme, false);
      }
    });
  },
};

// ==========================================
// CONSTANTS
// ==========================================

const DEFAULT_VALUES = {
  darkMode: false,
  fullWidth: false,
  template: "1",
  background:
    "https://i.pinimg.com/736x/83/20/90/8320900ef7e875b34884a72134d76324.jpg",
  banner: "https://4kwallpapers.com/images/walls/thumbs_2t/15328.jpeg",
  position: "top",
  darkerBanner: false,
  coloredBanner: false,
  fontFamily: "montserrat",
  fontSize: 11,
  bannerText: true,
  characterName: "Nom du Personnage",
  title: "Titre ici",
  hideTemporality: false,
  timeType: "PRÉSENT",
  year: "1630",
  place: "",
  participants: "",
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id nisl eu lectus iaculis suscipit. Vivamus et ullamcorper augue, non volutpat sem. Aenean at posuere odio, ut tempus sapien. Aenean interdum dictum congue. In hac habitasse platea dictumst. Praesent sit amet velit augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas orci lectus, molestie quis finibus in, ultrices eu velit. Aliquam luctus dui tortor, et sollicitudin dolor aliquam a. Vivamus imperdiet, felis venenatis sodales porttitor, urna sem accumsan augue, non tincidunt tortor sapien id nulla. Aliquam erat volutpat.

Suspendisse vestibulum mi vel posuere lobortis. Nunc vitae turpis in libero consectetur pulvinar. Morbi arcu velit, posuere pellentesque neque eu, aliquam iaculis libero. Aenean nec faucibus diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas aliquam vehicula risus eget efficitur. Vestibulum vehicula lacus quis semper imperdiet. Curabitur urna tortor, sagittis eget diam vitae, finibus placerat dui. Maecenas ac enim ut nunc porta maximus non a neque. Integer ac nibh sem. Integer eu dapibus ante. Proin ullamcorper est est, nec rhoncus odio placerat a. Cras ut augue maximus, facilisis turpis sit amet, condimentum eros. Integer malesuada nec ipsum non ultrices. Curabitur quis nisi at enim ornare pretium. Phasellus sed augue nunc.`,
  logo: "jr",
  firstLetter: false,
};

const CHARACTER_IMAGES = {
  tyr: "https://i.pinimg.com/736x/12/c0/80/12c080b695d53b8f9bbf4da5e41c03d3.jpg",
  sonya:
    "https://i.pinimg.com/736x/37/48/46/374846ec6b5e91795344f2b8f386d98c.jpg",
  jeshaay:
    "https://i.pinimg.com/736x/b8/00/56/b8005680164e0bf4760f94fb9a3780dd.jpg",
  jeshaaySerpent:
    "https://i.pinimg.com/1200x/8e/d0/6b/8ed06b5bc4191f8d8b748edf05fffcfd.jpg",
  jeshaayHybride:
    "https://i.pinimg.com/1200x/7f/ef/c0/7fefc0a41a064f95a6d251f4f8847727.jpg",
  lem: "https://2img.net/u/3112/10/25/15/avatars/5462-79.jpg",
  nicoeliza: "https://sig.grumpybumpers.com/host/poetryisgood.gif",
  velvet: "https://sig.grumpybumpers.com/host/poetryisamazing.gif",
  lorelei: "https://2img.net/i.imgur.com/tUg6xD3.png",
  civil:
    "https://i.pinimg.com/736x/a3/50/1e/a3501ea173c42bd83d4123dccb5917d8.jpg",
  pirate:
    "https://static.wikia.nocookie.net/onepiece/images/1/1a/Membres_Pirates_du_Roux_11_Portrait.png/revision/latest/scale-to-width-down/120?cb=20231029205730&path-prefix=fr",
  marine:
    "https://i.pinimg.com/736x/77/7a/df/777adf0a1bf32967934d958be513bd7b.jpg",
  cp: "https://static.wikia.nocookie.net/onepiece/images/c/c3/Partenaire_de_Who%27s-Who_Cipher_Pol_1_Portrait.png/revision/latest/scale-to-width-down/120?cb=20231029210543&path-prefix=fr",
  chasseur:
    "https://static.wikia.nocookie.net/onepiece/images/5/5c/Daddy_Masterson_Anime_Infobox.png/revision/latest/smart/width/250/height/250?cb=20180311174550&path-prefix=fr",
  atout:
    "https://static.wikia.nocookie.net/onepiece/images/9/98/Bunny_Joe_Anime_Infobox.png/revision/latest?cb=20130621023213&path-prefix=fr",
  revolutionnaire:
    "https://static.wikia.nocookie.net/onepiece/images/9/98/Bunny_Joe_Anime_Infobox.png/revision/latest?cb=20130621023213&path-prefix=fr",
};

// ==========================================
// STATE MANAGEMENT
// ==========================================

let selectedText = "";
let selectionStart = 0;
let selectionEnd = 0;

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Capitalise la première lettre d'une chaîne
 */
function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/**
 * Échappe les caractères HTML
 */
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Déséchappe les caractères HTML
 */
function unescapeHTML(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

/**
 * Gère l'affichage du logo
 */
const handleLogo = (value) => {
  if (["jr", "jr-gray"].includes(value)) {
    return "https://i.servimg.com/u/f64/20/62/43/80/jolly_11.jpg";
  }

  return "https://image.noelshack.com/fichiers/2025/51/1/1765810066-tampon-jr.png";
};

// ==========================================
// STORAGE FUNCTIONS
// ==========================================

/**
 * Sauvegarde les données dans le localStorage
 */
function saveData() {
  const template = getElementValue("template");
  const data = {
    darkMode: getElementChecked("darkMode"),
    fullWidth: getElementChecked("fullWidth"),
    background: getElementValue("background"),
    banner: getElementValue("banner"),
    position: getElementValue("position"),
    darkerBanner: getElementChecked("darkerBanner"),
    coloredBanner: getElementChecked("coloredBanner"),
    fontFamily: getElementValue("fontFamily"),
    fontSize: getElementValue("fontSize"),
    bannerText: getElementChecked("bannerText"),
    characterName: getElementValue("characterName"),
    logo: getElementValue("logo"),
    savedAt: new Date().toISOString(),
  };

  localStorage.setItem(`RG-template-${template}`, JSON.stringify(data));

  const saveBtn = document.getElementById("saveData");
  const originalText = saveBtn.textContent;
  saveBtn.textContent = "✅ Sauvegardé !";
  saveBtn.style.background = "#28a745";

  setTimeout(() => {
    saveBtn.textContent = originalText;
    saveBtn.style.background = "linear-gradient(45deg, #667eea, #764ba2)";
  }, 2000);
}

/**
 * Charge les données depuis le localStorage
 */
function loadSavedData() {
  const template = getElementValue("template");
  const saved = localStorage.getItem(`RG-template-${template}`);

  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Erreur lors du parsing des données sauvegardées:", e);
      return null;
    }
  }
  return null;
}

/**
 * Applique les données au formulaire
 */
function applyDataToForm(data) {
  if (!data) {
    data = DEFAULT_VALUES;
  }

  setElementChecked("darkMode", data.darkMode || DEFAULT_VALUES.darkMode);
  setElementChecked("fullWidth", data.fullWidth || DEFAULT_VALUES.fullWidth);
  setElementValue("background", data.background || DEFAULT_VALUES.background);
  setElementValue("banner", data.banner || DEFAULT_VALUES.banner);
  setElementValue("position", data.position || DEFAULT_VALUES.position);
  setElementChecked(
    "darkerBanner",
    data.darkerBanner || DEFAULT_VALUES.darkerBanner,
  );
  setElementChecked(
    "coloredBanner",
    data.coloredBanner || DEFAULT_VALUES.coloredBanner,
  );
  setElementValue("fontFamily", data.fontFamily || DEFAULT_VALUES.fontFamily);
  setElementValue("fontSize", data.fontSize || DEFAULT_VALUES.fontSize);
  setElementChecked("bannerText", data.bannerText || DEFAULT_VALUES.bannerText);
  setElementValue(
    "characterName",
    data.characterName || DEFAULT_VALUES.characterName,
  );
  setElementValue("logo", data.logo || DEFAULT_VALUES.logo);
  setElementChecked(
    "hideTemporality",
    data.hideTemporality || DEFAULT_VALUES.hideTemporality,
  );
}

/**
 * Charge et applique les données
 */
function loadAndApplyData() {
  const savedData = loadSavedData();
  applyDataToForm(savedData);
}

// ==========================================
// DOM HELPERS
// ==========================================

function getElement(id) {
  return document.getElementById(id);
}

function getElementValue(id) {
  const element = getElement(id);
  return element ? element.value : "";
}

function getElementChecked(id) {
  const element = getElement(id);
  return element ? element.checked : false;
}

function setElementValue(id, value) {
  const element = getElement(id);
  if (element) element.value = value;
}

function setElementChecked(id, checked) {
  const element = getElement(id);
  if (element) element.checked = checked;
}

// ==========================================
// TEMPLATE GENERATOR
// ==========================================

/**
 * Génère le HTML pour le template 1
 */
function generateTemplate1(data) {
  const {
    fullWidth,
    background,
    banner,
    position,
    fontSize,
    characterName,
    timeType,
    year,
    participants,
    content,
    logo,
  } = data;

  const participantsList = participants
    .split("\n")
    .filter((p) => p.trim())
    .map(
      (p) =>
        `<p style="text-align: center; color: white; background: black; border-radius: 4px; padding: 4px; font-size: 10px; margin-bottom: 2px;">${p.trim()}</p>`,
    )
    .join("");

  return `<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
</style>
<div style="background: url('${background}'); background-size: cover; padding: 20px; border-radius: 8px; max-width: ${
    fullWidth ? "800px" : "720px"
  }; margin: 0 auto;"><div style="position: relative; display: flex; gap: 16px; height: 200px;"><img src="${banner}" style="width: 100%; max-width: 464px; object-fit: cover; object-position: ${position}; border-radius: 12px 12px 0 0;" /><img src="${handleLogo(
    logo,
  )}" style="max-width: 240px; max-height: 200px; ${
    logo === "jr-gray" ? "filter: grayscale(100%);" : ""
  }" /><span style="font-size: 40px; font-style: italic; text-shadow: 1px 1px 2px black; position: absolute; bottom: -32px; left: 50%; transform: translateX(-50%); color: white; white-space: nowrap;">${characterName}</span></div>
<div style="margin-top: 24px; display: flex; gap: 16px;"><div style="min-width: 180px; display: flex; flex-direction: column;"><p style="text-align: center; font-size: 16px; color: white;">Informations</p><hr style="border: 1px solid white; margin: 0 0 12px;"/><div style="font-family: 'Raleway', sans-serif;"><p style="text-align: center; color: white; background: black; border-radius: 4px; padding: 4px; font-size: 10px; margin-bottom: 2px; text-transform: uppercase;">${timeType}</p><p style="text-align: center; color: white; background: black; border-radius: 4px; padding: 4px; font-size: 10px; margin-bottom: 24px;">${year}</p></div><p style="text-align: center; font-size: 16px; color: white;">Participants</p><hr style="border: 1px solid white; margin: 0 0 12px;"/><div style="font-family: 'Raleway', sans-serif;">${participantsList}</div></div><div style="font-family: 'Raleway', sans-serif; font-size: ${fontSize}px; text-align: justify; padding: 40px 32px; color: black; background: white; border-radius: 8px; max-height: 656px; overflow: scroll; width: 100%;">${content.replace(
    /\n/g,
    "<br/>",
  )}</div></div></div>
<p style="font-size: 12px; text-align: center;">Bourbon | バーボン</p>`;
}

/**
 * Génère le HTML pour le template 2
 */
function generateTemplate2(data) {
  const {
    banner,
    bannerText,
    characterName,
    coloredBanner,
    content,
    darkMode,
    darkerBanner,
    firstLetter,
    fontFamily,
    fontSize,
    fullWidth,
    logo,
    participants,
    place,
    position,
    timeType,
    title,
    year,
    hideTemporality,
  } = data;

  const withFirstLetterBig =
    firstLetter ?
      ".firstLetter::first-letter { -webkit-initial-letter: 3; initial-letter: 3; font-weight: bold; margin-right: .5em; }"
    : "";

  const theme =
    darkMode ?
      `.dark .codebox { background-color: #222327 !important; border: 1px solid #33353a !important; padding: 12px !important; } .dark .spoiler_title { color: #fff !important; font-size: ${fontSize}px !important; } .dark .spoiler_content { background-color: #2a2c33 !important; color: #fff !important; font-size: ${
        Number(fontSize) - 1
      }px !important; font-weight: 500; } .dark speech { display: flex; gap: 8px; } .dark .speech { display: flex; gap: 8px; } .dark .speech img { object-fit: cover; object-position: center; min-width: 56px; max-width: 56px; height: 56px; border-radius: 50%; padding: 2px; } .dark .speech span { background-color: #2a2c33; border: 2px solid #33353a; font-weight: bold; padding: 8px 12px; width: 100%; }`
    : `.light .codebox { background-color: #f5f5f5 !important; border: 1px solid #e7e7ee !important; padding: 12px !important; } .light .spoiler_title { color: #000 !important; font-size: ${fontSize}px !important; } .light .spoiler_content { background-color: #eaeaeaff !important; color: #000 !important; font-weight: 500; font-size: ${
        Number(fontSize) - 1
      }px !important; } .light speech { display: flex; gap: 8px; } .light .speech { display: flex; gap: 8px; } .light .speech img { object-fit: cover; object-position: center; min-width: 56px; max-width: 56px; height: 56px; border-radius: 50%; padding: 2px; } .light .speech span { background-color: #fff; border: 2px solid #e7e7ee; font-weight: bold; padding: 8px 12px; width: 100%; }`;

  const globalStyle = `max-width: ${
    fullWidth ? "800px" : "580px"
  }; background: ${
    darkMode ? "oklch(0.2223 0.006 271.1393)" : "#f2f2f2"
  }; margin: 0 auto; color: ${darkMode ? "#fff" : "#000"};`;

  const bannerStyle = `background-position: ${position} !important; background: ${
    darkerBanner ?
      "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), "
    : ""
  }url('${banner}'); filter: grayscale(${coloredBanner ? "0" : "90%"});`;

  return `<style>@import url('@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Serif+JP:wght@200..900&family=Petrona:ital,wght@0,100..900;1,100..900&display=swap');'); .petrona { font-family: 'Petrona', serif; font-optical-sizing: auto; font-style: normal; } .montserrat { font-family: 'Montserrat', sans-serif; font-optical-sizing: auto; font-style: normal; } .noto-serif-jp { font-family: 'Noto Serif JP', serif; font-optical-sizing: auto; font-style: normal; } .contentWrapper { margin: 32px 40px; } .separator { width: max-content; display: flex; align-items: center; gap: 16px; } ${theme}${withFirstLetterBig} @media (max-width: 720px) { .contentWrapper { margin: 8px 16px 32px; } .separator { width: 80%; } }</style><!--

--><div class="montserrat" style="position: relative;${globalStyle}"><!--
--><div style="position: relative; display: flex; justify-content: center; align-items: center; height: 220px; background-size: cover !important;${bannerStyle}"><div style="position: absolute; bottom: 0; background: linear-gradient(360deg,${
    darkMode ? "rgba(26, 27, 30, 1)" : "rgba(242, 242, 242, 1)"
  } 0%, rgba(242, 242, 242, 0) 100%); width: 100%; height: 72px;"></div><!--
-->${
    bannerText ?
      `<div style="padding: 8px; text-shadow: 1px 1px #000; color: #fff; display: flex; flex-direction: column; text-align: center;"><span style="font-size: 14px; text-transform: uppercase;">${characterName}</span><span class="petrona" style="font-size: 24px;">${title}</span>${
        hideTemporality ? "" : (
          `<span style="font-size: 12px;">${timeType} - ${year}</span>`
        )
      }</div>`
    : ""
  }</div><!-- 

--><div class="contentWrapper"><!--
--><div class="separator" style="margin: ${
    place !== "" ? "32px auto 16px" : "32px auto"
  };"><hr style="height: 1px; width: 180px; border-top-color: ${
    darkMode ? "#fff" : "#000"
  } !important;" /><span>∞</span><hr style="height: 1px; width: 180px; border-top-color: ${
    darkMode ? "#fff" : "#000"
  } !important;" /></div>${
    place !== "" ?
      `<!--

--><p class="${fontFamily}" style="font-size: ${
        Number(fontSize) + 1
      }px; font-weight: 500; font-style: italic; text-align: center; color: ${
        darkMode ? "gray" : "#a0a0a0"
      };">${place}.</p><hr style="height: 1px; width: 100px; border-top-color: ${
        darkMode ? "#fff" : "#000"
      } !important; margin: 20px auto 32px;" />`
    : ""
  }<!--

--><div class="${fontFamily} ${darkMode ? "dark" : "light"} ${
    firstLetter ? "firstLetter" : ""
  }" style="font-size: ${fontSize}px; text-align: justify; margin: 0;">${content.replace(
    /\n/g,
    "<br/>",
  )}</div><!--

-->${
    participants !== "" ?
      `<p class="${fontFamily}" style="margin-top: 40px; font-size: ${
        fontSize - 1
      }px; font-style: italic; text-align: right; color: ${
        darkMode ? "gray" : "#a0a0a0"
      }; text-transform: lowercase;">feat. ${participants}.</p>`
    : ""
  }</div><!-- 

--><p class="montserrat" style="text-align: center; font-size: ${
    fontFamily === "montserrat" ? Number(fontSize) - 1 : Number(fontSize) - 2
  }px; font-weight: 400; padding-bottom: 40px; margin: 0;">Bourbon | バーボン</p>${
    logo !== "none" ?
      `<img src="${handleLogo(
        logo,
      )}" alt="jolly roger" style="position: absolute; left: 16px; bottom: 16px; transform: rotate(-17deg); width: ${
        participants !== "" ? "64px" : "48px"
      }; border-radius: ${["jr", "jr-gray"].includes(logo) ? "100%" : "0"}; ${
        logo === "jr-gray" ? "filter: grayscale(1);" : ""
      }" />`
    : ""
  }</div>`;
}

/**
 * Sélectionne et génère le bon template
 */
function generateTemplateHTML(templateNumber, data) {
  switch (templateNumber) {
    case "2":
      return generateTemplate2(data);
    case "1":
    default:
      return generateTemplate1(data);
  }
}

// ==========================================
// CHARACTER SPEECH HANDLER
// ==========================================

/**
 * Gère le dialogue des personnages avec image
 */
function handleCharacterSpeech(characterName, characterColor, speech) {
  const imageUrl = CHARACTER_IMAGES[characterName];

  return `<div class="speech" style="display: flex; gap: 8px;"><img src="${imageUrl}" alt="${characterName}" style="border: 2px solid ${characterColor};" /><span style="color: ${characterColor};">${speech}</span></div>`;
}

// ==========================================
// UI CONTROLLER
// ==========================================

/**
 * Met à jour la prévisualisation
 */
function updatePreview() {
  const template = getElementValue("template");
  const data = {
    darkMode: getElementChecked("mode"),
    fullWidth: getElementChecked("fullWidth") || DEFAULT_VALUES.fullWidth,
    background: getElementValue("background") || DEFAULT_VALUES.background,
    banner: getElementValue("banner") || DEFAULT_VALUES.banner,
    position: getElementValue("position") || DEFAULT_VALUES.position,
    darkerBanner:
      getElementChecked("darkerBanner") || DEFAULT_VALUES.darkerBanner,
    coloredBanner:
      getElementChecked("coloredBanner") || DEFAULT_VALUES.coloredBanner,
    fontFamily: getElementValue("fontFamily") || DEFAULT_VALUES.fontFamily,
    fontSize: getElementValue("fontSize") || DEFAULT_VALUES.fontSize,
    bannerText: template === "1" ? true : getElementChecked("bannerText"),
    characterName:
      getElementValue("characterName") || DEFAULT_VALUES.characterName,
    title: getElementValue("title") || DEFAULT_VALUES.title,
    hideTemporality:
      getElementChecked("hideTemporality") || DEFAULT_VALUES.hideTemporality,
    timeType: getElementValue("timeType"),
    year: getElementValue("year") || DEFAULT_VALUES.year,
    place: getElementValue("place") || DEFAULT_VALUES.place,
    participants:
      getElementValue("participants") || DEFAULT_VALUES.participants,
    content: getElementValue("content") || DEFAULT_VALUES.content,
    logo: getElementValue("logo"),
    firstLetter: getElementChecked("firstLetter"),
  };

  if (template === "1") {
    getElement("participants").placeholder = "PJ 1\nPJ 2\nPJ 3";
  } else {
    getElement("participants").placeholder = "PJ 1, PJ 2 & PJ 3";
  }

  const html = generateTemplateHTML(template, data);

  const preview = getElement("preview");
  const generatedCode = getElement("generatedCode");

  if (preview) preview.innerHTML = html;
  if (generatedCode) generatedCode.value = html.replaceAll("<br/>", "\n");
}

/**
 * Affiche/masque les champs selon le template
 */
function toggleFieldsByTemplate() {
  const template = getElementValue("template");

  // Champs spécifiques au template 1
  const template1Fields = ["background"];

  // Champs spécifiques au template 2
  const template2Fields = [
    "mode",
    "fullWidth",
    "logo",
    "darkerBanner",
    "coloredBanner",
    "bannerText",
    "fontFamily",
    "fontSize",
    "firstLetter",
    "place",
    "hideTemporality",
  ];

  template1Fields.forEach((fieldId) => {
    const field = getElement(fieldId);
    if (field) {
      const formGroup = field.closest(".form-group");
      if (formGroup) {
        formGroup.style.display = template === "1" ? "block" : "none";
      }
    }
  });

  template2Fields.forEach((fieldId) => {
    const field = getElement(fieldId);
    if (field) {
      const formGroup = field.closest(".form-group");
      if (formGroup) {
        formGroup.style.display = template === "2" ? "block" : "none";
      }
    }
  });

  // Si bannerText est décoché, masquer les champs associés
  if (template === "2") {
    const bannerTextChecked = getElementChecked("bannerText");
    const bannerTextFields = ["characterName", "title", "timeType", "year"];

    bannerTextFields.forEach((fieldId) => {
      const field = getElement(fieldId);
      if (field) {
        const formGroup = field.closest(".form-group");
        if (formGroup) {
          formGroup.style.display = bannerTextChecked ? "block" : "none";
        }
      }
    });
  } else {
    const bannerTextFields = ["characterName", "timeType", "year"];

    getElement("title").closest(".form-group").style.display = "none";

    bannerTextFields.forEach((fieldId) => {
      const field = getElement(fieldId);
      if (field) {
        const formGroup = field.closest(".form-group");
        if (formGroup) {
          formGroup.style.display = "block";
        }
      }
    });
  }
}

/**
 * Initialise les sections collapsibles
 */
function initializeCollapses() {
  document.querySelectorAll(".collapse > p").forEach((collapseTitle) => {
    collapseTitle.addEventListener("click", function () {
      const collapseDiv = this.parentElement;
      collapseDiv.classList.toggle("collapsed");
      collapseDiv.classList.toggle("expanded");
    });
  });
}

// ==========================================
// TEXT SELECTION
// ==========================================

/**
 * Initialise la gestion de la sélection de texte
 */
function initializeTextSelection() {
  const contentTextarea = getElement("content");
  const characterColor = getElement("characterColor");

  if (!contentTextarea || !characterColor) return;

  /**
   * Met à jour la sélection de texte
   */
  function updateSelection() {
    const start = contentTextarea.selectionStart;
    const end = contentTextarea.selectionEnd;

    if (start !== end) {
      selectedText = contentTextarea.value.substring(start, end);
      selectionStart = start;
      selectionEnd = end;
    } else {
      selectedText = "";
    }
  }

  // Capture la sélection avec la SOURIS
  contentTextarea.addEventListener("mouseup", updateSelection);

  // Capture la sélection avec le CLAVIER (Cmd+A, Shift+Arrow, etc.)
  contentTextarea.addEventListener("keyup", updateSelection);

  // Capture la sélection via le menu contextuel
  contentTextarea.addEventListener("select", updateSelection);

  // Capture lors du focus (si du texte était déjà sélectionné)
  contentTextarea.addEventListener("focus", updateSelection);

  // Gère le changement de couleur de personnage
  characterColor.addEventListener("change", function () {
    const color = this.value;

    if (!color || !selectedText) {
      updatePreview();
      return;
    }

    const destructuredColor = color.split("-");

    const htmlCode =
      destructuredColor.length > 1 ?
        handleCharacterSpeech(
          destructuredColor[1],
          destructuredColor[0],
          selectedText,
        )
      : `<span style="color: ${color}; font-weight: bold;">${selectedText}</span>`;

    const beforeText = contentTextarea.value.substring(0, selectionStart);
    const afterText = contentTextarea.value.substring(selectionEnd);

    contentTextarea.value = beforeText + htmlCode + afterText;

    // Reset
    selectedText = "";
    selectionStart = 0;
    selectionEnd = 0;
    this.value = "";

    updatePreview();
  });
}

// ==========================================
// EVENT HANDLERS
// ==========================================

/**
 * Initialise les événements du formulaire
 */
function initializeFormEvents() {
  const form = getElement("rpForm");
  if (!form) return;

  // Écoute tous les changements du formulaire
  form.addEventListener("input", updatePreview);
  form.addEventListener("change", updatePreview);
}

/**
 * Initialise le changement de template
 */
function initializeTemplateChange() {
  const templateSelect = getElement("template");
  if (!templateSelect) return;

  templateSelect.addEventListener("change", () => {
    toggleFieldsByTemplate();
    loadAndApplyData();
    updatePreview();
  });
}

/**
 * Initialise le toggle du texte de bannière
 */
function initializeBannerTextToggle() {
  const bannerTextCheckbox = getElement("bannerText");
  if (!bannerTextCheckbox) return;

  bannerTextCheckbox.addEventListener("change", () => {
    const isChecked = bannerTextCheckbox.checked;
    const fieldsToToggle = ["characterName", "title", "timeType", "year"];

    fieldsToToggle.forEach((fieldId) => {
      const field = getElement(fieldId);
      if (field) {
        const formGroup = field.closest(".form-group");
        if (formGroup) {
          formGroup.style.display = isChecked ? "block" : "none";
        }
      }
    });

    updatePreview();
  });
}

/**
 * Initialise le toggle du texte de temporalité
 */
function initializeTemporalityText() {
  const temporalityCheckbox = getElement("hideTemporality");
  if (!temporalityCheckbox) return;

  temporalityCheckbox.addEventListener("change", () => {
    const isChecked = temporalityCheckbox.checked;
    const fieldsToToggle = ["timeType", "year"];

    fieldsToToggle.forEach((fieldId) => {
      const field = getElement(fieldId);
      if (field) {
        const formGroup = field.closest(".form-group");
        if (formGroup) {
          formGroup.style.display = isChecked ? "none" : "block";
        }
      }
    });

    updatePreview();
  });
}

/**
 * Initialise le bouton de copie
 */
function initializeCopyButton() {
  const copyBtn = getElement("copyCode");
  const generatedCode = getElement("generatedCode");

  if (!copyBtn || !generatedCode) return;

  copyBtn.addEventListener("click", function () {
    generatedCode.select();
    document.execCommand("copy");

    const originalText = copyBtn.textContent;
    copyBtn.textContent = "✅ Copié !";
    copyBtn.style.background = "#28a745";

    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.style.background = "linear-gradient(45deg, #667eea, #764ba2)";
    }, 2000);
  });
}

/**
 * Initialise le bouton de sauvegarde
 */
function initializeSaveButton() {
  const saveBtn = getElement("saveData");
  if (!saveBtn) return;

  saveBtn.addEventListener("click", saveData);
}

// ==========================================
// MAIN INITIALIZATION
// ==========================================

/**
 * Initialise l'application
 */
function initializeApp() {
  // Initialise le gestionnaire de thème EN PREMIER
  ThemeManager.init();

  // Charge les données sauvegardées
  loadAndApplyData();

  // Configure l'affichage selon le template
  toggleFieldsByTemplate();

  // Initialise la prévisualisation
  updatePreview();

  // Initialise tous les événements
  initializeFormEvents();
  initializeTemplateChange();
  initializeBannerTextToggle();
  initializeTemporalityText();
  initializeCopyButton();
  initializeSaveButton();
  initializeTextSelection();
  initializeCollapses();
}

// Démarre l'application quand le DOM est chargé
document.addEventListener("DOMContentLoaded", initializeApp);
