let contentScript;
let configKey = "";

browser.runtime.onConnect.addListener(connected);

// create context menu
browser.contextMenus.create({
  id: "gpt-correct-grammar",
  title: "chatGPT - Correct grammar",
  contexts: ["selection"],
});

// add action listener
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "gpt-correct-grammar") {
    contextMenuAction(info, tab, configKey);
  }
});

function connected(p) {
  contentScript = p;

  contentScript.onMessage.addListener((m) => {
    if (m.event === "set_api_key") {
      configKey = m.configKey;
    }
  });
}

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
    contentScript.postMessage({ event: "replace_text", content: resText });
  } catch (error) {
    console.error("Error:", error);
  }
}
