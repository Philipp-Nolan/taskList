import React from 'react'
import { useSelector } from 'react-redux'
import LinearProgress from '@mui/material/LinearProgress';
import { Redirect, Route } from 'react-router-dom'



function CustomRoute(props) {
    const { user } = useSelector(state => state.user)

    if ("length" in user) {
        return <Route {...props} />
    }
    return <Redirect to='/' />
}


export default CustomRoute

