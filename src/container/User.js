import React from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../store/user.js'
function User(props){
    return <div>
        <h1>user</h1>
        <h1>{props.userInfo.name}</h1>
    </div>
}
User.loadData = (store) => {
    return store.dispatch(getUserInfo())
}
export default connect(
    state=>({userInfo: state.user.userInfo}),
)(User)