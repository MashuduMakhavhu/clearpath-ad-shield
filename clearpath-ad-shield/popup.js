const toggle = document.getElementById("toggle");
const statusTitle = document.getElementById("statusTitle");
const statusDescription = document.getElementById("statusDescription");
const statusDot = document.getElementById("statusDot");
const message = document.getElementById("message");
const ruleCount = document.getElementById("ruleCount");

function renderStatus(enabled) {
  toggle.checked = enabled;
  statusTitle.textContent = enabled ? "Protection is on" : "Protection is paused";
  statusDescription.textContent = enabled
    ? "Known ad and tracker domains are being filtered."
    : "Requests are no longer being filtered.";
  statusDot.className = `dot ${enabled ? "on" : "off"}`;
}

chrome.runtime.sendMessage({ type: "GET_STATUS" }, response => {
  if (chrome.runtime.lastError || !response) {
    statusTitle.textContent = "Unable to load status";
    statusDescription.textContent = "Try reloading the extension.";
    message.textContent = "Could not read extension status.";
    return;
  }
  renderStatus(Boolean(response.enabled && response.rulesetEnabled));
  ruleCount.textContent = response.ruleCount ?? "30";
});

toggle.addEventListener("change", () => {
  toggle.disabled = true;
  message.textContent = "";
  chrome.runtime.sendMessage(
    { type: "SET_STATUS", enabled: toggle.checked },
    response => {
      toggle.disabled = false;
      if (chrome.runtime.lastError || !response?.ok) {
        message.textContent = "Could not update protection. Try reloading the extension.";
        toggle.checked = !toggle.checked;
        return;
      }
      renderStatus(response.enabled);
    }
  );
});