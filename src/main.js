function buildArticleNode(template, article) {
  template.querySelector('h2').textContent = article.title;
  template.querySelector('p').textContent = article.tagline;

  return document.importNode(template, true);
}

function main() {
  const article = {
    title: 'HEADING',
    tagline: 'This is the tagline',
  };

  const article2 = {
    title: 'HEADING',
    tagline: 'This is the tagline',
  };


  const node = buildArticleNode(document.getElementById('ArticleTemplate').content, article);
  const node2 = buildArticleNode(document.getElementById('ArticleTemplate').content, article2);

  document.getElementById('GuardianContent').appendChild(node);
  document.getElementById('GuardianContent').appendChild(node2);
}

main();
