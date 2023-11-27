async function contextMenuAction(textToCheck, configKey, selectedModel) {
  let resText = "";

  console.log("calling to OpenAI api");
  const url = "https://api.openai.com/v1/chat/completions";
  const method = "POST";
  const headers = {
    Authorization: "Bearer " + configKey,
  };

  const payload = {
    model: selectedModel,
    messages: [
      {
        role: "assistant",
        content:
          "You are an English grammar corrector. Please correct the grammar in the user's sentences. Do not add more words to these sentences if possible, just correct their grammar.",
      },
      {
        role: "user",
        content: textToCheck,
      },
    ],
  };

  try {
    const data = await makeAPIRequest(url, method, headers, payload);
    resText = data.choices[0].message.content;
  } catch (error) {
    console.error("API Request failed:", error.message);
  }
  return resText;
}
