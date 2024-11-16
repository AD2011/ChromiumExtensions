chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openTeraBoxIncognito",
    title: "Open in TeraBox (Incognito)",
    contexts: ["link"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openTeraBoxIncognito") {
    const targetUrl = info.linkUrl;
    const proxyUrl = `https://www.terabox.tech/play.html?url=${encodeURIComponent(targetUrl)}`;
    
    chrome.windows.create({
      url: proxyUrl,
      incognito: true
    });
  }
});