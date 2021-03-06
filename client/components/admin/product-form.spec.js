import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import {ProductForm} from '../'

describe('<ProductForm> Component', () => {
  describe('during edit', () => {
    it('renders edit messages', () => {
      const productForm = shallow(<ProductForm updating />)
      expect(productForm.find('h1').text()).to.equal('Edit Product')
      expect(productForm.find('Button').render().text()).to.equal('Save Changes')
    })

    it('pre-populates data based on product', () => {
      const product = {
        id: 1,
        name: 'Kit-Kat',
        description: 'Oat cake soufflé powder carrot cake gummi bears.',
        price: 199,
        inventory: 100,
        categories: []
      }
      const productForm = shallow(<ProductForm updating />)
      productForm.setProps({product}) // simulate receiving new props from ComponentDidMount
      expect(productForm.state().name).to.equal('Kit-Kat')
      expect(productForm.state().price).to.equal(1.99)
    })

  })

  describe('during add', () => {
    it('renders add messages', () => {
      const productForm = shallow(<ProductForm />)
      expect(productForm.find('h1').text()).to.equal('Add a New Product')
      expect(productForm.find('Button').render().text()).to.equal('Add Product')
    })

    it('starts without any identifying data', () => {
      const productForm = shallow(<ProductForm />)
      expect(productForm.state().name).to.be.empty
      expect(productForm.state().description).to.be.empty
      expect(productForm.state().selectedCategories.length).to.equal(0)
    })

    it('starts with a default for price and inventory', () => {
      const productForm = shallow(<ProductForm />)
      expect(productForm.state().price).to.equal(1)
      expect(productForm.state().inventory).to.equal(1)
    })
  })
})
