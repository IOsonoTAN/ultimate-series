import ArticleItem, { Article } from '../ArticleItem'

type ArticleListProps = {
  articles: Article[]
}
const ArticleList = ({ articles }: ArticleListProps) => {
  const articleList = articles.map((article, index) => (
    <ArticleItem
      key={`article-${index}`}
      article={article}
    />
  ))

  return (
    <div>
      {articleList.length ? articleList : 'There are no articles'}
    </div>
  )
}

export default ArticleList