//appned search.html to body
fetch(chrome.runtime.getURL("/search.html"))
  .then((r) => r.text())
  .then((html) => {
    const div = document.createElement("section");
    const parser = new DOMParser();
    div.appendChild(parser.parseFromString(html, "text/html").body.firstChild);
    div.classList.add("search__container");
    document.body.appendChild(div);

    const pageURL = document.location.href;
    const newUrl = new URL(pageURL);
    const params = new URLSearchParams(newUrl.search);
    const query = params.get("q") || params.get("p") || params.get("query");

    // getting all links id
    const duckduckgoSearch = document.getElementById("duckduckgo__search");
    const bingSearch = document.getElementById("bing__search");
    const googleSearch = document.getElementById("google__search");
    const braveSearch = document.getElementById("brave__search");
    const yahooSearch = document.getElementById("yahoo__search");

    //fetching images from local files of extension
    fetch(chrome.runtime.getURL("/images/google.png")).then((res) => {
      googleSearch.querySelector("img").src = res.url;
    });
    fetch(chrome.runtime.getURL("/images/bing.png")).then((res) => {
      bingSearch.querySelector("img").src = res.url;
    });
    fetch(chrome.runtime.getURL("/images/duckduckgo.png")).then((res) => {
      duckduckgoSearch.querySelector("img").src = res.url;
    });
    fetch(chrome.runtime.getURL("/images/brave.png")).then((res) => {
      braveSearch.querySelector("img").src = res.url;
    });
    fetch(chrome.runtime.getURL("/images/yahoo.png")).then((res) => {
      yahooSearch.querySelector("img").src = res.url;
    });

    const newUrlDuckduckgo =
      "https://www.duckduckgo.com/?q=" + encodeURIComponent(query);
    const newUrlBing =
      "https://www.bing.com/search?q=" + encodeURIComponent(query);
    const newUrlGoogle =
      "https://www.google.com/search?q=" + encodeURIComponent(query);
    const newUrlBrave =
      "https://search.brave.com/search?q=" + encodeURIComponent(query);

    const newUrlYahoo =
      "https://search.yahoo.com/search?p=" + encodeURIComponent(query);

    if (query) {
      duckduckgoSearch.href = newUrlDuckduckgo;
      bingSearch.href = newUrlBing;
      googleSearch.href = newUrlGoogle;
      braveSearch.href = newUrlBrave;
      yahooSearch.href = newUrlYahoo;
    }

    console.log(document.location.href);
  });
