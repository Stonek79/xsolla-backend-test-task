const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Product = require('../models/Product')
const auth = require('../middleware/auth.middleware')
const router = Router()
const queryString = require('query-string');

let currentPageNumber = 1;
const pageItemsLimit = 10;
let currentSort = { name: 1 };

// api add product information 
router.post('/add', auth, async (req, res) => {
  try {
    const { sku, type, name, price, currency, description } = req.body.product;
    const code = shortid.generate()

    const product = new Product({
      code, sku, type, name, price, currency, description, user: req.user.userId,
    })

    await product.save()

    res.status(201).json({ product })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please, try again' })
  }
})

// api edite product information
router.patch('/edit/:id', auth, async (req, res) => {
  try {
    const product = req.body.product;
    await Product.updateOne({ _id: req.params.id, user: req.user.userId }, {$set: product})
    res.status(201).json({ product })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please, try again' })
  }
})

// api get goods list by pages and sort by any parameters using query string
router.get('/products', auth, async (req, res) => {
  try {
    const goods = await Product.find({ user: req.user.userId });
    const params = queryString.parseUrl(req.url).query;
    const { page, sortBy } = params;
    currentPageNumber = Number(page);
    if (sortBy) {
      const [key, value] = Object.entries(currentSort).flat();
      currentSort = sortBy === key ? { [sortBy]: value === 1 ? -1 : 1 } : { [sortBy]: 1 }
    }
    
    const pagesLength = Math.ceil(goods.length / pageItemsLimit);
    const currentPageFirstIndex = (currentPageNumber - 1) * pageItemsLimit;
    const currentGoods = await Product
      .find({ user: req.user.userId })
      .sort(currentSort)
      .skip(currentPageFirstIndex)
      .limit(pageItemsLimit);
     
    const pageInfo = { all: pagesLength, currentPage: currentPageNumber, currentIndex: currentPageFirstIndex }
    res.json({ currentGoods, pageInfo });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please, try again' })
  }
});

// api get detail product information by id
router.get('/detail/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.json(product)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please, try again' })
  }
})

// api delete product by id
router.delete('/:id', auth, async (req, res) => {
  try {
    await Product.deleteOne({_id: req.params.id});
    const goods = await Product.find({ user: req.user.userId });
    const pagesLength = Math.ceil(goods.length / pageItemsLimit);
    const currentPageFirstIndex = (currentPageNumber - 1) * pageItemsLimit;
    const currentGoods = await Product
      .find({ user: req.user.userId })
      .sort(currentSort)
      .skip(currentPageFirstIndex)
      .limit(pageItemsLimit);
    const pageInfo = { all: pagesLength, currentPage: currentPageNumber, currentIndex: currentPageFirstIndex }
    res.status(201).json({ currentGoods, pageInfo })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, please, try again' })
  }
})

module.exports = router
