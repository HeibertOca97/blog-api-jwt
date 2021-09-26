import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import NavbarApp from '../Layouts/NavbarApp';
import Navbar from '../Layouts/Navbar';
import {Login} from './Login';
import {Register} from './Register';
import {Home} from './Home';
import {Dashboard} from './Dashboard';
import {PageNotFound} from './PageNotFound';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';

export function RouterView({session, setSession, setUserAuth, userAuth}) {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Navbar /> <Home/>
                </Route>
                <PublicRoute  exact path="/login" session={session} redirect="/dashboard" el={<><Navbar /><Login setUserAuth={setUserAuth} setSession={setSession}/></>} />
                <Route exact path="/register">
                    <Navbar /> <Register/>
                </Route>
                <PrivateRoute exact path="/dashboard" session={session} redirect="/login" el={<><NavbarApp /> <Dashboard setSession={setSession}  setUserAuth={setUserAuth} userAuth={userAuth}/></>}/>
                <PrivateRoute exact path="/articles" session={session} redirect="/login" el={<><NavbarApp /> <h1>Seccion de aritculos</h1></>}/>
                <Route component={PageNotFound} />
            </Switch>
        </Router>
    )
}
