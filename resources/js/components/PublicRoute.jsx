import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function PublicRoute({path, el, session, redirect}) {

    return (
        <Route path={path}>
            {session ? <Redirect to={redirect} /> : el}
        </Route>
    )
}

export default PublicRoute;
