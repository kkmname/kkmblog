document.addEventListener('DOMContentLoaded', function () {
  const tokens = window.location.pathname.split("/");
  const subjectId = tokens[tokens.length - 1];

  fetchArticleFromAPI(subjectId)
    .then((articleResponseList) => {
      renderArticle(articleResponseList);
    })
    .catch((error) => {
      console.error("Error fetching article data:", error);
    });

  fetchSubjectFromAPI(subjectId)
    .then((subject) => {
      renderSubject(subject);
    })
    .catch((error) => {
      console.error("Error fetching subject data:", error);
    });
});

function fetchArticleFromAPI(subjectId) {
  const url = `/api/open/subject/${subjectId}/articles`;

  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Menu data fetch failed:", error);
    });
}

function fetchSubjectFromAPI(subjectId) {
  return fetch("/api/open/subject/" + subjectId)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Failed to fetch subject:", error);
      throw error;
    });
}

function renderArticle(articleResponseList) {
  const articleListContainer = document.getElementById("articleList");
  articleListContainer.innerHTML = "";

  articleResponseList.forEach((article) => {
    const articleDiv = document.createElement("div");
    articleDiv.classList.add(
      "alert",
      "alert-dark",
      "shadow-soft",
      "position-relative",
      "mt-1"
    );

    const articleLink = document.createElement("a");
    articleLink.classList.add(
      "text-dark",
      "font-weight-bold",
      "text-underline"
    );
    articleLink.href = "/view/open/article/" + article.id;

    const iconSpan = document.createElement("span");
    iconSpan.classList.add("mr-1");

    const icon = document.createElement("span");
    icon.classList.add("fas", "fa-file-invoice");

    iconSpan.appendChild(icon);

    const dateSpan = document.createElement("span");
    dateSpan.textContent = "[" + article.createdTime + "]";

    const titleSpan = document.createElement("span");
    titleSpan.textContent = article.title;

    articleLink.appendChild(iconSpan);
    articleLink.appendChild(dateSpan);
    articleLink.appendChild(titleSpan);
    articleDiv.appendChild(articleLink);

    articleListContainer.appendChild(articleDiv);
  });
}

function renderSubject(subject) {
  const subjectElement = document.getElementById('subject');
  subjectElement.textContent = subject.title;
}
