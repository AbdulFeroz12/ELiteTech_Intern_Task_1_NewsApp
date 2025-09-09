async function getNews() {
  const query = document.getElementById("search").value || "latest";
const lang = document.getElementById("language").value || "en"; 
const url = `http://localhost:5000/news?q=${query}&lang=${lang}`;

  


  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch news");
    const data = await response.json();

    const newsContainer = document.getElementById("news");
    newsContainer.innerHTML = "";

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No news found.</p>";
      return;
    }

    /*data.articles.forEach(article => {
      const div = document.createElement("div");
      div.classList.add("article");

      div.innerHTML = `
        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
        <p>${article.description || "No description available."}</p>
      `;

      newsContainer.appendChild(div);
    });*/
    data.articles.forEach(article => {
  const div = document.createElement("div");
  div.classList.add("article");

  // Format publish date
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  });

  div.innerHTML = `
    <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
    <p>${article.description || "No description available."}</p>
    <div class="meta">
      <span>📰 ${article.source.name || "Unknown Source"}</span>
      <span>📅 ${date}</span>
    </div>
  `;

  newsContainer.appendChild(div);
});

  } catch (error) {
    document.getElementById("news").innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
