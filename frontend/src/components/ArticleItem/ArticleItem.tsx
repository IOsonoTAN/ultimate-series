import { useContext } from 'react'
import { Row, Col, Space, Button, message } from 'antd'
import { Link } from 'react-router-dom'
import { Article } from '../../hooks/article'
import { requestDeleteArticleById } from '../../hooks/article'
import UserContext from '../../contexts/UserContext'
import ArticleContext from '../../contexts/ArticleContext'
import './ArticleItem.css'

export type {
  Article
}

type ArticleItemProps = {
  article: Article
}
const ArticleItem = ({ article }: ArticleItemProps) => {
  const { accessToken } = useContext(UserContext)
  const { setNeedLoadArticles } = useContext(ArticleContext)

  const onDeleteItem = async (id: string) => {
    const deleteConfirmed = window.confirm('Do you wanna delete this item?')
    if (deleteConfirmed) {
      await requestDeleteArticleById(id, accessToken)
      message.success('The article has been deleted')
      setNeedLoadArticles(true)
    }
  }

  return (
    <div className="article-item">
      <Row>
        <Col span={18}>{article._id}</Col>
        <Col span={6} className="text-right">
          <Space>
            <Button type="default"><Link to={`/articles/add-edit/${article._id}`}>Edit</Link></Button>
            <Button type="default" onClick={() => onDeleteItem(article._id)}>Delete</Button>
          </Space>
        </Col>
      </Row>
      <Row>
        <Col span={24}>{article.title}</Col>
        <Col span={24}>{article.description}</Col>
      </Row>
    </div>
  )
}

export default ArticleItem