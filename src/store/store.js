// 存储入口
import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import IndexReducer from './index'
import UserReducer from './user'

const reducer = combineReducers({
    index: IndexReducer,
    user: UserReducer
})

// export default store
export const getServiceStore = () => {
    return createStore(reducer, applyMiddleware(thunk))
}

export const getClientStore = () => {
    const defaultState = window.__context ? window.__context : {}
    return createStore(reducer, defaultState, applyMiddleware(thunk))
}