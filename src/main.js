/* global guardianAPIKey, createUrl, fetchAPI, fromGuardianToStandardArticleFormat */

const buildArticleNode = template => article => {
  template.querySelector('h2').textContent = article.title;
  template.querySelector('p').innerHTML = article.tagline;

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
    'show-fields': 'standfirst',
    'from-date': '2016-06-20',
    'to-date': '2016-06-20',
    pageSize: '50',
    'order-by': 'newest',
    'api-key': guardianAPIKey,
  };

  const guardianUrl = createUrl('http://content.guardianapis.com/', ['search'], query);

  const trace = data => { console.log(data); return data; };

  fetchAPI(guardianUrl)
    .then(trace)
    .then(fromGuardianToStandardArticleFormat)
    .then(buildArticleNodes)
    .then(displayArticleNodes);
}

main();
