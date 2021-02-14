import ArticleItem, { Article } from '../ArticleItem'

type ArticleListProps = {
  articles: Article[]
}
const ArticleList = ({ articles }: ArticleListProps) => {
  const articleListRender = articles.map((article, index) => (
    <ArticleItem
      key={`article-${index}`}
      article={article}
    />
  ))
  return (
    <div>
      {articleListRender.length ? articleListRender : 'There are no articles'}
    </div>
  )
}

export default ArticleList