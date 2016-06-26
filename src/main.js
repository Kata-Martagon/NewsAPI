/* global GuardianAPI, NYTAPI, DomUpdater */

function fillZero(num) {
  return num < 10 ? `0${num}` : num;
}


function formatGuardianDate(date) {
  return `${date.getFullYear()}-${fillZero(date.getMonth() + 1)}-${fillZero(date.getDate())}`;
}

function formatNYTDate(date) {
  return `${date.getFullYear()}${fillZero(date.getMonth() + 1)}${fillZero(date.getDate())}`;
}

function main() {
  const guardianContentNode = document.getElementById('GuardianContent');
  const NYTContentNode = document.getElementById('NYTimesContent');

  const today = new Date(Date.now());
  console.log(today);
  // const yesterday = new Date(Date.now() - (8.64 * Math.pow(10, 7)));
  // console.log(yesterday);
  //
  const datesOfLastWeek = Array.from({ length: 6 }, (_, idx) => new Date(Date.now() - (idx +1) * (8.64 * Math.pow(10, 7))))
  //
  // const vs = Array.from({length: 6}, (_, idx) => idx + 1);
  // console.log(vs);
  console.log(datesOfLastWeek);

  GuardianAPI.getArticles(formatGuardianDate(today))
    .then(DomUpdater.buildArticleNodes)
    .then(DomUpdater.displayArticleNodes(guardianContentNode));

  NYTAPI.getArticles(formatNYTDate(today))
    .then(DomUpdater.buildArticleNodes)
    .then(DomUpdater.displayArticleNodes(NYTContentNode));
}


main();
