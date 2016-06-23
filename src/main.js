/* global GuardianAPI, NYTAPI, DomUpdater */

function fillZero(num) {
  return num < 10 ? `0${num}` : num;
}

function formatDate(date) {
  return `${date.getFullYear()}-${fillZero(date.getMonth() + 1)}-${fillZero(date.getDate())}`;
}

function main() {
  const guardianContentNode = document.getElementById('GuardianContent');
  const NYTContentNode = document.getElementById('NYTimesContent');

  const today = new Date(Date.now());
  const strDate = formatDate(today);
  // console.log(formatDate(today));

  GuardianAPI.getArticles(strDate)
    .then(DomUpdater.buildArticleNodes)
    .then(DomUpdater.displayArticleNodes(guardianContentNode));

  NYTAPI.getArticles(strDate)
    .then(DomUpdater.buildArticleNodes)
    .then(DomUpdater.displayArticleNodes(NYTContentNode));
}

main();
