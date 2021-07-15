import React, {useCallback, useContext, useEffect, useState} from 'react'
import { useFormik } from 'formik';
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory, useParams} from 'react-router-dom'

export const EditPage = () => {
  const {token} = useContext(AuthContext)
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [product, setProduct] = useState({ sku: ' ', name: ' ', description: 'None', price: ' ', type: ' ', currency: 'Rub' })
  const {request} = useHttp();
  const productId = useParams().id
  
  const getCurrentProductInfo = useCallback(async () => {
    try {
      const currentProductInfo = await request(`/api/goods/detail/${productId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setProduct(currentProductInfo)
    } catch (e) {}
  }, [token, productId, request])

  useEffect(() => {
    getCurrentProductInfo()
  }, [getCurrentProductInfo])

  const formik = useFormik({
    initialValues: product,
    enableReinitialize: true,
    onSubmit: async (initialValues) => {
      try {
        const data = await request(`/api/goods/edit/${productId}`, 'PATCH', {product: initialValues}, {
          Authorization: `Bearer ${auth.token}`
        })
        history.push(`/detail/${data.product._id}`)
      } catch (e) {}
    },
  });

  useEffect(() => {
    window.M.updateTextFields()
  }, []);

  return (
    <div className="row">
      <form className="col s12" onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="input-field col s6">
            <input
              id="sku"
              type="text"
              className="validate"
              required
              value={formik.values.sku}
              onChange={formik.handleChange}
            />
            <label htmlFor="sku">SKU</label>
          </div>
          <div className="input-field col s6">
            <input
              id="type"
              type="text"
              className="validate"
              required
              value={formik.values.type}
              onChange={formik.handleChange}
            />
            <label htmlFor="type">Type</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input 
              id="name"
              type="text"
              className="validate"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <label htmlFor="name">Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <input 
              id="price"
              type="text"
              className="validate"
              required
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            <label htmlFor="price">Price</label>
          </div>
          <div className="input-field col s6">
            <input
              id="currency"
              type="text"
              className="validate"
              required
              value={formik.values.currency}
              onChange={formik.handleChange}
            />
            <label htmlFor="currency">Currency</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea
              id="description"
              type="text"
              className="validate"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <label htmlFor="description">Description</label>
          </div>
        </div>
        <button type="submit">Edit product info</button>
      </form>
    </div>
  )
};
