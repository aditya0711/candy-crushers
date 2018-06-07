const router = require('express').Router()
const {Product, Review, User, Category} = require('../db/models')
const { isAdmin } = require('./middleware')
module.exports = router

router.get('/', (req, res, next) => {
    Product.findAll({
      include: [Category]
    })
    .then(products => res.json(products))
    .catch(next)
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where : {
        id : req.params.id
      }
    })

    res.json(product)
  } catch (err){
    console.error(err)
  }
})

router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    // Model.update does not support eager loading
    const updatedProduct = await Product.findById(req.params.id)
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})
