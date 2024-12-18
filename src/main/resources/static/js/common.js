$(document).ready(function () {
  const subjectResponseList = localStorage.getItem("subjectResponseList");
  if (subjectResponseList) {
    renderSubject(JSON.parse(subjectResponseList));
  } else {
    fetchSubjectFromAPI();
  }
});

function fetchSubjectFromAPI() {
  fetch("/public/api/subject")
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("subjectResponseList", JSON.stringify(data));
      renderSubject(data);
    })
    .catch((error) => {
      console.error("Menu data fetch failed:", error);
    });
}

function renderSubject(subjectResponseList) {
  const nav = document.getElementById("navbar_public");
  nav.innerHTML = "";

  // 최상위 메뉴 항목 생성
  subjectResponseList.forEach((subjectResponse) => {
    if (!subjectResponse.parentId) {
      const topLevelMenu = document.createElement("li");
      topLevelMenu.className = "nav-item";

      const topLink = document.createElement("a");
      topLink.href = `/public/view/subject/${subjectResponse.id}`;
      topLink.className = "nav-link";
  
      const topText = document.createElement("span");
      topText.className = "nav-link-inner-text";
      topText.textContent = subjectResponse.title;
      
      topLink.appendChild(topText);
      topLevelMenu.appendChild(topLink);
      nav.appendChild(topLevelMenu);
    }
  });
}

