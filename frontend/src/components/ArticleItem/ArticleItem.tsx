import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Row, Space, message } from 'antd'
import UserContext from '../../contexts/UserContext'
import ArticleContext from '../../contexts/ArticleContext'
import { requestDeleteArticleById, Article } from '../../hooks/articles'
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
      try {
        await requestDeleteArticleById(id, accessToken)
        message.success('The article has been remove')
        setNeedLoadArticles(true)
        return true
      } catch (error) {
        message.error('Can not delete the article!')
        return false
      }
    }
    return false
  }

  return (
    <div className="article-item">
      <Row>
        <Col span={18}>{article._id}</Col>
        <Col span={6} style={{ textAlign: 'right' }}>
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