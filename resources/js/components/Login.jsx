import {useEffect, useState} from 'react';
import {setToken} from '../Helpers/auth-helpers';


export function Login({setUserAuth, setSession}){

  const sendFormLogin = async () => {
    try {
      const res = await axios.post("/auth/login", {
        email: "user1@gmail.com",
        password: "123456789"
      });

      const {success, token, user} = await res.data;
      setToken(token);
      setUserAuth(user);
      setSession(success);
    } catch (error) {
      const {success, message, errors} = error.response.data;
      setSession(success);

      if(error.response.status === 422){
        console.log(success)
        console.log(message)
        console.log(errors)
      }
      
      if(error.response.status === 401){
        console.log(message)
        console.log(success)
      }

    }
  }
  
  useEffect(()=>{
    document.querySelector("title").innerHTML = "Login | Blogger Dev";
  }, []);

  return (
    <section className="box-login d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
      <div className="m-auto border bg-white p-3 rounded" style={{width: "18rem"}}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Email" className="form-control" autoComplete="off" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Password" className="form-control" autoComplete="off" />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={sendFormLogin}>Iniciar sesion</button>
        </div>
      </div>
    </section>
  );
}