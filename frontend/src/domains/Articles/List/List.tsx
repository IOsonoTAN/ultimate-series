import { Button, Divider, Row, Col, Typography } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../../contexts/UserContext'
import ArticleContext from '../../../contexts/ArticleContext'
import { requestArticles, Article } from '../../../hooks/articles'
import ArticleList from '../../../components/ArticleList'
import './List.css'

const { Title } = Typography

const DomainsArticlesList = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const { accessToken } = useContext(UserContext)
  const { needLoadArticles, setNeedLoadArticles } = useContext(ArticleContext)

  const getArticles = async () => {
    const data: Article[] = await requestArticles({}, accessToken)

    setArticles(data)
  }

  useEffect(() => {
    getArticles()
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (needLoadArticles) {
      getArticles()
      setNeedLoadArticles(false)
    }
  // eslint-disable-next-line
  }, [needLoadArticles])

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col span={18}>
          <Title level={1} className="no-margin">Articles</Title>
        </Col>
        <Col span={6} className="text-right">
          <Button type="primary">
            <Link to="/articles/add-edit">Create New</Link>
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <ArticleList
            articles={articles}
          />
        </Col>
      </Row>
    </>
  )
}

export default DomainsArticlesList