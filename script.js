document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("rpForm");
  const preview = document.getElementById("preview");
  const generatedCode = document.getElementById("generatedCode");
  const copyBtn = document.getElementById("copyCode");
  const saveBtn = document.getElementById("saveData");

  const defaultValues = {
    template: "1",
    background:
      "https://i.pinimg.com/736x/83/20/90/8320900ef7e875b34884a72134d76324.jpg",
    banner: "https://4kwallpapers.com/images/walls/thumbs_2t/15328.jpeg",
    characterName: "Nom du Personnage",
    title: "Titre ici",
    timeType: "PRÉSENT",
    year: "1630",
    participants: "",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id nisl eu lectus iaculis suscipit. Vivamus et ullamcorper augue, non volutpat sem. Aenean at posuere odio, ut tempus sapien. Aenean interdum dictum congue. In hac habitasse platea dictumst. Praesent sit amet velit augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas orci lectus, molestie quis finibus in, ultrices eu velit. Aliquam luctus dui tortor, et sollicitudin dolor aliquam a. Vivamus imperdiet, felis venenatis sodales porttitor, urna sem accumsan augue, non tincidunt tortor sapien id nulla. Aliquam erat volutpat.

    Suspendisse vestibulum mi vel posuere lobortis. Nunc vitae turpis in libero consectetur pulvinar. Morbi arcu velit, posuere pellentesque neque eu, aliquam iaculis libero. Aenean nec faucibus diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas aliquam vehicula risus eget efficitur. Vestibulum vehicula lacus quis semper imperdiet. Curabitur urna tortor, sagittis eget diam vitae, finibus placerat dui. Maecenas ac enim ut nunc porta maximus non a neque. Integer ac nibh sem. Integer eu dapibus ante. Proin ullamcorper est est, nec rhoncus odio placerat a. Cras ut augue maximus, facilisis turpis sit amet, condimentum eros. Integer malesuada nec ipsum non ultrices. Curabitur quis nisi at enim ornare pretium. Phasellus sed augue nunc..`,
  };

  function loadSavedData() {
    const template = document.getElementById("template").value;
    const savedData = localStorage.getItem(`RG-template-${template}`);

    if (savedData) {
      try {
        const data = JSON.parse(savedData);

        if (data.background)
          document.getElementById("background").value = data.background;
        if (data.banner) document.getElementById("banner").value = data.banner;
        if (data.characterName)
          document.getElementById("characterName").value = data.characterName;

        console.log(`✅ Données chargées pour le template ${template}`);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des données:", error);
        localStorage.removeItem("rpGeneratorData");
      }
    } else {
      document.getElementById("background").value = "";
      document.getElementById("banner").value = "";
      document.getElementById("characterName").value = "";

      console.log(`ℹ️ Aucune donnée sauvegardée pour le template ${template}`);
    }
  }

  function saveData() {
    const template = document.getElementById("template").value;
    const background = document.getElementById("background").value;
    const banner = document.getElementById("banner").value;
    const characterName = document.getElementById("characterName").value;

    const dataToSave = {
      background: background,
      banner: banner,
      characterName: characterName,
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
  }

  function generateCode() {
    const template = document.getElementById("template").value;
    const background =
      document.getElementById("background").value || defaultValues.background;
    const banner =
      document.getElementById("banner").value || defaultValues.banner;
    const characterName =
      document.getElementById("characterName").value ||
      defaultValues.characterName;
    const title = document.getElementById("title").value || defaultValues.title;
    const timeType = document.getElementById("timeType").value;
    const year = document.getElementById("year").value || defaultValues.year;
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

    if (template === "1") {
      return `<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
</style>
<div style="background: url('${background}'); background-size: cover; padding: 20px; border-radius: 8px; max-width: 720px; margin: 0 auto;"><div style="position: relative; display: flex; gap: 16px; height: 200px;"><img src="${banner}" style="width: 100%; max-width: 464px; object-fit: cover; object-position: center; border-radius: 12px 12px 0 0;" /><img src="https://i.servimg.com/u/f64/20/62/43/80/jolly_11.jpg" style="max-width: 240px; max-height: 200px;" /><span style="font-size: 40px; font-style: italic; text-shadow: 1px 1px 2px black; position: absolute; bottom: -32px; left: 50%; transform: translateX(-50%); color: white; white-space: nowrap;">${characterName}</span></div>
<div style="margin-top: 24px; display: flex; gap: 16px;"><div style="min-width: 180px; display: flex; flex-direction: column;"><p style="text-align: center; font-size: 16px; color: white;">Informations</p><hr style="border: 1px solid white; margin: 0 0 12px;"/><div style="font-family: 'Raleway', sans-serif;"><p style="text-align: center; color: white; background: black; border-radius: 4px; padding: 4px; font-size: 10px; margin-bottom: 2px; text-transform: uppercase;">${timeType}</p><p style="text-align: center; color: white; background: black; border-radius: 4px; padding: 4px; font-size: 10px; margin-bottom: 24px;">${year}</p></div><p style="text-align: center; font-size: 16px; color: white;">Participants</p><hr style="border: 1px solid white; margin: 0 0 12px;"/><div style="font-family: 'Raleway', sans-serif;">${participantsList}</div></div><div style="font-family: 'Raleway', sans-serif; font-size: 12px; text-align: justify; padding: 40px 32px; color: black; background: white; border-radius: 8px; max-height: 656px; overflow: scroll; width: 100%;">${content.replace(
        /\n/g,
        "<br/>"
      )}</div></div></div>
<p style="font-size: 12px; text-align: center;">Bourbon | バーボン</p>`;
    }

    return `<style>@import url(https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Petrona:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600;1,700&display=swap); .petrona { font-family: 'Petrona', serif; font-optical-sizing: auto; font-style: normal; } .codebox { background-color: #a0a0a0 !important; padding: 12px !important; } .spoiler_title { color: #fff !important; font-size: 11px !important; } .spoiler_content { background-color: #b3b3b3 !important; color: #fff !important; font-weight: 500 !important; }</style><!--

--><div style="font-family: 'Montserrat', sans-serif; font-optical-sizing: auto; font-style: normal; max-width: 580px; background: #f2f2f2; margin: 0 auto; color: #000; position: relative;"><!--
--><div style="position: relative; display: flex; justify-content: center; align-items: center; height: 220px; background-position: center; background-size: cover !important; background: url('${banner}'); filter: grayscale(90%);"><div style="position: absolute; bottom: 0; background: linear-gradient(360deg,rgba(242, 242, 242, 1) 0%, rgba(242, 242, 242, 0) 100%); width: 100%; height: 72px;"></div><!--
--><div style="padding: 8px; text-shadow: 1px 1px #000; color: #fff; display: flex; flex-direction: column; text-align: center;"><span style="font-size: 14px; text-transform: uppercase;">${characterName}</span><span class="petrona" style="font-size: 24px;">${title}</span><span style="font-size: 12px;">${timeType} - ${year}</span></div></div><!-- 

--><div style="margin: 32px 40px;"><!--
--><div style="margin: 32px auto; width: max-content; display: flex; align-items: center; gap: 16px;"><hr style="height: 1px; width: 180px; border-top-color: #000 !important;" /><span>∞</span><hr style="height: 1px; width: 180px; border-top-color: #000 !important;" /></div><!--

--><div style="font-size: 11px; text-align: justify; margin: 0;">${content.replace(
      /\n/g,
      "<br/>"
    )}</div><!--

-->${
      participants !== ""
        ? `<p style="margin-top: 40px; font-size: 10px; font-style: italic; text-align: right; color: #a0a0a0; text-transform: lowercase;">feat. ${participants}.</p>`
        : ""
    }</div><!-- 

--><p style="text-align: center; font-size: 10px; font-weight: 400; padding-bottom: 40px; margin: 0;">Bourbon | バーボン</p><img src="https://media.discordapp.net/attachments/1412742328602460302/1449099047666192459/JR-ponmaisjekomprispourdevre.png?ex=693daa27&is=693c58a7&hm=12638f0854f660bb2390d297537cbce5ad4dc5c1f0de170ad3e636e060c58e5b&=&format=webp&quality=lossless&width=320&height=320" alt="jolly roger" style="position: absolute; width: ${
      participants !== "" ? "64px" : "48px"
    }; left: 16px; bottom: 16px; transform: rotate(-17deg);" /></div>`;
  }

  function updatePreview() {
    const code = generateCode();
    preview.innerHTML = code;
    generatedCode.value = code.replaceAll("<br/>", "\n");
  }

  function toggleFieldsByTemplate() {
    const template = document.getElementById("template").value;
    const backgroundField = document
      .getElementById("background")
      .closest(".form-group");
    const titleField = document.getElementById("title").closest(".form-group");
    const participantsField = document.getElementById("participants");

    if (template === "2") {
      backgroundField.style.display = "none";
      titleField.style.display = "block";
      participantsField.placeholder = "PJ 1, PJ 2 & PJ3";
    } else {
      backgroundField.style.display = "block";
      titleField.style.display = "none";
      participantsField.placeholder = "PJ 1\nPJ 2\nPJ 3";
    }
  }

  form.addEventListener("input", updatePreview);
  form.addEventListener("change", updatePreview);

  document.getElementById("template").addEventListener("change", function () {
    toggleFieldsByTemplate();
    loadSavedData();
    updatePreview();
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
