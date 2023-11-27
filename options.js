document.addEventListener("DOMContentLoaded", function () {
  const saveConfigBtn = document.getElementById("saveConfigBtn");
  const configKeyInput = document.getElementById("configKeyInput");
  const modelSelect = document.getElementById("modelSelect");

  saveConfigBtn.addEventListener("click", function () {
    const configKey = configKeyInput.value.trim();
    const selectedModel = modelSelect.value;

    if (configKey !== "") {
      browser.storage.sync.set({
        configKey: configKey,
        selectedModel: selectedModel,
      });
      alert("Configurations was saved successfully");
    } else {
      alert("Please enter a valid configuration key!");
    }
  });

  browser.storage.sync
    .get(["configKey","selectedModel"])
    .then((result) => {
      if (result.configKey) {
        configKeyInput.value = result.configKey;
      }
      if (result.selectedModel) {
        modelSelect.value = result.selectedModel;
      }
    })
    .catch((error) => {
      console.error("Error retrieving config key:", error);
    });
});
