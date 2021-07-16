import React from 'react'

// goods list component
export const GoodsList = ({ goods }) => {
  const { currentGoods } = goods;
  if (!currentGoods) return <></>;
  if (!currentGoods.length) {
    return <p className="center">No goods yet</p>
  }

  const { all, currentPage, currentIndex } = goods.pageInfo;
  const goodsTable = currentGoods.map((product, index) => {
    return (
      <tr key={product._id}>
        <td>{index + currentIndex + 1}</td>
        <td>{product.name}</td>
        <td>{product.type}</td>
        <td>{product.price} {product.currency}</td>
        <td>
          <a
            className="waves-effect btn"
            href={`/detail/${product._id}`}
          >
            Product info
          </a>
          <a
            className="waves-effect blue btn"
            href={`/edit/${product._id}`}
          >
            Edit product info
          </a>
          <a
            className="waves-effect red btn"
            href={`/${product._id}`}
          >
            Delete
          </a>
        </td>
      </tr>
    )
  });

  return (
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>
          <a href={`/products?page=${currentPage}&sortBy=name`}>Name</a>
        </th>
        <th>
          <a href={`/products?page=${currentPage}&sortBy=type`}>Type</a>
        </th>
        <th>
          <a href={`/products?page=${currentPage}&sortBy=price`}>Price</a>
        </th>
        <th>Actions</th>
      </tr>
      </thead>

      <tbody>
      { goodsTable }
      </tbody>
      <tfoot>
        <tr>
          <td>
            <a 
              className="grey btn"
              disabled={currentPage === 1 ? true : false}
              href={`/products?page=${currentPage - 1}`}
            >
              Prev
            </a>
          </td>
          <td>
            <a
              className="grey btn"
              disabled={currentPage === all ? true : false}
              href={`/products?page=${currentPage + 1}`}
            >
              Next
            </a>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}
