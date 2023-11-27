let gptCorrector = browser.runtime.connect({
  name: "{ee191ec1-3407-451c-95db-2196479bd035}",
});

browser.storage.sync
  .get(["configKey","selectedModel"])
  .then((result) => {
    if (result.configKey) {
      gptCorrector.postMessage({
        event: "set_api_key",
        configKey: result.configKey,
        selectedModel: result.selectedModel
      });
    }
  })
  .catch((error) => {
    console.error("Error retrieving config key:", error);
  });

gptCorrector.onMessage.addListener(({ event, content }) => {
  if (event === "replace_text") {
    replaceSelectedTextWithAPIResponse(content);
  }
});

function replaceSelectedTextWithAPIResponse(responseText) {
  const activeElement = document.activeElement;
  if (
    activeElement.tagName === "INPUT" ||
    activeElement.tagName === "TEXTAREA"
  ) {
    const selectionStart = activeElement.selectionStart;
    const selectionEnd = activeElement.selectionEnd;
    const currentValue = activeElement.value;
    const newText =
      currentValue.substring(0, selectionStart) +
      responseText +
      currentValue.substring(selectionEnd);
    activeElement.value = newText;
  }
}
