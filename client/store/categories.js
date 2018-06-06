import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getCategories = categories => {
  return {
      type: GET_CATEGORIES,
      categories
  }
}

/**
 * THUNK CREATORS
 */
export const fetchCategories = () =>
  dispatch =>
    axios.get('/api/categories')
      .then(res =>
        dispatch(getCategories(res.data || initialState)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
