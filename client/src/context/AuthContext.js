import {createContext} from 'react'

function noop() {}

// auth context
export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false
})
