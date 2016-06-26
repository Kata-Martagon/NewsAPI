const DomUpdater = (function wrapper() {
  const buildArticleNode = template => article => {
    template.querySelector('a').textContent = article.title;
    template.querySelector('a').href = article.url;
    template.querySelector('p').innerHTML = article.tagline;
    template.querySelector('h4').textContent = article.publicationDate.slice(0, 10);

    return document.importNode(template, true);
  };

  function buildArticleNodes(articles) {
    const articleTemplate = document.getElementById('ArticleTemplate').content;
    return articles.map(buildArticleNode(articleTemplate));
  }

  const displayArticleNodes = contentNode => articleNodes => {
    articleNodes.forEach(node => contentNode.appendChild(node));
  };

  return { buildArticleNodes, displayArticleNodes };
}());

window.DomUpdater = DomUpdater;
