import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';

const PrivateRoute = ({component:Component, ...rest}) =>{
    const cookies = new Cookies();
    const token = cookies.get("token")
    
      
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