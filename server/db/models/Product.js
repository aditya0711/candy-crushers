const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const { Review, User } = require('./')

const Product = db.define('product', {
   name: {
     type : Sequelize.STRING,
     allowNull : false,
   },
   description : {
     type : Sequelize.TEXT,
     allowNull : false
   },
   price : {
     type : Sequelize.INTEGER,
     allowNull : false,
     get() {
      return this.getDataValue('price')
     },
     set(price){
       this.setDataValue('price', Number((price*100).toFixed(0)))
     }
   },
   inventory : {
     type : Sequelize.INTEGER,
     allowNull : false
   },
   images : {
     type : Sequelize.ARRAY(Sequelize.STRING),
     defaultValue : ['/defaultPhotos/lolies.jpg',
     '/defaultPhotos/chocolate-bar.jpg', '/defaultPhotos/gummy-bears.jpg',
     '/defaultPhotos/bon-bons.jpg',
     '/defaultPhotos/jelly-beans.jpg',
     '/defaultPhotos/peeps.jpg', '/defaultPhotos/skittles.jpg', '/defaultPhotos/sour-rainbows.jpg', '/defaultPhotos/twix.png', '/defaultPhotos/twizzlers.jpg', '/defaultPhotos/candy-corn.jpg',
    '/defaultPhotos/fun-dip.jpg' ]
   },
})



//-----HOOKS-----
Product.beforeValidate(instance => {
  if (!Array.isArray(instance.images)) {
    instance.images = instance.images.split(',')
  }
})

module.exports = Product
