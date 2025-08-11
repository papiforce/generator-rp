document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("rpForm");
  const preview = document.getElementById("preview");
  const generatedCode = document.getElementById("generatedCode");
  const copyBtn = document.getElementById("copyCode");
  const saveBtn = document.getElementById("saveData");

  const defaultValues = {
    background:
      "https://i.pinimg.com/736x/04/e9/8b/04e98bc8bfb8a89092cec3795660672d.jpg",
    banner: "https://images2.alphacoders.com/858/858902.jpg",
    characterName: "Nom du Personnage",
    timeType: "PRÉSENT",
    year: "1630",
    participants: "PJ 1\nPJ 2",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  };

  function loadSavedData() {
    const savedData = localStorage.getItem("rpGeneratorData");

    if (savedData) {
      try {
        const data = JSON.parse(savedData);

        if (data.background)
          document.getElementById("background").value = data.background;
        if (data.banner) document.getElementById("banner").value = data.banner;
        if (data.characterName)
          document.getElementById("characterName").value = data.characterName;

        console.log("✅ Données chargées depuis le localStorage");
      } catch (error) {
        console.error("❌ Erreur lors du chargement des données:", error);
        localStorage.removeItem("rpGeneratorData");
      }
    }
  }

  function saveData() {
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
      localStorage.setItem("rpGeneratorData", JSON.stringify(dataToSave));

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
    const background =
      document.getElementById("background").value || defaultValues.background;
    const banner =
      document.getElementById("banner").value || defaultValues.banner;
    const characterName =
      document.getElementById("characterName").value ||
      defaultValues.characterName;
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

    const template = `<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
</style>
<div style="background: url('${background}'); background-size: cover; padding: 20px; border-radius: 8px; max-width: 720px; margin: 0 auto;"><div style="position: relative; display: flex; gap: 16px; height: 200px;"><img src="${banner}" style="width: 100%; max-width: 464px; object-fit: cover; object-position: center; border-radius: 12px 12px 0 0;" /><img src="https://i.servimg.com/u/f64/20/62/43/80/jolly_11.jpg" style="max-width: 240px; max-height: 200px;" /><span style="font-size: 40px; font-style: italic; text-shadow: 1px 1px 2px black; position: absolute; bottom: -32px; left: 50%; transform: translateX(-50%); color: white; white-space: nowrap;">${characterName}</span></div><div style="margin-top: 24px; display: flex; gap: 16px;"><div style="min-width: 180px; display: flex; flex-direction: column;"><p style="text-align: center; font-size: 16px; color: white;">Informations</p><hr style="border: 1px solid white; margin: 0 0 12px;"/><div style="font-family: 'Raleway', sans-serif;"><p style="text-align: center; color: white; background: black; border-radius: 4px; padding: 4px; font-size: 10px; margin-bottom: 2px;">${timeType}</p><p style="text-align: center; color: white; background: black; border-radius: 4px; padding: 4px; font-size: 10px; margin-bottom: 24px;">${year}</p></div><p style="text-align: center; font-size: 16px; color: white;">Participants</p><hr style="border: 1px solid white; margin: 0 0 12px;"/><div style="font-family: 'Raleway', sans-serif;">${participantsList}</div></div><div style="font-family: 'Raleway', sans-serif; font-size: 12px; text-align: justify; padding: 40px 32px; color: black; background: white; border-radius: 8px; max-height: 656px; overflow: scroll; width: 100%;">${content.replace(
      /\n/g,
      "<br/>"
    )}</div></div></div>
<p style="font-size: 12px; text-align: center;">Bourbon | バーボン</p>`;

    return template;
  }

  function updatePreview() {
    const code = generateCode();
    preview.innerHTML = code;
    generatedCode.value = code.replaceAll("<br/>", "\n");
  }

  form.addEventListener("input", updatePreview);
  form.addEventListener("change", updatePreview);

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
  updatePreview();
});
