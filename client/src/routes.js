import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AddProduct} from './pages/AddPage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'
import { RemoveProduct } from './pages/DeletePage'
import { PaginatePage } from './pages/PaginatePage'
import { EditPage } from './pages/EditPage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/create" exact>
          <AddProduct />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Route path="/edit/:id">
          <EditPage />
        </Route>
        <Route path="/products">
          <PaginatePage />
        </Route>
        <Route path="/:id">
          <RemoveProduct />
        </Route>
        <Redirect to="/create" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
