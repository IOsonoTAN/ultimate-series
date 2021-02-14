import { useContext, useEffect } from 'react'
import { Row, Col, Typography, Button, Divider, Form, Input, message } from 'antd'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Article, requestUpdateArticleById, requestCreateArticle, requestArticleById } from '../../../hooks/article'
import UserContext from '../../../contexts/UserContext'

const { Title } = Typography
const { TextArea } = Input

interface DomainsArticlesAddEditParams {
  id?: string
}
const DomainsArticlesAddEdit = () => {
  const history = useHistory()
  const { id }: DomainsArticlesAddEditParams = useParams()
  const { accessToken } = useContext(UserContext)
  const [formCreateEdit] = Form.useForm()

  const handleFormSubmit = async (doc: Article) => {
    if (id) {
      await requestUpdateArticleById(id, doc, accessToken)
      message.success('The article has been updated')
      return history.push('/articles')
    } else {
      const data = await requestCreateArticle(doc, accessToken)
      message.success('The article has been created')
      return history.push(`/articles/add-edit/${data._id}`)
    }
  }

  const getArticleById = async (id: string) => {
    const data = await requestArticleById(id, accessToken)
    formCreateEdit.setFieldsValue({
      ...data
    })
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
          <Button type="primary">
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
                  message: 'Please enter article title'
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
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default DomainsArticlesAddEdit