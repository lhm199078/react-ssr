// 首页逻辑
import axios from 'axios'
const GET_LIST = 'INDEX/GET_LIST'

const changeList = list=>({
    type: GET_LIST,
    list
})

export const getIndexList = server => {
    return (dispatch, getState, axiosInstance) => {
        return axios.get('http://localhost:4000/course/list')
            .then(res=>{
                const {list} = res.data
                dispatch(changeList(list))
            })
    }
}

const defaultState = {
    list: []
}

export default ((state = defaultState, action) => {
    switch(action.type) {
        case GET_LIST:
            const newState = {
                ...state,
                list: action.list
            }
            return newState
        default: 
            return state
    }
})