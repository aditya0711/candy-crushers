const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        console.log('No such user found:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else if (!user.correctPassword(req.body.password)) {
        console.log('Incorrect password for user:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else {
        if(user.isVerified) {
          req.login(user, err => (err ? next(err) : res.json(user)))
        } else {
          res.status(401).send('Password has expired. Reset Password');
        }
      }
    })
    .catch(next)
})

router.put('/resetpass', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}});
    if (!user) {
        console.log('No such user found:', req.body.email)
        res.status(401).send('Wrong username and/or password')
    } else {
      await user.update({password: req.body.password , isVerified: req.body.isVerified})
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (error) {
    next(error)
  }
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
