browser.runtime.onMessage.addListener(({ trigger, content }) => {
  if (trigger === "replace_text") {
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
