import React from 'react'
import { useSelector } from 'react-redux'
import LinearProgress from '@mui/material/LinearProgress';
import { Redirect, Route } from 'react-router-dom'



function PrivateRoute(props) {
    const { isFatching, error } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.user)
    if (isFatching) {
        return <LinearProgress color="secondary" />
    } else if ("id" in user) {
        return <Route {...props} />

    }
    return <Redirect to='/sign-in' />
}


export default PrivateRoute

