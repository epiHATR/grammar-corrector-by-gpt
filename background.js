let _contentScript;
let _configKey;
let _selectedModel;

browser.runtime.onConnect.addListener((contentScript) => {
  _contentScript = contentScript;
  _contentScript.onMessage.addListener((m) => {
    if (m.event === "set_api_key") {
      _configKey = m.configKey;
      _selectedModel = m.selectedModel
    }
  });
});

browser.contextMenus.create({
  id: "gpt-correct-grammar",
  title: "chatGPT - Correct grammar",
  contexts: ["selection"],
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "gpt-correct-grammar") {
    const resText = await contextMenuAction(info.selectionText, _configKey, _selectedModel);
    console.log(resText);
    _contentScript.postMessage({ event: "replace_text", content: resText });
  }
});
