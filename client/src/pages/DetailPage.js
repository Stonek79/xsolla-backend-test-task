import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {ProductCard} from '../components/ProductCard'

export const DetailPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [product, setProduct] = useState(null)
  const productId = useParams().id

  const getProductInfo = useCallback(async () => {
    try {
      const currentProductInfo = await request(`/api/goods/detail/${productId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setProduct(currentProductInfo)
    } catch (e) {}
  }, [token, productId, request])

  useEffect(() => {
    getProductInfo()
  }, [getProductInfo])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      { !loading && product && <ProductCard product={product} /> }
    </>
  )
}
