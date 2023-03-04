browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    // console.log("Tab updated or reloaded:", tab.url);
    // Do something here, such as sending a message to background.js or content-script.js
    // In background.js

    //sending message on certain tabs to content-svripts

    if (
      tab.url.indexOf("google.com") > -1 ||
      tab.url.indexOf("bing.com") > -1 ||
      tab.url.indexOf("duckduckgo.com") > -1 ||
      tab.url.indexOf("search.brave.com") > -1 ||
      tab.url.indexOf("chat.openai.com") > -1
    ) {
      browser.tabs
        .sendMessage(tab.id, { message: tab.url })
        .then()
        .catch((err) => {
          console.log(err);
        });
    }
  }
});
