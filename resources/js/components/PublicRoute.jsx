import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function PublicRoute({props, el, session, redirect}) {

    return (
        <Route {...props}>
            {session ? <Redirect to={redirect} /> : el}
        </Route>
    )
}

export default PublicRoute;
