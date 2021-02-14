import { useContext } from 'react'
import { Card, Typography, Space } from 'antd'
import UserContext from '../../../contexts/UserContext'

const { Title } = Typography

const UsersMe = () => {
  const { user } = useContext(UserContext)

  return (
    <Space direction="vertical">
      <Title level={1}>
        About me
      </Title>
      <Card style={{ maxWidth: '600px' }}>
        <p>ID: { user.id }</p>
        <p>Username: { user.username }</p>
        <p>Name: { user.name }</p>
        <p>Surname: { user.surname }</p>
        <p>Email: { user.email }</p>
      </Card>
    </Space>
  )
}

export default UsersMe