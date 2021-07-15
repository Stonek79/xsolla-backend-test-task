import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import { GoodsList } from '../components/GoodsList'

export const RemoveProduct = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [products, setProducts] = useState(null)
  const productId = useParams().id

  const getCurrentGoodsList = useCallback(async () => {
    try {
      const currentGoodsList = await request(`/api/goods/${productId}`, 'DELETE', null, {
        Authorization: `Bearer ${token}`
      })
      setProducts(currentGoodsList)
    } catch (e) {}
  }, [token, productId, request])

  useEffect(() => {
    getCurrentGoodsList()
  }, [getCurrentGoodsList])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      { !loading && products && <GoodsList goods={products} /> }
    </>
  )
}
