import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function PrivateRoute({props, el, session, redirect}) {
    
    return (
        <Route {...props}>
            {session ? el : <Redirect to={redirect} />}
        </Route>        
    )
}

export default PrivateRoute;
