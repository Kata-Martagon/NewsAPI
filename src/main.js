/* global GuardianAPI, NYTAPI, DomUpdater */

function main() {
  const today = new Date(Date.now());

  // Produces an array of date objects, in same format as 'today', of previous 7 days
  const datesLastWeek = Array.from({ length: 7 }, (_, idx) => new Date(today - (idx + 1) * (8.64 * Math.pow(10, 7))));

  const navDates = datesLastWeek.map(el => el.toDateString().slice(4, 10));

  navDates.forEach((date, index) => {
    const dateNode = document.getElementById('dayPrevious' + (index + 1));
    dateNode.addEventListener('click', (e) => {
      e.preventDefault();
      loadData(datesLastWeek[index]);
    });
    dateNode.innerHTML = date;
  });

  loadData(today);
}

main();

function loadData(date) {
  const guardianContentNode = document.getElementById('GuardianContent');
  const NYTContentNode = document.getElementById('NYTimesContent');

  DomUpdater.clearArticleNodes(guardianContentNode);
  DomUpdater.clearArticleNodes(NYTContentNode);

  GuardianAPI.getArticles(formatGuardianDate(date))
    .then(DomUpdater.buildArticleNodes)
    .then(DomUpdater.displayArticleNodes(guardianContentNode));

  NYTAPI.getArticles(formatNYTDate(date))
    .then(DomUpdater.buildArticleNodes)
    .then(DomUpdater.displayArticleNodes(NYTContentNode));
}


function fillZero(num) {
  return num < 10 ? `0${num}` : num;
}

function formatGuardianDate(date) {
  return `${date.getFullYear()}-${fillZero(date.getMonth() + 1)}-${fillZero(date.getDate())}`;
}

function formatNYTDate(date) {
  return `${date.getFullYear()}${fillZero(date.getMonth() + 1)}${fillZero(date.getDate())}`;
}
