import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function PrivateRoute({path, el, session, redirect}) {
    
    return (
        <Route path={path}>
            {session ? el : <Redirect to={redirect} />}
        </Route>        
    )
}

export default PrivateRoute;
