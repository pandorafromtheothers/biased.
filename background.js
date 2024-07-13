chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: async () => {
            return await moshimoshi().then((result) => {
                return result;
            });
        }
    }).then((response) => {
        let _result = response[0].result;
        if (_result == null)
            return;
        chrome.tabs.create({ url: chrome.runtime.getURL("index.html") }, (newTab) =>
            chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
                if (tabId === newTab.id && info.status === 'complete') {
                    chrome.tabs.onUpdated.removeListener(listener);
                    chrome.tabs.sendMessage(newTab.id, { message: _result });
                }
            }))
    })
})