import React from 'react'

export const ProductCard = ({ product }) => {
  return (
    <>
      <h2>Product</h2>

      <p><u>ProductID</u>: {product._id}</p>
      <p><u>SKU</u>: {product.sku}</p>
      <p><u>Type</u>: {product.type}</p>
      <p><u>Name</u>: {product.name}</p>
      <p><u>Price</u>: {product.price} {product.currency}</p>
      <p><u>Description</u>: {product.description}</p>
    </>
  )
}
