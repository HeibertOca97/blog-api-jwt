import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Login} from './Login';
import {Register} from './Register';
import {Home} from './Home';
import {Dashboard} from './Dashboard';
import Navbar from '../Layouts/Navbar';
import {getToken, deleteToken, initAxiosInterceptors} from '../Helpers/auth-helpers';

initAxiosInterceptors();

function App(){
  const [userAuth, setUserAuth] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [session, setSession] = useState(false);
 
  useEffect(()=>{  
    async function loadUser(){
      if(!getToken()) {
        setSession(false);
        setCargandoUsuario(false);
        return;
      }

      try {
        const res = await axios.get("/auth/user");
        const {success, userAuth} = await res.data;
        setUserAuth(userAuth);
        setCargandoUsuario(false);
        setSession(success);
        
      } catch (error) {
        const {success, message} =error.response.data;
        if (error.response.status === 422) {
          setSession(success);
        }
      }

    }

    loadUser();

    return ()=>{
      document.removeEventListener("load", loadUser);
    }
  }, []);
  
  function logout(){
    setUserAuth(null);
    deleteToken();
  }

  return (
    <Router>
     <Navbar />
     
     <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route exact path="/login">
        {session ? <Redirect to="/dashboard" /> : <Login setUserAuth={setUserAuth} setSession={setSession}/>}
      </Route>
      <Route exact path="/register">
        <Register/>
      </Route>
      <Route exact path="/dashboard">
        {session ? <Dashboard  userAuth={userAuth}/> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/post">
          Sitio de los Articulos
      </Route>
     </Switch>
   </Router>
  );
}

export default App;
