import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({component:Component, ...rest}) =>{
    const token = window.localStorage.getItem('token');
    
      
        if(token)
        {
            return <Component {...rest} />
        }
        else
        {
            return <Navigate to={'/'} />
        }
    
}

export default PrivateRoute;