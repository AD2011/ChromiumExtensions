chrome.runtime.onInstalled.addListener(() => {
  // Context menu for current tab
  chrome.contextMenus.create({
    id: "openHashHackersProxy",
    title: "Open Page via Hash Hackers Proxy",
    contexts: ["page"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openHashHackersProxy") {
    const currentUrl = tab.url;
    const proxyUrl = `https://proxy.hashhackers.com/-----${currentUrl}`;
    
    chrome.tabs.update(tab.id, { url: proxyUrl });
  }
});