// 首页逻辑
import axios from 'axios'
const GET_LIST = 'INDEX/USER_INFO'

const userInfo = data=>({
    type: GET_LIST,
    data
})

export const getUserInfo = server => {
    return (dispatch, getState, axiosInstance) => {
        return axios.get('http://localhost:4000/user/info')
            .then(res=>{
                const {data} = res.data
                console.log('data', data)
                dispatch(userInfo(data))
            })
    }
}

const defaultState = {
    userInfo: {}
}

export default ((state = defaultState, action) => {
    switch(action.type) {
        case GET_LIST:
            const newState = {
                ...state,
                userInfo: action.data
            }
            return newState
        default: 
            return state
    }
})