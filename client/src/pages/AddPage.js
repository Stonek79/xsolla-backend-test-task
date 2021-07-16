import React, {useContext, useEffect} from 'react'
import {useFormik} from 'formik';
import {useHistory} from 'react-router-dom'

import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'

export const AddProduct = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const {request} = useHttp();
  
  const formik = useFormik({
    initialValues: { sku: '', name: '', description: 'None', price: '', type: '', currency: 'Rub' },
    enableReinitialize: true,
    onSubmit: async (initialValues) => {
      try {
        const data = await request('/api/goods/add', 'POST', {product: initialValues}, {
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
        <button type="submit">Add product</button>
      </form>
    </div>    
  )
};
