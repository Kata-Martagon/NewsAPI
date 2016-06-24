/* global GuardianAPI, NYTAPI, DomUpdater */

function main() {
  const guardianContentNode = document.getElementById('GuardianContent');
  const NYTContentNode = document.getElementById('NYTimesContent');

  GuardianAPI.getArticles()
    .then(DomUpdater.buildArticleNodes)
    .then(DomUpdater.displayArticleNodes(guardianContentNode));

  NYTAPI.getArticles()
    .then(DomUpdater.buildArticleNodes)
    .then(DomUpdater.displayArticleNodes(NYTContentNode));
}

main();
