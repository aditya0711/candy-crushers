const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
   text: {
     type : Sequelize.TEXT,
     allowNull : false,
     validate: {
       min: 5,
     }
   },
   stars : {
     type : Sequelize.INTEGER,
     allowNull : false,
     validate : {
       min : 0,
       max : 5
     }
   }
})

module.exports = Review
