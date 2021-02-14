import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import './App.css'
import 'antd/dist/antd.css'

import ContextProvider from '../../contexts'
import Navbar from '../Navbar'
import PrivateRoute from '../PrivateRoute'

import DomainsHome from '../../domains/Home'
import DomainsAbout from '../../domains/About'
import DomainsLogin from '../../domains/Login'
import DomainsLogout from '../../domains/Logout'

import DomainsUsersMe from '../../domains/Users/Me'
import DomainsArticlesList from '../../domains/Articles/List'
import DomainsArticlesCreateEdit from '../../domains/Articles/CreateEdit'

function App() {
  const { Header, Content, Footer } = Layout

  return (
  <ContextProvider>
    <BrowserRouter>
    <Header>
      <Navbar />
    </Header>
    <Content className="content-app">
      <Switch>
        <Route exact path="/" component={DomainsHome} />
        <Route exact path="/about" component={DomainsAbout} />
        <Route exact path="/login" component={DomainsLogin} />
        <PrivateRoute exact path="/articles" component={DomainsArticlesList} />
        <PrivateRoute exact path="/articles/add-edit/:id?" component={DomainsArticlesCreateEdit} />
        <PrivateRoute exact path="/users/me" component={DomainsUsersMe} />
        <PrivateRoute exact path="/logout" component={DomainsLogout} />
      </Switch>
    </Content>
    <Footer>Footer is here!</Footer>
    </BrowserRouter>
  </ContextProvider>
  )
}

export default App
