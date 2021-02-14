import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Space, Typography, Divider } from 'antd'
import { If, Else, Then } from 'react-if'

import UserContext from '../../contexts/UserContext'

const Navbar: React.FC = () => {
  const { isLoggedIn } = useContext(UserContext)

  return (
    <Space split={<Divider type="vertical" />}>
      <Link to="/" component={Typography.Link}>Homepage</Link>
      <Link to="/about" component={Typography.Link}>About</Link>
      <If condition={isLoggedIn}>
        <Then>
          <Space split={<Divider type="vertical" />}>
            <Link to="/articles" component={Typography.Link}>Articles</Link>
            <Link to="/users/me" component={Typography.Link}>Me</Link>
            <Link to="/logout" component={Typography.Link}>Logout</Link>
          </Space>
        </Then>
        <Else>
          <Link to="/login" component={Typography.Link}>Login</Link>
        </Else>
      </If>
    </Space>
  )
}

export default Navbar