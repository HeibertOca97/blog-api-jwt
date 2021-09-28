import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {getToken, initAxiosInterceptors} from './Helpers/auth-helpers';
import {RouterView} from './components/RouterView';

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
  }, [setSession, setUserAuth, getToken]);

  return (
      <Router>
          <RouterView session={session} setUserAuth={setUserAuth} setSession={setSession} userAuth={userAuth}/>
      </Router>
  );
}

export default App;
