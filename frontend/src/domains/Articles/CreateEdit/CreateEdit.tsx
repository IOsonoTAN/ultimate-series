import { useEffect, useContext } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import { Button, Col, Divider, Row, Typography, Form, Input, Space, message } from 'antd'
import { requestGetArticleById, requestPatchArticleById, requestCreateArticle, Article } from '../../../hooks/articles'
import UserContext from '../../../contexts/UserContext'

const { Title } = Typography
const { TextArea } = Input

interface ArticlesCreateEditParams {
  id?: string
}
const DomainsArticlesCreateEdit = () => {
  const history = useHistory()
  const { accessToken } = useContext(UserContext)
  const { id }: ArticlesCreateEditParams = useParams()
  const [formCreateEdit] = Form.useForm()

  const getArticleById = async (articleId: string) => {
    const data = await requestGetArticleById(articleId, accessToken)
    formCreateEdit.setFieldsValue({
      ...data
    })
  }

  const handleFormSubmit = async (doc: Article) => {
    if (id) {
      /**
       * For update article
       */
      await requestPatchArticleById(id, doc, accessToken)
      message.success('The article has been updated')
      return history.push('/articles')
    } else {
      /**
       * For create new article
       */
      const data = await requestCreateArticle(doc, accessToken)
      message.success('The article has been created')
      return history.push(`/articles/add-edit/${data._id}`)
    }
  }

  useEffect(() => {
    if (id) {
      getArticleById(id)
    }
  // eslint-disable-next-line
  }, [id])

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col span={18}>
          <Title level={1} className="no-margin">{id ? 'Edit' : 'Create'} Article</Title>
        </Col>
        <Col span={6} className="text-right">
          <Button type="default">
            <Link to="/articles">Back</Link>
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <Form
            form={formCreateEdit}
            name="formCreateEdit"
            onFinish={handleFormSubmit}
            layout="vertical"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please enter article Title'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please enter article Description'
                }
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Divider />
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default DomainsArticlesCreateEdit