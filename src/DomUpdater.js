const DomUpdater = (function wrapper() {
  const buildArticleNode = template => article => {
    template.querySelector('h2').textContent = article.title;
    template.querySelector('p').innerHTML = article.tagline;

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
