document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("rpForm");
  const preview = document.getElementById("preview");
  const contentTextarea = document.getElementById("content");
  const characterColor = document.getElementById("characterColor");
  const generatedCode = document.getElementById("generatedCode");
  const copyBtn = document.getElementById("copyCode");
  const saveBtn = document.getElementById("saveData");

  let selectedText = "";
  let selectionStart = 0;
  let selectionEnd = 0;

  const defaultValues = {
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
    timeType: "PRÉSENT",
    year: "1630",
    place: "",
    participants: "",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id nisl eu lectus iaculis suscipit. Vivamus et ullamcorper augue, non volutpat sem. Aenean at posuere odio, ut tempus sapien. Aenean interdum dictum congue. In hac habitasse platea dictumst. Praesent sit amet velit augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas orci lectus, molestie quis finibus in, ultrices eu velit. Aliquam luctus dui tortor, et sollicitudin dolor aliquam a. Vivamus imperdiet, felis venenatis sodales porttitor, urna sem accumsan augue, non tincidunt tortor sapien id nulla. Aliquam erat volutpat.

    Suspendisse vestibulum mi vel posuere lobortis. Nunc vitae turpis in libero consectetur pulvinar. Morbi arcu velit, posuere pellentesque neque eu, aliquam iaculis libero. Aenean nec faucibus diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas aliquam vehicula risus eget efficitur. Vestibulum vehicula lacus quis semper imperdiet. Curabitur urna tortor, sagittis eget diam vitae, finibus placerat dui. Maecenas ac enim ut nunc porta maximus non a neque. Integer ac nibh sem. Integer eu dapibus ante. Proin ullamcorper est est, nec rhoncus odio placerat a. Cras ut augue maximus, facilisis turpis sit amet, condimentum eros. Integer malesuada nec ipsum non ultrices. Curabitur quis nisi at enim ornare pretium. Phasellus sed augue nunc..`,
    logo: "jr",
  };

  const loadSavedData = () => {
    const template = document.getElementById("template").value;
    const savedData = localStorage.getItem(`RG-template-${template}`);

    if (savedData) {
      try {
        const data = JSON.parse(savedData);

        if (data.darkMode)
          document.getElementById("mode").checked = data.darkMode;
        if (data.fullWidth)
          document.getElementById("fullWidth").checked = data.fullWidth;
        if (data.background)
          document.getElementById("background").value = data.background;
        if (data.banner) document.getElementById("banner").value = data.banner;
        if (data.darkerBanner)
          document.getElementById("darkerBanner").checked = data.darkerBanner;
        if (data.coloredBanner)
          document.getElementById("coloredBanner").checked = data.coloredBanner;
        if (data.fontFamily)
          document.getElementById("fontFamily").value = data.fontFamily;
        if (data.fontSize) document.getElementById("fontSize").value;
        if (data.bannerText)
          document.getElementById("bannerText").checked = data.bannerText;
        if (data.characterName)
          document.getElementById("characterName").value = data.characterName;
        if (data.logo) document.getElementById("logo").value = data.logo;

        console.log(`✅ Données chargées pour le template ${template}`);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des données:", error);
        localStorage.removeItem("rpGeneratorData");
      }
    } else {
      document.getElementById("mode").value = "light";
      document.getElementById("fullWidth").checked = false;
      document.getElementById("background").value = "";
      document.getElementById("banner").value = "";
      document.getElementById("darkerBanner").checked = false;
      document.getElementById("coloredBanner").checked = false;
      document.getElementById("fontFamily").value = "montserrat";
      document.getElementById("fontSize").value = 11;
      document.getElementById("bannerText").checked = true;
      document.getElementById("characterName").value = "";
      document.getElementById("logo").value = "jr";

      console.log(`ℹ️ Aucune donnée sauvegardée pour le template ${template}`);
    }
  };

  const saveData = () => {
    const darkMode = document.getElementById("mode").checked;
    const fullWidth = document.getElementById("fullWidth").checked;
    const template = document.getElementById("template").value;
    const background = document.getElementById("background").value;
    const banner = document.getElementById("banner").value;
    const darkerBanner = document.getElementById("darkerBanner").checked;
    const coloredBanner = document.getElementById("coloredBanner").checked;
    const fontFamily = document.getElementById("fontFamily").value;
    const fontSize = document.getElementById("fontSize").value;
    const bannerText = document.getElementById("bannerText").checked;
    const characterName = document.getElementById("characterName").value;
    const logo = document.getElementById("logo").value;

    const dataToSave = {
      darkMode,
      fullWidth,
      background,
      banner,
      darkerBanner,
      coloredBanner,
      fontFamily,
      fontSize,
      bannerText,
      characterName,
      logo,
      savedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(
        `RG-template-${template}`,
        JSON.stringify(dataToSave)
      );

      const originalText = saveBtn.textContent;
      saveBtn.textContent = "✅ Sauvegardé !";
      saveBtn.style.background = "#28a745";

      setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.style.background = "linear-gradient(45deg, #28a745, #20c997)";
      }, 2000);

      console.log("✅ Données sauvegardées:", dataToSave);
    } catch (error) {
      console.error("❌ Erreur lors de la sauvegarde:", error);

      const originalText = saveBtn.textContent;
      saveBtn.textContent = "❌ Erreur !";
      saveBtn.style.background = "#dc3545";

      setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.style.background = "linear-gradient(45deg, #28a745, #20c997)";
      }, 2000);
    }
  };

  const handleLogo = (value) => {
    if (["jr", "jr-gray"].includes(value)) {
      return "https://i.servimg.com/u/f64/20/62/43/80/jolly_11.jpg";
    }

    return "https://image.noelshack.com/fichiers/2025/51/1/1765810066-tampon-jr.png";
  };

  const generateCode = () => {
    const isDarkMode = document.getElementById("mode").checked;
    const fullWidth =
      document.getElementById("fullWidth").checked || defaultValues.fullWidth;
    const template = document.getElementById("template").value;
    const background =
      document.getElementById("background").value || defaultValues.background;
    const banner =
      document.getElementById("banner").value || defaultValues.banner;
    const darkerBanner =
      document.getElementById("darkerBanner").checked ||
      defaultValues.darkerBanner;
    const coloredBanner =
      document.getElementById("coloredBanner").checked ||
      defaultValues.coloredBanner;
    const fontFamily =
      document.getElementById("fontFamily").value || defaultValues.fontFamily;
    const fontSize =
      document.getElementById("fontSize").value || defaultValues.fontSize;
    const position = document.getElementById("position").value;
    const bannerText = document.getElementById("bannerText").checked;
    const characterName =
      document.getElementById("characterName").value ||
      defaultValues.characterName;
    const title = document.getElementById("title").value || defaultValues.title;
    const timeType = document.getElementById("timeType").value;
    const year = document.getElementById("year").value || defaultValues.year;
    const place = document.getElementById("place").value || defaultValues.place;
    const participants =
      document.getElementById("participants").value ||
      defaultValues.participants;
    const content =
      document.getElementById("content").value || defaultValues.content;
    const participantsList = participants
      .split("\n")
      .filter((p) => p.trim())
      .map(
        (p) =>
          `<p style="text-align: center; color: white; background: black; border-radius: 4px; padding: 4px; font-size: 10px; margin-bottom: 2px;">${p.trim()}</p>`
      )
      .join("");
    const logo = document.getElementById("logo").value;

    if (template === "1") {
      return `<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
</style>
<div style="background: url('${background}'); background-size: cover; padding: 20px; border-radius: 8px; max-width: ${
        fullWidth === true ? "800px" : "720px"
      }; margin: 0 auto;"><div style="position: relative; display: flex; gap: 16px; height: 200px;"><img src="${banner}" style="width: 100%; max-width: 464px; object-fit: cover; object-position: ${position}; border-radius: 12px 12px 0 0;" /><img src="${handleLogo(
        logo
      )}" style="max-width: 240px; max-height: 200px; ${
        logo === "jr-gray" ? "filter: grayscale(100%);" : ""
      }" /><span style="font-size: 40px; font-style: italic; text-shadow: 1px 1px 2px black; position: absolute; bottom: -32px; left: 50%; transform: translateX(-50%); color: white; white-space: nowrap;">${characterName}</span></div>
<div style="margin-top: 24px; display: flex; gap: 16px;"><div style="min-width: 180px; display: flex; flex-direction: column;"><p style="text-align: center; font-size: 16px; color: white;">Informations</p><hr style="border: 1px solid white; margin: 0 0 12px;"/><div style="font-family: 'Raleway', sans-serif;"><p style="text-align: center; color: white; background: black; border-radius: 4px; padding: 4px; font-size: 10px; margin-bottom: 2px; text-transform: uppercase;">${timeType}</p><p style="text-align: center; color: white; background: black; border-radius: 4px; padding: 4px; font-size: 10px; margin-bottom: 24px;">${year}</p></div><p style="text-align: center; font-size: 16px; color: white;">Participants</p><hr style="border: 1px solid white; margin: 0 0 12px;"/><div style="font-family: 'Raleway', sans-serif;">${participantsList}</div></div><div style="font-family: 'Raleway', sans-serif; font-size: ${fontSize}px; text-align: justify; padding: 40px 32px; color: black; background: white; border-radius: 8px; max-height: 656px; overflow: scroll; width: 100%;">${content.replace(
        /\n/g,
        "<br/>"
      )}</div></div></div>
<p style="font-size: 12px; text-align: center;">Bourbon | バーボン</p>`;
    }

    return `<style>@import url('@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Serif+JP:wght@200..900&family=Petrona:ital,wght@0,100..900;1,100..900&display=swap');'); .petrona { font-family: 'Petrona', serif; font-optical-sizing: auto; font-style: normal; } .montserrat { font-family: 'Montserrat', sans-serif; font-optical-sizing: auto; font-style: normal; } .noto-serif-jp { font-family: 'Noto Serif JP', serif; font-optical-sizing: auto; font-style: normal; } ${
      isDarkMode
        ? `.dark .codebox { background-color: #222327 !important; border: 1px solid #33353a !important; padding: 12px !important; } .dark .spoiler_title { color: #fff !important; font-size: ${fontSize}px !important; } .dark .spoiler_content { background-color: #2a2c33 !important; color: #fff !important; font-size: ${
            Number(fontSize) - 1
          }px !important; font-weight: 500; } .dark speech { display: flex; gap: 8px; } .dark .speech { display: flex; gap: 8px; } .dark .speech img { object-fit: cover; object-position: center; min-width: 56px; max-width: 56px; height: 56px; border-radius: 50%; padding: 2px; } .dark .speech span { background-color: #2a2c33; border: 2px solid #33353a; font-weight: bold; padding: 8px 12px; width: 100%; }`
        : `.light .codebox { background-color: #f5f5f5 !important; border: 1px solid #e7e7ee !important; padding: 12px !important; } .light .spoiler_title { color: #000 !important; font-size: ${fontSize}px !important; } .light .spoiler_content { background-color: #eaeaeaff !important; color: #000 !important; font-weight: 500; font-size: ${
            Number(fontSize) - 1
          }px !important; } .light speech { display: flex; gap: 8px; } .light .speech { display: flex; gap: 8px; } .light .speech img { object-fit: cover; object-position: center; min-width: 56px; max-width: 56px; height: 56px; border-radius: 50%; padding: 2px; } .light .speech span { background-color: #fff; border: 2px solid #e7e7ee; font-weight: bold; padding: 8px 12px; width: 100%; }`
    }</style><!--

--><div class="montserrat" style="max-width: ${
      fullWidth === true ? "800px" : "580px"
    }; background: ${
      isDarkMode ? "oklch(0.2223 0.006 271.1393)" : "#f2f2f2"
    }; margin: 0 auto; color: ${
      isDarkMode ? "#fff" : "#000"
    }; position: relative;"><!--
--><div style="position: relative; display: flex; justify-content: center; align-items: center; height: 220px; background-position: ${position} !important; background-size: cover !important; background: ${
      darkerBanner === true
        ? "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), "
        : ""
    }url('${banner}'); filter: grayscale(${
      coloredBanner === true ? "0" : "90%"
    });"><div style="position: absolute; bottom: 0; background: linear-gradient(360deg,${
      isDarkMode ? "rgba(26, 27, 30, 1)" : "rgba(242, 242, 242, 1)"
    } 0%, rgba(242, 242, 242, 0) 100%); width: 100%; height: 72px;"></div><!--
-->${
      bannerText === true
        ? `<div style="padding: 8px; text-shadow: 1px 1px #000; color: #fff; display: flex; flex-direction: column; text-align: center;"><span style="font-size: 14px; text-transform: uppercase;">${characterName}</span><span class="petrona" style="font-size: 24px;">${title}</span><span style="font-size: 12px;">${timeType} - ${year}</span></div>`
        : ""
    }</div><!-- 

--><div style="margin: 32px 40px;"><!--
--><div style="margin: ${
      place !== "" ? "32px auto 16px" : "32px auto"
    }; width: max-content; display: flex; align-items: center; gap: 16px;"><hr style="height: 1px; width: 180px; border-top-color: ${
      isDarkMode ? "#fff" : "#000"
    } !important;" /><span>∞</span><hr style="height: 1px; width: 180px; border-top-color: ${
      isDarkMode ? "#fff" : "#000"
    } !important;" /></div>${
      place !== ""
        ? `<!--

--><p class="${fontFamily}" style="font-size: ${
            Number(fontSize) + 1
          }px; font-weight: 500; font-style: italic; text-align: center; color: ${
            isDarkMode ? "gray" : "#a0a0a0"
          };">${place}.</p><hr style="height: 1px; width: 100px; border-top-color: ${
            isDarkMode ? "#fff" : "#000"
          } !important; margin: 20px auto 32px;" />`
        : ""
    }<!--

--><div class="${fontFamily} ${
      isDarkMode ? "dark" : "light"
    }" style="font-size: ${fontSize}px; text-align: justify; margin: 0;">${content.replace(
      /\n/g,
      "<br/>"
    )}</div><!--

-->${
      participants !== ""
        ? `<p class="${fontFamily}" style="margin-top: 40px; font-size: ${
            fontSize - 1
          }px; font-style: italic; text-align: right; color: ${
            isDarkMode ? "gray" : "#a0a0a0"
          }; text-transform: lowercase;">feat. ${participants}.</p>`
        : ""
    }</div><!-- 

--><p class="montserrat" style="text-align: center; font-size: ${
      fontFamily === "montserrat" ? Number(fontSize) - 1 : Number(fontSize) - 2
    }px; font-weight: 400; padding-bottom: 40px; margin: 0;">Bourbon | バーボン</p>${
      logo !== "none"
        ? `<img src="${handleLogo(
            logo
          )}" alt="jolly roger" style="position: absolute; left: 16px; bottom: 16px; transform: rotate(-17deg); width: ${
            participants !== "" ? "64px" : "48px"
          }; border-radius: ${
            ["jr", "jr-gray"].includes(logo) ? "100%" : "0"
          }; ${logo === "jr-gray" ? "filter: grayscale(1);" : ""}" />`
        : ""
    }</div>`;
  };

  const updatePreview = () => {
    const code = generateCode();

    preview.innerHTML = code;
    generatedCode.value = code.replaceAll("<br/>", "\n");
  };

  const toggleFieldsByTemplate = () => {
    const fullWidthField = document
      .getElementById("fullWidth")
      .closest(".form-group");
    const template = document.getElementById("template").value;
    const backgroundField = document
      .getElementById("background")
      .closest(".form-group");
    const darkerBannerField = document
      .getElementById("darkerBanner")
      .closest(".form-group");
    const fontFamilyField = document
      .getElementById("fontFamily")
      .closest(".form-group");
    const titleField = document.getElementById("title").closest(".form-group");
    const participantsField = document.getElementById("participants");
    const placeField = document.getElementById("place").closest(".form-group");
    const logo = document.getElementById("logo");
    const coloredBannerField = document
      .getElementById("coloredBanner")
      .closest(".form-group");
    const bannerText = document
      .getElementById("bannerText")
      .closest(".form-group");

    if (template === "2") {
      fullWidthField.style.display = "block";
      backgroundField.style.display = "none";
      darkerBannerField.style.display = "block";
      fontFamilyField.style.display = "block";
      titleField.style.display = "block";
      participantsField.placeholder = "PJ 1, PJ 2 & PJ3";
      placeField.style.display = "block";
      logo.value = "tampon";
      coloredBannerField.style.display = "block";
      bannerText.style.display = "block";
    } else {
      fullWidthField.style.display = "none";
      backgroundField.style.display = "block";
      darkerBannerField.style.display = "none";
      fontFamilyField.style.display = "none";
      titleField.style.display = "none";
      participantsField.placeholder = "PJ 1\nPJ 2\nPJ 3";
      placeField.style.display = "none";
      logo.value = "jr";
      coloredBannerField.style.display = "none";
      bannerText.style.display = "none";
    }
  };

  const handleCharacterImage = (character) => {
    if (character === "tyr")
      return "https://i.pinimg.com/736x/12/c0/80/12c080b695d53b8f9bbf4da5e41c03d3.jpg";

    if (character === "sonya")
      return "https://i.pinimg.com/736x/37/48/46/374846ec6b5e91795344f2b8f386d98c.jpg";

    if (character === "jeshaaySerpent")
      return "https://media.discordapp.net/attachments/1159175765930295336/1404455438522777681/8ed06b5bc4191f8d8b748edf05fffcfd.png?ex=69474c4e&is=6945face&hm=4602b1cd2d1a9df3c4364b6efdd92459c8532366fe503ea8173d800baa4fb2f4&=&format=webp&quality=lossless&width=1312&height=1546";

    if (character === "jeshaayHybride")
      return "https://media.discordapp.net/attachments/1159175765930295336/1404455437797036042/7fefc0a41a064f95a6d251f4f8847727.png?ex=69474c4d&is=6945facd&hm=7b505fae0befd79e547fc427db9024d4cc9e7b42dfefa0da8183ec4f15103ae6&=&format=webp&quality=lossless&width=1252&height=1546";

    if (character === "lem")
      return "https://2img.net/u/3112/10/25/15/avatars/5462-79.jpg";

    if (character === "nicoeliza")
      return "https://sig.grumpybumpers.com/host/poetryisgood.gif";

    if (character === "velvet")
      return "https://sig.grumpybumpers.com/host/poetryisamazing.gif";

    if (character === "lorelei")
      return "https://2img.net/i.imgur.com/tUg6xD3.png";

    if (character === "civil")
      return "https://i.pinimg.com/736x/a3/50/1e/a3501ea173c42bd83d4123dccb5917d8.jpg";

    if (character === "pirate")
      return "https://static.wikia.nocookie.net/onepiece/images/1/1a/Membres_Pirates_du_Roux_11_Portrait.png/revision/latest/scale-to-width-down/120?cb=20231029205730&path-prefix=fr";

    if (character === "marine")
      return "https://i.pinimg.com/736x/77/7a/df/777adf0a1bf32967934d958be513bd7b.jpg";

    if (character === "cp")
      return "https://static.wikia.nocookie.net/onepiece/images/c/c3/Partenaire_de_Who%27s-Who_Cipher_Pol_1_Portrait.png/revision/latest/scale-to-width-down/120?cb=20231029210543&path-prefix=fr";

    if (character === "chasseur")
      return "https://static.wikia.nocookie.net/onepiece/images/5/5c/Daddy_Masterson_Anime_Infobox.png/revision/latest/smart/width/250/height/250?cb=20180311174550&path-prefix=fr";

    if (["atout", "revolutionnaire"].includes(character))
      return "https://static.wikia.nocookie.net/onepiece/images/9/98/Bunny_Joe_Anime_Infobox.png/revision/latest?cb=20130621023213&path-prefix=fr";

    return "https://i.pinimg.com/736x/b8/00/56/b8005680164e0bf4760f94fb9a3780dd.jpg";
  };

  const handleCharacterSpeech = (color, character, text) => {
    return `<div class="dark speech" style="display: flex; gap: 8px;"><img src="${handleCharacterImage(
      character
    )}" alt="${character}" style="border: 2px solid ${color};" /><span style="color: ${color};">${text}</span></div>`;
  };

  form.addEventListener("input", updatePreview);
  form.addEventListener("change", updatePreview);

  contentTextarea.addEventListener("select", function () {
    selectedText = this.value.substring(this.selectionStart, this.selectionEnd);
    selectionStart = this.selectionStart;
    selectionEnd = this.selectionEnd;
  });

  contentTextarea.addEventListener("mouseup", function () {
    if (this.selectionStart !== this.selectionEnd) {
      selectedText = this.value.substring(
        this.selectionStart,
        this.selectionEnd
      );
      selectionStart = this.selectionStart;
      selectionEnd = this.selectionEnd;
    }
  });

  characterColor.addEventListener("change", function () {
    const color = this.value;

    if (!color || !selectedText) {
      updatePreview();
      return;
    }

    const destructuredColor = color.split("-");
    console.log(destructuredColor);

    const htmlCode =
      destructuredColor.length > 1
        ? handleCharacterSpeech(
            destructuredColor[0],
            destructuredColor[1],
            selectedText
          )
        : `<span style="color: ${color}; font-weight: bold;">${selectedText}</span>`;

    const beforeText = contentTextarea.value.substring(0, selectionStart);
    const afterText = contentTextarea.value.substring(selectionEnd);

    contentTextarea.value = beforeText + htmlCode + afterText;

    selectedText = "";
    this.value = "";

    updatePreview();
  });

  document.getElementById("template").addEventListener("change", () => {
    toggleFieldsByTemplate();
    loadSavedData();
    updatePreview();
  });

  document.getElementById("bannerText").addEventListener("change", () => {
    const value = !document.getElementById("bannerText").checked;

    document
      .getElementById("characterName")
      .closest(".form-group").style.display = value ? "none" : "block";
    document.getElementById("title").closest(".form-group").style.display =
      value ? "none" : "block";
    document.getElementById("timeType").closest(".form-group").style.display =
      value ? "none" : "block";
    document.getElementById("year").closest(".form-group").style.display = value
      ? "none"
      : "block";
  });

  document.querySelectorAll(".collapse > p").forEach((collapseTitle) => {
    collapseTitle.addEventListener("click", function () {
      const collapseDiv = this.parentElement;

      collapseDiv.classList.toggle("collapsed");
      collapseDiv.classList.toggle("expanded");
    });
  });

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

  saveBtn.addEventListener("click", saveData);

  loadSavedData();
  toggleFieldsByTemplate();
  updatePreview();
});
