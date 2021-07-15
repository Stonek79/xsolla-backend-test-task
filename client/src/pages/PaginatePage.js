import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {GoodsList} from '../components/GoodsList'

export const PaginatePage = () => {
  const [products, setGoods] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const getCurrentPageGoodsList = useCallback(async () => {
    const param = window.location.search;
    try {
      const currentGoodsList = await request(`/api/goods/products?${param}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setGoods(currentGoodsList)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    getCurrentPageGoodsList()
  }, [getCurrentPageGoodsList])

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <GoodsList goods={products} />}
    </>
  )
}
