let tabHistory = [];

chrome.tabs.onActivated.addListener((activeInfo) => {
  const tabId = activeInfo.tabId;

  tabHistory = tabHistory.filter(id => id !== tabId);
  tabHistory.unshift(tabId);

  if (tabHistory.length > 50) {
    tabHistory.pop();
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  tabHistory = tabHistory.filter(id => id !== tabId);
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "cycle-mru-tab") {
    const currentTabId = tabHistory[0];
    const lastUsedTabId = tabHistory[1];

    if (lastUsedTabId !== undefined) {
      chrome.tabs.update(lastUsedTabId, { active: true });

      tabHistory = tabHistory.filter(id => id !== lastUsedTabId);
      tabHistory.unshift(lastUsedTabId);
    }
  }
});