const router = require('express').Router()
const { isAdmin, isLoggedIn } = require('./middleware')
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/categories', require('./categories'))
router.use('/user/orders', isLoggedIn, require('./user/orders'))
router.use('/admin/orders', isAdmin, require('./admin/orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
