import React, {useRef, useEffect, useState} from 'react';
import {initAxiosInterceptors} from '../Helpers/auth-helpers';
import axios from 'axios';
initAxiosInterceptors();
export function Register(){
  const emailRef = useRef(null),
  passRef = useRef(null);
  const [stateReq, setStateReq] = useState(false);
  const [stateSuccess, setStateSuccess] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [msg, setMsg] = useState(null);
  let alert, email, password , emailError, passError;
  
  const errorMessages = (errors)=>{
    email = emailRef.current,
    password = passRef.current,
    emailError = emailRef.current.parentElement.children[2],
    passError = passRef.current.parentElement.children[2];

    if(errors.hasOwnProperty("email")){
      email.classList.add("border-danger");
      emailError.innerHTML = errors.email[0];
    }else if(errors.hasOwnProperty("password")){
      password.classList.add("border-danger");
      passError.innerHTML = errors.password[0];
    }

  }
  const sendFormRegister = async (email, password) => {
    try {
      const res = await axios.post("/auth/register",{
        email: email, 
        password: password
      });
      const {success, message} = await res.data;
      
      setStateSuccess(true);
      setStateError(false);
      setStateReq(success); // validar alert 
      setMsg(message); // mensaje
      
    } catch (error) {
      console.clear();
      const {success, message, errors} = error.response.data;
      
      if(error.response.status === 422){
        setStateError(true);
        setStateSuccess(false);
        setStateReq(success); // validar alert 
        setMsg(message); //mensaje
        errorMessages(errors);
      }

      if(error.response.status === 401){
        setStateError(true);
        setStateSuccess(false);
        setStateReq(success); // validar alert 
        setMsg(message); //mensaje
      }
    }
  }
  const createUser = ()=>{
    email = emailRef.current,
    password = passRef.current,
    emailError = emailRef.current.parentElement.children[2],
    passError = passRef.current.parentElement.children[2];
    
    if(email.value && password.value){
      sendFormRegister(email.value, password.value);
    }else{
      if(!email.value){
        email.classList.add("border-danger");
        emailError.innerHTML = "Campo email requerido";
      }else if(!password.value){
        password.classList.add("border-danger");
        passError.innerHTML = "Campo password requerido";
      }
    }
  }

  const validateResponse = ()=>{
    email = emailRef.current,
    password = passRef.current,
    emailError = emailRef.current.parentElement.children[2],
    passError = passRef.current.parentElement.children[2];
    
    if (stateReq == true) {
      email.value = "";
      password.value = "";
      emailError.innerHTML = "";
      passError.innerHTML = "";
      email.classList.remove("border-danger");
      password.classList.remove("border-danger");
    }
  }

  const validateInput = (e)=>{
    const input = e.target,
    span = input.parentElement.children[2];

    if(!input.value){
      input.classList.add("border-danger");
      span.innerHTML = `Campo ${e.target.getAttribute("name")} requerido`;
    }else{
      input.classList.remove("border-danger");
      span.innerHTML = ``;
    }
  }
  
  useEffect(()=>{
    document.querySelector("title").innerHTML = "Register | Blogger Dev";
    //Delete message error
    validateResponse();
  },[stateReq])

  if(stateReq){
    alert = <div className={stateSuccess != true ? "d-none" : "alert alert-success"} role="alert">{msg}</div>;
    setInterval(() => {
      setStateSuccess(false)
    }, 5000);
  }else{
    alert = <div className={stateError != true ? "d-none" : "alert alert-danger"} role="alert">{msg}</div>;
    setInterval(() => {
      setStateError(false)
    }, 5000);
  }


  return (
    <section className="box-login d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
      <div className="m-auto border bg-white p-3 rounded" style={{width: "25rem"}}>

        <h3 className="text-center mt-3 mb-4">Registro de usuario</h3>
        {alert}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Email" className="form-control" autoComplete="off" ref={emailRef} onChange={e => validateInput(e)} onBlur={e => validateInput(e)}/>
          <span className="d-block text-danger m-2"></span>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Password" className="form-control" autoComplete="off" ref={passRef} onChange={e => validateInput(e)} onBlur={e => validateInput(e)}/>
          <span className="d-block text-danger m-2"></span>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={createUser}>Registrase</button>
        </div>
      </div>
    </section>
  );
}