import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import NavbarApp from '../Layouts/NavbarApp';
import Navbar from '../Layouts/Navbar';
import {Login} from '../Page/Login';
import {Register} from '../Page/Register';
import {Home} from '../Page/Home';
import {Dashboard} from '../Page/Dashboard';
import {Post} from '../Page/Post';
import {Page404} from '../Page/Page404';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export function RouterView({session, setSession, setUserAuth, userAuth}) {

    return (
        <Switch>
            <Route exact path="/">
                <Navbar /> <Home/>
            </Route>
            <PublicRoute exact path="/login" session={session} redirect="/dashboard" el={<><Navbar /><Login setUserAuth={setUserAuth} setSession={setSession}/></>} />
            <Route exact path="/register">
                <Navbar /> <Register/>
            </Route>
            <PrivateRoute exact path="/dashboard" session={session} redirect="/login" el={<><NavbarApp /> <Dashboard setSession={setSession}  setUserAuth={setUserAuth} userAuth={userAuth}/></>}/>
            <PrivateRoute path="/post" session={session} redirect="/login" el={<><NavbarApp /><Post /> </>}/>
            <Route component={Page404} />
        </Switch>
    )
}
