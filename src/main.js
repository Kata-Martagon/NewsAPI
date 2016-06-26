/* global GuardianAPI, NYTAPI, DomUpdater */

function main() {
  const today = new Date(Date.now());
  console.log(today);

  const datesLastWeek = Array.from({ length: 7 }, (_, idx) => new Date(today - (idx + 1) * (8.64 * Math.pow(10, 7))));
  console.log(datesLastWeek);

  const navDates = datesLastWeek.map(el => el.toDateString().slice(4, 10));
  console.log(navDates);


  const guardianContentNode = document.getElementById('GuardianContent');
  const NYTContentNode = document.getElementById('NYTimesContent');

  GuardianAPI.getArticles(formatGuardianDate(today))
    .then(DomUpdater.buildArticleNodes)
    .then(DomUpdater.displayArticleNodes(guardianContentNode));

  NYTAPI.getArticles(formatNYTDate(today))
    .then(DomUpdater.buildArticleNodes)
    .then(DomUpdater.displayArticleNodes(NYTContentNode));
}

main();


function fillZero(num) {
  return num < 10 ? `0${num}` : num;
}

function formatGuardianDate(date) {
  return `${date.getFullYear()}-${fillZero(date.getMonth() + 1)}-${fillZero(date.getDate())}`;
}

function formatNYTDate(date) {
  return `${date.getFullYear()}${fillZero(date.getMonth() + 1)}${fillZero(date.getDate())}`;
}
