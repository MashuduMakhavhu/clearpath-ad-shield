const RULESET_ID = "ad_and_tracker_rules";

chrome.runtime.onInstalled.addListener(async () => {
  const stored = await chrome.storage.local.get({ protectionEnabled: true });
  await setProtection(stored.protectionEnabled);
});

async function setProtection(enabled) {
  await chrome.declarativeNetRequest.updateEnabledRulesets({
    enableRulesetIds: enabled ? [RULESET_ID] : [],
    disableRulesetIds: enabled ? [] : [RULESET_ID]
  });
  await chrome.storage.local.set({ protectionEnabled: enabled });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "GET_STATUS") {
    Promise.all([
      chrome.storage.local.get({ protectionEnabled: true }),
      chrome.declarativeNetRequest.getEnabledRulesets()
    ]).then(([stored, enabledRulesets]) => {
      sendResponse({
        enabled: stored.protectionEnabled,
        rulesetEnabled: enabledRulesets.includes(RULESET_ID),
        ruleCount: 30
      });
    }).catch(() => sendResponse({ enabled: false, rulesetEnabled: false, ruleCount: 30 }));
    return true;
  }

  if (message?.type === "SET_STATUS" && typeof message.enabled === "boolean") {
    setProtection(message.enabled)
      .then(() => sendResponse({ ok: true, enabled: message.enabled }))
      .catch(error => sendResponse({ ok: false, error: error.message }));
    return true;
  }
});