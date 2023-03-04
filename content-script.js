//appned search.html to body
fetch(browser.runtime.getURL("/search.html"))
  .then((r) => r.text())
  .then((html) => {
    const div = document.createElement("section");
    div.innerHTML = html;
    div.classList.add("search__container");
    document.body.appendChild(div);

    browser.runtime.onMessage.addListener(function (
      message,
      sender,
      sendResponse
    ) {
      // console.log(message.message);

      const pageURL = message.message;
      const url = new URL(pageURL);
      const params = new URLSearchParams(url.search);
      const query = params.get("q");

      // getting all links id
      const duckduckgoSearch = document.getElementById("duckduckgo__search");
      const bingSearch = document.getElementById("bing__search");
      const googleSearch = document.getElementById("google__search");
      const braveSearch = document.getElementById("brave__search");
      const chatgptSearch = document.getElementById("chatgpt__search");

      const newUrlDuckduckgo =
        "https://www.duckduckgo.com/?q=" + encodeURIComponent(query);
      const newUrlBing =
        "https://www.bing.com/search?q=" + encodeURIComponent(query);
      const newUrlGoogle =
        "https://www.google.com/search?q=" + encodeURIComponent(query);
      const newUrlBrave =
        "https://search.brave.com/search?q=" + encodeURIComponent(query);

      if (query) {
        duckduckgoSearch.href = newUrlDuckduckgo;
        bingSearch.href = newUrlBing;
        googleSearch.href = newUrlGoogle;
        braveSearch.href = newUrlBrave;

        chatgptSearch.onclick = function cpoyTxt() {
          navigator.clipboard
            .writeText(query)
            .then(() => {
              console.log("Text copied to clipboard");
            })
            .catch((error) => {
              alert("Failed to copy text: ", error);
            });
        };
        chatgptSearch.href = "https://chat.openai.com/";
      }
      // console.log(bingSearch); // "search query"
    });
  });
