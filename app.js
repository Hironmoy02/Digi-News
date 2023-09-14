const API_KEY = "pub_293818e0e5dafd36fb8772fa6bc034b97adb9";
const url = "https://newsdata.io/api/1/news";
window.addEventListener("load", () => fetchNews("bbc"));
function reload() {
  window.location.reload();
}

async function fetchNews(query) {

  const res = await fetch(`${url}?apiKey=${API_KEY}&q=${query}&language=en`);
  const data = await res.json();
  console.log("jockey",data);

  bindData(data.results);
}
function bindData(articles) {

  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");
  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.image_url) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}
function fillDataInCard(cardClone, article) {

  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.image_url;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-us", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source_id} · ${date}`;
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.link, "_blank");
  });
}
let curtSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curtSelectedNav?.classList.remove("active");
  curtSelectedNav = navItem;
  curtSelectedNav?.classList.add("active");
}
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curtSelectedNav?.classList.remove("active");
  curtSelectedNav = null;
});
