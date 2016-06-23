/* global NYTAPIKey, buildArticleNode, fetchAPI, parseData, urlNYT, buildArticleNodes */


function displayArticleNodes(articleNodes) {
  const NYTContent = document.getElementById('NYTimesContent');
  articleNodes.forEach(node => NYTContent.appendChild(node));
}

function mainNYT() {
  fetchAPI(urlNYT)
  .then(parseData)
  .then(buildArticleNodes)
  .then(displayArticleNodes);
}


mainNYT();
