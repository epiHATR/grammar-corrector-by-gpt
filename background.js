// create context menu
browser.contextMenus.create({
  id: "gpt-correct-grammar",
  title: "chatGPT - Correct grammar",
  contexts: ["selection"],
});

let configKey = "";

// Load configKey when options/configuration page is loaded
browser.storage.local
  .get("configKey")
  .then((result) => {
    configKey = result.configKey || "default_key";
  })
  .catch((error) => {
    console.error("Error retrieving configKey:", error);
  });

// add action listener
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "gpt-correct-grammar") {
    if (!configKey || configKey === "default_key") {
      alert("OpenAI API key not found!");
      return;
    }
    contextMenuAction(info, tab, configKey);
  }
});

async function contextMenuAction(info, tab, configKey) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + configKey,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "assistant",
            content:
              "You are English grammar corrector. Please correct grammar in user sentences",
          },
          {
            role: "user",
            content: info.selectionText,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    const resText = data.choices[0].message.content;
    browser.tabs.sendMessage(tab.id, {
      trigger: "replace_text",
      content: resText,
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
