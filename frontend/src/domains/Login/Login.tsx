import React, { useContext } from 'react'
import { Form, Button, Input, Space, Divider, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { LoginFormSubmitValues } from '../../types/domains/Login'
import { requestAuthLogin } from '../../hooks/auth'
import UserContext from '../../contexts/UserContext'

const DomainsLogin: React.FC = () => {
  const history = useHistory()
  const { setIsLoggedIn, setAccessToken, setUser } = useContext(UserContext)

  const [formLogin] = Form.useForm()

  const handleSubmitForm = async (values: LoginFormSubmitValues) => {
    try {
      const { username, password } = values
      const data = await requestAuthLogin(username, password)
      setAccessToken(data.accessToken)
      setUser(data)
      setIsLoggedIn(true)
      message.success('Login Successful')
      return history.push('/users/me')
    } catch (error) {
      setAccessToken('')
      setUser({})
      setIsLoggedIn(false)
      const code = error.code ?? ''
      message.error(`${error.message} ${code ? ` (${code})` : ''}`)
    }
  }

  return (
    <Form
      form={formLogin}
      name="formLogin"
      layout="vertical"
      onFinish={handleSubmitForm}
      onReset={() => formLogin.resetFields()}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please enter your username'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter your password'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Divider />
        <Space>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
          <Button htmlType="reset">
            Reset Form
          </Button>
          <Button onClick={
            () => (
              formLogin.setFieldsValue({
                username: 'iosonotan',
                password: '1212312121'
              })
            )
          }>
            Auto Fill Data
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default DomainsLogin