document.addEventListener("DOMContentLoaded", function () {
  const saveConfigBtn = document.getElementById("saveConfigBtn");
  const configKeyInput = document.getElementById("configKeyInput");

  saveConfigBtn.addEventListener("click", function () {
    const configKey = configKeyInput.value.trim();
    if (configKey !== "") {
      browser.storage.sync.set({
        configKey: configKey,
      });
      alert("OpenAI API key was saved successfully");
    } else {
      alert("Please enter a valid configuration key!");
    }
  });

  browser.storage.sync
    .get("configKey")
    .then((result) => {
      if (result.configKey) {
        configKeyInput.value = result.configKey;
      }
    })
    .catch((error) => {
      console.error("Error retrieving config key:", error);
    });
});
