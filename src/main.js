/* global guardianAPIKey, createUrl, fetchAPI, fromGuardianToStandardArticleFormat */

const buildArticleNode = template => article => {
  template.querySelector('h2').textContent = article.title;
  template.querySelector('p').textContent = article.tagline;

  return document.importNode(template, true);
};

function buildArticleNodes(articles) {
  const articleTemplate = document.getElementById('ArticleTemplate').content;
  return articles.map(buildArticleNode(articleTemplate));
}

function displayArticleNodes(articleNodes) {
  const guardianContent = document.getElementById('GuardianContent');
  articleNodes.forEach(node => guardianContent.appendChild(node));
}

function main() {
  const query = {
    q: 'brexit',
    'api-key': guardianAPIKey,
  };

  const guardianUrl = createUrl('http://content.guardianapis.com/', ['search'], query);

  fetchAPI(guardianUrl)
    .then(fromGuardianToStandardArticleFormat)
    .then(buildArticleNodes)
    .then(displayArticleNodes);
}

main();
