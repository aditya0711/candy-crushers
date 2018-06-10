import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {createSaveCartOnLogoutThunk} from '../../store'
import {Menu, Icon} from 'semantic-ui-react'

const Navbar = ({ handleClick, isLoggedIn, isAdmin, cart, userId }) => (
  <div>
    <Menu size='tiny' inverted  >
      <Menu.Item>
        <Link to='/products'>CANDY<br />CRUSHERS</Link>
      </Menu.Item>
      {
        isLoggedIn &&
        <Menu.Menu>
          <Menu.Item>
            <Link to={isAdmin ? '/admin/orders/' : '/orders'}>Orders</Link>
          </Menu.Item>
        </Menu.Menu>
      }
      {
        isAdmin &&
        <Menu.Menu>
          <Menu.Item>
            <Link to='/admin/dashboard'>Dashboard</Link>
          </Menu.Item>
        </Menu.Menu>
      }
      <Menu.Menu position='right'>
        <Menu.Item>
          <Link to='/cart' >
            <Icon name='cart arrow down' />
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/myAccount' > My Account </Link>
        </Menu.Item>
          {isLoggedIn ? (
            <Menu.Menu position='right'>
              {/* The navbar will show these links after you log in */}
              <Menu.Item>
                <Link to="/home">Home</Link>
              </Menu.Item>
              <Menu.Item>
              <a href="#" onClick={() => handleClick(userId, cart)}>
                Logout
              </a>
              </Menu.Item>
            </Menu.Menu>
          ) : (
            <Menu.Menu position='right'>
              {/* The navbar will show these links before you log in */}
              <Menu.Item>
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/signup">Sign Up</Link>
              </Menu.Item>
            </Menu.Menu>
          )}
      </Menu.Menu >
    </Menu>
    <hr />
  </div>
)


const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.id && state.user.isAdmin,
    cart: state.cart,
    userId: state.user.id,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick(id, cart) {
      dispatch(createSaveCartOnLogoutThunk(id, cart))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)


Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}


//<Image src='https://pbs.twimg.com/profile_images/978488409365753856/5zaAsrTo_400x400.jpg' size='tiny' />