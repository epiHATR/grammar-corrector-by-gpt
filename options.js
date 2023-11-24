document.addEventListener("DOMContentLoaded", function () {
  const saveConfigBtn = document.getElementById("saveConfigBtn");
  const configKeyInput = document.getElementById("configKeyInput");

  saveConfigBtn.addEventListener("click", function () {
    const configKey = configKeyInput.value.trim();
    if (configKey !== "") {
      browser.storage.local
        .set({ configKey: configKey })
        .then(() => {
          alert("Configuration key saved successfully!");
        })
        .catch((error) => {
          console.error("Error saving config key:", error);
          alert("Error saving configuration key! Please try again.");
        });
    } else {
      alert("Please enter a valid configuration key!");
    }
  });

  // Retrieve and pre-fill saved config key
  browser.storage.local
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
